import { Rect } from "node_modules/@gamely/acai-jsx/src/basics";
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

export const Theme = {
  background: TIC80_COLORS.DarkGrey,
  surface: TIC80_COLORS.Black,
  surfaceRaised: TIC80_COLORS.Purple,
  surfaceFocus: TIC80_COLORS.DarkBlue,
  border: TIC80_COLORS.Grey,
  borderFocus: TIC80_COLORS.LightBlue,
  accent: TIC80_COLORS.Cyan,
  accentMuted: TIC80_COLORS.Blue,
  danger: TIC80_COLORS.Red,
  warning: TIC80_COLORS.Yellow,
  textPrimary: TIC80_COLORS.White,
  textSecondary: TIC80_COLORS.LightGrey,
  textTertiary: TIC80_COLORS.Grey,
} as const;

export const Background = (_: {}, std: GlyStd) => <Rect backgroundColor={Theme.background}/>;
