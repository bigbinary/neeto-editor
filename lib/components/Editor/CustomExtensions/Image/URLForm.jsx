import React, { useState } from "react";

import classNames from "classnames";

import { URL_REGEXP } from "common/constants";
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
    if (URL_REGEXP.test(urlString)) {
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
        data-cy="neeto-editor-image-upload-url-input"
        error={error}
        name="url"
        placeholder={placeholder}
        value={urlString}
        onChange={({ target: { value } }) => setUrlString(value)}
        onFocus={() => setError("")}
      />
      <Button
        data-cy="neeto-editor-image-upload-url-submit"
        disabled={!urlString}
        label={buttonLabel}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default URLForm;
