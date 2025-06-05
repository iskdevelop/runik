import {EditorConfiguration} from "./editorConfiguration";
import {BlockTypeRegistry} from "../block/blockTypeRegistry";
import {Block} from "../block/block";


/** TODO not sure what should I implement here. I want it to only get a editor configuration type and then builds everything from it.
 * But maybe I can do better than that... I don't know for now.:wq
 */
export abstract class Editor<U,T extends Record<string, any> = BlockTypeRegistry,M extends Record<string, any> = EditorConfiguration<U, T>> {

    blocks: Block<U, T[keyof T]>[] = []
    length: number = 0





}