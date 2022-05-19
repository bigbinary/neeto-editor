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
            editor={editor}
            onClose={onClose}
            url={node?.attrs.src}
            alt={node?.attrs.alt}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ImageEditorModal;
