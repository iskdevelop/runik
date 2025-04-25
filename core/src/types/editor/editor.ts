import {EditorConfiguration} from "./editorConfiguration";

/**
 * The `Editor` class is a generic editor that manages blocks of various types.
 * It uses a configuration to define the available block types and their renderers.
 *
 * @template BlockTypeRegistry - A record mapping block type names to their respective data structures.
 */
export class Editor<BlockTypeRegistry extends Record<string, any>> {
    /**
     * An array of blocks managed by the editor. Each block has a type and associated data.
     */
    private blocks: Array<{ type: keyof BlockTypeRegistry; data: any }> = [];

    /**
     * The configuration object that defines block types and their renderers.
     */
    public configuration: EditorConfiguration<BlockTypeRegistry>;

    /**
     * Constructs a new `Editor` instance.
     *
     * @param configuration - The configuration object defining block types and renderers.
     */
    constructor(configuration: EditorConfiguration<BlockTypeRegistry>) {
        this.configuration = configuration;
    }

    /**
     * Adds a new block to the editor.
     *
     * @param type - The type of the block to add. Must be a valid key in the block type registry.
     * @param data - The data associated with the block. Must match the structure defined in the registry.
     * @throws Will throw an error if the block type is not defined in the configuration.
     */
    addBlock<K extends keyof BlockTypeRegistry>(type: K, data: BlockTypeRegistry[K]): void {
        if (!this.configuration.blockTypes[type]) {
            throw new Error(`Block type "${String(type)}" is not defined in the configuration.`);
        }
        this.blocks.push({type, data});
    }

    /**
     * Removes a block from the editor.
     *
     * @param index - The index of the block to remove.
     * @throws Will throw an error if the index is out of bounds.
     */
    removeBlock(index: number): void {
        if (index < 0 || index >= this.blocks.length) {
            throw new Error(`Index ${index} is out of bounds.`);
        }
        this.blocks.splice(index, 1);
    }

    /**
     * Clears all blocks from the editor.
     */
    clearBlocks(): void {
        this.blocks = [];
    }

    /**
     * Retrieves the configuration of the editor.
     *
     * @returns The configuration object.
     */
    getConfiguration(): EditorConfiguration<BlockTypeRegistry> {
        return this.configuration;
    }

    /**
     * Rearranges the blocks in the editor.
     */
    rearrangeBlocks(newOrder: Array<number>): void {
        if (newOrder.length !== this.blocks.length) {
            throw new Error("New order length must match the number of blocks.");
        }
        const newBlocks = [];
        for (const index of newOrder) {
            if (index < 0 || index >= this.blocks.length) {
                throw new Error(`Index ${index} is out of bounds.`);
            }
            newBlocks.push(this.blocks[index]);
        }
        this.blocks = newBlocks;
    }

    /**
     * Renders the editor's blocks into an HTML container.
     *
     * @returns An `HTMLElement` containing the rendered blocks.
     */
    render(): HTMLElement {
        const container = document.createElement("div");
        this.blocks.forEach((block) => {
            const renderer = this.configuration.visualRenderer.renderers[block.type];
            if (renderer) {
                container.appendChild(renderer(block.data));
            }
        });
        return container;
    }

    /**
     * Renders a specific block by its ID.
     *
     * @param blockId
     */
    renderBlock(blockId: number): HTMLElement {
        if (blockId < 0 || blockId >= this.blocks.length) {
            throw new Error(`Block ID ${blockId} is out of bounds.`);
        }
        const block = this.blocks[blockId];
        const renderer = this.configuration.visualRenderer.renderers[block.type];
        if (renderer) {
            return renderer(block.data);
        } else {
            throw new Error(`No renderer found for block type "${String(block.type)}".`);
        }
    }

    /**
     * Retrieves the blocks managed by the editor.
     *
     * @returns An array of blocks, each with a type and associated data.
     */
    getBlocks(): Array<{ type: keyof BlockTypeRegistry; data: any }> {
        return this.blocks;
    }
}
