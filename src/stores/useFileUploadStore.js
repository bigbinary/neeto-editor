import { findBy, removeById } from "neetocist";
import { withImmutableActions } from "neetocommons/react-utils";
import { create } from "zustand";

/** @type {import("neetocommons/react-utils").ZustandStoreHook} */
const useFileUploadStore = create(
  withImmutableActions((set, get) => ({
    // {[contextId]: { files: File[], isUploading: boolean }}

    addFiles: (contextId, newFiles) =>
      set(state => ({
        [contextId]: {
          ...state[contextId],
          files: [...(state[contextId]?.["files"] || []), ...newFiles],
        },
      })),

    updateFileStatus: (contextId, fileId, status) =>
      set(state => ({
        [contextId]: {
          ...state[contextId],
          files: state[contextId]?.["files"]?.map(file =>
            file.id === fileId ? { ...file, status } : file
          ),
        },
      })),

    updateFileUploadProgress: (contextId, fileId, progress) =>
      set(state => ({
        [contextId]: {
          ...state[contextId],
          files:
            state[contextId]?.["files"]?.map(file =>
              file.id === fileId ? { ...file, progress } : file
            ) || [],
        },
      })),

    removeFile: (contextId, fileId) =>
      set(state => ({
        [contextId]: {
          ...state[contextId],
          files: removeById(fileId, state[contextId]?.["files"] || []),
        },
      })),

    setIsUploading: (contextId, status) =>
      set(state => ({
        [contextId]: {
          ...(state[contextId] ?? []),
          isUploading: status,
        },
      })),

    getNextQueuedFile: contextId => {
      const { files } = get()[contextId];

      return findBy(({ status }) => status === "queued", files);
    },

    removeFilesFromQueue: (contextId, uploadedFiles) => {
      const data = get()[contextId];

      set({
        [contextId]: {
          ...data,
          files: (data["files"] || []).filter(
            ({ id }) => !uploadedFiles.includes(id)
          ),
        },
      });
    },
  }))
);

export default useFileUploadStore;
