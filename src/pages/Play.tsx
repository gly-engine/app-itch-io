import { GlyStd } from "@gamely/gly-types";

declare function native_libretro_url(game: string): void;

export async function PlayPage(props: {cart: string}, std: GlyStd) {

    if (!native_libretro_url) {
        throw new Error("This device not support libretro!")
    }

    native_libretro_url(`libretro+tic80+%${props.cart}`)

    return <node/>
}
