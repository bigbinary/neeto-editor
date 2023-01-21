import { MENU_OPTIONS } from "./constants";

export const buildMenuOptions = ({
  tooltips,
  editor,
  options,
  setMediaUploader,
  handleUploadAttachments,
}) => {
  const menuOptions = MENU_OPTIONS({
    tooltips,
    editor,
    setMediaUploader,
    handleUploadAttachments,
  });

  return options
    .map(option => menuOptions.find(({ optionName }) => optionName === option))
    .filter(Boolean);
};
