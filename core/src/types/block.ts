export interface Block<BlockType extends string = string, BlockDataType = any> {
  type: BlockType;
  data: BlockDataType;
}



