import {BlockTypeRegistry} from "../block/blockTypeRegistry";

/**
 * Registry that maps block types to their corresponding renderer functions.
 * Keys are constrained to match those defined in BlockTypeRegistry, ensuring
 * each block type has a matching renderer with proper type safety.
 *
 * @typeParam U - The return type of each renderer function (e.g., JSX.Element, string).
 * @typeParam T - Block type registry of choice
 *
 * @example
 * const renderers: RendererRegistry<JSX.Element, MyBlockRegistry> = {
 *   paragraph: (data) => <p>{data.text}</p>,
 *   image: (data) => <img src={data.src} alt={data.alt} />,
 *   button: (data) => <button onClick={data.onClick}>{data.label}</button>
 * };
 */
export type RendererRegistry<
    U,
    T = BlockTypeRegistry
> = {
    [K in keyof T]: (data: T[K]) => U
}
