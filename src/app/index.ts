import * as HTML from "./thirdy-party/findstr_htmldom"

export const vendorizedHTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>tuamae</title>
</head>
<div class="row">

<div class="col-md-4"><div class="cart">
	<div class="thumbnail">
		<a href="/play?cart=2868"><img class="pixelated" width="100%" src="/cart/0ee3fd20461b4f87879aa8fcd959d3a8/cover.gif" alt="..."></a>
	</div>
	<div>

		<h2>LABYRINTH</h2>
		<div class="text-muted">Come back home</div>
		<div class="text-muted">by altamarino</div>
		
		<div>
		
			<img width="16" height="16" src="/img/love.png"> <span class="tiny-label">13</span>
		

		
			<img width="16" height="16" src="/img/comment.png"> <span class="tiny-label">1</span>
		
		</div>

		
	</div>		
</div>
</div><div class="col-md-4"><div class="cart">
	<div class="thumbnail">
		<a href="/play?cart=3926"><img class="pixelated" width="100%" src="/cart/93790cc5685bf3936172488191819b60/cover.gif" alt="..."></a>
	</div>
	<div>

		<h2>BLUEYVANIA</h2>
		<div class="text-muted">A passion project based on the Bluey TV show. Has elements from games like Metroid and Zelda.</div>
		<div class="text-muted">by fizzii01, Chunk (debugging/playtesting)</div>
		
		<div>
		
			<img width="16" height="16" src="/img/love.png"> <span class="tiny-label">8</span>
		

		
			<img width="16" height="16" src="/img/comment.png"> <span class="tiny-label">20</span>
		
		</div>

		
	</div>		
</div>
</div><div class="col-md-4"><div class="cart">
	<div class="thumbnail">
		<a href="/play?cart=4610"><img class="pixelated" width="100%" src="/cart/72cbd396ca21f2e1362bce593784c643/cover.gif" alt="..."></a>
	</div>
	<div>

		<h2>SHOCKINGLY NEGATIVE</h2>
		<div class="text-muted">Vent your frustrations on those pesky atoms and steal their electrons.</div>
		<div class="text-muted">by Samah</div>
		
		<div>
		
			<img width="16" height="16" src="/img/love.png"> <span class="tiny-label">6</span>
		

		
			<img width="16" height="16" src="/img/comment.png"> <span class="tiny-label">1</span>
		
		</div>

		
	</div>		
</div>
</div></div><div class="row"><div class="col-md-4"><div class="cart">
	<div class="thumbnail">
		<a href="/play?cart=4365"><img class="pixelated" width="100%" src="/cart/91c5b1f7344cbf6465f804eedec9b8dd/cover.gif" alt="..."></a>
	</div>
	<div>

		<h2>RETRO GUNNER (VERSION 1.02)</h2>
		<div class="text-muted">Shoot&#39;em up.</div>
		<div class="text-muted">by ZAP</div>
		
		<div>
		
			<img width="16" height="16" src="/img/love.png"> <span class="tiny-label">5</span>
		

		
			<img width="16" height="16" src="/img/comment.png"> <span class="tiny-label">5</span>
		
		</div>

		
	</div>		
</div>
</html>
`

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