import {BlockTypeRegistry} from "./blockTypeRegistry";

/**
 * Generic wrapper registry that encapsulates comprehensive functionality for block types.
 * Provides extensible architecture for block management including validation, transformation,
 * rendering options, plugin integration, lifecycle hooks, and custom extensions.
 *
 * @template TBlockRegistry - The block type registry to wrap
 * @example
 * const blockWrappers: BlockWrapperRegistry<MyBlockRegistry> = {
 *   paragraph: {
 *     validate: (data) => typeof data.text === 'string',
 *     transform: (data) => ({ ...data, sanitized: true }),
 *     rendering: {
 *       wrapper: 'div',
 *       className: 'paragraph-block',
 *       parent: { element: 'section', attributes: { class: 'content' } }
 *     },
 *     plugins: [spellCheckPlugin, autoSavePlugin],
 *     metadata: { category: 'text', version: '1.0' },
 *     hooks: { onCreate: fn, onUpdate: fn },
 *     customProperty: 'any value'
 *   }
 * }
 */
export type BlockWrapperRegistry<TBlockRegistry extends Record<string, any> = BlockTypeRegistry> = {
    [K in keyof TBlockRegistry]: {
        validate?: (data: TBlockRegistry[K]) => boolean;
        transform?: (data: TBlockRegistry[K]) => TBlockRegistry[K];
        rendering?: {
            element?: string;
            className?: string;
            attributes?: Record<string, any>;
            parent?: {
                element?: string;
                attributes?: Record<string, any>;
            };
            [key: string]: any;
        };
        plugins?: Array<any>;
        metadata?: Record<string, any>;
        hooks?: Record<string, (...args: any[]) => any>;
        [key: string]: any;
    }
}