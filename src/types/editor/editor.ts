import { EditorConfiguration } from './editorConfiguration';

/**
 * Core Editor class that maintains the content blocks and renders them.
 * The Editor class is the main component of the Runik editor system.
 * 
 * @template BlockTypeRegistry - A record mapping block type names to their respective data structures
 */
export class Editor<BlockTypeRegistry extends Record<string, any>> {
  /**
   * Array of blocks in the editor
   */
  private blocks: Array<{
    type: keyof BlockTypeRegistry;
    data: BlockTypeRegistry[keyof BlockTypeRegistry];
  }> = [];

  /**
   * Editor configuration
   */
  private configuration: EditorConfiguration<BlockTypeRegistry>;

  /**
   * Creates a new Editor instance
   * 
   * @param configuration - The configuration for the editor
   */
  constructor(configuration: EditorConfiguration<BlockTypeRegistry>) {
    this.configuration = configuration;
  }

  /**
   * Adds a new block to the editor
   * 
   * @param type - The type of block to add
   * @param data - The data for the block
   * @returns The index of the added block
   */
  addBlock<K extends keyof BlockTypeRegistry>(type: K, data: BlockTypeRegistry[K]): number {
    if (this.configuration.blockTypes && !this.configuration.blockTypes[type]) {
      throw new Error(`Block type "${String(type)}" is not defined in the configuration.`);
    }

    this.blocks.push({ type, data });
    return this.blocks.length - 1;
  }

  /**
   * Removes a block from the editor
   * 
   * @param index - The index of the block to remove
   */
  removeBlock(index: number): void {
    if (index >= 0 && index < this.blocks.length) {
      this.blocks.splice(index, 1);
    } else {
      throw new Error(`Block index ${index} out of range`);
    }
  }

  /**
   * Updates the data of a block
   * 
   * @param index - The index of the block to update
   * @param newData - The new data for the block
   */
  updateBlock<K extends keyof BlockTypeRegistry>(
    index: number,
    newData: BlockTypeRegistry[K]
  ): void {
    if (index >= 0 && index < this.blocks.length) {
      this.blocks[index].data = newData;
    } else {
      throw new Error(`Block index ${index} out of range`);
    }
  }

  /**
   * Gets all blocks in the editor
   * 
   * @returns Array of all blocks
   */
  getBlocks(): Array<{
    type: keyof BlockTypeRegistry;
    data: BlockTypeRegistry[keyof BlockTypeRegistry];
  }> {
    // Return a shallow copy to prevent direct modification
    return [...this.blocks];
  }

  /**
   * Rearranges blocks according to a new order of indices
   * 
   * @param newOrder - Array of block indices in the desired order
   */
  rearrangeBlocks(newOrder: number[]): void {
    if (newOrder.length !== this.blocks.length) {
      throw new Error("New order length must match the number of blocks");
    }

    // Check that indices are valid
    for (const index of newOrder) {
      if (index < 0 || index >= this.blocks.length) {
        throw new Error(`Block index ${index} out of range`);
      }
    }

    // Create a new blocks array in the specified order
    const newBlocks = newOrder.map(index => this.blocks[index]);
    this.blocks = newBlocks;
  }

  /**
   * Clears all blocks from the editor
   */
  clearBlocks(): void {
    this.blocks = [];
  }

  /**
   * Gets the editor configuration
   * 
   * @returns The editor configuration
   */
  getConfiguration(): EditorConfiguration<BlockTypeRegistry> {
    return this.configuration;
  }

  /**
   * Renders the editor content
   * 
   * @returns HTMLElement with rendered content
   */
  render(): HTMLElement {
    // Create a container for all blocks
    const container = document.createElement('div');
    container.className = 'runik-editor-content';

    // Render each block
    this.blocks.forEach((block) => {
      const { type, data } = block;

      try {
        let renderedBlock: HTMLElement;

        // Check if we're using the new configuration format with visualRenderer
        if (this.configuration.visualRenderer && this.configuration.visualRenderer.renderers) {
          const renderer = this.configuration.visualRenderer.renderers[type];
          if (!renderer) {
            console.warn(`No renderer found for block type "${String(type)}" in visualRenderer`);
            return;
          }
        // Use type assertion to any to bypass TypeScript's type checking
        renderedBlock = renderer(data as any);
        } 
        // Check if we're using the old configuration format with renderers at top level
        else if (this.configuration.renderers) {
        const renderer = this.configuration.renderers[type as string];
        if (!renderer) {
          console.warn(`No renderer found for block type "${String(type)}" in renderers`);
          return;
        }
        // Use type assertion to any to bypass TypeScript's type checking
        renderedBlock = renderer(data as any);
        }
        else {
          console.error(`No renderer configuration found for block type: ${String(type)}`);
          return;
        }

        container.appendChild(renderedBlock);
      } catch (error) {
        console.error(`Error rendering block of type ${String(type)}:`, error);

        // Create an error element
        const errorElement = document.createElement('div');
        errorElement.className = 'runik-block-error';
        errorElement.textContent = `Error rendering block: ${error instanceof Error ? error.message : String(error)}`;
        container.appendChild(errorElement);
      }
    });

    return container;
  }
}
