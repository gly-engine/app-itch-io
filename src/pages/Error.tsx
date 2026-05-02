/**
 * @file pages/View.tsx
 * @author RodrigoDornelles
 */
import { GlyStd } from "@gamely/gly-types";
import { Background } from "src/app/color";
import { Text } from "node_modules/@gamely/acai-jsx/src/basics";

type ErrorPageProps = {
    message: () => string;
}

export async function ErrorPage(props: ErrorPageProps, std: GlyStd) {
    return <node>
        <Background/>
        <Text content={props.message}/>
    </node>
}