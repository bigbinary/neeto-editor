import React from "react";

import Modal from "components/Common/Modal";

import ImageEditor from "../Image/ImageEditor";

const ImageEditorModal = ({ editor, isOpen, onClose }) => {
  const node = editor && editor.view.state.selection.node;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="neeto-editor-image-uploader">
        <div className="neeto-editor-image-uploader__content">
          <ImageEditor
            alt={node?.attrs.alt}
            editor={editor}
            url={node?.attrs.src}
            onClose={onClose}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ImageEditorModal;
