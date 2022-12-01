import { UppyOptions } from "@uppy/core/types";
import {
  Editor as TiptapEditor,
  Extension,
  Node,
} from "@tiptap/core/dist/packages/core/src";
import { Range } from "@tiptap/core/dist/packages/core/src/types";
import { Transaction } from "prosemirror-state";
import { CodeOptions } from "@tiptap/extension-code";
import { UnderlineOptions } from "@tiptap/extension-underline";
import { HighlightOptions } from "lowlight/lib/core";
import { CodeBlockLowlightOptions } from "@tiptap/extension-code-block-lowlight";
import { StarterKitOptions } from "@tiptap/starter-kit";
import { PlaceholderOptions } from "@tiptap/extension-placeholder";
import { CharacterCountOptions } from "@tiptap/extension-character-count";

interface Command {
  title: string;
  Icon: Function;
  description?: string;
  optionName: string;
  command?: (props: { editor: TiptapEditor; range: Range }) => void;
  items?: Command[];
}

interface Variable {
  category_key: string;
  category_label: string;
  variables?: Array<{ key: string; label: string }>;
}

interface Mention {
  key?: string;
  name: string;
  imageUrl?: string;
}

type KeyboardShortcuts = {
  [shortcut: string]: (props: { editor: TiptapEditor }) => boolean | void;
};

type EditorFocus = (props: {
  editor: TiptapEditor;
  event: FocusEvent;
  transaction: Transaction;
}) => void;

interface Config {
  code?: Partial<CodeOptions>;
  underline?: Partial<UnderlineOptions>;
  highlight?: Partial<HighlightOptions>;
  codeBlock?: Partial<CodeBlockLowlightOptions>;
  figCaption?: Partial<any>;
  embeds?: Partial<any>;
  link?: Partial<any>;
  emojiSuggestion?: Partial<any>;
  emojiPicker?: Partial<any>;
  customCommands?: Partial<any>;
  characterCount?: Partial<CharacterCountOptions>;
  focus?: Partial<FocusOptions>;
  starterKit?: Partial<StarterKitOptions>;
  placeholder?: Partial<PlaceholderOptions>;
}

interface MenuProps {
  editor: string;
  menuType?: "fixed" | "bubble" | "none";
  defaults?: string[];
  addons?: string[];
  uploadEndpoint?: string;
  uploadConfig?: UppyOptions<Record<string, unknown>>;
  mentions?: Mention[];
  variables?: Variable[];
  isIndependant?: boolean;
  className?: string;
}

interface EditorProps {
  initialValue?: string;
  menuType?: "fixed" | "bubble" | "none";
  label?: string;
  required?: boolean;
  autoFocus?: boolean;
  hideSlashCommands?: boolean;
  defaults?: string[];
  addons?: string[];
  addonCommands?: Command[];
  className?: string;
  contentClassName?: string;
  uploadEndpoint?: string;
  uploadConfig?: UppyOptions<Record<string, unknown>>;
  onChange?: (htmlContent: string) => void;
  onFocus?: EditorFocus;
  onBlur?: EditorFocus;
  onSubmit?: (htmlContent: string) => void;
  variables?: Variable[];
  mentions?: Mention[];
  placeholder?: string;
  extensions?: Array<Node | Extension>;
  editorSecrets?: Array<{ unsplash?: string }>;
  rows?: number;
  isCharacterCountActive?: boolean;
  keyboardShortcuts?: KeyboardShortcuts;
  error?: string;
  config?: Config;
  editorKey?: string;
  [otherProps: string]: any;
}

interface FormikEditorProps extends EditorProps {
  name: string;
}

export function Editor(props: EditorProps): JSX.Element;

export function FormikEditor(props: FormikEditorProps): JSX.Element;

export function EditorContent(props: {
  content?: string;
  className?: string;
  [otherProps: string]: any;
}): JSX.Element;

export function Menu(props: MenuProps): JSX.Element;

export function isEditorEmpty(htmlContent: string | null | undefined): boolean;
