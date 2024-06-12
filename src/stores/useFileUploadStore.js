import { findBy, removeById } from "neetocist";
import { withImmutableActions } from "neetocommons/react-utils";
import { create } from "zustand";

/** @type {import("neetocommons/react-utils").ZustandStoreHook} */
const useFileUploadStore = create(
  withImmutableActions((set, get) => ({
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

    updateFileUploadProgress: (fileId, progress) =>
      set(state => ({
        files: state.files.map(file =>
          file.id === fileId ? { ...file, progress } : file
        ),
      })),

    removeFile: fileId =>
      set(state => ({ files: removeById(fileId, state.files) })),

    setUploading: status => set({ isUploading: status }),

    getNextQueuedFile: () => {
      const { files } = get();

      return findBy(({ status }) => status === "queued", files);
    },

    clearQueue: () => set({ files: [] }),
  }))
);

export default useFileUploadStore;
