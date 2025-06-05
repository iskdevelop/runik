# Block Type Registry

A fundamental step in building a content editor is defining the types of content blocks it will support. For example, a Markdown editor typically includes support for headings, paragraphs, code blocks, mathematical expressions, images, videos, and other multimedia content.

**Runik** introduces a generic and extensible concept called the `BlockTypeRegistry`, which provides a flexible structure for registering and managing these content block types along with their associated data models.

### Definition

```typescript
export type BlockTypeRegistry = {
    [key: string]: any;
}
```

Each key in the `BlockTypeRegistry` represents a unique identifier for a block type (e.g., `"paragraph"`, `"image"`, `"heading"`), while the corresponding value defines the data structure or configuration required to render and manipulate that block.

### Example Usage

```typescript
import { BlockTypeRegistry } from "./blockTypeRegistry";

const MyBlocks: BlockTypeRegistry = {
    "paragraph": { content: "string" },
    "heading": { mode: "number", content: "string" },
    "image": { src: "string", alt: "string", width: "string" }
    // Additional block types can be defined as needed
};
```

This approach allows developers to create editors tailored to specific domains or applications—far beyond the scope of generic text editing. By using a well-defined registry, specialized editors can be built for scientific writing, technical documentation, educational content, or any custom workflow that demands domain-specific block types.
