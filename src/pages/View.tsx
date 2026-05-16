import { createState } from "node_modules/@gamely/acai-jsx/src";
import { Image, Rect } from "node_modules/@gamely/acai-jsx/src/basics";
import { GlyStd } from "@gamely/gly-types";
import { Background, Theme } from "src/app/color";
import { BodyBlock, CaptionBlock, CaptionText, HeroText } from "src/app/typography";
import { http } from "src/app/http";
import { extractCartInfos } from "src/app/scraper";
import { backPage, goToPage } from "src/app/router";

type ViewPageProps = {
  cart: number;
}

const Button = (props: { label: string, click: () => unknown }, std: GlyStd) => {
  const [getBackgroundColor, setBackgroundColor] = createState<number>(Theme.surface);
  const [getBorderColor, setBorderColor] = createState<number>(Theme.border);

  return (
    <node
      click={props.click}
      focus={() => {
        setBackgroundColor(Theme.surfaceFocus);
        setBorderColor(Theme.borderFocus);
      }}
      unfocus={() => {
        setBackgroundColor(Theme.surface);
        setBorderColor(Theme.border);
      }}
    >
      <Rect backgroundColor={getBackgroundColor} borderColor={getBorderColor} />
      <CaptionText align="center" color={Theme.textPrimary}>{props.label}</CaptionText>
    </node>
  );
}

export async function ViewPage({ cart }: ViewPageProps, std: GlyStd) {
  const response = await http.get(`/play?cart=${cart}`);
  const content = response.text();
  const info = extractCartInfos(content);
  const hasDescription = info.description.trim().length > 0;
  const description = hasDescription ? info.description : "description empty...";

  return <node>
    <Background />
    <grid class="1x12" style="tic80-container">
      <CaptionText align="center" color={Theme.accent}>cartridge details</CaptionText>
      <HeroText span={2}>{info.title}</HeroText>
      <CaptionText align="center" color={Theme.textSecondary}>{`by ${info.author}`}</CaptionText>
      <item span={4} style="tic80-margin-8">
        <node>
          <Rect backgroundColor={Theme.surface} borderColor={Theme.border}/>
          <grid class="2x1" style="tic80-margin-8">
            <Image src={info.image} />
            <grid class="1x4" style="tic80-margin-8">
              <Button label="play" click={() => goToPage('/play', {cart: info.download})}/>
              <Button label="back" click={() => backPage()}/>
              <CaptionBlock>tic-80 cart from tic80.com</CaptionBlock>
              <CaptionText color={Theme.accent}>a select · b back</CaptionText>
            </grid>
          </grid>
        </node>
      </item>
      <item span={4} style="tic80-margin-8">
        <node>
          <Rect backgroundColor={Theme.surface} borderColor={Theme.border}/>
          <grid class="1x5" style="tic80-margin-8">
            <CaptionText color={Theme.accent}>description</CaptionText>
            <BodyBlock span={4} color={hasDescription ? Theme.textSecondary : Theme.textTertiary}>{description}</BodyBlock>
          </grid>
        </node>
      </item>
    </grid>
  </node>
}
