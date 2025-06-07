# Rich Text Editor Class Documentation

## Overview

The `Editor` class is an abstract base class for building rich text editors with block-based content management. It
provides a comprehensive API for managing blocks, handling user interactions, and maintaining editor state.

## Table of Contents

- [Class Definition](#class-definition)
- [Constructor](#constructor)
- [Properties](#properties)
- [Methods](#methods)
    - [Core Block Methods](#core-block-methods)
    - [Rendering Methods](#rendering-methods)
    - [Serialization Methods](#serialization-methods)
    - [Block Management](#block-management)
    - [Selection & Focus](#selection--focus)
    - [Search & Replace](#search--replace)
    - [Content Operations](#content-operations)
    - [Formatting Methods](#formatting-methods)
    - [History & Undo/Redo](#history--undoredo)
    - [Validation & Constraints](#validation--constraints)
    - [Events & Callbacks](#events--callbacks)
    - [Clipboard Operations](#clipboard-operations)
    - [Export & Import](#export--import)
    - [Collaboration Methods](#collaboration-methods)
    - [Performance & Optimization](#performance--optimization)
    - [Utility Methods](#utility-methods)
    - [Configuration Management](#configuration-management)
    - [Lifecycle Methods](#lifecycle-methods)
- [Usage Examples](#usage-examples)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)

## Class Definition

```typescript
export abstract class Editor<U, T extends Record<string, any> = BlockTypeRegistry>
```

### Generic Parameters

- **U**: User data type associated with blocks
- **T**: Block type registry extending `Record<string, any>`

## Constructor

```typescript
constructor(config
:
EditorConfiguration<U, T>
)
```

Creates a new Editor instance with the provided configuration.

**Parameters:**

- `config`: Configuration object for the editor

## Properties

| Property        | Type                        | Description                                     |
|-----------------|-----------------------------|-------------------------------------------------|
| `blocks`        | `Block<U, T[keyof T]>[]`    | Array of blocks that compose the editor content |
| `length`        | `number`                    | Current number of blocks in the editor          |
| `configuration` | `EditorConfiguration<U, T>` | Editor configuration settings                   |

## Methods

### Core Block Methods

These methods form the foundation of block manipulation in the editor.

#### `addBlock(index: number, block: Block<U, T[keyof T]>): void`

Adds a new block at the specified index.

**Parameters:**

- `index`: Zero-based index where the block should be inserted
- `block`: Block instance to add

**Throws:** Error when index is out of bounds

#### `removeBlock(index: number): void`

Removes a block at the specified index.

**Parameters:**

- `index`: Zero-based index of the block to remove

**Throws:** Error when index is out of bounds

#### `updateBlock(index: number, block: Block<U, T[keyof T]>): void`

Updates an existing block at the specified index.

**Parameters:**

- `index`: Zero-based index of the block to update
- `block`: New block instance to replace the existing one

**Throws:** Error when index is out of bounds

#### `reorder(startIndex: number, finalIndex: number): void`

Reorders a block from one position to another.

**Parameters:**

- `startIndex`: Current zero-based index of the block
- `finalIndex`: Target zero-based index for the block

**Throws:** Error when either index is out of bounds

### Rendering Methods

Methods for rendering blocks and updating the visual representation.

#### `render(index: number): void`

Renders a specific block at the given index.

**Parameters:**

- `index`: Zero-based index of the block to render

**Throws:** Error when index is out of bounds

#### `renderAll(): void`

Renders all blocks in the editor.

### Serialization Methods

Methods for converting editor state to/from string representations.

#### `serializeBlocks(): string`

Serializes all blocks to a string format.

**Returns:** String representation of all blocks

#### `serializeState(): string`

Serializes the entire editor state including configuration.

**Returns:** String representation of the complete editor state

#### `deserializeBlocks(): Block<U, T[keyof T]>[]`

Deserializes blocks from a string format.

**Returns:** Array of deserialized blocks

**Throws:** Error when deserialization fails

#### `deserializeState(): { config: EditorConfiguration<U, T>, blocks: Block<U, T[keyof T]>[] }`

Deserializes the complete editor state from a string.

**Returns:** Object containing configuration and blocks

**Throws:** Error when deserialization fails

### Block Management

Extended block manipulation methods for advanced operations.

#### `insertBlock(index: number, blockType: keyof T, content?: any): void`

Inserts a new block of the specified type at the given index.

**Parameters:**

- `index`: Zero-based index where the block should be inserted
- `blockType`: Type of block to create
- `content`: Optional initial content for the block

**Throws:** Error when index is out of bounds or blockType is invalid

#### `duplicateBlock(index: number): void`

Creates a duplicate of the block at the specified index.

**Parameters:**

- `index`: Zero-based index of the block to duplicate

**Throws:** Error when index is out of bounds

#### `moveBlock(fromIndex: number, toIndex: number): void`

Moves a block from one position to another (alias for reorder).

**Parameters:**

- `fromIndex`: Current zero-based index of the block
- `toIndex`: Target zero-based index for the block

**Throws:** Error when either index is out of bounds

#### `getBlock(index: number): Block<U, T[keyof T]> | null`

Retrieves a block at the specified index.

**Parameters:**

- `index`: Zero-based index of the block to retrieve

**Returns:** Block instance or null if index is out of bounds

#### `getBlocks(startIndex?: number, endIndex?: number): Block<U, T[keyof T]>[]`

Retrieves a range of blocks.

**Parameters:**

- `startIndex`: Starting zero-based index (inclusive)
- `endIndex`: Ending zero-based index (exclusive)

**Returns:** Array of blocks in the specified range

#### `clear(): void`

Removes all blocks from the editor.

#### `isEmpty(): boolean`

Checks if the editor has no blocks.

**Returns:** True if editor is empty, false otherwise

### Selection & Focus

Methods for managing user selection and focus states.

#### `focus(index?: number): void`

Sets focus to the editor or a specific block.

**Parameters:**

- `index`: Optional zero-based index of block to focus

#### `blur(): void`

Removes focus from the editor.

#### `getSelection(): { blockIndex: number, offset: number } | null`

Gets the current selection information.

**Returns:** Selection object with block index and offset, or null if no selection

#### `setSelection(blockIndex: number, offset: number): void`

Sets the current selection to a specific position.

**Parameters:**

- `blockIndex`: Zero-based index of the block
- `offset`: Character offset within the block

**Throws:** Error when blockIndex is out of bounds

#### `selectBlock(index: number): void`

Selects an entire block.

**Parameters:**

- `index`: Zero-based index of the block to select

**Throws:** Error when index is out of bounds

#### `selectAll(): void`

Selects all blocks in the editor.

#### `getSelectedBlocks(): number[]`

Gets the indices of currently selected blocks.

**Returns:** Array of zero-based indices of selected blocks

### Search & Replace

Methods for finding and replacing content within the editor.

####
`find(query: string, options?: { caseSensitive?: boolean, wholeWord?: boolean }): Array<{ blockIndex: number, matches: Array<{ start: number, end: number }> }>`

Finds all occurrences of a query string in the editor.

**Parameters:**

- `query`: Text to search for
- `options`: Search options including case sensitivity and whole word matching

**Returns:** Array of search results with block indices and match positions

#### `replace(query: string, replacement: string, options?: { caseSensitive?: boolean, replaceAll?: boolean }): number`

Replaces occurrences of a query string with replacement text.

**Parameters:**

- `query`: Text to search for
- `replacement`: Text to replace with
- `options`: Replace options including case sensitivity and replace all

**Returns:** Number of replacements made

#### `findAndReplace(query: string, replacement: string): void`

Finds and replaces all occurrences of a query string.

**Parameters:**

- `query`: Text to search for
- `replacement`: Text to replace with

### Content Operations

High-level methods for working with editor content as a whole.

#### `getContent(): string`

Gets the complete content of the editor as a string.

**Returns:** String representation of all editor content

#### `setContent(content: string): void`

Sets the complete content of the editor.

**Parameters:**

- `content`: New content to set

#### `appendContent(content: string): void`

Appends content to the end of the editor.

**Parameters:**

- `content`: Content to append

#### `prependContent(content: string): void`

Prepends content to the beginning of the editor.

**Parameters:**

- `content`: Content to prepend

#### `insertContent(index: number, content: string): void`

Inserts content at a specific position.

**Parameters:**

- `index`: Zero-based index where content should be inserted
- `content`: Content to insert

**Throws:** Error when index is out of bounds

### Formatting Methods

Methods for applying and managing text formatting within blocks.

#### `applyFormat(blockIndex: number, format: string, value?: any): void`

Applies formatting to a specific block.

**Parameters:**

- `blockIndex`: Zero-based index of the block
- `format`: Format type to apply
- `value`: Optional value for the format

**Throws:** Error when blockIndex is out of bounds

#### `removeFormat(blockIndex: number, format: string): void`

Removes formatting from a specific block.

**Parameters:**

- `blockIndex`: Zero-based index of the block
- `format`: Format type to remove

**Throws:** Error when blockIndex is out of bounds

#### `getFormat(blockIndex: number, format: string): any`

Gets the current format value for a specific block.

**Parameters:**

- `blockIndex`: Zero-based index of the block
- `format`: Format type to retrieve

**Returns:** Current format value

**Throws:** Error when blockIndex is out of bounds

#### `toggleFormat(blockIndex: number, format: string): void`

Toggles formatting on a specific block.

**Parameters:**

- `blockIndex`: Zero-based index of the block
- `format`: Format type to toggle

**Throws:** Error when blockIndex is out of bounds

### History & Undo/Redo

Methods for managing editor history and implementing undo/redo functionality.

#### `undo(): boolean`

Undoes the last action.

**Returns:** True if undo was successful, false if no actions to undo

#### `redo(): boolean`

Redoes the last undone action.

**Returns:** True if redo was successful, false if no actions to redo

#### `canUndo(): boolean`

Checks if undo is possible.

**Returns:** True if there are actions to undo, false otherwise

#### `canRedo(): boolean`

Checks if redo is possible.

**Returns:** True if there are actions to redo, false otherwise

#### `saveState(): void`

Saves the current state to the history stack.

#### `clearHistory(): void`

Clears the entire history stack.

### Validation & Constraints

Methods for validating content and enforcing editor constraints.

#### `validate(): { isValid: boolean, errors: string[] }`

Validates the entire editor content.

**Returns:** Validation result with status and any error messages

#### `validateBlock(index: number): { isValid: boolean, errors: string[] }`

Validates a specific block.

**Parameters:**

- `index`: Zero-based index of the block to validate

**Returns:** Validation result with status and any error messages

**Throws:** Error when index is out of bounds

#### `enforceConstraints(): void`

Enforces any configured constraints on the editor content.

### Events & Callbacks

Methods for managing event listeners and dispatching custom events.

#### `addEventListener(event: string, callback: Function): void`

Adds an event listener for editor events.

**Parameters:**

- `event`: Event type to listen for
- `callback`: Function to call when event occurs

#### `removeEventListener(event: string, callback: Function): void`

Removes an event listener.

**Parameters:**

- `event`: Event type to stop listening for
- `callback`: Function to remove from listeners

#### `dispatchEvent(event: string, data?: any): void`

Dispatches an event to all registered listeners.

**Parameters:**

- `event`: Event type to dispatch
- `data`: Optional data to pass to event listeners

### Clipboard Operations

Methods for implementing copy, cut, and paste functionality.

#### `copy(blockIndices?: number[]): string`

Copies specified blocks to clipboard format.

**Parameters:**

- `blockIndices`: Optional array of block indices to copy (defaults to selection)

**Returns:** String representation of copied content

#### `cut(blockIndices?: number[]): string`

Cuts specified blocks to clipboard format.

**Parameters:**

- `blockIndices`: Optional array of block indices to cut (defaults to selection)

**Returns:** String representation of cut content

#### `paste(index: number, content: string): void`

Pastes content at the specified index.

**Parameters:**

- `index`: Zero-based index where content should be pasted
- `content`: Content to paste

**Throws:** Error when index is out of bounds

### Export & Import

Methods for converting editor content to and from various formats.

#### `exportTo(format: 'html' | 'markdown' | 'json' | 'plain'): string`

Exports editor content to the specified format.

**Parameters:**

- `format`: Target format for export

**Returns:** String representation in the specified format

**Throws:** Error when format is not supported

#### `importFrom(content: string, format: 'html' | 'markdown' | 'json' | 'plain'): void`

Imports content from the specified format.

**Parameters:**

- `content`: Content to import
- `format`: Source format of the content

**Throws:** Error when format is not supported or content is invalid

### Collaboration Methods

Methods for implementing collaborative editing features.

#### `applyOperation(operation: EditorOperation): void`

Applies a collaborative editing operation.

**Parameters:**

- `operation`: Operation to apply

**Throws:** Error when operation is invalid or conflicts

#### `getOperations(fromVersion?: number): EditorOperation[]`

Gets operations from a specific version onwards.

**Parameters:**

- `fromVersion`: Optional version to start from

**Returns:** Array of operations since the specified version

#### `mergeOperations(operations: EditorOperation[]): void`

Merges multiple operations into the editor state.

**Parameters:**

- `operations`: Array of operations to merge

**Throws:** Error when operations conflict or are invalid

### Performance & Optimization

Methods for optimizing editor performance and resource usage.

#### `optimize(): void`

Optimizes the editor for performance.

#### `getBlocksInRange(startIndex: number, endIndex: number): Block<U, T[keyof T]>[]`

Gets blocks within a specific range efficiently.

**Parameters:**

- `startIndex`: Starting zero-based index (inclusive)
- `endIndex`: Ending zero-based index (exclusive)

**Returns:** Array of blocks in the specified range

#### `invalidateCache(): void`

Invalidates any internal caches.

#### `preloadBlocks(indices: number[]): void`

Preloads blocks for better performance.

**Parameters:**

- `indices`: Array of block indices to preload

### Utility Methods

Helper methods for common operations and state queries.

#### `getBlockType(index: number): keyof T | null`

Gets the type of block at the specified index.

**Parameters:**

- `index`: Zero-based index of the block

**Returns:** Block type or null if index is out of bounds

#### `getBlockCount(): number`

Gets the total number of blocks.

**Returns:** Number of blocks in the editor

#### `indexOf(block: Block<U, T[keyof T]>): number`

Finds the index of a specific block.

**Parameters:**

- `block`: Block instance to find

**Returns:** Zero-based index of the block, or -1 if not found

#### `contains(block: Block<U, T[keyof T]>): boolean`

Checks if the editor contains a specific block.

**Parameters:**

- `block`: Block instance to check for

**Returns:** True if block is contained in the editor, false otherwise

#### `getVersion(): string`

Gets the current version of the editor.

**Returns:** Version string

#### `setReadOnly(readonly: boolean): void`

Sets the read-only state of the editor.

**Parameters:**

- `readonly`: True to make editor read-only, false to allow editing

#### `isReadOnly(): boolean`

Checks if the editor is in read-only mode.

**Returns:** True if editor is read-only, false otherwise

### Configuration Management

Methods for managing editor configuration dynamically.

#### `updateConfiguration(config: Partial<EditorConfiguration<U, T>>): void`

Updates the editor configuration.

**Parameters:**

- `config`: Partial configuration object with properties to update

#### `getConfiguration(): EditorConfiguration<U, T>`

Gets the current editor configuration.

**Returns:** Current configuration object

#### `resetConfiguration(): void`

Resets configuration to default values.

### Lifecycle Methods

Methods for managing the editor's lifecycle and resource cleanup.

#### `initialize(): Promise<void>`

Initializes the editor asynchronously.

**Returns:** Promise that resolves when initialization is complete

**Throws:** Error when initialization fails

#### `destroy(): void`

Destroys the editor and cleans up resources.

#### `refresh(): void`

Refreshes the editor display and internal state.

## Usage Examples

### Basic Implementation

```typescript
class MyEditor extends Editor<UserData, MyBlockTypes> {
    // Implement required abstract methods
    addBlock(index: number, block: Block<UserData, MyBlockTypes[keyof MyBlockTypes]>): void {
        // Implementation
    }

    // ... other method implementations
}

// Create editor instance
const editor = new MyEditor({
    // Configuration options
});

// Initialize editor
await editor.initialize();

// Add a block
editor.insertBlock(0, 'paragraph', 'Hello, World!');

// Render all blocks
editor.renderAll();
```

### Event Handling

```typescript
// Listen for content changes
editor.addEventListener('contentChanged', (data) => {
    console.log('Content changed:', data);
});

// Listen for selection changes
editor.addEventListener('selectionChanged', (selection) => {
    console.log('Selection:', selection);
});
```

### Search and Replace

```typescript
// Find all occurrences of "hello"
const results = editor.find('hello', {caseSensitive: false});

// Replace all occurrences
const replacements = editor.replace('hello', 'hi', {replaceAll: true});

console.log(`Made ${replacements} replacements`);
```

### Export and Import

```typescript
// Export to HTML
const htmlContent = editor.exportTo('html');

// Export to Markdown
const markdownContent = editor.exportTo('markdown');

// Import from JSON
editor.importFrom(jsonContent, 'json');
```

## Error Handling

The editor throws errors in various scenarios:

- **Index out of bounds**: When accessing blocks with invalid indices
- **Invalid block types**: When trying to create blocks of unsupported types
- **Serialization errors**: When serialization/deserialization fails
- **Format errors**: When trying to import unsupported formats
- **Collaboration conflicts**: When operations conflict in collaborative editing

Always wrap editor operations in try-catch blocks for robust error handling:

```typescript
try {
    editor.addBlock(index, block);
} catch (error) {
    console.error('Failed to add block:', error.message);
}
```

## Best Practices

### Performance

1. **Batch operations**: Group multiple changes together to minimize renders
2. **Use ranges**: When working with multiple blocks, use range methods
3. **Optimize rendering**: Only render visible blocks in large documents
4. **Cache management**: Invalidate caches only when necessary

### Memory Management

1. **Clean up listeners**: Remove event listeners when no longer needed
2. **Destroy editors**: Call `destroy()` when editor is no longer needed
3. **Limit history**: Configure reasonable history limits for undo/redo

### User Experience

1. **Validate input**: Use validation methods to ensure content integrity
2. **Provide feedback**: Use events to update UI based on editor state
3. **Handle errors gracefully**: Implement proper error handling and user feedback

### Collaboration

1. **Version tracking**: Keep track of document versions for conflict resolution
2. **Operation ordering**: Ensure operations are applied in the correct order
3. **Conflict resolution**: Implement strategies for handling conflicting operations

## Common Event Types

The editor can dispatch various events that implementations should handle:

- `contentChanged`: Fired when editor content is modified
- `selectionChanged`: Fired when user selection changes
- `blockAdded`: Fired when a new block is added
- `blockRemoved`: Fired when a block is removed
- `blockUpdated`: Fired when a block is modified
- `focusChanged`: Fired when editor focus changes
- `configurationChanged`: Fired when configuration is updated
- `historyChanged`: Fired when undo/redo state changes
- `validationFailed`: Fired when content validation fails

## Integration Guidelines

When implementing the abstract methods:

1. **Maintain consistency**: Ensure all methods follow the same patterns
2. **Handle edge cases**: Account for empty editors, invalid indices, etc.
3. **Optimize for your use case**: Focus on the methods most important to your application
4. **Document extensions**: Add documentation for any additional methods you implement
5. **Test thoroughly**: Ensure all abstract methods work correctly with your block types