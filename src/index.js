/* eslint-disable @bigbinary/neeto/file-name-and-export-name-standards */
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

import Attachments from "./components/Attachments";
import Editor from "./components/Editor";
import FormikEditor from "./components/Editor/FormikEditor";
import Menu from "./components/Editor/Menu";
import EditorContent from "./components/EditorContent";
import "./index.scss";

export {
  Editor,
  EditorContent,
  Menu,
  removeEmptyTags,
  isEditorEmpty,
  isEditorContentWithinLimit,
  substituteVariables,
  FormikEditor,
  Attachments,
  isEditorOverlaysActive,
  isEmojiSuggestionsMenuActive,
  transformEditorContent,
};
