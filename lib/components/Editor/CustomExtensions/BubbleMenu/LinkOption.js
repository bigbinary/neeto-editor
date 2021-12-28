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

  useEffect(() => {
    document.addEventListener("keydown", handlePressEsc);
    return () => document.removeEventListener("keydown", handlePressEsc);
  }, []);

  const handlePressEsc = (e) => {
    if (e.keyCode === 27) {
      handleClose();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
    <form onSubmit={handleSubmit} className="neeto-editor-bubble-menu__item">
      <input
        autoFocus
        name="url"
        value={link}
        placeholder="Paste or type a link..."
        onChange={({ target: { value } }) => setLink(value)}
        className="bg-transparent outline-none"
      />
      <Button icon={Close} onClick={handleReset} className="-m-1.5" />
    </form>
  );
};

export default LinkOption;
