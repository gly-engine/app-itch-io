/**
 * @file pages/index.ts
 * @author RodrigoDornelles
 */
import { SplashScreen } from "./SplashScreen";
import { CatalogPage } from "./Catalog";
import { ViewPage } from "./View";
import { ErrorPage } from "./Error";
import { PlayPage } from "./Play";

export const Pages = {
    "/error": ErrorPage,
    "/splashscreen": SplashScreen,
    "/play/:cart": PlayPage,
    "/view/:cart": ViewPage,
    "/list/:page/:cat/:sort": CatalogPage,
};
