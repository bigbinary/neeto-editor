/* eslint-disable @bigbinary/neeto/file-name-and-export-name-standards */
import {
  IMAGE_PREVIEW_CONTENT_TEMPLATE,
  IMG_TAGS,
  IMAGE_PREVIEW_CONTAINER_TEMPLATE,
} from "./constants/imagePreview";

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

    showImagePreview(e) {
      const imageElement = e.target.querySelector("IMG");
      const captionElement = e.target.querySelector("FIGCAPTION");
      const imageUrl = imageElement.getAttribute("src");
      const caption = captionElement.textContent?.trim?.();

      if (!this.imagePreviewContainer) {
        this.appendImagePreviewContainer();
        this.bindImagePreviewEventListeners();
      }

      this.imagePreviewContainer.innerHTML +=
        IMAGE_PREVIEW_CONTENT_TEMPLATE.replaceAll(
          "{{imageCaption}}",
          caption
        ).replace("{{imageSource}}", imageUrl);
      this.imagePreviewContainer.classList.add("active");
      this.imagePreview = this.imagePreviewContainer?.querySelector(
        `#${this.imagePreviewContentContainerId}`
      );

      this.imagePreview?.addEventListener(
        "click",
        this.stopImageClickPropagation.bind(this)
      );
    }

    appendImagePreviewContainer() {
      const imagePreviewContainer = document.createElement("div");
      imagePreviewContainer.setAttribute("id", this.imagePreviewContainerId);
      imagePreviewContainer.setAttribute("class", "ne-image-preview-wrapper");
      imagePreviewContainer.innerHTML = IMAGE_PREVIEW_CONTAINER_TEMPLATE;

      document.body.appendChild(imagePreviewContainer);
      this.imagePreviewContainer = imagePreviewContainer;
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
