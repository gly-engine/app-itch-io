declare namespace HTML {
  type HTMLChild = HTMLNode | string;

  interface HTMLCondition {
    name?: string | null;
    id?: string | null;
    class?: string | null;
  }

  interface HTMLNode {
    name: string;
    attr: Record<string, string | boolean>;
    class: string[];
    child: HTMLChild[];

    value(buffer: string[]): void;
    text(): string;

    match(cond: HTMLCondition): boolean;

    select(selector: string): HTMLNode[];
    selectn(selector: string, level: number): HTMLNode[];
  }

  function parse(str: string): LuaMultiReturn<[HTMLNode, undefined] | [null, string]>;
}

export = HTML;