import { assoc } from "ramda";

import {
  YOUTUBE_URL_REGEXP,
  VIMEO_URL_REGEXP,
  LOOM_URL_REGEXP,
  EDITOR_OPTIONS,
} from "common/constants";

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

const imageCommand =
  setIsImageUploadVisible =>
  ({ editor, range }) => {
    setIsImageUploadVisible(true);
    editor.chain().focus().deleteRange(range).run();
  };

export const buildCommandItems = ({
  permittedOptions,
  setIsImageUploadVisible,
  addonCommands,
}) => {
  const commandItems = MENU_ITEMS.map(item => {
    if (item.optionName === EDITOR_OPTIONS.IMAGE_UPLOAD) {
      return assoc("command", imageCommand(setIsImageUploadVisible), item);
    } else if (item.optionName === EDITOR_OPTIONS.VIDEO_EMBED) {
      return assoc("command", embedCommand, item);
    }

    return item;
  });

  const permittedCommandItems = commandItems.filter(({ optionName }) =>
    permittedOptions.includes(optionName)
  );

  return [...permittedCommandItems, ...addonCommands];
};

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
