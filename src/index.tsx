import type { GlyStd, GlyStdWithHttpResponse } from "@gamely/gly-types";
import { Card } from "./ui/components/card";
import { loadStylesheet } from "./ui/style/classes";
import { Background } from "./ui/style/color";
import { extractCarts } from "./app";
import { http, loadHttp, base_url } from "./app/http"

export const meta = {
    title: 'tic80.gly.sh',
    version: '0.0.1',
    description: 'A standalone client for tic80.com that runs anywhere - including homebrew consoles.'
}

export const config = {
    require: 'http'
}

export const callbacks = {
    load: async (_: never, std: GlyStd) => {
        loadHttp(std);
        loadStylesheet(std);

        const response = await http.get('/play');
        const content = response.text();
        const carts = extractCarts(content);

        <Background />;
        <grid class="2x2" scroll="page" style="tic80-container">
            {...carts.map(cart => <Card {...cart} image={`${base_url}/${cart.image}`} />)}
        </grid>;
    },
    key: (_: never, std: GlyStd) => {
        if (std.key.press.left) std.ui.focus('left')
        if (std.key.press.right) std.ui.focus('right')
        if (std.key.press.down) std.ui.focus('down')
        if (std.key.press.up) std.ui.focus('up')
    }
}
