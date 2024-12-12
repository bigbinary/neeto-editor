/* eslint-disable @bigbinary/neeto/file-name-and-export-name-standards */
import {
  IMG_TAGS,
  IMAGE_PREVIEW_CONTAINER_TEMPLATE,
} from "./constants/imagePreview";
import { getImageDetails, getPreviewHtml } from "./utils/imagePreview";

(() => {
  if (window.neetoEditor?.utils) return;

  class EditorUtils {
    constructor() {
      this.init();
    }

    imagePreviewCloseButtonId = "neImagePreviewCloseButton";
    imagePreviewContainerId = "neImagePreviewContainer";
    imagePreviewContentContainerId = "neImagePreviewContentContainer";

    init() {
      [this.editorContentContainer] = document.getElementsByClassName(
        "neeto-editor-content"
      ) ?? [document];
      this.bindClickListeners();
    }

    destroy() {
      this.removeClickListeners();
      this.imagePreviewContainer?.remove();
    }

    bindClickListeners() {
      this.editorContentContainer.addEventListener(
        "click",
        this.handleClickEvents.bind(this)
      );
    }

    handleClickEvents(e) {
      const { tagName } = e.target;

      if (IMG_TAGS.includes(tagName)) this.showImagePreview(e);
    }

    showImagePreview(event) {
      const { imageUrl, caption } = getImageDetails(event);

      if (!this.imagePreviewContainer) this.mountContainerAndAttachEvents();

      this.imagePreviewContainer.innerHTML += getPreviewHtml(imageUrl, caption);
      this.imagePreviewContainer.classList.add("active");

      this.imagePreview = this.imagePreviewContainer?.querySelector(
        `#${this.imagePreviewContentContainerId}`
      );

      this.imagePreview?.addEventListener(
        "click",
        this.stopImageClickPropagation.bind(this)
      );
    }

    mountContainerAndAttachEvents() {
      const imagePreviewContainer = document.createElement("div");
      imagePreviewContainer.setAttribute("id", this.imagePreviewContainerId);
      imagePreviewContainer.setAttribute("class", "ne-image-preview-wrapper");
      imagePreviewContainer.innerHTML = IMAGE_PREVIEW_CONTAINER_TEMPLATE;

      document.body.appendChild(imagePreviewContainer);
      this.imagePreviewContainer = imagePreviewContainer;

      this.bindImagePreviewEventListeners();
    }

    bindImagePreviewEventListeners() {
      document
        .getElementById(this.imagePreviewCloseButtonId)
        .addEventListener("click", this.closeImagePreview.bind(this));

      this.imagePreviewContainer.addEventListener(
        "click",
        this.closeImagePreview.bind(this)
      );

      document.addEventListener("keyup", this.handleKeyDown.bind(this));
    }

    stopImageClickPropagation(event) {
      event.stopPropagation();
    }

    closeImagePreview() {
      this.imagePreview?.removeEventListener(
        "click",
        this.stopImageClickPropagation.bind(this)
      );
      this.imagePreview?.remove();
      this.imagePreview = null;
      this.imagePreviewContainer.classList.remove("active");
    }

    handleKeyDown(event) {
      if (event.key === "Escape") this.closeImagePreview();
    }

    removeClickListeners() {
      this.editorContentContainer.removeEventListener(
        "click",
        this.handleClickEvents.bind(this)
      );

      document.removeEventListener("keyup", this.handleKeyDown.bind(this));
      document
        .getElementById(this.imagePreviewCloseButtonId)
        .removeEventListener("click", this.closeImagePreview.bind(this));

      document
        .getElementById(this.imagePreviewCloseButtonId)
        .removeEventListener("click", this.closeImagePreview.bind(this));
    }
  }

  window.neetoEditor = window.neetoEditor ?? {};
  window.neetoEditor.utils = new EditorUtils();
})();
