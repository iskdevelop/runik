# Renderer Registry

The `RendererRegistry<U>` is a generic type that defines a strongly-typed mapping between block types—defined in the `BlockTypeRegistry`—and their corresponding renderer functions. Each renderer receives a well-typed data object (based on the specific block type) and returns a value of type `U`, which can be a React element, HTML string, or any other renderable format depending on your rendering engine.

### Type Definition

```typescript
export type RendererRegistry<U> = {
    [K in keyof BlockTypeRegistry]: (data: BlockTypeRegistry[K]) => U;
};
```

### Key Benefits

* **Full Type Inference:**
  Each renderer function receives a `data` object whose shape is inferred directly from the corresponding entry in the `BlockTypeRegistry`. This provides tight coupling between the data model and its renderer, ensuring changes in one are immediately reflected in the other through compile-time errors.

* **Generic Return Type:**
  The generic parameter `U` allows the registry to support different rendering backends (e.g., React, Vue, plain HTML, or even CLI rendering), making it flexible and reusable across different environments or layers of your editor architecture.

* **Safer and More Maintainable:**
  By enforcing a one-to-one mapping between block types and renderers—with type-checked inputs and outputs—you eliminate whole classes of bugs and significantly ease future refactoring.

### Example

```tsx
const renderers: RendererRegistry<JSX.Element> = {
  paragraph: (data) => <p>{data.content}</p>,
  image: (data) => <img src={data.src} alt={data.alt} width={data.width} />,
  heading: (data) => <h1 style={{ fontSize: `${data.mode + 1}em` }}>{data.content}</h1>
};
```