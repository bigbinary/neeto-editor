import Commands from "./Commands";
import CommandsList from "./CommandsList";
import tippy from "tippy.js";
import { useEditor, EditorContent, ReactRenderer } from "@tiptap/react";

export default Commands.configure({
	HTMLAttributes: {
		class: "commands",
	},
	suggestion: {
		items: (query) => {
			return [
				{
					title: "H1",
					command: ({ editor, range }) => {
						editor
							.chain()
							.focus()
							.deleteRange(range)
							.setNode("heading", { level: 1 })
							.run();
					},
				},
				{
					title: "H2",
					command: ({ editor, range }) => {
						editor
							.chain()
							.focus()
							.deleteRange(range)
							.setNode("heading", { level: 2 })
							.run();
					},
				},
				{
					title: "bold",
					command: ({ editor, range }) => {
						editor.chain().focus().deleteRange(range).setMark("bold").run();
					},
				},
				{
					title: "italic",
					command: ({ editor, range }) => {
						editor.chain().focus().deleteRange(range).setMark("italic").run();
					},
				},
			]
				.filter((item) =>
					item.title.toLowerCase().startsWith(query.toLowerCase())
				)
				.slice(0, 10);
		},
		render: () => {
			let reactRenderer;
			let popup;

			return {
				onStart: (props) => {
					reactRenderer = new ReactRenderer(CommandsList, {
						props,
						editor: props.editor,
					});

					popup = tippy("body", {
						getReferenceClientRect: props.clientRect,
						appendTo: () => document.body,
						content: reactRenderer.element,
						showOnCreate: true,
						interactive: true,
						trigger: "manual",
						placement: "bottom-start",
					});
				},
				onUpdate(props) {
					reactRenderer.updateProps(props);

					popup[0].setProps({
						getReferenceClientRect: props.clientRect,
					});
				},
				onKeyDown(props) {
					return reactRenderer.ref?.onKeyDown(props);
				},
				onExit() {
					popup[0].destroy();
					reactRenderer.destroy();
				},
			};
		},
	},
});
