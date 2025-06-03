import {EditorConfiguration} from "./editorConfiguration";
import {BlockTypeRegistry} from "../block/blockTypeRegistry";


export interface Editor<
    U,
    T extends Record<string, any> = BlockTypeRegistry
> {
    configuration: EditorConfiguration<U, T>

}