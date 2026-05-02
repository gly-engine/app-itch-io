/**
 * @file pages/View.tsx
 * @author RodrigoDornelles
 */
import { GlyStd } from "@gamely/gly-types";
import { Background } from "src/app/color";
import { Text } from "node_modules/@gamely/acai-jsx/src/basics";

export async function SplashScreen(props: {}, std: GlyStd) {
    return <node>
        <Background/>
        <Text content="loading..."/>
    </node>
}