import type { GlyStd } from "@gamely/gly-types"
import type { Pages } from "../pages"
import { createRouter } from "./acai_router"

const [router, setRouter] = createRouter<typeof Pages>();

export const goToPage = router.go;

export const goToHome = router.home;

export const backPage = router.back;

export const resetPage = router.reset;

export const replacePage = router.replace;

export const getCurrentPage = router.current;

type AnyPageFn = (props: any, std: GlyStd) => JSX.Element | Promise<JSX.Element>;

export function loadPages(
  std: GlyStd,
  pages: typeof Pages,
  errorPage: AnyPageFn,
  splashPage: AnyPageFn,
) {
  setRouter({ std, unload_images: true });
  
  router.registerAll(pages);
  router.register('@error', errorPage);
  router.register('@splash', splashPage);
}
