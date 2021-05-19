import React from "react";
import classnames from "classnames";
import { BubbleMenu } from "@tiptap/react";
import {
	FaBold,
	FaItalic,
	FaStrikethrough,
	FaHighlighter,
	FaCode,
} from "react-icons/fa";
import { HiCode } from "react-icons/hi";

export default function index({ editor }) {
	if (!editor) {
		return null;
	}
	const options = [
		{
			Icon: FaBold,
			command: () => editor.chain().focus().toggleBold().run(),
			active: editor.isActive("bold"),
		},
		{
			Icon: FaItalic,
			command: () => editor.chain().focus().toggleItalic().run(),
			active: editor.isActive("italic"),
		},
		{
			Icon: FaStrikethrough,
			command: () => editor.chain().focus().toggleStrike().run(),
			active: editor.isActive("strike"),
		},
		{
			Icon: FaCode,
			command: () => editor.chain().focus().toggleCode().run(),
			active: editor.isActive("code"),
		},
		{
			Icon: FaHighlighter,
			command: () => editor.chain().focus().toggleHighlight().run(),
			active: editor.isActive("highlight"),
		},
	];
	return (
		<BubbleMenu editor={editor}>
			<div className="relative flex items-center overflow-hidden bg-white border border-gray-200 rounded shadow-sm">
				{options.map((option, index) => (
					<Option {...option} key={index} />
				))}
			</div>
		</BubbleMenu>
	);
}

const Option = ({ Icon, command, active, iconSize }) => (
	<div
		className={classnames("p-2 px-3 cursor-pointer hover:bg-gray-50", {
			"text-gray-700": !active,
			"text-blue-600": active,
		})}
		onClick={command}
	>
		<Icon size={iconSize || 15} />
	</div>
);
