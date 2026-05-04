import { Rect } from "node_modules/@gamely/acai-jsx/src/basics/index";
import { GlyStd } from "@gamely/gly-types";

export const TIC80_COLORS = {
  Black: 0x1A1C2CFF,
  Purple: 0x5D275DFF,
  Red: 0xB13E53FF,
  Orange: 0xEF7D57FF,
  Yellow: 0xFFCD75FF,
  LightGreen: 0xA7F070FF,
  Green: 0x38B764FF,
  DarkGreen: 0x257179FF,
  DarkBlue: 0x29366FFF,
  Blue: 0x3B5DC9FF,
  LightBlue: 0x41A6F6FF,
  Cyan: 0x73EFF7FF,
  White: 0xF4F4F4FF,
  LightGrey: 0x94B0C2FF,
  Grey: 0x566C86FF,
  DarkGrey: 0x333C57FF
} as const;

export const TIC80_PALETTE = {
  Focus: TIC80_COLORS.Grey,
  Unfocus: TIC80_COLORS.Black,
} as const;

export const BackgroundColor = TIC80_COLORS.DarkGrey;

export const Background = (_: {}, std: GlyStd) => <Rect backgroundColor={BackgroundColor}/>;
