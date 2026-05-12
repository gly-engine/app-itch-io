import type { GlyStd } from "@gamely/gly-types";
import { loadStylesheet } from "./app/stylesheet";
import { loadHttp } from "./app/http"
import { loadPages, goToPage } from "./app/router"
import { Pages, ErrorPage, SplashScreen } from "./pages";

export const meta = {
    title: 'tic80.com',
    version: '0.0.1',
    description: 'A standalone client for tic80.com that runs anywhere - including homebrew consoles.'
}

export const fonts = [
    'Silkscreen:https://fonts.gstatic.com/s/silkscreen/v6/m8JXjfVPf62XiF7kO-i9ULQ.ttf',
    'SilkscreenBold:https://fonts.gstatic.com/s/silkscreen/v6/m8JUjfVPf62XiF7kO-i9aAhATms.ttf',
]

export const config = {
    require: 'http'
}

export const callbacks = {
    load: (_: never, std: GlyStd) => {
        loadHttp(std);
        loadStylesheet(std);
        loadPages(std, Pages, ErrorPage, SplashScreen);

        goToPage("/list", {page: 0, cat: 0, sort: 0}).then(/*() => std.ui.focus('.tic80-cart') */);
        //goToPage("/play",  {cart: 'a'}).then(/*() => std.ui.focus('.tic80-cart') */);
    },
    key: (_: never, std: GlyStd) => {
        if (std.key.press.left) std.ui.focus('left')
        if (std.key.press.right) std.ui.focus('right')
        if (std.key.press.down) std.ui.focus('down')
        if (std.key.press.up) std.ui.focus('up')
        if (std.key.press.a) std.ui.press()
    }
}
