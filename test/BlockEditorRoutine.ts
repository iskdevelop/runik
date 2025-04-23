
// Define block types
import { Editor } from "../core/src/types/editor/editor";
import { EditorConfiguration } from "../core/src/types/editor/editorConfiguration";

interface TextBlock {
    content: string;
}

interface ImageBlock {
    url: string;
    alt: string;
}

// Create a block type registry
/**
 * A registry mapping block type names to their respective data structures.
 */
type BlockTypeRegistry = {
    text: TextBlock;
    image: ImageBlock;
};

// Define the editor configuration
/**
 * The configuration object for the editor, defining block types and their renderers.
 */
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
/**
 * An instance of the `Editor` class, configured with the block type registry.
 */
const editor = new Editor(editorConfiguration);

// Add blocks
/**
 * Adds a text block to the editor.
 */
editor.addBlock("text", { content: "Hello, world!" });

/**
 * Adds an image block to the editor.
 */
editor.addBlock("image", { url: "https://example.com/image.jpg", alt: "Example Image" });

// Render the editor
/**
 * Renders the editor's blocks and appends them to the document body.
 */
document.body.appendChild(editor.render());
