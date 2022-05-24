import React from "react";
import classNames from "classnames";
import { is } from "ramda";
import { isNilOrEmpty } from "utils/common";

const ErrorWrapper = ({ error, isFixedMenuActive, children }) => {
  const wrapperClasses = classNames({
    "neeto-editor-error": error && isFixedMenuActive,
  });

  const renderEditorError = () => {
    if (!error) return null;

    let message;

    if (is(String, error)) {
      message = error;
    } else if (is(Array, error)) {
      message = error[0];
    } else if (is(Object, error)) {
      message = error.message;
    }

    if (isNilOrEmpty(message)) return null;

    return <p className="ne-input__error">{message}</p>;
  };

  return (
    <>
      <div className={wrapperClasses}>{children}</div>
      {renderEditorError()}
    </>
  );
};

export default ErrorWrapper;
