import {Block} from "./block";

interface BlockWrapper<T ,U extends Record<string, any>> {
    blockId: Number
    content: Block<T, U>
}
