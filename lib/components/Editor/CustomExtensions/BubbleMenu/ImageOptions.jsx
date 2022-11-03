import React from "react";

import Option from "./Option";
import { getImageMenuOptions } from "./utils";

const ImageOptions = ({
  editor,
  isImageEditorModalOpen,
  setIsImageEditorModalOpen,
}) =>
  getImageMenuOptions({
    editor,
    isImageEditorModalOpen,
    setIsImageEditorModalOpen,
  }).map(option => <Option key={option.optionName} {...option} />);

export default ImageOptions;
