/**
 * Runik - A web-based block editor with extensibility through plugins and themes
 * 
 * This is the main entry point for the Runik editor.
 */

// Core editor classes
export { Editor } from './types/editor/editor';
export type { EditorConfiguration, EditorPlugin } from './types/editor/editorConfiguration';

// UI components and types
export { RunikUI } from './ui/runikUI';
export type { RunikUIOptions } from './types/ui/runikUIOptions';
export type { BlockControls, BlockControlsOptions } from './types/ui/blockControls';
export { DEFAULT_RUNIK_UI_OPTIONS } from './types/ui/runikUIOptions';
export { DEFAULT_BLOCK_CONTROLS_OPTIONS } from './types/ui/blockControls';

// Utility functions
export { generateUUID } from './utils/idGenerator';
