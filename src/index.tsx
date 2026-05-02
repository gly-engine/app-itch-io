import type { GlyStd } from "@gamely/gly-types";
import { loadStylesheet } from "./app/stylesheet";
import { loadHttp } from "./app/http"
import { loadPageSystem, goToPage } from "./app/router"
import { Pages } from "./pages";

export const meta = {
    title: 'tic80.gly.sh',
    version: '0.0.1',
    description: 'A standalone client for tic80.com that runs anywhere - including homebrew consoles.'
}

export const config = {
    require: 'http'
}

export const callbacks = {
    load: (_: never, std: GlyStd) => {
        loadHttp(std);
        loadStylesheet(std);
        loadPageSystem(std, Pages, Pages['/splashscreen'], Pages['/error']);

        goToPage("/list/:page/:cat/:sort", {page: 0, cat: 0, sort: 0});
    },
    key: (_: never, std: GlyStd) => {
        if (std.key.press.left) std.ui.focus('left')
        if (std.key.press.right) std.ui.focus('right')
        if (std.key.press.down) std.ui.focus('down')
        if (std.key.press.up) std.ui.focus('up')
    }
}
