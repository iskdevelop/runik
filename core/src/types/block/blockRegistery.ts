import {Block} from "./block";

// This type maps a registry entry to a properly typed Block
export type BlockFromRegistry<BlockTypeRegistry extends Record<string, any>> = {
  [K in keyof BlockTypeRegistry & string]: Block<K, BlockTypeRegistry[K]>;
}[keyof BlockTypeRegistry & string];

