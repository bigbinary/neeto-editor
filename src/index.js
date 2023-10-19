import {
  isEditorOverlaysActive,
  transformEditorContent,
} from "components/Editor/utils";
import { substituteVariables } from "components/EditorContent/utils";
import { isEditorEmpty } from "utils/common";
import { initializeI18n } from "utils/i18next";

import Attachments from "./components/Attachments";
import Editor from "./components/Editor";
import FormikEditor from "./components/Editor/FormikEditor";
import Menu from "./components/Editor/Menu";
import EditorContent from "./components/EditorContent";
import "./index.scss";
import en from "./translations/en.json";

initializeI18n({ translationResources: { en: { translation: en } } });

export {
  Editor,
  EditorContent,
  Menu,
  isEditorEmpty,
  substituteVariables,
  FormikEditor,
  Attachments,
  isEditorOverlaysActive,
  transformEditorContent,
};
