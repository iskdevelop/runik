import {Editor} from "../types/editor/editor";

/**
 * Deserializes a JSON object into an `Editor` object.
 * This function takes a JSON object as input,
 * and returns an `Editor` object of the specified type.
 * @template T - The type of the editor.
 * @param json - The JSON object to deserialize.
 * @returns {Editor<T & Record<string, any>>} - The deserialized `Editor` object.
 */
export function deserializeEditor<T>(json: JSON): Editor<T & Record<string, any>> {
    // Convert the JSON object back to the editor object
    const editor = JSON.parse(JSON.stringify(json)) as Editor<T & Record<string, any>>;

    // Return the editor object
    return editor;
}