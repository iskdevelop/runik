import {EditorConfiguration} from "../types/editor/editorConfiguration";

/**
 * Deserializes a JSON object into an `EditorConfiguration` object.
 * This function takes a JSON object as input,
 * and returns an `EditorConfiguration` object of the specified type.
 * @template BlockTypes - The type of the blocks in the editor.
 * @param json - The JSON object to deserialize.
 * @returns {EditorConfiguration<BlockTypes & Record<string, any>>} - The deserialized `EditorConfiguration` object.
 */
export function deserializeConfiguration<BlockTypes>(json: JSON): EditorConfiguration<BlockTypes> {
    // Convert the JSON object back to the configuration object
    const config = JSON.parse(JSON.stringify(json)) as EditorConfiguration<BlockTypes>;

    // Return the configuration object
    return config;
}