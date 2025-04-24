import { Block } from "./block";

/**
 * Maps a block type registry to a union of `Block` types.
 * 
 * @template BlockTypeRegistry - A record mapping block type names to their respective data structures.
 * @example
 * type MyRegistry = { text: { content: string }, image: { url: string, alt: string } };
 * type MyBlocks = BlockFromRegistry<MyRegistry>;
 * // MyBlocks is equivalent to: Block<"text", { content: string }> | Block<"image", { url: string, alt: string }>
 */
export type BlockFromRegistry<BlockTypeRegistry extends Record<string, any>> = {
  [K in keyof BlockTypeRegistry & string]: Block<K, BlockTypeRegistry[K]>;
}[keyof BlockTypeRegistry & string];


