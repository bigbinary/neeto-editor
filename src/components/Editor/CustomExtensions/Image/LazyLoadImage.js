import { ReactRenderer } from "@tiptap/react";

import ImageComponent from "./ImageComponent";
import {
  appendImageContainerToDom,
  createImageContainerDom,
  deleteNode,
  destroyReactComponent,
  fetchImage,
  handleImageLoad,
  updateAttributes,
} from "./utils";

class LazyLoadImage {
  constructor({ editor, node, getPos, extension }) {
    this.editor = editor;
    this.node = node;
    this.getPos = getPos;
    this.extension = extension;
    this.reactRenderer = null;
    this.observer = null;
    this.dom = this.createDom();

    this.setupObserver();
    this.setupImage();
  }

  createDom() {
    const { figwidth, figheight } = this.node.attrs;

    return createImageContainerDom({ figwidth, figheight });
  }

  setupImage() {
    const { src, figwidth } = this.node.attrs;
    const onImageLoad = ({ target: image }) => {
      handleImageLoad({ figwidth, image, dom: this.dom });
    };
    fetchImage({ src, onImageLoad });
  }

  setupObserver() {
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(this.handleIntersection.bind(this));
      },
      { threshold: 0, rootMargin: "200px 0px 200px 0px" }
    );
    this.observer.observe(this.dom);
  }

  handleIntersection(entry) {
    if (entry.isIntersecting) {
      this.insertImageComponent(entry);
    } else {
      const rect = entry.boundingClientRect;
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        this.removeImageComponent(entry);
      } else if (rect.top < window.innerHeight + 200) {
        this.insertImageComponent(entry);
      }
    }
  }

  insertImageComponent(entry) {
    this.renderReactComponent();
    entry.target.style.visibility = "visible";
  }

  removeImageComponent(entry) {
    this.destroyReactComponent();
    entry.target.style.visibility = "hidden";
  }

  renderReactComponent() {
    if (this.reactRenderer) return;

    this.reactRenderer = new ReactRenderer(ImageComponent, {
      editor: this.editor,
      node: this.node,
      extension: this.extension,
      props: {
        node: this.node,
        editor: this.editor,
        getPos: this.getPos,
        updateAttributes: attrs =>
          updateAttributes(attrs, this.editor, this.getPos),
        deleteNode: () => deleteNode(this.editor, this.getPos, this.node),
      },
    });

    appendImageContainerToDom({
      dom: this.dom,
      reactRenderer: this.reactRenderer,
    });
  }

  destroyReactComponent() {
    destroyReactComponent({ reactRenderer: this.reactRenderer, dom: this.dom });
    this.reactRenderer = null;
  }

  update(updatedNode) {
    if (this.reactRenderer) {
      this.reactRenderer.updateProps({
        node: updatedNode.toJSON(),
        updateAttributes: attrs =>
          updateAttributes(attrs, this.editor, this.getPos),
      });
    }

    return true;
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.destroyReactComponent();
  }
}

export { LazyLoadImage };
