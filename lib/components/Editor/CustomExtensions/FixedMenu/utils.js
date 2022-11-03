import { fromPairs } from "ramda";

import { MENU_OPTIONS } from "./constants";

export const buildMenuOptions = ({
  editor,
  options,
  setIsImageUploadVisible,
}) => {
  const menuOptions = MENU_OPTIONS(editor, setIsImageUploadVisible);

  return fromPairs(
    ["font", "block", "list"].map(option => [
      option,
      menuOptions[option].filter(item => options.includes(item.optionName)),
    ])
  );
};
