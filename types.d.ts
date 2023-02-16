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
import Variables from "components/Editor/CustomExtensions/Variable/index";

interface Command {
  title: string;
  Icon: Function;
  description?: string;
  optionName: string;
  active?: ({ editor: TiptapEditor }) => boolean;
  command?: (props: { editor: TiptapEditor; range: Range }) => void;
  items?: Command[];
}

interface Variable {
  label?: string;
  key: string;
  value?: any;
}

interface VariableCategory {
  category_key: string;
  category_label?: string;
  variables?: Variable[];
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

interface tooltip {
  label: string;
  keys: string[];
}

interface tooltips {
  [key: string]: tooltip;
}

interface MenuProps {
  tooltips?: tooltips;
  editor: TiptapEditor | null;
  menuType?: "fixed" | "bubble" | "headless" | "none";
  defaults?: string[];
  addons?: string[];
  uploadEndpoint?: string;
  mentions?: Mention[];
  editorSecrets?: Array<{ unsplash?: string }>;
  variables?: (VariableCategory | Variable)[];
  addonCommands?: Command[];
  isIndependant?: boolean;
  className?: string;
}

interface attachment {
  filename?: string;
  signedId?: string;
  url?: string;
  [otherProps: string]: any;
};

interface attachmentsConfig {
  maxFileSize?: number,
  maxNumberOfFiles?: number,
  allowedFileTypes?: string[],
}

interface EditorProps {
  attachmentsConfig?: attachmentsConfig;
  tooltips?: tooltips;
  initialValue?: string;
  menuType?: "fixed" | "bubble" | "headless" | "none";
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
  onChange?: (htmlContent: string) => void;
  onFocus?: EditorFocus;
  onBlur?: EditorFocus;
  onSubmit?: (htmlContent: string) => void;
  variables?: (VariableCategory | Variable)[];
  mentions?: Mention[];
  placeholder?: string;
  extensions?: Array<Node | Extension>;
  editorSecrets?: Array<{ unsplash?: string }>;
  rows?: number;
  isCharacterCountActive?: boolean;
  keyboardShortcuts?: KeyboardShortcuts;
  error?: string;
  attachments?: Array<attachment>;
  onChangeAttachments?: (attachments: attachment[]) => void;
  [otherProps: string]: any;
}

interface FormikEditorProps extends EditorProps {
  name: string;
}
interface AttachmentsProps {
  config?: attachmentsConfig;
  endpoint?: string;
  attachments?: Array<attachment>;
  dragDropRef?: React.RefObject<HTMLDivElement>;
  onChange?: (attachments: attachment[]) => void;
  isIndependent?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Editor(props: EditorProps): JSX.Element;

export function FormikEditor(props: FormikEditorProps): JSX.Element;

export function Attachments(props: AttachmentsProps): JSX.Element;

export function EditorContent(props: {
  content?: string;
  className?: string;
  variables?: (VariableCategory | Variable)[];
  [otherProps: string]: any;
}): JSX.Element;

export function Menu(props: MenuProps): JSX.Element;

export function isEditorEmpty(htmlContent: string | null | undefined): boolean;

export function isEditorOverlaysActive(): boolean;

export function substituteVariables(
  highlightedContent: string,
  variables: (VariableCategory | Variable)[]
): string;
