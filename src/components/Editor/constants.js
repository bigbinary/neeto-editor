import { EDITOR_OPTIONS } from "common/constants";

export const DEFAULT_EDITOR_OPTIONS = [
  EDITOR_OPTIONS.BOLD,
  EDITOR_OPTIONS.ITALIC,
  EDITOR_OPTIONS.UNDERLINE,
  EDITOR_OPTIONS.STRIKETHROUGH,
  EDITOR_OPTIONS.LINK,
  EDITOR_OPTIONS.PARAGRAPH,
  EDITOR_OPTIONS.H1,
  EDITOR_OPTIONS.H2,
  EDITOR_OPTIONS.LIST_BULLETS,
  EDITOR_OPTIONS.LIST_ORDERED,
  EDITOR_OPTIONS.CODE,
];
export const EDITOR_PADDING_SIZE = 12;

export const EDITOR_BORDER_SIZE = 1;

export const EDITOR_LINE_HEIGHT = 21;

export const IMAGE_REGEX = new RegExp(/(<img[^>]*?>)(?![\s\S]*<\/figure>)/g);
export const IMAGE_REPLACEMENT_PATTERN = "<figure>$1</figure>";
export const EMPTY_DIV_REGEX = new RegExp(
  /<div[^>]*?>\s*(?:<br[^>]*?>)\s*<\/div>/g
);
export const TRAILING_BR_REGEX = new RegExp(/\s*(?:<br[^>]*?>)+\s*$/);
