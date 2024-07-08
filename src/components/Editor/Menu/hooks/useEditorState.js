import { useCallback, useEffect } from "react";

import { noop } from "neetocist";
import { last } from "ramda";

import useEditorStore from "src/stores/useEditorStore";

import { isMarkActive } from "./utils";

import { FONT_SIZE_OPTIONS } from "../Fixed/constants";

const useEditorState = ({ editor }) => {
  const { setMarksState } = useEditorStore.pick();

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

      const activeOption =
        FONT_SIZE_OPTIONS.find(({ value }) => isActive(value)) ||
        last(FONT_SIZE_OPTIONS);

      activeMarks["heading"] = activeOption;
      setMarksState(activeMarks);
    },
    [setMarksState]
  );

  useEffect(() => {
    if (!editor) return noop;
    editor.on("selectionUpdate", handleSelectionUpdate);

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor, handleSelectionUpdate]);
};

export default useEditorState;
