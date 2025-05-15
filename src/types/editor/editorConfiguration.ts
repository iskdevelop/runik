/**
 * Configuration for the Editor
 * 
 * @template BlockTypeRegistry - A record mapping block type names to their respective data structures
 */
export interface EditorConfiguration<BlockTypeRegistry extends Record<string, any>> {
  /**
   * A record mapping block type names to their default data structures.
   * These can be used as templates for creating new blocks of each type.
   */
  blockTypes?: {
    [K in keyof BlockTypeRegistry]: BlockTypeRegistry[K] | (() => BlockTypeRegistry[K]);
  };

  /**
   * Configuration for visual rendering of blocks.
   * This is the new recommended way to configure renderers.
   */
  visualRenderer?: {
    /**
     * A record mapping block type names to renderer functions.
     * Each renderer should convert block data into an HTMLElement.
     */
    renderers: {
      [K in keyof BlockTypeRegistry]?: (data: BlockTypeRegistry[K], context?: any) => HTMLElement;
    };
  };

  /**
   * Legacy map of renderers for each block type.
   * @deprecated Use visualRenderer.renderers instead.
   */
  renderers?: {
    [K in keyof BlockTypeRegistry]: (data: BlockTypeRegistry[K]) => HTMLElement;
  };

  /**
   * Optional configuration for validation of block data
   */
  validators?: {
    [K in keyof BlockTypeRegistry]?: (data: BlockTypeRegistry[K]) => boolean;
  };

  /**
   * Optional default values for each block type
   */
  defaultValues?: {
    [K in keyof BlockTypeRegistry]?: Partial<BlockTypeRegistry[K]>;
  };

  /**
   * Optional plugins to extend editor functionality
   */
  plugins?: Array<EditorPlugin<BlockTypeRegistry>>;
}

/**
 * Interface for editor plugins
 */
export interface EditorPlugin<BlockTypeRegistry extends Record<string, any>> {
  /**
   * Name of the plugin
   */
  name: string;

  /**
   * Initialize the plugin
   */
  initialize?: (editor: any) => void;

  /**
   * Clean up when the plugin is removed
   */
  cleanup?: () => void;

  /**
   * Hook to modify blocks before they are rendered
   */
  beforeRender?: (blocks: Array<{
    type: keyof BlockTypeRegistry;
    data: BlockTypeRegistry[keyof BlockTypeRegistry];
  }>) => Array<{
    type: keyof BlockTypeRegistry;
    data: BlockTypeRegistry[keyof BlockTypeRegistry];
  }>;

  /**
   * Hook to modify the rendered HTML after blocks are rendered
   */
  afterRender?: (container: HTMLElement) => HTMLElement;
}