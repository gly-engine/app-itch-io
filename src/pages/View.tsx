/**
 * @file pages/View.tsx
 * @author RodrigoDornelles
 */
import { createState, Image, Rect, Text, TextBlock } from "node_modules/@gamely/acai-jsx/src";
import { GlyStd } from "@gamely/gly-types";
import { Background, TIC80_COLORS, TIC80_PALETTE } from "src/app/color";
import { http } from "src/app/http";
import { extractCartInfos } from "src/app/scraper";
import { goToPage } from "src/app/router";

type ViewPageProps = {
  cart: number;
}

const Button = (props: { label: string, click: () => unknown }, std: GlyStd) => {
  const [getBackgroundColor, setBackgroundColor] = createState<number>(TIC80_PALETTE.Unfocus)

  return (
    <style width="80%" top="4px" bottom="4px">
      <node
        click={props.click}
        focus={() => setBackgroundColor(TIC80_PALETTE.Focus)}
        unfocus={() => setBackgroundColor(TIC80_PALETTE.Unfocus)}
      >
        <Rect
          backgroundColor={getBackgroundColor}
          borderColor={TIC80_COLORS.White}
        />
        <Text content={props.label} />
      </node>
    </style>
  );
}

export async function ViewPage({ cart }: ViewPageProps, std: GlyStd) {
  const response = await http.get(`/play?cart=${cart}`);
  const content = response.text();
  const info = extractCartInfos(content);

  return <node>
    <Background />
    <item style="tic80-container">
      <node>
        <Rect backgroundColor={TIC80_COLORS.Black} />
        <grid class="1x12" style="tic80-margin-8">
          <Text content={info.title} />
          <grid span={3} class="2x1">
            <Image src={info.image} />
            <grid class="1x3" style="tic80-margin-8">
              <Button label="Play" click={() => goToPage('/play/:cart', {cart: info.download})}/>
              <Button label="Back" click={() => goToPage('/list/:page/:cat/:sort', {page: 0, cat: 0, sort: 0})}/>
            </grid>
          </grid>
          <Text content={`Author: ${info.author}`} align="left" />
          <TextBlock span={3} content={info.description} align="justify" valign="top" />
        </grid>
      </node>
    </item>
  </node>
}
