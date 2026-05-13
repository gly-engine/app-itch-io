import { AcaiRouterPageError, AcaiRouterPageSplash, createRouter } from "node_modules/@gamely/acai-jsx/src/runtime/router"
import type { GlyStd } from "@gamely/gly-types"
import type { Pages } from "../pages"

const [router, setRouter] = createRouter<typeof Pages>();

export const goToPage = router.go;

export const goToHome = router.home;

export const backPage = router.back;

export const resetPage = router.reset;

export const replacePage = router.replace;

export const getCurrentPage = router.current;

export function loadPages(
  std: GlyStd,
  pages: typeof Pages,
  errorPage: AcaiRouterPageError,
  splashPage: AcaiRouterPageSplash,
) {
  setRouter({ std, unload_images: true });
  
  router.registerAll(pages);
  router.register('@error', errorPage);
  router.register('@splash', splashPage);
}
