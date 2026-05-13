import { GlyStd } from "@gamely/gly-types";
import { Background, Theme } from "src/app/color";
import { HeroText, CaptionText } from "src/app/typography";

export function SplashScreen(props: {}, std: GlyStd) {
    return <node>
        <Background/>
        <grid class="1x3" style="tic80-container">
            <CaptionText align="center" color={Theme.accent}>tic80.com</CaptionText>
            <HeroText>loading</HeroText>
            <CaptionText align="center">fetching cartridges...</CaptionText>
        </grid>
    </node>
}
