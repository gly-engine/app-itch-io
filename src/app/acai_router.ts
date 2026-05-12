/**
 * @file app/acai_router.ts
 * @author RodrigoDornelles
 */
import type { GlyApp, GlyStd } from "@gamely/gly-types";
import { createState } from "node_modules/@gamely/acai-jsx/src";

type Primitive = string | number | boolean | undefined;
type PageParams = Record<string, Primitive>;
type SimplePageFn = (props: any, std: GlyStd) => JSX.Element | Promise<JSX.Element>;
type PageFn = (props: any, std: GlyStd) =>
  | JSX.Element
  | Promise<JSX.Element>
  | AsyncGenerator<JSX.Element, JSX.Element | void, unknown>;
type PagesMap = Record<string, PageFn>;
type PagePath<T extends PagesMap> = keyof T & string;
type PageProps<T extends PagesMap, K extends keyof T> = Parameters<T[K]>[0];
type Entry<T extends PagesMap> = { path: PagePath<T>; params: PageParams };

type Nav<T extends PagesMap> = <K extends PagePath<T>>(
  this: void,
  path: K,
  params: PageProps<T, K>,
) => Promise<void>;

type RouterConfig<T extends PagesMap> = {
  std: GlyStd;
  pages: T;
  splash?: SimplePageFn;
  error?: SimplePageFn;
};

type State<T extends PagesMap> = {
  std?: GlyStd;
  pages?: T;
  splashFn?: SimplePageFn;
  errorFn?: SimplePageFn;
  rootApp?: GlyApp;
  splashApp?: GlyApp;
  errorApp?: GlyApp;
  currentApp?: GlyApp;
  stack: Entry<T>[];
  getErrorText: (this: void) => string;
  setErrorText: (this: void, s: string) => void;
};

type Router<T extends PagesMap> = {
  go: Nav<T>;
  replace: Nav<T>;
  reset: Nav<T>;
  back: (this: void) => Promise<void>;
  home: (this: void) => Promise<void>;
  error: (this: void, err: unknown) => Promise<void>;
  current: (this: void) => PagePath<T> | undefined;
};

type SetRouter<T extends PagesMap> = (config: RouterConfig<T>) => void;

const STACK_CAP = 32;

const resolve = async <X>(v: X | Promise<X>): Promise<X> =>
  v instanceof Promise ? await v : v;

const isAsyncGenerator = (
  v: unknown,
): v is AsyncGenerator<JSX.Element, JSX.Element | void, unknown> =>
  v != null && typeof v === "object" && typeof (v as { next?: unknown }).next === "function";

const spawnTop = <T extends PagesMap>(s: State<T>, el: JSX.Element): GlyApp =>
  s.std!.node.spawn(el);

const spawnInRoot = <T extends PagesMap>(s: State<T>, el: any): GlyApp =>
  (s.std!.node.spawn as any)(el, s.rootApp) as GlyApp;

const killCurrent = <T extends PagesMap>(s: State<T>): void => {
  if (s.currentApp) {
    s.std!.node.kill(s.currentApp);
    s.currentApp = undefined;
  }
};

async function ensureSplash<T extends PagesMap>(s: State<T>): Promise<void> {
  if (s.splashApp || !s.splashFn) return;
  s.splashApp = spawnTop(s, await resolve(s.splashFn({}, s.std!)));
}

async function ensureError<T extends PagesMap>(s: State<T>): Promise<void> {
  if (s.errorApp || !s.errorFn) return;
  s.errorApp = spawnTop(s, await resolve(s.errorFn({ text: s.getErrorText }, s.std!)));
  s.std!.node.pause(s.errorApp);
}

async function mount<T extends PagesMap>(s: State<T>, entry: Entry<T>): Promise<void> {
  const fn = s.pages![entry.path] as PageFn | undefined;
  if (!fn) throw new Error(`Page not found: ${entry.path}`);

  await ensureError(s);
  await ensureSplash(s);

  if (s.errorApp) s.std!.node.pause(s.errorApp);
  if (s.splashApp) s.std!.node.resume(s.splashApp);

  const result = fn(entry.params, s.std!);

  if (isAsyncGenerator(result)) {
    let first = true;
    // @ts-ignore
    print('eh um gerador!');
    for await (const element of result) {
      // @ts-ignore
      print('iteracao');
      // @ts-ignore
      print(element)
      // @ts-ignore
      print(element.data)

      const prev = s.currentApp;
      s.currentApp = spawnInRoot(s, element);
      if (prev) s.std!.node.kill(prev);
      if (first && s.splashApp) {
        s.std!.node.pause(s.splashApp);
        first = false;
      }
    }
  } else {
    killCurrent(s);
    s.currentApp = spawnInRoot(s, await resolve(result));
    if (s.splashApp) s.std!.node.pause(s.splashApp);
  }
}

async function handleError<T extends PagesMap>(s: State<T>, err: unknown): Promise<void> {
  s.std!.log.error(err);
  s.setErrorText(String(err));
  await ensureError(s);
  if (!s.errorApp) return;
  if (s.splashApp) s.std!.node.pause(s.splashApp);
  s.std!.node.resume(s.errorApp);
}

async function navigate<T extends PagesMap>(
  s: State<T>,
  op: () => Entry<T> | undefined,
): Promise<void> {
  try {
    const next = op();
    if (next) await mount(s, next);
  } catch (e) {
    await handleError(s, e);
  }
}

function go<T extends PagesMap, K extends PagePath<T>>(
  s: State<T>, path: K, params: PageProps<T, K>,
): Promise<void> {
  return navigate(s, () => {
    const i = s.stack.findIndex(e => e.path === path);
    const entry: Entry<T> = { path, params: params as PageParams };
    if (i >= 0) {
      s.stack.splice(i + 1);
      s.stack[i] = entry;
    } else {
      s.stack.push(entry);
      if (s.stack.length > STACK_CAP) s.stack.shift();
    }
    return entry;
  });
}

function back<T extends PagesMap>(s: State<T>): Promise<void> {
  return navigate(s, () => {
    if (s.stack.length <= 1) return undefined;
    s.stack.pop();
    return s.stack[s.stack.length - 1];
  });
}

function home<T extends PagesMap>(s: State<T>): Promise<void> {
  return navigate(s, () => {
    if (s.stack.length <= 1) return undefined;
    s.stack.splice(1);
    return s.stack[0];
  });
}

function replace<T extends PagesMap, K extends PagePath<T>>(
  s: State<T>, path: K, params: PageProps<T, K>,
): Promise<void> {
  return navigate(s, () => {
    const entry: Entry<T> = { path, params: params as PageParams };
    if (s.stack.length === 0) s.stack.push(entry);
    else s.stack[s.stack.length - 1] = entry;
    return entry;
  });
}

function reset<T extends PagesMap, K extends PagePath<T>>(
  s: State<T>, path: K, params: PageProps<T, K>,
): Promise<void> {
  return navigate(s, () => {
    const entry: Entry<T> = { path, params: params as PageParams };
    s.stack.length = 0;
    s.stack.push(entry);
    return entry;
  });
}

function configure<T extends PagesMap>(s: State<T>, config: RouterConfig<T>): void {
  s.std = config.std;
  s.pages = config.pages;
  s.splashFn = config.splash;
  s.errorFn = config.error;
  s.rootApp = config.std.node.spawn(config.std.node.load({}));
  s.splashApp = undefined;
  s.errorApp = undefined;
  s.currentApp = undefined;
  s.stack.length = 0;
}

export function createRouter<T extends PagesMap>(): [Router<T>, SetRouter<T>] {
  const [getErrorText, setErrorText] = createState("Error!");
  const s: State<T> = { stack: [], getErrorText, setErrorText };

  const router: Router<T> = {
    go: (path, params) => go(s, path, params),
    replace: (path, params) => replace(s, path, params),
    reset: (path, params) => reset(s, path, params),
    back: () => back(s),
    home: () => home(s),
    error: (err) => handleError(s, err),
    current: () => s.stack[s.stack.length - 1]?.path,
  };

  return [router, (config) => configure(s, config)];
}
