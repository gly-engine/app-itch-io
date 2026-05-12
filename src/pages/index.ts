/**
 * @file pages/index.ts
 * @author RodrigoDornelles
 */
import { CatalogPage } from "./Catalog";
import { ViewPage } from "./View";
import { PlayPage } from "./Play";

export { ErrorPage } from "./Error";
export { SplashScreen } from "./SplashScreen";

export const Pages = {
    "/play": PlayPage,
    "/view": ViewPage,
    "/list": CatalogPage,
};
