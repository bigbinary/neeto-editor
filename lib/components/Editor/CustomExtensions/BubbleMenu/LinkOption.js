import React, { useEffect, useState } from "react";
import { Close } from "@bigbinary/neeto-icons";
import isEmpty from "lodash.isempty";

import Button from "components/Common/Button";
import { UrlRegExp } from "constants/regexp";

const LinkOption = ({ editor, handleClose, handleAnimateInvalidLink }) => {
  const [link, setLink] = useState("");

  useEffect(() => {
    setLink(editor.getAttributes("link").href || "");
  }, []);

  const handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      handleClose();
    } else if (event.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (UrlRegExp.test(link)) {
      editor.chain().focus().setLink({ href: link }).run();
      handleClose();
    } else if (isEmpty(link)) {
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
      />
      <Button style="icon" icon={Close} onClick={handleReset} />
    </div>
  );
};

export default LinkOption;
