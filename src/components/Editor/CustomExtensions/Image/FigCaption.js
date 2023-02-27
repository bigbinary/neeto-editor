import { Node } from "@tiptap/core";

export default Node.create({
  name: "figcaption",

  selectable: false,

  draggable: false,

  parseHTML() {
    return [
      {
        tag: "figcaption",
      },
    ];
  },
});
