/**
 * @file pages/index.ts
 * @author RodrigoDornelles
 */
import { SplashScreen } from "./SplashScreen";
import { CatalogPage } from "./Catalog";
import { ViewPage } from "./View";
import { ErrorPage } from "./Error";

export const Pages = {
    "/error": ErrorPage,
    "/splashscreen": SplashScreen,
    "/view/:cart": ViewPage,
    "/list/:page/:cat/:sort": CatalogPage,
};
