import React, { useState } from "react";

import Input from "common/Input";
import Button from "common/Button";
import { UrlRegExp } from "constants/regexp";

const URLField = ({ onSubmit }) => {
  const [urlString, setUrlString] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (UrlRegExp.test(urlString)) {
      onSubmit(urlString);
    } else {
      setError("Please provide a valid image url");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 mx-10">
      <div className="flex-row w-full mb-4">
        <Input
          name="url"
          value={urlString}
          placeholder="Paste the image link"
          onFocus={() => setError("")}
          error={error}
          onChange={({ target: { value } }) => setUrlString(value)}
        />
      </div>
      <Button label="Upload Image" onClick={handleSubmit} />
    </div>
  );
};

export default URLField;
