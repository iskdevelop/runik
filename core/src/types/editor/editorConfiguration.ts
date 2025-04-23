export interface EditorConfiguration<BlockTypeRegistry> {
    visualRenderer: {
        renderers: {
            [K in keyof BlockTypeRegistry]: (data: BlockTypeRegistry[K]) => HTMLElement;
        };
    };
    validators?: {
        [K in keyof BlockTypeRegistry]?: (data: BlockTypeRegistry[K]) => boolean;
    };
}
