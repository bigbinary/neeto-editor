import { UrlRegExp } from "constants/regexp";

import React, { useState } from "react";

import classNames from "classnames";
import Button from "components/Common/Button";
import Input from "components/Common/Input";

const URLForm = ({
  buttonLabel = "Submit",
  placeholder,
  onSubmit,
  className,
}) => {
  const [urlString, setUrlString] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    if (UrlRegExp.test(urlString)) {
      onSubmit(urlString);
    } else {
      setError("Please enter a valid url");
    }
  };

  return (
    <div
      className={classNames("neeto-editor-url-form__wrapper", {
        [className]: className,
      })}
    >
      <Input
        autoFocus
        name="url"
        value={urlString}
        placeholder={placeholder}
        onFocus={() => setError("")}
        error={error}
        onChange={({ target: { value } }) => setUrlString(value)}
        data-cy="neeto-editor-image-upload-url-input"
      />
      <Button
        label={buttonLabel}
        onClick={handleSubmit}
        disabled={!urlString}
        data-cy="neeto-editor-image-upload-url-submit"
      />
    </div>
  );
};

export default URLForm;
