import {Block} from "../types/block/block";

/**
 * Serializes a block object into a JSON string.
 * This function takes a block object and a block type registry as input,
 * and returns a JSON string representation of the block object.
 * @template BlockType - The type of the block.
 * @template BlockDataType - The structure of the data associated with the block.
 * @param block
 * @param blockTypeRegistry
 */
export function serializeBlock<BlockType, BlockDataType >(
    block: Block<BlockType & string, BlockDataType & Record<string, any> >,
    blockTypeRegistry: Record<BlockType & string, BlockDataType>
): string {
    // Return the JSON string
    return JSON.stringify(block);
}

