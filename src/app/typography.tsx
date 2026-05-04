import { GlyStd } from "@gamely/gly-types";
import { Text, TextBlock } from "node_modules/@gamely/acai-jsx/src";
import { Theme } from "./color";

export const Fonts = {
  regular: "Silkscreen",
  bold: "SilkscreenBold",
} as const;

type Align = "left" | "right" | "center";
type VAlign = "top" | "middle" | "bottom";
type TextProps = {
  children: string | (() => string);
  color?: number | (() => number);
  span?: number;
  style?: string;
  align?: Align;
  valign?: VAlign;
};

type BlockProps = TextProps & {
  line_height?: number;
  scroll?: number | (() => number);
  align?: "left" | "right" | "center" | "justify";
};

export function HeroText(props: TextProps, std: GlyStd) {
  return <Text
    font_name={Fonts.bold}
    font_size={24}
    color={props.color ?? Theme.textPrimary}
    span={props.span}
    style={props.style}
    align={props.align ?? "center"}
    valign={props.valign ?? "middle"}
  >{props.children}</Text>;
}

export function TitleText(props: TextProps, std: GlyStd) {
  return <Text
    font_name={Fonts.bold}
    font_size={14}
    color={props.color ?? Theme.textPrimary}
    span={props.span}
    style={props.style}
    align={props.align ?? "left"}
    valign={props.valign ?? "middle"}
  >{props.children}</Text>;
}

export function BodyText(props: TextProps, std: GlyStd) {
  return <Text
    font_name={Fonts.regular}
    font_size={12}
    color={props.color ?? Theme.textSecondary}
    span={props.span}
    style={props.style}
    align={props.align ?? "left"}
    valign={props.valign ?? "middle"}
  >{props.children}</Text>;
}

export function CaptionText(props: TextProps, std: GlyStd) {
  return <Text
    font_name={Fonts.regular}
    font_size={10}
    color={props.color ?? Theme.textTertiary}
    span={props.span}
    style={props.style}
    align={props.align ?? "left"}
    valign={props.valign ?? "middle"}
  >{props.children}</Text>;
}

export function BodyBlock(props: BlockProps, std: GlyStd) {
  return <TextBlock
    font_name={Fonts.regular}
    font_size={12}
    line_height={props.line_height ?? 15}
    color={props.color ?? Theme.textSecondary}
    span={props.span}
    style={props.style}
    scroll={props.scroll ?? 1}
    align={props.align ?? "justify"}
    valign={props.valign ?? "top"}
  >{props.children}</TextBlock>;
}

export function CaptionBlock(props: BlockProps, std: GlyStd) {
  return <TextBlock
    font_name={Fonts.regular}
    font_size={10}
    line_height={props.line_height ?? 12}
    color={props.color ?? Theme.textTertiary}
    span={props.span}
    style={props.style}
    scroll={props.scroll ?? 1}
    align={props.align ?? "left"}
    valign={props.valign ?? "top"}
  >{props.children}</TextBlock>;
}
