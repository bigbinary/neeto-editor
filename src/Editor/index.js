import React, { forwardRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import SlashCommands from "./CustomExtensions/SlashCommands/ExtensionConfig";

const Tiptap = (props, ref) => {
	const editor = useEditor({
		extensions: props.extensions || [StarterKit, Typography, SlashCommands],
		content: "<p>Hello World! 🌎️</p>",
		injectCSS: false,
	});

	/* Make editor object available to the parent */
	React.useImperativeHandle(ref, () => ({
		editor: editor,
	}));

	return (
		<>
			<EditorContent editor={editor} />
		</>
	);
};

export default React.forwardRef(Tiptap);
