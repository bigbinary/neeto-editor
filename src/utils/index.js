// exports all exposed utils.
import {
  isEditorOverlaysActive,
  transformEditorContent,
  isEmojiSuggestionsMenuActive,
} from "components/Editor/utils";
import { substituteVariables } from "components/EditorContent/utils";
import {
  isEditorEmpty,
  isEditorContentWithinLimit,
  removeEmptyTags,
} from "utils/common";

export {
  // editor utils
  removeEmptyTags,
  isEditorEmpty,
  isEditorContentWithinLimit,
  // common utils
  isEditorOverlaysActive,
  isEmojiSuggestionsMenuActive,
  transformEditorContent,
  // other utils
  substituteVariables,
};
