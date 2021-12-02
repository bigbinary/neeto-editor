import React, { useEffect, useState } from "react";
import Input from "components/Common/Input";
import Button from "components/Common/Button";
import { UrlRegExp } from "constants/regexp";

const LinkOption = ({ editor, isActive, handleClose }) => {
  const [error, setError] = useState("");
  const [urlString, setUrlString] = useState("");

  useEffect(() => {
    setUrlString(editor.getAttributes("link").href || "");
  }, []);

  const handleLink = (event) => {
    event.preventDefault();
    if (UrlRegExp.test(urlString)) {
      editor.chain().focus().setLink({ href: urlString }).run();
      handleClose();
    } else {
      setError("Please enter a valid url");
    }
  };

  const handleUnlink = () => {
    editor.chain().focus().unsetLink().run();
    handleClose();
  };

  return (
    <form className="flex py-1 space-x-3 add-link-form">
      <div className="flex-row w-full">
        <Input
          autoFocus
          name="url"
          value={urlString}
          placeholder="Paste URL"
          onFocus={() => setError("")}
          error={error}
          onChange={({ target: { value } }) => setUrlString(value)}
        />
      </div>
      <Button
        label="Link"
        type="submit"
        onClick={handleLink}
        className="self-start"
      />
      {isActive ? (
        <Button label="Unlink" onClick={handleUnlink} className="self-start" />
      ) : null}
    </form>
  );
};

export default LinkOption;
