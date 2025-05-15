# Runik

Runik is a web-based block editor designed to simplify content creation by providing extensibility through plugins and themes. It allows users to create, manage, and render content blocks of various types, making it a versatile tool for developers and content creators alike.

## Features

- **Block-Based Editing**: Manage content as discrete blocks, each with its own type and data structure.
- **Extensibility**: Add custom plugins and themes to enhance functionality and appearance.
- **Customizable Renderers**: Define how each block type is visually rendered using custom renderers.
- **Type Safety**: Built with TypeScript, ensuring type safety for block data and configurations.
- **UI Controls**: Built-in controls for moving, editing, and deleting blocks.
- **Drag and Drop**: Intuitive drag and drop interface for rearranging blocks.
- **Keyboard Navigation**: Navigate and manage blocks using keyboard shortcuts.

## Installation
- **Reordering and Management**: Add, remove, rearrange, and clear blocks with ease.
- **Rendering**: Render blocks into HTML elements for seamless integration into web applications.

## Getting Started

### Prerequisites

To use or develop Runik, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [TypeScript](https://www.typescriptlang.org/) (v5.8.3 or later)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/iskdevelop/runik.git
cd runik
npm install
```

### Building the Project

To compile the TypeScript code, run:

```bash
npm run build
```

### Running Tests

Run the test suite using:

```bash
npm test
```

## Usage

### Example: Creating an Editor

Below is an example of how to use Runik to create an editor with text and image blocks:

```typescript
import { Editor } from "./core/src/types/editor/editor";
import { EditorConfiguration } from "./core/src/types/editor/editorConfiguration";

interface TextBlock {
    content: string;
}

interface ImageBlock {
    url: string;
    alt: string;
}

type BlockTypeRegistry = {
    text: TextBlock;
    image: ImageBlock;
};

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

const editor = new Editor(editorConfiguration);

editor.addBlock("text", { content: "Hello, world!" });
editor.addBlock("image", { url: "https://example.com/image.jpg", alt: "Example Image" });

document.body.appendChild(editor.render());
```

### Extending Runik

You can extend Runik by:

1. **Adding New Block Types**: Define new block types and their associated data structures.
2. **Custom Renderers**: Implement custom rendering logic for new or existing block types.
3. **Plugins**: Create plugins to add new functionality to the editor.

## Contributing

We welcome contributions to Runik! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push them to your fork.
4. Submit a pull request with a detailed description of your changes.

### Development Guidelines

- Follow the [TypeScript Style Guide](https://typescript-eslint.io/rules/).
- Write unit tests for new features or bug fixes.
- Ensure all tests pass before submitting a pull request.

## License

Runik is licensed under the [GNU General Public License v3.0](./LICENSE).

## Contact

For questions or support, please open an issue on [GitHub](https://github.com/iskdevelop/runik/issues).

## Acknowledgments

Runik is developed and maintained by the Independent Society of Knowledge. We thank all contributors for their support and feedback.
