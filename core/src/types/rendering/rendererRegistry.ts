import {BlockTypeRegistry} from "../block/blockTypeRegistry";

/**
 * RendererRegistry is a type that maps block types to renderer functions.
 *
 * It defines how each block type in the BlockTypeRegistry should be rendered by associating
 * each block with a function that takes its data and returns a rendered output of type U.
 *
 * @template U - The output type of each renderer function (e.g., JSX.Element, HTML string, VNode).
 * @template T - The input block registry; defaults to BlockTypeRegistry.
 *
 * @example
 * const renderers: RendererRegistry<JSX.Element> = {
 *   paragraph: (data) => <p>{data.text}</p>,
 *   image: (data) => <img src={data.url} alt={data.alt} />,
 * };
 */
export type RendererRegistry<
    U,
    T = BlockTypeRegistry
> = {
    [K in keyof T]: (data: T[K]) => U
}
