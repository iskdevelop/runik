// Define block types
import {Editor} from "../core/src/types/editor/editor";
import {EditorConfiguration} from "../core/src/types/editor/editorConfiguration";

interface TextBlock {
    content: string;
}

interface ImageBlock {
    url: string;
    alt: string;
}

// Create a block type registry
type BlockTypeRegistry = {
    text: TextBlock;
    image: ImageBlock;
};

// Define the editor configuration
const editorConfiguration: EditorConfiguration<BlockTypeRegistry> = {
    blockTypes: {
        text: { content: "" },
        image: { url: "", alt: "" },
    },
    visualRenderer: {
        renderers: {
            text: (data: TextBlock): HTMLElement => {
                const p = document.createElement("p");
                p.textContent = data.content;
                return p;
            },
            image: (data: ImageBlock): HTMLElement => {
                const img = document.createElement("img");
                img.src = data.url;
                img.alt = data.alt;
                return img;
            },
        },
    },
};

// Create the editor
const editor = new Editor(editorConfiguration);

// Add blocks
editor.addBlock("text", { content: "Hello, world!" });
editor.addBlock("image", { url: "https://example.com/image.jpg", alt: "Example Image" });

// Render the editor
document.body.appendChild(editor.render());