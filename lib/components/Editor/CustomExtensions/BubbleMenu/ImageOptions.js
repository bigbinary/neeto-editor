import { getImageMenuOptions, renderOptionButton } from "./utils";

const ImageOptions = ({
  editor,
  isImageEditorModalOpen,
  setIsImageEditorModalOpen,
}) =>
  getImageMenuOptions({
    editor,
    isImageEditorModalOpen,
    setIsImageEditorModalOpen,
  }).map(renderOptionButton);

export default ImageOptions;
