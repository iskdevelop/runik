import { EditorConfiguration } from "./editorConfiguration";

export class Editor<BlockTypeRegistry extends Record<string, any>> {
    private blocks: Array<{ type: keyof BlockTypeRegistry; data: any }> = [];
    public configuration: EditorConfiguration<BlockTypeRegistry>;

    constructor(configuration: EditorConfiguration<BlockTypeRegistry>) {
        this.configuration = configuration;
    }

    addBlock<K extends keyof BlockTypeRegistry>(type: K, data: BlockTypeRegistry[K]): void {
        if (!this.configuration.blockTypes[type]) {
            throw new Error(`Block type "${String(type)}" is not defined in the configuration.`);
        }
        this.blocks.push({ type, data });
    }

    render(): HTMLElement {
        const container = document.createElement("div");
        this.blocks.forEach((block) => {
            const renderer = this.configuration.visualRenderer.renderers[block.type];
            if (renderer) {
                container.appendChild(renderer(block.data));
            }
        });
        return container;
    }
}