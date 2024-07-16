import { withImmutableActions } from "neetocommons/react-utils";
import { create } from "zustand";

/** @type {import("neetocommons/react-utils").ZustandStoreHook} */
const useEditorStore = create(
  withImmutableActions(set => ({
    marksState: {},
    setMarksState: marksState => set({ marksState }),
  }))
);

export default useEditorStore;
