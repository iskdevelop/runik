/**
 * Interface for the editor configuration.
 * This defines the available block types and their renderers.
 * 
 * @template BlockTypeRegistry - A record mapping block type names to their respective data structures.
 */
export interface EditorConfiguration<BlockTypeRegistry extends Record<string, any>> {
  /**
   * A record mapping block type names to their default data structures.
   * These can be used as templates for creating new blocks of each type.
   */
  blockTypes: {
    [K in keyof BlockTypeRegistry]: BlockTypeRegistry[K] | (() => BlockTypeRegistry[K]);
  };

  /**
   * Configuration for visual rendering of blocks.
   */
  visualRenderer: {
    /**
     * A record mapping block type names to renderer functions.
     * Each renderer should convert block data into an HTMLElement.
     */
    renderers: {
      [K in keyof BlockTypeRegistry]?: (data: BlockTypeRegistry[K], context?: any) => HTMLElement;
    };
  };
}
