import type { GlyApp, GlyStd } from "@gamely/gly-types";
import { Text } from "node_modules/@gamely/acai-jsx/src/basics/text"
import { foo } from "./foo";

export const meta = {
    title: 'itch.gly.sh',
    version: '0.0.1',
    description: 'non-browser client itch-io to play homebrew games with libretro '
}

type CardProps = {
  title: string;
};

const Card = ({title}: CardProps, std: GlyStd) => <node
    hover={() => std.ui.focus()}
    draw={(self: GlyApp) => {
        if (std.ui?.isFocused()) {
            std.draw.color(std.color.red)
        }
        else {
            std.draw.color(std.color.skyblue)
        }
        std.draw.rect(0, 0, 0, 50, 50)
    }}>
    <Text>{title}</Text>
</node>

export const callbacks = {
    load: (_: never, std: GlyStd) => {
        <grid class="1x5" scroll="page">
            <Card title={foo}/>
            <Card title="bar"/>
            <Card title="z"/>
            <Card title="h"/>
            <Card title="zig"/>
            <Card title="zag"/>
            <Card title="zoom"/>
            <Card title="zop"/>
            <Card title="fo123213o"/>
            <Card title="dd"/>
            <Card title="zzz"/>
            <Card title="hzz"/>
            <Card title="zizg"/>
            <Card title="zagzz"/>
            <Card title="zoozzm"/>
            <Card title="zozp"/>
        </grid>
    },
    key: (_: never, std: GlyStd) => {
        if (std.key.press.left) std.ui.focus('left')
        if (std.key.press.right) std.ui.focus('right')
        if (std.key.press.down) std.ui.focus('down')
        if (std.key.press.up) std.ui.focus('up')
    }
}
