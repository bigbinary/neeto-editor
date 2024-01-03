import {
  InputRule,
  markInputRule,
  markPasteRule,
  PasteRule,
} from "@tiptap/core";
import { Link } from "@tiptap/extension-link";

import {
  LINK_MARKDOWN_INPUT_REGEX,
  LINK_MARKDOWN_PASTE_REGEX,
} from "./constants";

const linkInputRule = config => {
  const defaultMarkInputRule = markInputRule(config);

  return new InputRule({
    find: config.find,
    handler(props) {
      const { tr } = props.state;

      defaultMarkInputRule.handler(props);
      tr.setMeta("preventAutolink", true);
    },
  });
};

const linkPasteRule = config => {
  const defaultMarkPasteRule = markPasteRule(config);

  return new PasteRule({
    find: config.find,
    handler(props) {
      const { tr } = props.state;

      defaultMarkPasteRule.handler(props);
      tr.setMeta("preventAutolink", true);
    },
  });
};

export default Link.extend({
  inclusive: false,
  addAttributes() {
    return { ...this.parent?.(), title: { default: null } };
  },
  addInputRules() {
    return [
      linkInputRule({
        find: LINK_MARKDOWN_INPUT_REGEX,
        type: this.type,
        getAttributes(match) {
          return {
            title: match.pop()?.trim(),
            href: match.pop()?.trim(),
          };
        },
      }),
    ];
  },
  addPasteRules() {
    return [
      linkPasteRule({
        find: LINK_MARKDOWN_PASTE_REGEX,
        type: this.type,
        getAttributes(match) {
          return {
            title: match.pop()?.trim(),
            href: match.pop()?.trim(),
          };
        },
      }),
    ];
  },
});
