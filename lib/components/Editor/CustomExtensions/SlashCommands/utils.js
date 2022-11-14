import { assoc, findIndex, modify, propEq } from "ramda";

import {
  YOUTUBE_URL_REGEXP,
  VIMEO_URL_REGEXP,
  LOOM_URL_REGEXP,
  EDITOR_OPTIONS,
} from "common/constants";
import { noop } from "utils/common";

import { MENU_ITEMS } from "./constants";

const embedCommand = ({ editor, range }) => {
  const embedURL = prompt("Please enter Youtube/Loom/Vimeo embed URL.");

  const validatedUrl = embedURL
    ? validateYouTubeUrl(embedURL) ||
      validateLoomUrl(embedURL) ||
      validateVimeoUrl(embedURL)
    : false;

  if (validatedUrl) {
    editor
      .chain()
      .focus()
      .deleteRange(range)
      .setExternalVideo({ src: validatedUrl })
      .run();
  } else {
    editor.chain().focus().deleteRange(range).insertContent("#invalid").run();
  }
};

export const buildCommandItems = ({ options, addonCommands }) => {
  const commandItems = MENU_ITEMS.map(item => {
    if (item.optionName === EDITOR_OPTIONS.IMAGE_UPLOAD) {
      return assoc("command", noop, item);
    } else if (item.optionName === EDITOR_OPTIONS.VIDEO_EMBED) {
      return assoc("command", embedCommand, item);
    }

    return item;
  });

  const permittedCommandItems = commandItems.filter(({ optionName }) =>
    options.includes(optionName)
  );

  return [...permittedCommandItems, ...addonCommands];
};

export const addImageUpdateLogicToCommandItems = (items, openImageUploader) =>
  modify(
    findIndex(propEq("optionName", EDITOR_OPTIONS.IMAGE_UPLOAD), items),
    assoc("command", ({ editor, range }) => {
      openImageUploader();
      editor.chain().focus().deleteRange(range).run();
    }),
    items
  );

export const validateYouTubeUrl = url => {
  const match = url.match(YOUTUBE_URL_REGEXP);

  return match && `https://www.youtube.com/embed/${match[5]}`;
};

export const validateVimeoUrl = url => {
  const match = url.match(VIMEO_URL_REGEXP);

  return match && `https://player.vimeo.com/video/${match[4]}?h=${match[5]}`;
};

export const validateLoomUrl = url => {
  const match = url.match(LOOM_URL_REGEXP);

  return match && `https://www.loom.com/embed/${match[4]}?t=${match[5] || ""}`;
};
