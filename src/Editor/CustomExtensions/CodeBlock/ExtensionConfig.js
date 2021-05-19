import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { ReactNodeViewRenderer } from "@tiptap/react";
import CodeBlockComponent from "./CodeBlockComponent";
import lowlight from "lowlight";

export default CodeBlockLowlight.extend({
	addNodeView() {
		return new ReactNodeViewRenderer(CodeBlockComponent);
	},
}).configure({ lowlight });
