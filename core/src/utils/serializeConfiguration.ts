import {EditorConfiguration} from "../types/editor/editorConfiguration";

/**
 * Serializes an `EditorConfiguration` object into a JSON object.
 * This function takes an `EditorConfiguration` object as input,
 * and returns a JSON object representation of the configuration.
 * @template BlockTypes - The type of the blocks in the editor.
 * @param config - The `EditorConfiguration` object to serialize.
 * @returns {JSON} - The serialized JSON object.
 */
export function serializeConfiguration<BlockTypes>(config: EditorConfiguration<BlockTypes>): JSON {
    // Convert the configuration object to a JSON string
    const jsonString = JSON.stringify(config, (key, value) => {
        // Handle circular references or complex objects here if needed
        return value;
    });

    // Return the parsed configuration as a JSON object
    return JSON.parse(jsonString);
}


