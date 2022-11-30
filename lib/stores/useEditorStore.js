import create from "zustand";

const useEditorStore = create(set => ({
  editor: null,
  setEditor: set,
}));

export default useEditorStore;
