/**
 * Interface for block controls configuration
 */
export interface BlockControls {
  /**
   * CSS class for the controls container
   */
  controlsContainerClass: string;
  
  /**
   * CSS class for control buttons
   */
  controlButtonClass: string;
  
  /**
   * Whether to show the move up button
   */
  showMoveUp: boolean;
  
  /**
   * Whether to show the move down button
   */
  showMoveDown: boolean;
  
  /**
   * Whether to show the edit button
   */
  showEdit: boolean;
  
  /**
   * Whether to show the delete button
   */
  showDelete: boolean;
  
  /**
   * Whether to show the duplicate button
   */
  showDuplicate?: boolean;
  
  /**
   * Custom controls to add
   */
  customControls?: Array<{
    /**
     * Label or icon for the button
     */
    label: string;
    
    /**
     * Title/tooltip for the button
     */
    title: string;
    
    /**
     * Handler to execute when the button is clicked
     */
    handler: (blockId: string) => void;
  }>;
}

/**
 * Interface for optional configuration of block controls
 * Used when providing partial configuration
 */
export interface BlockControlsOptions {
  /**
   * Whether to show the move up button
   */
  showMoveUp?: boolean;
  
  /**
   * Whether to show the move down button
   */
  showMoveDown?: boolean;
  
  /**
   * Whether to show the delete button
   */
  showDelete?: boolean;
  
  /**
   * Whether to show the edit button
   */
  showEdit?: boolean;
  
  /**
   * Whether to show the duplicate button
   */
  showDuplicate?: boolean;
  
  /**
   * CSS class for the controls container
   */
  controlsContainerClass?: string;
  
  /**
   * CSS class for control buttons
   */
  controlButtonClass?: string;
  
  /**
   * Custom controls to add
   */
  customControls?: Array<{
    label: string;
    title: string;
    handler: (blockId: string) => void;
  }>;
}

/**
 * Default options for block controls
 */
export const DEFAULT_BLOCK_CONTROLS_OPTIONS: BlockControlsOptions = {
  showMoveUp: true,
  showMoveDown: true,
  showDelete: true,
  showEdit: true,
  controlsContainerClass: 'runik-block-controls',
  controlButtonClass: 'runik-control-button'
};
