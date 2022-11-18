import React from "react";

import classnames from "classnames";
import { is } from "ramda";

import { isNilOrEmpty } from "utils/common";

const ErrorWrapper = ({ error, isFixedMenuActive, children }) => {
  const wrapperClasses = classnames({
    "neeto-editor-error": error && isFixedMenuActive,
  });

  const getErrorMessage = () => {
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

    return message;
  };

  if (!error) return children;

  return (
    <>
      <div className={wrapperClasses}>{children}</div>
      <p className="ne-input__error">{getErrorMessage()}</p>
    </>
  );
};

export default ErrorWrapper;
