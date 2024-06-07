import { removeById } from "neetocist";
import { withImmutableActions } from "neetocommons/react-utils";
import { create } from "zustand";

/** @type {import("neetocommons/react-utils").ZustandStoreHook} */
const useFormStore = create(
  withImmutableActions(set => ({
    files: [],
    isUploading: false,

    addFiles: newFiles =>
      set(state => ({
        files: [
          ...state.files,
          ...newFiles.map(file => ({
            id: `${file.name}-${file.size}-${Date.now()}`, // To refactor before the final PR.
            file,
            status: "queued", // To refactor before the final PR.
          })),
        ],
      })),

    updateFileStatus: (fileId, status) =>
      set(state => ({
        files: state.files.map(file =>
          file.id === fileId ? { ...file, status } : file
        ),
      })),

    removeFile: fileId =>
      set(state => ({ files: removeById(fileId, state.files) })),

    setUploading: status => set({ isUploading: status }),
  }))
);

export default useFormStore;
