import { Editor } from '../types/editor/editor';
import { EditorConfiguration } from '../types/editor/editorConfiguration';
import { RunikUIOptions, DEFAULT_RUNIK_UI_OPTIONS } from '../types/ui/runikUIOptions';
import { generateUUID } from '../utils/idGenerator';

/**
 * Interface for a block with a unique ID
 */
interface IdentifiableBlock<BlockTypeRegistry extends Record<string, any>, K extends keyof BlockTypeRegistry = keyof BlockTypeRegistry> {
  id: string;
  type: K;
  data: BlockTypeRegistry[K];
  element?: HTMLElement; // Reference to the rendered block element
}

/**
 * The `RunikUI` class provides a user interface wrapper around the core `Editor` class.
 * It manages block IDs, provides rich UI interactions, and presents a more user-friendly API.
 * 
 * @template BlockTypeRegistry - A record mapping block type names to their respective data structures.
 */
export class RunikUI<BlockTypeRegistry extends Record<string, any>> {
  /**
   * The core editor instance
   */
  private editor: Editor<BlockTypeRegistry>;
  
  /**
   * Array of blocks with unique IDs
   */
  private blocks: Array<IdentifiableBlock<BlockTypeRegistry>> = [];
  
  /**
   * The main container element for the editor
   */
  private container: HTMLElement;
  
  /**
   * Options for the UI
   */
  private options: RunikUIOptions;
  
  /**
   * The ID of the currently selected block, if any
   */
  private selectedBlockId: string | null = null;

  /**
   * Creates a new RunikUI instance
   * 
   * @param configuration - The configuration for the underlying Editor
   * @param containerElement - The HTMLElement to render the editor into
   * @param options - Optional UI configuration options
   */
  constructor(
    configuration: EditorConfiguration<BlockTypeRegistry>,
    containerElement: HTMLElement | null = null,
    options: Partial<RunikUIOptions> = {}
  ) {
    this.editor = new Editor<BlockTypeRegistry>(configuration);
    this.options = { ...DEFAULT_RUNIK_UI_OPTIONS, ...options };
    
    // If a container element is provided, use it, otherwise create a new div
    if (containerElement) {
      this.container = containerElement;
    } else {
      this.container = document.createElement('div');
      this.container.className = this.options.containerClass || '';
    }
    
    // Initialize event listeners for keyboard navigation if enabled
    if (this.options.enableKeyboardNavigation) {
      this.setupKeyboardNavigation();
    }
  }

  /**
   * Adds a new block to the editor
   * 
   * @param type - The type of block to add
   * @param data - The data for the block
   * @returns The ID of the newly added block
   */
  addBlock<K extends keyof BlockTypeRegistry>(
    type: K, 
    data: BlockTypeRegistry[K]
  ): string {
    // Generate a unique ID for the block
    const id = generateUUID();
    
    // Add block to the core editor
    this.editor.addBlock(type, data);
    
    // Store the block with its ID in our local blocks array
    this.blocks.push({ id, type, data });
    
    // Re-render the editor to show the new block
    this.render();
    
    return id;
  }

  /**
   * Removes a block from the editor by its ID
   * 
   * @param id - The ID of the block to remove
   */
  removeBlock(id: string): void {
    const index = this.findBlockIndexById(id);
    if (index === -1) {
      throw new Error(`Block with ID "${id}" not found.`);
    }
    
    // Remove from the core editor (by index)
    const editorBlocks = this.editor.getBlocks();
    this.editor.removeBlock(index);
    
    // Remove from our local blocks array
    this.blocks.splice(index, 1);
    
    // Clear selected block if it was the one removed
    if (this.selectedBlockId === id) {
      this.selectedBlockId = null;
    }
    
    // Re-render the editor
    this.render();
  }

  /**
   * Updates the data of a block
   * 
   * @param id - The ID of the block to update
   * @param newData - The new data for the block (partial update)
   */
  updateBlockData<K extends keyof BlockTypeRegistry>(
    id: string, 
    newData: Partial<BlockTypeRegistry[K]>
  ): void {
    const index = this.findBlockIndexById(id);
    if (index === -1) {
      throw new Error(`Block with ID "${id}" not found.`);
    }
    
    const block = this.blocks[index];
    
    // Update our local copy of the data
    block.data = { ...block.data, ...newData };
    
    // Update in the core editor
    // We need to get the current blocks from the editor and update the one at the matching index
    const editorBlocks = this.editor.getBlocks();
    editorBlocks[index].data = block.data;
    
    // Re-render the specific block or the whole editor
    this.render();
  }

  /**
   * Rearranges blocks according to a new order of IDs
   * 
   * @param newOrderIds - Array of block IDs in the desired order
   */
  rearrangeBlocks(newOrderIds: string[]): void {
    if (newOrderIds.length !== this.blocks.length) {
      throw new Error("New order length must match the number of blocks.");
    }
    
    // Map the IDs to their current indices
    const indexMap = new Map<string, number>();
    this.blocks.forEach((block, index) => {
      indexMap.set(block.id, index);
    });
    
    // Convert ID order to index order for the core editor
    const newOrderIndices: number[] = [];
    for (const id of newOrderIds) {
      const index = indexMap.get(id);
      if (index === undefined) {
        throw new Error(`Block with ID "${id}" not found.`);
      }
      newOrderIndices.push(index);
    }
    
    // Rearrange blocks in the core editor
    this.editor.rearrangeBlocks(newOrderIndices);
    
    // Rearrange our local blocks array
    const newBlocks: Array<IdentifiableBlock<BlockTypeRegistry>> = [];
    for (const id of newOrderIds) {
      const block = this.blocks.find(b => b.id === id);
      if (!block) {
        throw new Error(`Block with ID "${id}" not found during rearrange.`);
      }
      newBlocks.push(block);
    }
    this.blocks = newBlocks;
    
    // Re-render the editor
    this.render();
  }

  /**
   * Moves a block up in the order (if not already at the top)
   * 
   * @param id - The ID of the block to move up
   * @returns Boolean indicating success
   */
  moveBlockUp(id: string): boolean {
    const index = this.findBlockIndexById(id);
    if (index === -1) {
      throw new Error(`Block with ID "${id}" not found.`);
    }
    
    if (index === 0) {
      return false; // Already at the top
    }
    
    // Create a new order with this block moved up
    const currentIds = this.blocks.map(block => block.id);
    const newIds = [...currentIds];
    [newIds[index - 1], newIds[index]] = [newIds[index], newIds[index - 1]];
    
    this.rearrangeBlocks(newIds);
    return true;
  }

  /**
   * Moves a block down in the order (if not already at the bottom)
   * 
   * @param id - The ID of the block to move down
   * @returns Boolean indicating success
   */
  moveBlockDown(id: string): boolean {
    const index = this.findBlockIndexById(id);
    if (index === -1) {
      throw new Error(`Block with ID "${id}" not found.`);
    }
    
    if (index === this.blocks.length - 1) {
      return false; // Already at the bottom
    }
    
    // Create a new order with this block moved down
    const currentIds = this.blocks.map(block => block.id);
    const newIds = [...currentIds];
    [newIds[index], newIds[index + 1]] = [newIds[index + 1], newIds[index]];
    
    this.rearrangeBlocks(newIds);
    return true;
  }

  /**
   * Clears all blocks from the editor
   */
  clearBlocks(): void {
    this.editor.clearBlocks();
    this.blocks = [];
    this.selectedBlockId = null;
    this.render();
  }

  /**
   * Renders the editor into its container
   * 
   * @returns The container element with the rendered editor
   */
  render(): HTMLElement {
    // Clear the container first
    this.container.innerHTML = '';
    
    // Get the rendered content from the core editor
    const editorContent = this.editor.render();
    
    // Extract the individual block elements
    // We know the editor's render() method creates a single div containing all blocks
    const blockElements = Array.from(editorContent.children);
    
    // Create block wrappers with controls for each block
    blockElements.forEach((blockElement, index) => {
      const block = this.blocks[index];
      if (!block) {
        console.error('Block data missing for rendered element', blockElement);
        return;
      }
      
      // Store a reference to the rendered element
      block.element = blockElement as HTMLElement;
      
      // Create a wrapper for the block with controls
      const wrapper = this.createBlockWrapper(block, blockElement as HTMLElement);
      this.container.appendChild(wrapper);
    });
    
    // Setup drag and drop if enabled
    if (this.options.enableDragAndDrop) {
      this.setupDragAndDrop();
    }
    
    return this.container;
  }

  /**
   * Selects a block by its ID
   * 
   * @param id - The ID of the block to select
   */
  selectBlock(id: string | null): void {
    // Clear previous selection
    if (this.selectedBlockId) {
      const prevSelectedWrapperEl = this.container.querySelector(`[data-block-id="${this.selectedBlockId}"]`);
      if (prevSelectedWrapperEl) {
        prevSelectedWrapperEl.classList.remove(this.options.selectedBlockClass || '');
      }
    }
    
    this.selectedBlockId = id;
    
    // Apply selection to the new block
    if (id) {
      const wrapperEl = this.container.querySelector(`[data-block-id="${id}"]`);
      if (wrapperEl) {
        wrapperEl.classList.add(this.options.selectedBlockClass || '');
      }
    }
  }

  /**
   * Gets all blocks with their IDs
   * 
   * @returns Array of all blocks with IDs
   */
  getBlocks(): Array<IdentifiableBlock<BlockTypeRegistry>> {
    // Return a copy to prevent external modification
    return this.blocks.map(block => ({ ...block }));
  }

  /**
   * Gets a block by its ID
   * 
   * @param id - The ID of the block to get
   * @returns The block with the given ID, or null if not found
   */
  getBlockById<K extends keyof BlockTypeRegistry>(id: string): IdentifiableBlock<BlockTypeRegistry, K> | null {
    const block = this.blocks.find(b => b.id === id);
    return block ? { ...block } as IdentifiableBlock<BlockTypeRegistry, K> : null;
  }

  /**
   * Gets the editor configuration
   * 
   * @returns The editor configuration
   */
  getConfiguration(): EditorConfiguration<BlockTypeRegistry> {
    return this.editor.getConfiguration();
  }

  /**
   * Gets the container element
   * 
   * @returns The container element
   */
  getContainer(): HTMLElement {
    return this.container;
  }

  /**
   * Gets the currently selected block ID
   * 
   * @returns The selected block ID, or null if none is selected
   */
  getSelectedBlockId(): string | null {
    return this.selectedBlockId;
  }

  /**
   * Finds the index of a block by its ID
   * 
   * @param id - The ID of the block to find
   * @returns The index of the block, or -1 if not found
   */
  private findBlockIndexById(id: string): number {
    return this.blocks.findIndex(block => block.id === id);
  }

  /**
   * Creates a wrapper element for a block with controls
   * 
   * @param block - The block to create a wrapper for
   * @param blockElement - The rendered HTML element for the block
   * @returns The wrapper element
   */
  private createBlockWrapper(
    block: IdentifiableBlock<BlockTypeRegistry>,
    blockElement: HTMLElement
  ): HTMLElement {
    // Create wrapper element
    const wrapper = document.createElement('div');
    wrapper.className = this.options.blockWrapperClass || '';
    wrapper.setAttribute('data-block-id', block.id);
    wrapper.setAttribute('data-block-type', String(block.type));
    
    // Add selection capability
    wrapper.addEventListener('click', (e) => {
      if (e.target === wrapper || e.target === blockElement) {
        this.selectBlock(block.id);
      }
    });
    
    // Add block content
    wrapper.appendChild(blockElement);
    
    // Add block controls if enabled
    if (this.options.blockControls) {
      const controls = this.createBlockControls(block.id);
      wrapper.appendChild(controls);
    }
    
    return wrapper;
  }

  /**
   * Creates control elements for a block
   * 
   * @param blockId - The ID of the block to create controls for
   * @returns The controls container element
   */
  private createBlockControls(blockId: string): HTMLElement {
    const controls = document.createElement('div');
    controls.className = this.options.blockControls?.controlsContainerClass || '';
    
    // Move up button
    if (this.options.blockControls?.showMoveUp) {
      const moveUpBtn = document.createElement('button');
      moveUpBtn.className = this.options.blockControls.controlButtonClass || '';
      moveUpBtn.innerHTML = '↑';
      moveUpBtn.title = 'Move Up';
      moveUpBtn.addEventListener('click', () => this.moveBlockUp(blockId));
      controls.appendChild(moveUpBtn);
    }
    
    // Move down button
    if (this.options.blockControls?.showMoveDown) {
      const moveDownBtn = document.createElement('button');
      moveDownBtn.className = this.options.blockControls.controlButtonClass || '';
      moveDownBtn.innerHTML = '↓';
      moveDownBtn.title = 'Move Down';
      moveDownBtn.addEventListener('click', () => this.moveBlockDown(blockId));
      controls.appendChild(moveDownBtn);
    }
    
    // Edit button
    if (this.options.blockControls?.showEdit) {
      const editBtn = document.createElement('button');
      editBtn.className = this.options.blockControls.controlButtonClass || '';
      editBtn.innerHTML = '✏️';
      editBtn.title = 'Edit';
      editBtn.addEventListener('click', () => this.handleBlockEdit(blockId));
      controls.appendChild(editBtn);
    }
    
    // Delete button
    if (this.options.blockControls?.showDelete) {
      const deleteBtn = document.createElement('button');
      deleteBtn.className = this.options.blockControls.controlButtonClass || '';
      deleteBtn.innerHTML = '🗑️';
      deleteBtn.title = 'Delete';
      deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this block?')) {
          this.removeBlock(blockId);
        }
      });
      controls.appendChild(deleteBtn);
    }
    
    return controls;
  }

  /**
   * Handles the edit action for a block
   * 
   * @param blockId - The ID of the block to edit
   */
  private handleBlockEdit(blockId: string): void {
    // This is a placeholder for block editing functionality
    // In a real implementation, this would open a modal or inline editor
    // with form fields specific to the block type
    
    const block = this.getBlockById(blockId);
    if (!block) {
      console.error(`Block with ID "${blockId}" not found.`);
      return;
    }
    
    // Simple example for text blocks - could be much more sophisticated
    if (block.type === 'text' && 'content' in block.data) {
      const newContent = prompt('Edit text content:', block.data.content as string);
      if (newContent !== null) {
          this.updateBlockData(blockId, { content: newContent } as any);
      }
    } else {
      alert(`Editing blocks of type "${String(block.type)}" is not implemented in this demo.`);
    }
  }

  /**
   * Sets up keyboard navigation between blocks
   */
  private setupKeyboardNavigation(): void {
    this.container.addEventListener('keydown', (e) => {
      if (!this.selectedBlockId) return;
      
      const index = this.findBlockIndexById(this.selectedBlockId);
      if (index === -1) return;
      
      // Arrow up - select previous block
      if (e.key === 'ArrowUp' && index > 0) {
        e.preventDefault();
        this.selectBlock(this.blocks[index - 1].id);
      }
      
      // Arrow down - select next block
      if (e.key === 'ArrowDown' && index < this.blocks.length - 1) {
        e.preventDefault();
        this.selectBlock(this.blocks[index + 1].id);
      }
      
      // Delete - remove block
      if (e.key === 'Delete' && e.ctrlKey) {
        e.preventDefault();
        if (confirm('Are you sure you want to delete this block?')) {
          this.removeBlock(this.selectedBlockId);
        }
      }
    });
  }

  /**
   * Sets up drag and drop functionality for blocks
   */
  private setupDragAndDrop(): void {
    // This is a basic implementation of drag and drop
    // A more sophisticated implementation would use a dedicated drag-and-drop library
    
    const blockWrappers = this.container.querySelectorAll(`.${this.options.blockWrapperClass}`);
    
    blockWrappers.forEach((wrapper) => {
      wrapper.setAttribute('draggable', 'true');
      
        wrapper.addEventListener('dragstart', (e: Event) => {
          const dragEvent = e as DragEvent;
          const target = dragEvent.target as HTMLElement;
          const blockId = target.getAttribute('data-block-id');
          if (!blockId) return;
          
          // Store the ID of the dragged block
          dragEvent.dataTransfer?.setData('text/plain', blockId);
          
          // Apply a dragging class
          target.classList.add('runik-dragging');
        });
        
        wrapper.addEventListener('dragend', (e: Event) => {
          const dragEvent = e as DragEvent;
          const target = dragEvent.target as HTMLElement;
          target.classList.remove('runik-dragging');
        });
        
        wrapper.addEventListener('dragover', (e: Event) => {
          e.preventDefault(); // Allow drop
          const dragEvent = e as DragEvent;
          const target = dragEvent.target as HTMLElement;
          const closestWrapper = target.closest(`.${this.options.blockWrapperClass}`);
          if (closestWrapper) {
            closestWrapper.classList.add('runik-drag-over');
          }
        });
        
        wrapper.addEventListener('dragleave', (e: Event) => {
          const dragEvent = e as DragEvent;
          const target = dragEvent.target as HTMLElement;
          const closestWrapper = target.closest(`.${this.options.blockWrapperClass}`);
          if (closestWrapper) {
            closestWrapper.classList.remove('runik-drag-over');
          }
        });
        
        wrapper.addEventListener('drop', (e: Event) => {
        e.preventDefault();
        
        const dragEvent = e as DragEvent;
        const target = dragEvent.target as HTMLElement;
        const dropTarget = target.closest(`.${this.options.blockWrapperClass}`);
        if (!dropTarget) return;
        
        dropTarget.classList.remove('runik-drag-over');
        
        const draggedBlockId = dragEvent.dataTransfer?.getData('text/plain');
        const targetBlockId = dropTarget.getAttribute('data-block-id');
        
        if (!draggedBlockId || !targetBlockId || draggedBlockId === targetBlockId) return;
        
        // Get current order of blocks
        const blockIds = this.blocks.map(b => b.id);
        const draggedIndex = blockIds.indexOf(draggedBlockId);
        const targetIndex = blockIds.indexOf(targetBlockId);
        
        if (draggedIndex === -1 || targetIndex === -1) return;
        
        // Remove the dragged block from the array
        blockIds.splice(draggedIndex, 1);
        
        // Insert it at the target position
        blockIds.splice(targetIndex, 0, draggedBlockId);
        
        // Rearrange the blocks
        this.rearrangeBlocks(blockIds);
      });
    });
  }
}
