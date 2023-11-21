import React, { useRef } from "react";

import { noop } from "neetocist";
import { Button } from "neetoui";

import { Attachments } from "src";

const CustomAttachmentsDemo = () => {
  const attachmentsRef = useRef(null);

  const handleUpload = () =>
    attachmentsRef.current?.handleUploadAttachments() || noop;

  return (
    <>
      <Button label="Custom upload button" onClick={handleUpload} />
      <Attachments
        className="pt-2"
        isIndependent={false}
        ref={attachmentsRef}
      />
    </>
  );
};

export default CustomAttachmentsDemo;
