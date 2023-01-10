import { MENU_OPTIONS } from "./constants";

export const buildMenuOptions = ({
  editor,
  options,
  setMediaUploader,
  onClickAttachment,
}) => {
  const menuOptions = MENU_OPTIONS(editor, setMediaUploader, onClickAttachment);

  return options
    .map(option => menuOptions.find(({ optionName }) => optionName === option))
    .filter(Boolean);
};
