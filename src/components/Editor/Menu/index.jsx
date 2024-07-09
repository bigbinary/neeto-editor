import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { assoc, isEmpty, not } from "ramda";

import "src/styles/editor/menu.scss";

import { MENU_COMPONENTS } from "./constants";
import useEditorState from "./hooks/useEditorState";

import { DEFAULT_EDITOR_OPTIONS } from "../constants";

const Menu = props => {
  const [isEmojiPickerActive, setIsEmojiPickerActive] = useState(false);
  const [mediaUploader, setMediaUploader] = useState({
    image: false,
    video: false,
  });

  const {
    menuType = "fixed",
    addons = [],
    editor,
    options = [],
    editorSecrets = {},
    attachmentProps,
    defaults = DEFAULT_EDITOR_OPTIONS,
  } = props;

  useEditorState({ editor });

  const editorRef = useRef(editor);

  useEffect(() => {
    editorRef.current = editor;
  }, [editor]);

  const runEditorCommand = useCallback(
    command => () => command(editorRef.current),
    []
  );

  const MenuComponent = useMemo(() => MENU_COMPONENTS[menuType], [menuType]);
  const menuOptions = isEmpty(options) ? [...defaults, ...addons] : options;

  useEffect(() => {
    const handleKeyDown = e => {
      if ((e.metaKey || e.ctrlKey) && e.altKey) {
        if (e.code === "KeyE") {
          setIsEmojiPickerActive(prevState => !prevState);
        } else if (e.code === "KeyA") {
          not(attachmentProps?.isDisabled) &&
            attachmentProps?.handleUploadAttachments();
        } else if (e.code === "KeyK") {
          setMediaUploader(assoc("image", true));
        } else if (e.code === "KeyV") {
          setMediaUploader(assoc("video", true));
        }
      }
    };
    if (menuType !== "none") {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <MenuComponent
      {...{
        ...props,
        attachmentProps,
        isEmojiPickerActive,
        mediaUploader,
        runEditorCommand,
        setIsEmojiPickerActive,
        setMediaUploader,
      }}
      options={menuOptions}
      unsplashApiKey={editorSecrets.unsplash}
    />
  );
};

export default Menu;
