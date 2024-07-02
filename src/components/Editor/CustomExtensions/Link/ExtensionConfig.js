import { InputRule, markInputRule, mergeAttributes } from "@tiptap/core";
import { Link } from "@tiptap/extension-link";

import { LINK_MARKDOWN_INPUT_REGEX } from "./constants";

const linkInputRule = config => {
  const defaultMarkInputRule = markInputRule(config);

  return new InputRule({
    find: config.find,
    handler(props) {
      try {
        const { tr } = props.state;
        defaultMarkInputRule.handler(props);
        tr.setMeta("preventAutolink", true);
      } catch (error) {
        // https://app.honeybadger.io/projects/94805/faults/108936285
        if (!(error instanceof RangeError)) throw error;
      }
    },
  });
};

export default Link.extend({
  inclusive: false,
  addAttributes() {
    return { ...this.parent?.(), title: { default: null } };
  },

  parseHTML() {
    return [
      {
        tag: 'a[href]:not([data-type="button"]):not([href *= "javascript:" i])',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "a",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: "link",
      }),
      0,
    ];
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
});
