import {EditorConfiguration} from "./editorConfiguration";
import {BlockTypeRegistry} from "../block/blockTypeRegistry";
import {Block} from "../block/block";


/**
 * Abstract base class for rich text editors with block-based content management.
 *
 * @template U - User data type associated with blocks
 * @template T - Block type registry extending Record<string, any>
 *
 * @example
 * ```typescript
 * class MyEditor extends Editor<UserData, MyBlockTypes> {
 *   // Implement abstract methods
 * }
 * ```
 */
export abstract class Editor<U, T extends Record<string, any> = BlockTypeRegistry> {

    /** Array of blocks that compose the editor content */
    blocks: Block<U, T[keyof T]>[] = []

    /** Current number of blocks in the editor */
    length: number = 0

    /** Editor configuration settings */
    configuration: EditorConfiguration<U, T>

    /**
     * Creates a new Editor instance with the provided configuration.
     *
     * @param config - Configuration object for the editor
     */
    constructor(config: EditorConfiguration<U, T>) {
        this.configuration = config
    }

    // ===================
    // CORE BLOCK METHODS
    // ===================

    /**
     * Adds a new block at the specified index.
     *
     * @param index - Zero-based index where the block should be inserted
     * @param block - Block instance to add
     * @throws {Error} When index is out of bounds
     */
    abstract addBlock(index: number, block: Block<U, T[keyof T]>): void

    /**
     * Removes a block at the specified index.
     *
     * @param index - Zero-based index of the block to remove
     * @throws {Error} When index is out of bounds
     */
    abstract removeBlock(index: number): void

    /**
     * Updates an existing block at the specified index.
     *
     * @param index - Zero-based index of the block to update
     * @param block - New block instance to replace the existing one
     * @throws {Error} When index is out of bounds
     */
    abstract updateBlock(index: number, block: Block<U, T[keyof T]>): void

    /**
     * Reorders a block from one position to another.
     *
     * @param startIndex - Current zero-based index of the block
     * @param finalIndex - Target zero-based index for the block
     * @throws {Error} When either index is out of bounds
     */
    abstract reorder(startIndex: number, finalIndex: number): void

    // ===================
    // RENDERING METHODS
    // ===================

    /**
     * Renders a specific block at the given index.
     *
     * @param index - Zero-based index of the block to render
     * @throws {Error} When index is out of bounds
     */
    abstract render(index: number): void

    /**
     * Renders all blocks in the editor.
     */
    abstract renderAll(): void

    // ===================
    // SERIALIZATION METHODS
    // ===================

    /**
     * Serializes all blocks to a string format.
     *
     * @returns String representation of all blocks
     */
    abstract serializeBlocks(): string

    /**
     * Serializes the entire editor state including configuration.
     *
     * @returns String representation of the complete editor state
     */
    abstract serializeState(): string

    /**
     * Deserializes blocks from a string format.
     *
     * @returns Array of deserialized blocks
     * @throws {Error} When deserialization fails
     */
    abstract deserializeBlocks(): Block<U, T[keyof T]>[]

    /**
     * Deserializes the complete editor state from a string.
     *
     * @returns Object containing configuration and blocks
     * @throws {Error} When deserialization fails
     */
    abstract deserializeState(): { config: EditorConfiguration<U, T>, blocks: Block<U, T[keyof T]>[] }

    // ===================
    // BLOCK MANAGEMENT
    // ===================

    /**
     * Inserts a new block of the specified type at the given index.
     *
     * @param index - Zero-based index where the block should be inserted
     * @param blockType - Type of block to create
     * @param content - Optional initial content for the block
     * @throws {Error} When index is out of bounds or blockType is invalid
     */
    abstract insertBlock(index: number, blockType: keyof T, content?: any): void

    /**
     * Creates a duplicate of the block at the specified index.
     *
     * @param index - Zero-based index of the block to duplicate
     * @throws {Error} When index is out of bounds
     */
    abstract duplicateBlock(index: number): void

    /**
     * Moves a block from one position to another (alias for reorder).
     *
     * @param fromIndex - Current zero-based index of the block
     * @param toIndex - Target zero-based index for the block
     * @throws {Error} When either index is out of bounds
     */
    abstract moveBlock(fromIndex: number, toIndex: number): void

    /**
     * Retrieves a block at the specified index.
     *
     * @param index - Zero-based index of the block to retrieve
     * @returns Block instance or null if index is out of bounds
     */
    abstract getBlock(index: number): Block<U, T[keyof T]> | null

    /**
     * Retrieves a range of blocks.
     *
     * @param startIndex - Starting zero-based index (inclusive)
     * @param endIndex - Ending zero-based index (exclusive)
     * @returns Array of blocks in the specified range
     */
    abstract getBlocks(startIndex?: number, endIndex?: number): Block<U, T[keyof T]>[]

    /**
     * Removes all blocks from the editor.
     */
    abstract clear(): void

    /**
     * Checks if the editor has no blocks.
     *
     * @returns True if editor is empty, false otherwise
     */
    abstract isEmpty(): boolean

    // ===================
    // SELECTION & FOCUS
    // ===================

    /**
     * Sets focus to the editor or a specific block.
     *
     * @param index - Optional zero-based index of block to focus
     */
    abstract focus(index?: number): void

    /**
     * Removes focus from the editor.
     */
    abstract blur(): void

    /**
     * Gets the current selection information.
     *
     * @returns Selection object with block index and offset, or null if no selection
     */
    abstract getSelection(): { blockIndex: number, offset: number } | null

    /**
     * Sets the current selection to a specific position.
     *
     * @param blockIndex - Zero-based index of the block
     * @param offset - Character offset within the block
     * @throws {Error} When blockIndex is out of bounds
     */
    abstract setSelection(blockIndex: number, offset: number): void

    /**
     * Selects an entire block.
     *
     * @param index - Zero-based index of the block to select
     * @throws {Error} When index is out of bounds
     */
    abstract selectBlock(index: number): void

    /**
     * Selects all blocks in the editor.
     */
    abstract selectAll(): void

    /**
     * Gets the indices of currently selected blocks.
     *
     * @returns Array of zero-based indices of selected blocks
     */
    abstract getSelectedBlocks(): number[]

    // ===================
    // SEARCH & REPLACE
    // ===================

    /**
     * Finds all occurrences of a query string in the editor.
     *
     * @param query - Text to search for
     * @param options - Search options including case sensitivity and whole word matching
     * @returns Array of search results with block indices and match positions
     */
    abstract find(query: string, options?: { caseSensitive?: boolean, wholeWord?: boolean }): Array<{
        blockIndex: number,
        matches: Array<{ start: number, end: number }>
    }>

    /**
     * Replaces occurrences of a query string with replacement text.
     *
     * @param query - Text to search for
     * @param replacement - Text to replace with
     * @param options - Replace options including case sensitivity and replace all
     * @returns Number of replacements made
     */
    abstract replace(query: string, replacement: string, options?: {
        caseSensitive?: boolean,
        replaceAll?: boolean
    }): number

    /**
     * Finds and replaces all occurrences of a query string.
     *
     * @param query - Text to search for
     * @param replacement - Text to replace with
     */
    abstract findAndReplace(query: string, replacement: string): void

    // ===================
    // CONTENT OPERATIONS
    // ===================

    /**
     * Gets the complete content of the editor as a string.
     *
     * @returns String representation of all editor content
     */
    abstract getContent(): string

    /**
     * Sets the complete content of the editor.
     *
     * @param content - New content to set
     */
    abstract setContent(content: string): void

    /**
     * Appends content to the end of the editor.
     *
     * @param content - Content to append
     */
    abstract appendContent(content: string): void

    /**
     * Prepends content to the beginning of the editor.
     *
     * @param content - Content to prepend
     */
    abstract prependContent(content: string): void

    /**
     * Inserts content at a specific position.
     *
     * @param index - Zero-based index where content should be inserted
     * @param content - Content to insert
     * @throws {Error} When index is out of bounds
     */
    abstract insertContent(index: number, content: string): void

    // ===================
    // FORMATTING METHODS
    // ===================

    /**
     * Applies formatting to a specific block.
     *
     * @param blockIndex - Zero-based index of the block
     * @param format - Format type to apply
     * @param value - Optional value for the format
     * @throws {Error} When blockIndex is out of bounds
     */
    abstract applyFormat(blockIndex: number, format: string, value?: any): void

    /**
     * Removes formatting from a specific block.
     *
     * @param blockIndex - Zero-based index of the block
     * @param format - Format type to remove
     * @throws {Error} When blockIndex is out of bounds
     */
    abstract removeFormat(blockIndex: number, format: string): void

    /**
     * Gets the current format value for a specific block.
     *
     * @param blockIndex - Zero-based index of the block
     * @param format - Format type to retrieve
     * @returns Current format value
     * @throws {Error} When blockIndex is out of bounds
     */
    abstract getFormat(blockIndex: number, format: string): any

    /**
     * Toggles formatting on a specific block.
     *
     * @param blockIndex - Zero-based index of the block
     * @param format - Format type to toggle
     * @throws {Error} When blockIndex is out of bounds
     */
    abstract toggleFormat(blockIndex: number, format: string): void

    // ===================
    // HISTORY & UNDO/REDO
    // ===================

    /**
     * Undoes the last action.
     *
     * @returns True if undo was successful, false if no actions to undo
     */
    abstract undo(): boolean

    /**
     * Redoes the last undone action.
     *
     * @returns True if redo was successful, false if no actions to redo
     */
    abstract redo(): boolean

    /**
     * Checks if undo is possible.
     *
     * @returns True if there are actions to undo, false otherwise
     */
    abstract canUndo(): boolean

    /**
     * Checks if redo is possible.
     *
     * @returns True if there are actions to redo, false otherwise
     */
    abstract canRedo(): boolean

    /**
     * Saves the current state to the history stack.
     */
    abstract saveState(): void

    /**
     * Clears the entire history stack.
     */
    abstract clearHistory(): void

    // ===================
    // VALIDATION & CONSTRAINTS
    // ===================

    /**
     * Validates the entire editor content.
     *
     * @returns Validation result with status and any error messages
     */
    abstract validate(): { isValid: boolean, errors: string[] }

    /**
     * Validates a specific block.
     *
     * @param index - Zero-based index of the block to validate
     * @returns Validation result with status and any error messages
     * @throws {Error} When index is out of bounds
     */
    abstract validateBlock(index: number): { isValid: boolean, errors: string[] }

    /**
     * Enforces any configured constraints on the editor content.
     */
    abstract enforceConstraints(): void

    // ===================
    // EVENTS & CALLBACKS
    // ===================

    /**
     * Adds an event listener for editor events.
     *
     * @param event - Event type to listen for
     * @param callback - Function to call when event occurs
     */
    abstract addEventListener(event: string, callback: Function): void

    /**
     * Removes an event listener.
     *
     * @param event - Event type to stop listening for
     * @param callback - Function to remove from listeners
     */
    abstract removeEventListener(event: string, callback: Function): void

    /**
     * Dispatches an event to all registered listeners.
     *
     * @param event - Event type to dispatch
     * @param data - Optional data to pass to event listeners
     */
    abstract dispatchEvent(event: string, data?: any): void

    // ===================
    // CLIPBOARD OPERATIONS
    // ===================

    /**
     * Copies specified blocks to clipboard format.
     *
     * @param blockIndices - Optional array of block indices to copy (defaults to selection)
     * @returns String representation of copied content
     */
    abstract copy(blockIndices?: number[]): string

    /**
     * Cuts specified blocks to clipboard format.
     *
     * @param blockIndices - Optional array of block indices to cut (defaults to selection)
     * @returns String representation of cut content
     */
    abstract cut(blockIndices?: number[]): string

    /**
     * Pastes content at the specified index.
     *
     * @param index - Zero-based index where content should be pasted
     * @param content - Content to paste
     * @throws {Error} When index is out of bounds
     */
    abstract paste(index: number, content: string): void

    // ===================
    // EXPORT & IMPORT
    // ===================

    /**
     * Exports editor content to the specified format.
     *
     * @param format - Target format for export
     * @returns String representation in the specified format
     * @throws {Error} When format is not supported
     */
    abstract exportTo(format: "html" | "json" | "latex" | "markdown"): string

    /**
     * Imports content from the specified format.
     *
     * @param content - Content to import
     * @param format - Source format of the content
     * @throws {Error} When format is not supported or content is invalid
     */
    abstract importFrom(content: string, format: 'html' | 'markdown' | 'json' | 'latex'): void

    // ===================
    // PERFORMANCE & OPTIMIZATION
    // ===================

    /**
     * Optimizes the editor for performance.
     */
    abstract optimize(): void

    /**
     * Gets blocks within a specific range efficiently.
     *
     * @param startIndex - Starting zero-based index (inclusive)
     * @param endIndex - Ending zero-based index (exclusive)
     * @returns Array of blocks in the specified range
     */
    abstract getBlocksInRange(startIndex: number, endIndex: number): Block<U, T[keyof T]>[]

    /**
     * Invalidates any internal caches.
     */
    abstract invalidateCache(): void

    /**
     * Preloads blocks for better performance.
     *
     * @param indices - Array of block indices to preload
     */
    abstract preloadBlocks(indices: number[]): void

    // ===================
    // UTILITY METHODS
    // ===================

    /**
     * Gets the type of block at the specified index.
     *
     * @param index - Zero-based index of the block
     * @returns Block type or null if index is out of bounds
     */
    abstract getBlockType(index: number): keyof T | null

    /**
     * Gets the total number of blocks.
     *
     * @returns Number of blocks in the editor
     */
    abstract getBlockCount(): number

    /**
     * Finds the index of a specific block.
     *
     * @param block - Block instance to find
     * @returns Zero-based index of the block, or -1 if not found
     */
    abstract indexOf(block: Block<U, T[keyof T]>): number

    /**
     * Checks if the editor contains a specific block.
     *
     * @param block - Block instance to check for
     * @returns True if block is contained in the editor, false otherwise
     */
    abstract contains(block: Block<U, T[keyof T]>): boolean

    /**
     * Gets the current version of the editor.
     *
     * @returns Version string
     */
    abstract getVersion(): string

    /**
     * Sets the read-only state of the editor.
     *
     * @param readonly - True to make editor read-only, false to allow editing
     */
    abstract setReadOnly(readonly: boolean): void

    /**
     * Checks if the editor is in read-only mode.
     *
     * @returns True if editor is read-only, false otherwise
     */
    abstract isReadOnly(): boolean

    // ===================
    // CONFIGURATION MANAGEMENT
    // ===================

    /**
     * Updates the editor configuration.
     *
     * @param config - Partial configuration object with properties to update
     */
    abstract updateConfiguration(config: Partial<EditorConfiguration<U, T>>): void

    /**
     * Gets the current editor configuration.
     *
     * @returns Current configuration object
     */
    abstract getConfiguration(): EditorConfiguration<U, T>

    /**
     * Resets configuration to default values.
     */
    abstract resetConfiguration(): void

    // ===================
    // LIFECYCLE METHODS
    // ===================

    /**
     * Initializes the editor asynchronously.
     *
     * @returns Promise that resolves when initialization is complete
     * @throws {Error} When initialization fails
     */
    abstract initialize(): Promise<void>

    /**
     * Destroys the editor and cleans up resources.
     */
    abstract destroy(): void

    /**
     * Refreshes the editor display and internal state.
     */
    abstract refresh(): void
}