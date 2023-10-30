import React, { useState } from "react";

import classNames from "classnames";
import { Button, Input } from "neetoui";
import { useTranslation } from "react-i18next";

import { URL_REGEXP } from "common/constants";

const URLForm = ({
  buttonLabel = "Submit",
  placeholder,
  onSubmit,
  className = "",
}) => {
  const { t } = useTranslation();

  const [urlString, setUrlString] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    URL_REGEXP.test(urlString)
      ? onSubmit(urlString)
      : setError(t("neetoEditor.error.invalidUrl"));
  };

  return (
    <div
      className={classNames("neeto-editor-url-form__wrapper", {
        [className]: className,
      })}
    >
      <Input
        autoFocus
        data-cy="neeto-editor-media-upload-url-input"
        {...{ error, placeholder }}
        name="url"
        value={urlString}
        onChange={({ target: { value } }) => setUrlString(value)}
        onFocus={() => setError("")}
      />
      <Button
        data-cy="neeto-editor-media-upload-url-submit"
        disabled={!urlString}
        label={buttonLabel}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default URLForm;
