import React, { forwardRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";
import SlashCommands from "./CustomExtensions/SlashCommands/ExtensionConfig";

const Tiptap = (props, ref) => {
	const editor = useEditor({
		extensions: props.extensions || [
			StarterKit,
			Typography,
			Placeholder.configure({
				placeholder: "Type '/' to choose a block type",
			}),
			SlashCommands,
		],
		content: null,
		injectCSS: false,
		editorProps: {
			attributes: {
				class: "prose m-5 focus:outline-none",
			},
		},
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
