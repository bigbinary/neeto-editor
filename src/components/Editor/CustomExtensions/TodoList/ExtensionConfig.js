import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";

export const TodoListExtension = TaskList.extend({
  name: "todoList",
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-9": () => this.editor.commands.toggleTaskList(),
    };
  },
});

export const TodoItemExtension = TaskItem.extend({
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name),
      Backspace: () => {
        const { state, commands } = this.editor;
        const { $from, empty } = state.selection;

        if (!empty) return false;

        if ($from.parentOffset === 0) {
          const currentNode = $from.parent;

          if (currentNode.content.size === 0) {
            return commands.lift(this.name);
          }

          const todoListNode = $from.node($from.depth - 1);
          if (todoListNode?.type.name === "todoList") {
            return commands.liftListItem(this.name);
          }
        }

        return false;
      },
    };
  },
}).configure({ nested: true });

export default TodoListExtension;
