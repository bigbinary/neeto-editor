import { MENU_OPTIONS } from "./constants";

export const buildMenuOptions = ({ editor, options, setMediaUploader }) => {
  const menuOptions = MENU_OPTIONS(editor, setMediaUploader);

  return options
    .map(option => menuOptions.find(({ optionName }) => optionName === option))
    .filter(Boolean);
};