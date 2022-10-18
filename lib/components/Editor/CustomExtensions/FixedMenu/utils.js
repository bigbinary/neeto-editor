import { fromPairs } from "ramda";

import { MENU_OPTIONS } from "./constants";

export const buildMenuOptions = ({
  editor,
  options,
  setImageUploadVisible,
}) => {
  const menuOptions = MENU_OPTIONS(editor, setImageUploadVisible);
  return fromPairs(
    ["font", "block", "list", "misc"].map(option => [
      option,
      menuOptions[option].filter(item => options.includes(item.optionName)),
    ])
  );
};
