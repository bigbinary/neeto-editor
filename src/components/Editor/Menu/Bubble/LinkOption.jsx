import React, { useEffect, useState } from "react";

import { Close } from "neetoicons";
import { Button } from "neetoui";
import { useTranslation } from "react-i18next";

import { URL_REGEXP } from "common/constants";
import { isNilOrEmpty } from "utils/common";

const LinkOption = ({ editor, handleClose, handleAnimateInvalidLink }) => {
  const { t } = useTranslation();

  const [link, setLink] = useState("");

  useEffect(() => {
    setLink(editor.getAttributes("link").href || "");
  }, [editor]);

  const handleKeyDown = event => {
    if (event.key === "Escape") {
      handleClose();
    } else if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (URL_REGEXP.test(link)) {
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
    <div className="neeto-editor-bubble-menu__link" onKeyDown={handleKeyDown}>
      <input
        autoFocus
        className="neeto-editor-bubble-menu-link__input"
        data-cy="neeto-editor-link-input"
        name="url"
        placeholder={t("placeholders.linkInput")}
        value={link}
        onChange={({ target: { value } }) => setLink(value)}
      />
      <Button
        data-cy="neeto-editor-link-cancel-button"
        icon={Close}
        size="small"
        style="icon"
        onClick={handleReset}
      />
    </div>
  );
};

export default LinkOption;
