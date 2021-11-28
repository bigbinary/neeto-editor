import React from "react";
import classnames from "classnames";

import Label from "./Label";
import { hyphenize } from "utils/common";

const Input = React.forwardRef((props, ref) => {
  const {
    id,
    size = "small",
    type = "text",
    label,
    error = null,
    suffix = null,
    prefix = null,
    disabled = false,
    helpText = "",
    className = "",
    nakedInput = false,
    contentSize = null,
    required = false,
    ...otherProps
  } = props;

  return (
    <div className={classnames(["neeto-ui-input__wrapper", className])}>
      {label && (
        <Label
          required={required}
          data-cy={`${hyphenize(label)}-input-label`}
          htmlFor={id}
        >
          {label}
        </Label>
      )}
      <div
        className={classnames("neeto-ui-input", {
          "neeto-ui-input--naked": !!nakedInput,
          "neeto-ui-input--error": !!error,
          "neeto-ui-input--disabled": !!disabled,
          "neeto-ui-input--small": size === "small",
        })}
      >
        {prefix && <div className="neeto-ui-input__prefix">{prefix}</div>}
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          size={contentSize}
          required={required}
          aria-invalid={!!error}
          data-cy={"input-field"}
          {...otherProps}
        />
        {suffix && <div className="neeto-ui-input__suffix">{suffix}</div>}
      </div>
      {!!error && (
        <p
          data-cy={`${hyphenize(label)}-input-error`}
          className="neeto-ui-input__error"
        >
          {error}
        </p>
      )}
      {helpText && <p className="neeto-ui-input__help-text">{helpText}</p>}
    </div>
  );
});

export default Input;
