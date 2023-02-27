import { assoc } from "ramda";

import { EDITOR_OPTIONS } from "common/constants";

import { MENU_ITEMS } from "./constants";

const embedCommand =
  setIsEmbedModalOpen =>
  ({ editor, range }) => {
    setIsEmbedModalOpen(true);
    editor.chain().focus().deleteRange(range).run();
  };

const imageCommand =
  setMediaUploader =>
  ({ editor, range }) => {
    setMediaUploader(assoc("image", true));
    editor.chain().focus().deleteRange(range).run();
  };

const videoCommand =
  setMediaUploader =>
  ({ editor, range }) => {
    setMediaUploader(assoc("video", true));
    editor.chain().focus().deleteRange(range).run();
  };

export const buildCommandItems = ({
  options,
  addonCommands,
  setMediaUploader,
  setIsEmbedModalOpen,
}) => {
  const commandItems = MENU_ITEMS.map(item => {
    if (item.optionName === EDITOR_OPTIONS.IMAGE_UPLOAD) {
      return assoc("command", imageCommand(setMediaUploader), item);
    } else if (item.optionName === EDITOR_OPTIONS.VIDEO_UPLOAD) {
      return assoc("command", videoCommand(setMediaUploader), item);
    } else if (item.optionName === EDITOR_OPTIONS.VIDEO_EMBED) {
      return assoc("command", embedCommand(setIsEmbedModalOpen), item);
    }

    return item;
  });

  const permittedCommandItems = commandItems.filter(({ optionName }) =>
    options.includes(optionName)
  );

  return [...permittedCommandItems, ...addonCommands];
};
