import { GlyStd } from "@gamely/gly-types";
import { Image, Text, TextBlock } from "node_modules/@gamely/acai-jsx/src/basics";

type cardProps = {
    title: string;
    description: string;
    author: string;
    image: string;
}

export function Card(props: cardProps, std: GlyStd) {
    return (
        <style width={240} height={240}>
            <grid class="1x7">
                <item span={4}>
                    <Image src={props.image}/>
                </item>
                <Text font_size={24} align={"left"}>{props.title}</Text>
                <TextBlock span={2} align={"justify"}>{props.description}</TextBlock>
            </grid>
        </style>
    );
}