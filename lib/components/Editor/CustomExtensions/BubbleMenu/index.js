import React, { useState } from "react";
import classnames from "classnames";
import { BubbleMenu } from "@tiptap/react";
import {
  TextBold,
  TextItalic,
  Underline,
  TextCross,
  Link,
  Code,
  Highlight,
} from "@bigbinary/neeto-icons";
import { roundArrow } from "tippy.js";
import "tippy.js/dist/svg-arrow.css";

import LinkOption from "./LinkOption";

export default function index({ editor, options }) {
  const [isLinkOptionActive, setIsLinkOptionActive] = useState(false);
  const [isInvalidLink, setIsInvalidLink] = useState(false);

  if (!editor) {
    return null;
  }
  const availableOptions = [
    {
      Icon: TextBold,
      command: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
      optionName: "bold",
    },
    {
      Icon: TextItalic,
      command: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
      optionName: "italic",
    },
    {
      Icon: Underline,
      command: () => editor.chain().focus().toggleUnderline().run(),
      active: editor.isActive("underline"),
      optionName: "underline",
    },
    {
      Icon: TextCross,
      command: () => editor.chain().focus().toggleStrike().run(),
      active: editor.isActive("strike"),
      optionName: "strike",
    },
    {
      Icon: Link,
      command: () => {
        setIsLinkOptionActive(true);
      },
      active: editor.isActive("link"),
      optionName: "link",
    },
    {
      Icon: Code,
      command: () => editor.chain().focus().toggleCode().run(),
      active: editor.isActive("code"),
      optionName: "code-block",
    },
    {
      Icon: Highlight,
      command: () => editor.chain().focus().toggleHighlight().run(),
      active: editor.isActive("highlight"),
      optionName: "highlight",
    },
  ];

  const handleAnimateInvalidLink = () => {
    setIsInvalidLink(true);
    const timer = setTimeout(() => {
      setIsInvalidLink(false);
      clearTimeout(timer);
    }, 1000);
  };

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{
        arrow: roundArrow,
        placement: "top-start",
        zIndex: 99999,
      }}
      className={classnames("neeto-editor-bubble-menu", {
        "neeto-editor-bubble-menu-animate-shake": isInvalidLink,
      })}
    >
      {isLinkOptionActive ? (
        <LinkOption
          editor={editor}
          handleClose={() => setIsLinkOptionActive(false)}
          handleAnimateInvalidLink={handleAnimateInvalidLink}
        />
      ) : (
        availableOptions
          .filter(({ optionName }) => options.includes(optionName))
          .map((option) => <Option {...option} key={option.optionName} />)
      )}
    </BubbleMenu>
  );
}

const Option = ({ Icon, command, active, iconSize }) => (
  <div
    className={classnames("neeto-editor-bubble-menu__item", {
      active: active,
    })}
    onClick={command}
  >
    <Icon size={iconSize || 20} />
  </div>
);
