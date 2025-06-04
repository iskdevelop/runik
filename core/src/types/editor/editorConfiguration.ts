import {BlockTypeRegistry} from "../block/blockTypeRegistry";
import {RendererRegistry} from "../rendering/rendererRegistry";

/**
 * Configuration type for an editor, this would help us initiate editors for different purposes.
 * Maps each block type to its validation, rendering, and extension capabilities.
 *
 * @typeParam U - Output format type (HTML, LaTeX, etc.) - enables multiple output formats from the same editor
 * @typeParam T - Block type registry defining available block types and their data structures
 *
 * @example
 * const config: EditorConfiguration<string, MyBlocks> = {
 *   paragraph: {
 *     validator: (data) => typeof data.text === 'string',
 *     renderer: (data) => `<p>${data.text}</p>`,
 *     metadata: { category: 'text', version: '1.0' },
 *     hooks: { onCreate: (data) => console.log('Paragraph created') }
 *   },
 *   image: {
 *     validator: (data) => data.src && data.alt,
 *     renderer: (data) => `<img src="${data.src}" alt="${data.alt}" />`,
 *     metadata: { category: 'media' }
 *   }
 * }
 */
export type EditorConfiguration<
    U,
    T extends Record<string, any> = BlockTypeRegistry
> = {
    blocks: {
        [K in keyof T]: {
            validator: (data: T[K]) => boolean;
            renderer: RendererRegistry<U, T>[K];
            metadata?: Record<string, any>;
        }
    };
    mutations: {
        addBlock: (index: number, block: T[keyof T]) => void
        removeBlock: (index: number) => void
        updateBlock: (index: number, block: T[keyof T]) => void
        reorder: (startIndex: number, finalIndex: number) => void
    };
    processes: {
        init: {
            [K: string]: any;
        };
        pre: {
            [K: string]: any;
        };
        post: {
            [K: string]: any;
        };
        final: {
            [K: string]: any
        };
    };
    plugins: {
        // To be written
        [key: string]: any;
    };
    themes: {
        // To be written
        [key: string]: any;
    }
}

