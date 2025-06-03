import {BlockTypeRegistry} from "./blockTypeRegistry";

/**
 * Registry that maps block types to their corresponding renderer functions.
 * Keys are constrained to match those defined in BlockTypeRegistry, ensuring
 * each block type has a matching renderer with proper type safety.
 *
 * @typeParam U - The return type of each renderer function (e.g., JSX.Element, string).
 *
 * @example
 * const renderers: RendererRegistry<JSX.Element> = {
 *   paragraph: (data) => <p>{data.text}</p>,
 *   image: (data) => <img src={data.src} alt={data.alt} />,
 *   button: (data) => <button onClick={data.onClick}>{data.label}</button>
 * };
 */
export type RendererRegistry<U> = {
    [K in keyof BlockTypeRegistry]: (data: BlockTypeRegistry[K]) => U
}