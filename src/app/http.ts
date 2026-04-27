import { GlyStd } from "@gamely/gly-types";
import { request } from "node_modules/@gamely/acai-jsx/src/runtime/request"

const base_url = "https://tic80.com";

const [http, setHttpConfig] = request();

export function loadHttp(std: GlyStd) {
    setHttpConfig({std, base_url})
}

export { http, base_url };
