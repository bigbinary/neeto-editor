import React, { useEffect, useState } from "react";
import { Close } from "@bigbinary/neeto-icons";

import Button from "components/Common/Button";
import { UrlRegExp } from "constants/regexp";
import { isNilOrEmpty } from "utils/common";

const LinkOption = ({ editor, handleClose, handleAnimateInvalidLink }) => {
  const [link, setLink] = useState("");

  useEffect(() => {
    setLink(editor.getAttributes("link").href || "");
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      handleClose();
    } else if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (UrlRegExp.test(link)) {
      editor.chain().focus().setLink({ href: link }).run();
      handleClose();
    } else if (isNilOrEmpty(link)) {
      editor.chain().focus().unsetLink().run();
      handleClose();
    } else {
      setLink("");
      handleAnimateInvalidLink();
    }
  };

  const handleReset = () => {
    if (link) {
      setLink("");
      editor.chain().focus().unsetLink().run();
    } else {
      handleClose();
    }
  };

  return (
    <div onKeyDown={handleKeyDown} className="neeto-editor-bubble-menu__link">
      <input
        autoFocus
        name="url"
        value={link}
        placeholder="Paste or type a link..."
        onChange={({ target: { value } }) => setLink(value)}
        className="neeto-editor-bubble-menu-link__input"
        data-cy="neeto-editor-link-input"
      />
      <Button
        style="icon"
        icon={Close}
        onClick={handleReset}
        data-cy="neeto-editor-link-submit-button"
      />
    </div>
  );
};

export default LinkOption;
