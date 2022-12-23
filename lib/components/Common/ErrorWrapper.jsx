import React from "react";

import classnames from "classnames";
import { is } from "ramda";

import { isNilOrEmpty } from "utils/common";

const ErrorWrapper = ({ error, isFixedMenuActive, children }) => {
  const isError = !isNilOrEmpty(error) && isFixedMenuActive;
  const wrapperClasses = classnames({ "neeto-editor-error": isError });

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

  return (
    <>
      <div className={wrapperClasses}>{children}</div>
      {isError && <p className="neeto-ui-input__error">{getErrorMessage()}</p>}
    </>
  );
};

export default ErrorWrapper;
