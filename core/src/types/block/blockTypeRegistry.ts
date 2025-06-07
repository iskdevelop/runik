/**
 * BlockTypeRegistry is a mapping of string keys to block type definitions.
 *
 * It serves as a registry where each key represents the name or ID of a block type
 * (e.g., "paragraph", "image", "code"), and the value is the associated configuration
 * or class/functionality for that block.
 *
 * This is used internally in Runik to register and access custom block types.
 *
 * @example
 * const blocks: BlockTypeRegistry = {
 *   paragraph: ParagraphBlock,
 *   image: ImageBlock,
 *   code: CodeBlock
 * };
 */
export type BlockTypeRegistry = {
    [key: string]: any
}
