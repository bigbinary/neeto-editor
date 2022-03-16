import {
  EDITOR_PADDING_SIZE,
  EDITOR_LINE_HEIGHT,
  EDITOR_BORDER_SIZE,
} from "constants/common";
import { ADD_ON_OPTIONS } from "constants/common";

import { DEFAULT_ADD_ON_OPTIONS } from "./constants";

export const getIsPlaceholderActive = (placeholder) => {
  if (placeholder) {
    if (typeof placeholder === "string" && placeholder.length) return true;
    if (typeof placeholder === "object" && Object.keys(placeholder).length)
      return true;
    if (typeof placeholder === "function") return true;
  }
  return false;
};

export const getEditorStyles = ({ heightStrategy, rows }) => {
  const styles = {};
  const editorHeight =
    rows * EDITOR_LINE_HEIGHT + 2 * (EDITOR_PADDING_SIZE + EDITOR_BORDER_SIZE);
  if (heightStrategy === "flexible") styles["min-height"] = editorHeight + "px";
  else styles.height = editorHeight + "px";
  return styles;
};

export const generateAddonOptions = (addons = [], { includeImageUpload }) => {
  const userAddonOptions = addons.map((option) => option.toLowerCase());
  if (includeImageUpload) userAddonOptions.push(ADD_ON_OPTIONS.IMAGE_UPLOAD);
  return [].concat(DEFAULT_ADD_ON_OPTIONS, userAddonOptions);
};
