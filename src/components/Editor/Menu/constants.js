import BubbleMenu from "./Bubble";
import EmptyMenu from "./EmptyMenu";
import FixedMenu from "./Fixed";
import HeadlessMenu from "./Headless";

export const MENU_COMPONENTS = {
  fixed: FixedMenu,
  bubble: BubbleMenu,
  headless: HeadlessMenu,
  none: EmptyMenu,
};
