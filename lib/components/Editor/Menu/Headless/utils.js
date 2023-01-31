import { MENU_OPTIONS } from "./constants";

export const buildMenuOptions = ({
  tooltips,
  editor,
  options,
  setMediaUploader,
  handleUploadAttachments,
  isEmojiPickerActive,
  setIsEmojiPickerActive,
  setIsEmbedModalOpen,
}) => {
  const menuOptions = MENU_OPTIONS({
    editor,
    tooltips,
    setMediaUploader,
    handleUploadAttachments,
    isEmojiPickerActive,
    setIsEmojiPickerActive,
    setIsEmbedModalOpen,
  });

  return options
    .map(option => menuOptions.find(({ optionName }) => optionName === option))
    .filter(Boolean);
};
