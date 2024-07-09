import { useCallback, useEffect } from "react";

import { noop } from "neetocist";
import { last } from "ramda";

import { EDITOR_OPTIONS } from "src/common/constants";
import useEditorStore from "src/stores/useEditorStore";

import { isMarkActive } from "./utils";

import { FONT_SIZE_OPTIONS } from "../constants";

const useEditorState = ({ editor }) => {
  const { setMarksState, marksState } = useEditorStore.pick();

  const handleSelectionUpdate = useCallback(
    ({ editor }) => {
      const { state } = editor;
      const { from, to } = state.selection;
      const marks = state.schema.marks;
      const activeMarks = {};

      Object.keys(marks).forEach(mark => {
        const markType = marks[mark];
        activeMarks[mark] = {
          isActive: isMarkActive(state, markType, from, to),
        };
      });

      const isActive = level => editor.isActive("heading", { level });

      const activeFontSizeOption =
        FONT_SIZE_OPTIONS.find(({ value }) => isActive(value)) ||
        last(FONT_SIZE_OPTIONS);

      activeMarks["fontSizeOption"] = activeFontSizeOption;

      const undoOptionState = { disabled: !editor.can().undo() };
      const redoOptionState = { disabled: !editor.can().redo() };
      activeMarks[EDITOR_OPTIONS.UNDO] = undoOptionState;
      activeMarks[EDITOR_OPTIONS.REDO] = redoOptionState;

      setMarksState(activeMarks);
    },
    [setMarksState]
  );

  const updateHistoryOptionsState = useCallback(
    ({ editor }) => {
      const undoOptionState = { disabled: !editor.can().undo() };
      const redoOptionState = { disabled: !editor.can().redo() };

      const updatedMarksState = {
        ...marksState,
        [EDITOR_OPTIONS.UNDO]: undoOptionState,
        [EDITOR_OPTIONS.REDO]: redoOptionState,
      };
      setMarksState(updatedMarksState);
    },
    [marksState, setMarksState]
  );

  useEffect(() => {
    if (!editor) return noop;

    updateHistoryOptionsState({ editor });

    editor.on("selectionUpdate", handleSelectionUpdate);
    editor.on("update", handleSelectionUpdate);

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
      editor.off("update", handleSelectionUpdate);
    };
  }, [editor, handleSelectionUpdate]);
};

export default useEditorState;
