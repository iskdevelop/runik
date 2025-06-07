import {BlockTypeRegistry} from "../block/blockTypeRegistry";
import {RendererRegistry} from "../rendering/rendererRegistry";

/**
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
    plugins: {
        // To be written
        [key: string]: any;
    };
    themes: {
        // To be written
        [key: string]: any;
    }
}

