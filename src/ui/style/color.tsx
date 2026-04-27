import { Rect } from "node_modules/@gamely/acai-jsx/src/basics/index";
import { GlyStd } from "@gamely/gly-types";

export const BackgroundColor = 0x333c57FF;

export const Background = (_: {}, std: GlyStd) => <Rect backgroundColor={BackgroundColor}/>;