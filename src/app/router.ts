/**
 * @file app/router.ts
 * @author RodrigoDornelles
 */
import type { GlyApp, GlyNode, GlyStd } from "@gamely/gly-types";
import { Pages } from "../pages";
import { createState } from "node_modules/@gamely/acai-jsx/src";

type PagesMap = typeof Pages;
type PagePath = keyof PagesMap;
type PageDefault<T = {}> = (_: T, std: GlyStd) => Promise<JSX.Element>

type ExtractParams<T extends string> =
  string extends T
    ? Record<string, string>
    : T extends `${infer _}:${infer Param}/${infer Rest}`
      ? { [K in Param | keyof ExtractParams<Rest>]: string }
      : T extends `${infer _}:${infer Param}`
        ? { [K in Param]: string }
        : {};


type Normalize<T> = {
  [K in keyof T]: string | number;
};

let _std: GlyStd;
let _pages: PagesMap;
let _loadPage: PageDefault;
let _errorPage: PageDefault<{message: () => string}>;
let _rootApp: GlyApp;
let _currentApp: GlyApp | undefined;
let _loadPageApp: GlyApp;
let _errorPageApp: GlyApp;

let [getErrorMessage, setErrorMessage] = createState("Error!");

export function loadPageSystem(std: GlyStd, pages: PagesMap, splashscreen: typeof _loadPage, errorscreen: typeof _errorPage) {
  _std = std;
  _pages = pages;
  _loadPage = splashscreen;
  _errorPage = errorscreen;
  _rootApp = _std.node.spawn(_std.node.load({}));
}

export function goToErrorPage(e: any) {
  _std.log.error(e);
  _std.node.pause(_loadPageApp);
  _std.node.resume(_errorPageApp);
  setErrorMessage(`${e}`);
}

/**
 * @todo two type smells
 */
export async function goToPage<T extends PagePath>(
  path: T,
  params: Normalize<ExtractParams<T>>
) {
  if (!_std || !_pages || !_rootApp) {
    throw new Error("Router not loaded!");
  }

  if (!_errorPageApp) {
    const element = await _errorPage({message: getErrorMessage}, _std);
    _errorPageApp = _std.node.spawn(element);
    _std.node.pause(_errorPageApp);
  }

  if (!_loadPageApp) {
    const element = await _loadPage({}, _std);
    _loadPageApp = _std.node.spawn(element);
  }

  if (_currentApp) {
    _std.node.kill(_currentApp);
    _currentApp = undefined;
  }

  _std.node.resume(_loadPageApp);

  try {
    const component = _pages[path];

    if (!component) {
      throw new Error("Page not found: " + path);
    }

    const element: JSX.Element = await component(params as any, _std);

    // @ts-ignore
    _currentApp = _std.node.spawn(element, _rootApp);

    _std.node.pause(_loadPageApp);
  } catch (e) {
    goToErrorPage(e);
  }
}
