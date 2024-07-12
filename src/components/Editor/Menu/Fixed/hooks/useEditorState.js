import { useCallback, useEffect } from "react";

import { noop } from "neetocist";
import { last } from "ramda";

import { EDITOR_OPTIONS } from "src/common/constants";
import useEditorStore from "src/stores/useEditorStore";

import { EDITOR_MARKS } from "./constants";

import { FONT_SIZE_OPTIONS } from "../../constants";

const useEditorState = ({ editor }) => {
  const { setMarksState, marksState } = useEditorStore.pick();

  const handleSelectionUpdate = useCallback(
    ({ editor }) => {
      const activeMarks = {};

      EDITOR_MARKS.forEach(mark => {
        activeMarks[mark] = { isActive: editor.isActive(mark) };
      });

      const activeFontSizeOption =
        FONT_SIZE_OPTIONS.find(({ value: level }) =>
          editor.isActive("heading", { level })
        ) || last(FONT_SIZE_OPTIONS);

      activeMarks["fontSizeOption"] = activeFontSizeOption;

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
