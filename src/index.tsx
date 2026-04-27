import type { GlyApp, GlyStd } from "@gamely/gly-types";
import { Card } from "./ui/components/card";
import { Stylesheet } from "./ui/style/classes";
import { Background } from "./ui/style/color";
import { Cart, extractCarts, vendorizedHTML } from "./app";

export const meta = {
    title: 'tic80.gly.sh',
    version: '0.0.1',
    description: 'A standalone client for tic80.com that runs anywhere - including homebrew consoles.'
}

export const callbacks = {
    load: (_: never, std: GlyStd) => {
        Stylesheet(std);
        
        const carts = extractCarts(vendorizedHTML);

        <Background/>;
        <grid class="2x2" scroll="page" style="tic80-container">
            {...carts.map(cart => <Card {...cart} image={`https://tic80.com/${cart.image}`}/>)}
        </grid>;
    },
    key: (_: never, std: GlyStd) => {
        if (std.key.press.left) std.ui.focus('left')
        if (std.key.press.right) std.ui.focus('right')
        if (std.key.press.down) std.ui.focus('down')
        if (std.key.press.up) std.ui.focus('up')
    }
}
