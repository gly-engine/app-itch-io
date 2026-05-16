import { createTimer } from "node_modules/@gamely/acai-jsx/src";
import { GlyStd } from "@gamely/gly-types";

const [timer, setTimer] = createTimer()

export const sleep = timer.sleep

export function loadTimers(std: GlyStd) {
    setTimer({std});
}
