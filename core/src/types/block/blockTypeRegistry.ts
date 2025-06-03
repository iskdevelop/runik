/**
 * Registry that holds block types and their associated data models.
 * Each key represents a unique block type identifier, and the value contains
 * the corresponding data structure or configuration for that block type.
 * 
 * @example
 * const blockTypes: BlockTypeRegistry = {
 *   paragraph: { text: string, formatting: object },
 *   image: { src: string, alt: string, width: number },
 *   button: { label: string, onClick: Function }
 * }
 */
export type BlockTypeRegistry = {
    [key: string]: any
}

