import {Block} from "./block";

export interface RegexBlock extends Block {
	// Identification values.
	// // ID of the block (to be set in editor and managed by it.
	id: String;
	// // Type of the block (to be defined by the library user to define different types of blocks.
	type: String;
	// // List of class names that would let the library user style the html. Use Scss for internal stylings (code highlight etc.).
	classNames: String[];
	// //  Introducing MetaData
	meta: Map<String, String>;

	// The content that the user provides to the block, which is to be rendered based on the render function.
	rawContent: String;
	// The content that the render function provides (can be null because of error handling)
	renderedContent: String | null;
	
	// Regex rendering pattern:
	regexPattern: String;
	// Regex applying functions. This would be useful for implementing pre and post rendering content adjustments.
	applyRegex(): String;

	// For inline adjustments of the block before rendering the whole (e.g bold, italic renders)
	inlineRender(): String;

	// Rendering the block and returning HTML.
	render(): String;

	// meta-methods: to enhance code development only.
	isOfType(type: String): Boolean
	
	
}
