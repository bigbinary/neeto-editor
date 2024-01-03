const {
  InputRule,
  markInputRule,
  markPasteRule,
  PasteRule,
} = require("@tiptap/core");
const { Link } = require("@tiptap/extension-link");

const inputRegex = /(?:^|\s)\[([^\]]*)?\]\((\S+)(?: ["“](.+)["”])?\)$/i;
const pasteRegex = /(?:^|\s)\[([^\]]*)?\]\((\S+)(?: ["“](.+)["”])?\)/gi;

function linkInputRule(config) {
  const defaultMarkInputRule = markInputRule(config);

  return new InputRule({
    find: config.find,
    handler(props) {
      const { tr } = props.state;

      defaultMarkInputRule.handler(props);
      tr.setMeta("preventAutolink", true);
    },
  });
}

function linkPasteRule(config) {
  const defaultMarkPasteRule = markPasteRule(config);

  return new PasteRule({
    find: config.find,
    handler(props) {
      const { tr } = props.state;

      defaultMarkPasteRule.handler(props);
      tr.setMeta("preventAutolink", true);
    },
  });
}

const RichTextLink = Link.extend({
  inclusive: false,
  addAttributes() {
    return { ...this.parent?.(), title: { default: null } };
  },
  addInputRules() {
    return [
      linkInputRule({
        find: inputRegex,
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
        find: pasteRegex,
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

export default RichTextLink;
