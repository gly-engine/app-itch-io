/**
 * @file app/scrapper.ts
 * @author RodrigoDornelles
 */
import * as HTML from "../thirdy-party/findstr_htmldom"
import { base_url } from "./http";

type Cart = {
    cart: string,
    title: string;
    description: string;
    author: string;
    image: string;
};

type CartInfos = {
    title: string;
    author: string;
    description: string;
    download: string;
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
        const image = `${base_url}/${imgNode?.attr?.src}`;

        const link = thumb?.select("a")[0];
        const url = link?.attr?.href as string ?? null;
        const id = url.replace('/play?cart=', '');

        results.push({
            cart: id,
            title,
            description,
            author,
            image,
        });
    }

    return results;
}

/**
 * @todo correct extract @c description
 */
export function extractCartInfos(html: string): CartInfos {
    const [root, err] = HTML.parse(html);
    if (!root) throw new Error(err);

    const container = root.select(".container").find(el => el.select("h1")?.length > 0)!;
    const h1 = container.select("h1")[0];
    const a = container.select("a");

    const title = `${h1?.text()?.split(">")?.pop()?.trim()}`;
    const author = `${a[1]?.text()}`;
    const download = `${base_url}/${a[2]?.attr?.href}`;
    const image = `${base_url}/${container.select("img")[0]?.attr?.src}`;
    const description = `${container.select("div")[2]?.text()}`;

    return {
        title, description, author, download, image
    }
}
