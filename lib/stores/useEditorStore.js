import create from "zustand";

const useEditorStore = create(set => ({ setEditor: set }));

export default useEditorStore;
