import type { BlockControls, BlockControlsOptions } from './blockControls';
import { DEFAULT_BLOCK_CONTROLS_OPTIONS } from './blockControls';

/**
 * Configuration options for the RunikUI
 * 
 * Provides configuration for the user interface surrounding the editor,
 * including container styling, block controls, and interaction options.
 */
export interface RunikUIOptions {
  /**
   * CSS class for the editor container
   */
  containerClass?: string;
  
  /**
   * CSS class for block wrappers
   */
  blockWrapperClass?: string;
  
  /**
   * CSS class for selected blocks
   */
  selectedBlockClass?: string;
  
  /**
   * Whether to enable drag and drop functionality for blocks
   */
  enableDragAndDrop?: boolean;
  
  /**
   * Whether to enable keyboard navigation between blocks
   */
  enableKeyboardNavigation?: boolean;
  
  /**
   * Configuration for block controls
   * Can be either a full BlockControls object or a partial BlockControlsOptions
   */
  blockControls?: BlockControls | BlockControlsOptions;
}

/**
 * Default configuration options for RunikUI
 */
export const DEFAULT_RUNIK_UI_OPTIONS: RunikUIOptions = {
  containerClass: 'runik-editor-container',
  blockWrapperClass: 'runik-block-wrapper',
  selectedBlockClass: 'runik-block-selected',
  enableDragAndDrop: true,
  enableKeyboardNavigation: true,
  blockControls: {
    controlsContainerClass: 'runik-block-controls',
    controlButtonClass: 'runik-control-button',
    showMoveUp: true,
    showMoveDown: true,
    showEdit: true,
    showDelete: true,
  },
};