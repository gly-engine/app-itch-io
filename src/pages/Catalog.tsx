import { GlyStd } from "@gamely/gly-types";
import { Image, Rect } from "node_modules/@gamely/acai-jsx/src/basics";
import { createState } from "node_modules/@gamely/acai-jsx/src";
import { base_url, http } from "src/app/http";
import { Background, Theme } from "src/app/color";
import { CaptionBlock, CaptionText, TitleText } from "src/app/typography";
import { goToPage } from "src/app/router";
import { extractCarts } from "src/app/scraper";

type CardProp = {
    cart: string;
    title: string;
    description: string;
    author: string;
    image: string;
}

type CatalogPageProps = {
    sort: number;
    page: number;
    cat: number;
}

function HeaderBar(props: CatalogPageProps, std: GlyStd) {
    const page = props.page + 1;

    return <node>
        <Rect backgroundColor={Theme.surface} borderColor={Theme.border} />
        <grid class="3x1" style="tic80-margin-8">
            <CaptionText color={Theme.accent}>tic80 cartridges</CaptionText>
            <CaptionText align="center">sort: trending</CaptionText>
            <CaptionText align="right" color={Theme.accent}>{`page ${page}`}</CaptionText>
        </grid>
    </node>;
}

function FooterHints(_: {}, std: GlyStd) {
    return <node>
        <Rect backgroundColor={Theme.surface} />
        <grid class="4x1" style="tic80-margin-8">
            <CaptionText color={Theme.accent}>a open</CaptionText>
            <CaptionText>↑↓←→ move</CaptionText>
            <CaptionText>l/r page</CaptionText>
            <CaptionText align="right">select filters</CaptionText>
        </grid>
    </node>;
}

export function Card({ cart, image, title, description, author }: CardProp, std: GlyStd) {
    const [getBackgroundColor, setBackgroundColor] = createState<number>(Theme.surface);
    const [getBorderColor, setBorderColor] = createState<number>(Theme.border);

    return (
        <item id={`cart-${cart}`} style="tic80-cart">
            <node
                click={() => goToPage('/view', { cart: Number(cart) })}
                focus={() => {
                    setBackgroundColor(Theme.surfaceFocus);
                    setBorderColor(Theme.borderFocus);
                }}
                unfocus={() => {
                    setBackgroundColor(Theme.surface);
                    setBorderColor(Theme.border);
                }}>
                <Rect backgroundColor={getBackgroundColor} borderColor={getBorderColor} />
                <grid class="1x16" style="tic80-margin-6">
                    <Image span={12} src={image} align="center" valign="top" />
                    <TitleText>{title.toUpperCase()}</TitleText>
                    <CaptionText color={Theme.textSecondary}>{`by ${author}`}</CaptionText>
                    <CaptionBlock span={2}>{description}</CaptionBlock>
                </grid>
            </node>
        </item>
    );
}

export async function CatalogPage(props: CatalogPageProps, std: GlyStd) {
    const response = await http.get('/play');
    const content = response.text();
    const carts = extractCarts(content);

    return (
        <node>
            <Background />
            <grid class="1x12" style="tic80-container">
                <HeaderBar {...props} />
                <grid span={10} class="2x2" scroll="page" style="tic80-margin-4">
                    {...carts.map(cart => <Card {...cart} image={cart.image} />)}
                </grid>
                <FooterHints />
            </grid>
        </node>
    );
}
