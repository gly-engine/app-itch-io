import type { GlyApp, GlyStd } from "@gamely/gly-types";
import { Text } from "@gamely/acai-jsx/basics/text"

export const meta = {
    title: 'itch.gly.sh',
    version: '0.0.1',
    description: 'non-browser client itch-io to play homebrew games with libretro '
}

const Card = ({title}, std: GlyStd) => <node
    // @ts-ignore
    hover={() => std.ui.focus()}
    draw={(self: GlyApp) => {
        // @ts-ignore
        if (std.ui?.isFocused()) {
            std.draw.color(std.color.red)
        }
        else {
            std.draw.color(std.color.skyblue)
        }
        // data.width works?
        std.draw.rect(0, 0, 0, 50, 50)
    }}>
    <Text>{title}</Text>
</node>

export const callbacks = {
    load: (_: never, std: GlyStd) => {
        <slide class="1x5">
            <Card title="foo"/>
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
        </slide>
    },
    key: (_: never, std: GlyStd) => {
        // @ts-ignore
        if (std.key.press.left) std.ui.focus('left')
        // @ts-ignore
        if (std.key.press.right) std.ui.focus('right')
        // @ts-ignore
        if (std.key.press.down) std.ui.focus('down')
        // @ts-ignore
        if (std.key.press.up) std.ui.focus('up')
    }
}