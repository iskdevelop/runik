import {BlockFromRegistry} from "./blockRegistery";

/**
 * Extracts the valid block type names from a block type registry.
 * 
 * @template BlockTypeRegistry - A record mapping block type names to their respective data structures.
 * @example
 * type MyRegistry = { text: { content: string }, image: { url: string, alt: string } };
 * type MyBlockTypes = BlockType<MyRegistry>;
 * // MyBlockTypes is equivalent to: "text" | "image"
 */
export type BlockType<BlockTypeRegistry extends Record<string, any>> = keyof BlockTypeRegistry & string;
