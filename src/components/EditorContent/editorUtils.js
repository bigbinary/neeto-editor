/* eslint-disable @bigbinary/neeto/file-name-and-export-name-standards */
import { IMG_TAGS, IMAGE_PREVIEW_TEMPLATE } from "./constants/imagePreview";

(() => {
  if (window.neetoEditor?.utils) return;

  class EditorUtils {
    constructor() {
      this.init();
    }

    imagePreviewCloseButtonId = "neImagePreviewCloseButton";
    imagePreviewId = "neImagePreviewWrapper";
    imagePreviewContainerId = "neImagePreviewContainer";
    imagePreviewImageContainerId = "neImagePreviewImageContainer";

    init() {
      [this.editorContentContainer] = document.getElementsByClassName(
        "neeto-editor-content"
      ) ?? [document];
      this.bindClickListeners();
    }

    destroy() {
      this.removeClickListeners();
    }

    bindClickListeners() {
      this.editorContentContainer.addEventListener(
        "click",
        this.handleClickEvents.bind(this)
      );
    }

    handleClickEvents(e) {
      const { tagName } = e.target;

      if (IMG_TAGS.includes(tagName)) {
        this.showImagePreview(e);
        this.bindImagePreviewEventListeners();
      }
    }

    showImagePreview(e) {
      const imageElement = e.target.querySelector("IMG");
      const captionElement = e.target.querySelector("FIGCAPTION");
      const imageUrl = imageElement.getAttribute("src");
      const caption = captionElement.textContent?.trim?.();

      if (!this.imagePreviewContainer) this.appendImagePreviewContainer();

      this.imagePreviewContainer.innerHTML = IMAGE_PREVIEW_TEMPLATE.replaceAll(
        "{{imageCaption}}",
        caption
      ).replace("{{imageSource}}", imageUrl);
    }

    appendImagePreviewContainer() {
      const imagePreviewContainer = document.createElement("div");
      imagePreviewContainer.setAttribute("id", this.imagePreviewContainerId);
      document.body.appendChild(imagePreviewContainer);

      document.addEventListener("keyup", this.handleKeyDown.bind(this));
      this.imagePreviewContainer = imagePreviewContainer;
    }

    bindImagePreviewEventListeners() {
      document
        .getElementById(this.imagePreviewCloseButtonId)
        .addEventListener("click", this.closeImagePreview.bind(this));

      document
        .getElementById(this.imagePreviewId)
        .addEventListener("click", this.closeImagePreview.bind(this));
    }

    closeImagePreview() {
      document
        .getElementById(this.imagePreviewCloseButtonId)
        ?.removeEventListener("click", this.closeImagePreview.bind(this));

      document
        .getElementById(this.imagePreviewId)
        ?.removeEventListener("click", this.closeImagePreview.bind(this));

      this.imagePreviewContainer?.replaceChildren();
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
    }
  }

  window.neetoEditor = window.neetoEditor ?? {};
  window.neetoEditor.utils = new EditorUtils();
})();
