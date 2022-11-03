import { UppyOptions } from "@uppy/core/types";
import {
  Editor as TiptapEditor,
  Extension,
  Node,
} from "@tiptap/core/dist/packages/core/src";
import { Range } from "@tiptap/core/dist/packages/core/src/types";
import { Transaction } from "prosemirror-state";

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

export function Editor(props: {
  hideSlashCommands?: boolean;
  defaults?: string[];
  addons?: string[];
  addonCommands?: Command[];
  className?: string;
  uploadEndpoint?: string;
  uploadConfig?: UppyOptions<Record<string, unknown>>;
  initialValue?: string;
  onChange?: (htmlContent: string) => void;
  onFocus?: EditorFocus;
  onBlur?: EditorFocus;
  menuType?: string;
  variables?: Variable[];
  mentions?: Mention[];
  placeholder?: { title: string } | string | null;
  extensions?: Array<Node | Extension>;
  contentClassName?: string[];
  characterLimit?: number;
  editorSecrets?: Array<{ unsplash?: string }>;
  rows?: number;
  autoFocus?: boolean;
  onSubmit?: (htmlContent: string) => void;
  heightStrategy?: string;
  characterCountStrategy?: string;
  keyboardShortcuts?: KeyboardShortcuts;
  error?: string;
  [otherProps: string]: any;
}): JSX.Element;

export function EditorContent(props: {
  content?: string;
  className?: string;
  [otherProps: string]: any;
}): JSX.Element;
