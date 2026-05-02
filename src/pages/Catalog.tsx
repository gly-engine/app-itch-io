import { GlyStd } from "@gamely/gly-types";
import * as HTML from "../thirdy-party/findstr_htmldom"
import { Image, Text, TextBlock } from "node_modules/@gamely/acai-jsx/src/basics";
import { base_url, http } from "src/app/http";
import { Background } from "src/app/color";

type CardProp = {
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

export type Cart = {
    title: string;
    description: string;
    author: string;
    image: string;
};

export function extractCarts(html: string): Cart[] {
    const [root, err] = HTML.parse(html);
    if (!root) {
        throw new Error(err);
    }

    const carts = root.select(".cart");
    const results: Cart[] = [];

    for (const cart of carts) {
        const titleNode = cart.select("h2")[0];
        const title = titleNode?.text() ?? null;

        const texts = cart.select(".text-muted");
        const description = texts[0]?.text() ?? null;
        const author = texts[1]?.text() ?? null;

        const thumb = cart.select(".thumbnail")[0];
        const imgNode = thumb?.select("img")[0];
        const image = imgNode?.attr?.src as string ?? null;

        results.push({
            title,
            description,
            author,
            image,
        });
    }

    return results;
}

export function Card(props: CardProp, std: GlyStd) {
    return (
        <style width={240} height={240}>
            <grid class="1x7">
                <item span={4}>
                    <Image src={props.image} />
                </item>
                <Text font_size={24} align={"left"}>{props.title}</Text>
                <TextBlock span={2} align={"justify"}>{props.description}</TextBlock>
            </grid>
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
