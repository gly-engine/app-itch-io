import * as HTML from "./thirdy-party/findstr_htmldom"

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