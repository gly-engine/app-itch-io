import { createState } from "node_modules/@gamely/acai-jsx/src";
import { Rect } from "node_modules/@gamely/acai-jsx/src/basics";
import { GlyStd } from "@gamely/gly-types";
import { Background, Theme } from "src/app/color";
import { BodyBlock, CaptionText, HeroText } from "src/app/typography";
import { goToHome, goToPage } from "src/app/router";

type ErrorPageProps = {
    message: () => string;
}

function goBackToList() {
    goToHome()
}

function BackButton(_: {}, std: GlyStd) {
    const [getBackgroundColor, setBackgroundColor] = createState<number>(Theme.surfaceFocus);
    const [getBorderColor, setBorderColor] = createState<number>(Theme.borderFocus);

    return <node
        click={goBackToList}
        focus={() => {
            setBackgroundColor(Theme.surfaceFocus);
            setBorderColor(Theme.borderFocus);
        }}
        unfocus={() => {
            setBackgroundColor(Theme.surfaceFocus);
            setBorderColor(Theme.borderFocus);
        }}>
        <Rect backgroundColor={getBackgroundColor} borderColor={getBorderColor}/>
        <CaptionText align="center" color={Theme.textPrimary}>go back</CaptionText>
    </node>;
}

export async function ErrorPage(props: ErrorPageProps, std: GlyStd) {
    return <node
        key={() => {
            if (std.key.press.b || std.key.press.menu) {
                goBackToList();
            }
        }}>
        <Background/>
        <grid class="1x5" style="tic80-container">
            <HeroText color={Theme.danger}>error</HeroText>
            <BodyBlock span={2} align="center">{props.message}</BodyBlock>
            <item style="tic80-margin-8">
                <BackButton />
            </item>
            <CaptionText align="center" color={Theme.accent}>b/menu back</CaptionText>
        </grid>
    </node>
}
