# Editor Configuration

The `EditorConfiguration` type defines the structure for configuring an extensible block-based editor. It maps block types to their validation logic, rendering logic, and optional extension points such as metadata and lifecycle hooks. This abstraction allows for editors that can output in various formats (such as HTML, LaTeX, or Markdown), using a consistent and modular configuration structure.

---

## Type Parameters

* **`U`** – The output format type. Determines the return type of rendering functions (e.g., `string` for HTML or LaTeX output).
* **`T`** – A registry of block types, extending `BlockTypeRegistry`. It defines the shape of the data structure for each block and links the configuration to its semantic types.

---

## Structure

```typescript
export type EditorConfiguration<
  U,
  T extends Record<string, any> = BlockTypeRegistry
> = {
  [K in keyof T]: {
    validator: (data: T[K]) => boolean;
    renderer: RendererRegistry<U, T>[K];
    metadata?: Record<string, any>;
    hooks?: Record<string, (...args: any[]) => any>;
    [key: string]: any;
  };
};
```

Each key `K` in `T` corresponds to a block type (such as `"paragraph"` or `"image"`), and its value is an object containing:

* **`validator`**: A function to validate whether a block's data matches its expected shape.
* **`renderer`**: A function responsible for rendering the block into the desired output format `U`.
* **`metadata`** (optional): An object for storing arbitrary data about the block (e.g., versioning, categorization).
* **`hooks`** (optional): A dictionary of lifecycle or utility functions such as `onCreate`, `onUpdate`, etc.
* **Additional fields**: The structure is open to additional configuration keys, enabling extensibility for editor-specific needs.

---

## Example

```typescript
const config: EditorConfiguration<string, MyBlocks> = {
  paragraph: {
    validator: (data) => typeof data.text === 'string',
    renderer: (data) => `<p>${data.text}</p>`,
    metadata: { category: 'text', version: '1.0' },
    hooks: { onCreate: (data) => console.log('Paragraph created') }
  },
  image: {
    validator: (data) => !!data.src && !!data.alt,
    renderer: (data) => `<img src="${data.src}" alt="${data.alt}" />`,
    metadata: { category: 'media' }
  }
};
```

---

## Use Case

`EditorConfiguration` provides a unified way to define how different blocks behave inside an editor. It is especially useful in contexts such as:

* Markdown/WYSIWYG editors with pluggable block types
* Educational tools generating HTML/LaTeX content from structured input
* Static site generators or content compilers with custom block rendering pipelines

This type serves as the core interface for controlling how content is validated, rendered, and extended within the system.
