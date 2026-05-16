import { createState } from "node_modules/@gamely/acai-jsx/src";
import { GlyStd } from "@gamely/gly-types";
import { Background, Theme } from "src/app/color";
import { CaptionText } from "src/app/typography";
import { sleep } from "src/app/timers";

declare function native_libretro_url(game: string): void;

export function *PlayPage(props: {cart: string}, std: GlyStd) {
    if (!native_libretro_url) {
        throw new Error("This device not support libretro!");
    }

    native_libretro_url(`libretro+tic80+${props.cart}`)

    const [getText, setText] = createState('Preparing your game');

    yield <node>
        <Background/>
        <grid class="1x3" style="tic80-container">
            <CaptionText align="center" color={Theme.accent}>tic80.com</CaptionText>
            <CaptionText align="center">{getText}</CaptionText>
        </grid>
    </node>;

    yield async () => {
        await sleep(700);
        setText(text => `${text}.`);
        await sleep(700);
        setText(text => `${text}.`);
        await sleep(700);
        setText(text => `${text}.`);
        await sleep(700);
    }

    return <node/>
}
