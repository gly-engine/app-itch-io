import { GlyStd } from "@gamely/gly-types";
import { Image, Rect, Text, TextBlock } from "node_modules/@gamely/acai-jsx/src/basics";
import { base_url, http } from "src/app/http";
import { Background, TIC80_PALETTE } from "src/app/color";
import { goToPage } from "src/app/router";
import { createState } from "node_modules/@gamely/acai-jsx/src";
import { extractCarts } from "src/app/scraper";

type CardProp = {
    cart: string;
    title: string;
    description: string;
    author: string;
    image: string;
}

type CatalogPageProps = {
    sort: `${number}`;
    page: `${number}`;
    cat: `${number}`;
}

export function Card({cart, image, title, description}: CardProp, std: GlyStd) {
    const [getBackgroundColor, setBackgroundColor] = createState<number>(TIC80_PALETTE.Unfocus)

    return (
        <style width={240} height={240}>
            <node
            click={() => goToPage('/view/:cart', {cart})}
            focus={() => setBackgroundColor(TIC80_PALETTE.Focus)}
            unfocus={() => setBackgroundColor(TIC80_PALETTE.Unfocus)}>
                <Rect backgroundColor={getBackgroundColor}/>
                <grid class="1x7" style="tic80-margin-2">
                    <item span={4}>
                        <Image src={image} />
                    </item>
                    <Text font_size={24} align={"left"}>{title}</Text>
                    <TextBlock span={2} align={"justify"}>{description}</TextBlock>
                </grid>
            </node>
        </style>
    );
}

export async function CatalogPage(props: CatalogPageProps, std: GlyStd) {
    const response = await http.get('/play');
    const content = response.text();
    const carts = extractCarts(content);

    return <node>
        <Background />
        <grid class="2x2" scroll="page" style="tic80-container">
            {...carts.map(cart => <Card {...cart} image={`${base_url}/${cart.image}`} />)}
        </grid>
    </node>;
}
