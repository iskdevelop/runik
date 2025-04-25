import {Editor} from "../types/editor/editor";

/**
 * Serializes an `Editor` object into a JSON object.
 * This function takes an `Editor` object as input,
 * and returns a JSON object representation of the editor.
 * @template T - The type of the editor.
 * @param editor - The `Editor` object to serialize.
 * @returns {JSON} - The serialized JSON object.
 */
export function serializeEditor<T>(editor: Editor<T & Record<string, any>>) {
    // Convert the editor object to a JSON string
    const jsonString = JSON.stringify(editor, (key, value) => {
        // Handle circular references or complex objects here if needed
        return value;
    });

    // Return the parsed editor as a JSON object
    return JSON.parse(jsonString);
}

