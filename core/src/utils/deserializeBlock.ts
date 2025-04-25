import {Block} from "../types/block/block";

/**
 * Deserializes a JSON string into a block object.
 * This function takes a JSON string and a block type registry as input,
 * and returns a block object of the specified type.
 * @template BlockType - The type of the block.
 * @template BlockDataType - The structure of the data associated with the block.
 * @param jsonString - The JSON string to deserialize.
 * @param blockTypeRegistry - The registry of block types.
 * @returns {Block<BlockType & string, BlockDataType & Record<string, any>>} - The deserialized block object.
 */
export function deserializeBlock<BlockType, BlockDataType>(
    jsonString: string,
    blockTypeRegistry: Record<BlockType & string, BlockDataType>
): Block<BlockType & string, BlockDataType & Record<string, any>> {


    // Return the block object
    return JSON.parse(jsonString) as Block<BlockType & string, BlockDataType & Record<string, any>>;
}