export interface EditorConfiguration<BlockTypeRegistry> {
    blockTypes: BlockTypeRegistry
    visualRenderer: {
        renderers: {
            [K in keyof BlockTypeRegistry]: (data: BlockTypeRegistry[K]) => HTMLElement;
        };
    };
    validators?: {
        [K in keyof BlockTypeRegistry]?: (data: BlockTypeRegistry[K]) => boolean;
    };
}
