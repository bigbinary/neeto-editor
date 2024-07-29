import React, { memo, useRef, useState, useEffect } from "react";

import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import classNames from "classnames";
import { isNotPresent } from "neetocist";
import { Spinner } from "neetoui";
import { isEmpty, mergeRight } from "ramda";
import { Resizable } from "re-resizable";

import ImagePreviewModal from "./ImagePreviewModal";
import Menu from "./Menu";

const ImageComponent = ({
  node,
  editor,
  getPos,
  updateAttributes,
  deleteNode,
}) => {
  const { src, figheight, figwidth, align } = node.attrs;

  const [captionWidth, setCaptionWidth] = useState(figwidth || 0);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isInView, setIsInView] = useState(false);

  const figureRef = useRef(null);

  const { view } = editor;
  let height = figheight;
  let width = figwidth;
  const caption = node?.content?.content[0]?.text || "";

  const editorElement = figureRef.current?.closest(".neeto-editor");
  const maxImageWidth = editorElement?.offsetWidth - 50;

  const handleResizeStop = (_event, _direction, ref) => {
    height = ref.offsetHeight;
    width = ref.offsetWidth;

    if (width > maxImageWidth) {
      width = maxImageWidth;
      const aspectRatio = ref.offsetHeight / ref.offsetWidth;
      height = width * aspectRatio;
    }
    setCaptionWidth(width);
    view.dispatch(
      view.state.tr.setNodeMarkup(
        getPos(),
        undefined,
        mergeRight(node.attrs, {
          figheight: height,
          figwidth: width,
          height,
          width,
        })
      )
    );
    editor.commands.focus();
  };

  useEffect(() => {
    const figureReference = figureRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1, root: null, rootMargin: "100px 0px 100px 0px" }
    );

    if (figureReference) {
      observer.observe(figureReference);
    }

    return () => {
      if (figureReference) {
        observer.unobserve(figureReference);
      }
    };
  }, []);

  if (isNotPresent(src)) return null;

  return (
    <NodeViewWrapper
      className={`neeto-editor__image-wrapper neeto-editor__image--${align}`}
      data-cy="neeto-editor-image-wrapper"
      style={{ minWidth: width, minHeight: height }}
    >
      <figure ref={figureRef}>
        {isInView && (
          <>
            <Menu {...{ align, deleteNode, editor, updateAttributes }} />
            {src ? (
              <Resizable
                lockAspectRatio
                className="neeto-editor__image"
                minWidth="100px"
                size={{ height, width }}
                onResizeStop={handleResizeStop}
                onResize={(_event, _direction, ref) =>
                  setCaptionWidth(ref.offsetWidth)
                }
              >
                <img
                  {...{ ...node.attrs, src }}
                  alt={caption}
                  onClick={e => {
                    e.stopPropagation();
                    setPreviewUrl(src);
                  }}
                />
              </Resizable>
            ) : (
              <div className="neeto-editor__image-placeholder">
                <Spinner />
              </div>
            )}
            <NodeViewContent
              as="figcaption"
              className={classNames({ "is-empty": isEmpty(caption) })}
              style={{ width: `${captionWidth}px` }}
            />
          </>
        )}
      </figure>
      <ImagePreviewModal {...{ previewUrl, setPreviewUrl }} />
    </NodeViewWrapper>
  );
};

export default memo(ImageComponent);
