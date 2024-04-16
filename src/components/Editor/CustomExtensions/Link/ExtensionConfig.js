import { InputRule, markInputRule } from "@tiptap/core";
import { Link } from "@tiptap/extension-link";
import { PluginKey } from "prosemirror-state";

import { LINK_MARKDOWN_INPUT_REGEX } from "./constants";

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

export default Link.extend({
  name: "custom-link",
  key: new PluginKey("custom-link"),
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
});
