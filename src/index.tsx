import type { GlyStd } from "@gamely/gly-types";
import { Text } from "@gamely/acai-jsx/basics/text"

export const meta = {
    title: 'Pong',
    version: '0.1.1',
    description: 'simple pong game write in typescript + gly engine'
}

export const callbacks = {
    load: (_: never, std: GlyStd) => {
        <Text>Ola</Text>
    }
}