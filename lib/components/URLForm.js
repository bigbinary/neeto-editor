import React, { useState } from "react";
import classNames from "classnames";
import Input from "components/Common/Input";
import Button from "components/Common/Button";
import { UrlRegExp } from "constants/regexp";

const URLForm = ({
  buttonLabel = "Submit",
  placeholder,
  onSubmit,
  className,
}) => {
  const [urlString, setUrlString] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (UrlRegExp.test(urlString)) {
      onSubmit(urlString);
    } else {
      setError("Please enter a valid url");
    }
  };

  return (
    <div
      className={classNames(
        "flex flex-col items-center justify-center flex-1 mx-10 flex-wrap",
        { [className]: className }
      )}
    >
      <div className="flex-row w-full my-4">
        <Input
          name="url"
          value={urlString}
          placeholder={placeholder}
          onFocus={() => setError("")}
          error={error}
          onChange={({ target: { value } }) => setUrlString(value)}
        />
      </div>
      <Button label={buttonLabel} onClick={handleSubmit} />
    </div>
  );
};

export default URLForm;
