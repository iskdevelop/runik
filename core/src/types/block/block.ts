import {BlockTypeRegistry} from "./blockTypeRegistry";

/**
 * Actualization of a block in an editor
 */
export class Block<U, T> {
    id: number
    raw: T
    rendered?: U

    constructor(id: number, raw: T, rendered: U) {
        this.id = id
        this.raw = raw
        this.rendered = rendered
    }
}
