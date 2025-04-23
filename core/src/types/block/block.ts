
/**
 * Represents a block with a specific type and associated data.
 * 
 * @template BlockType - The type of the block (e.g., "text", "image").
 * @template BlockDataType - The structure of the data associated with the block.
 */
export interface Block<BlockType extends string = string, BlockDataType = any> {
  /**
   * The type of the block.
   */
  type: BlockType;

  /**
   * The data associated with the block.
   */
  data: BlockDataType;
}
