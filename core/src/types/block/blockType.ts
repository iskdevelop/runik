// This extracts just the valid block types from the registry
export type BlockType<BlockTypeRegistry extends Record<string, any>> = keyof BlockTypeRegistry & string;