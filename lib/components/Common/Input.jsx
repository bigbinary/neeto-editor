import React, { useState, forwardRef } from "react";

import classnames from "classnames";
import { Label } from "neetoui";
import PropTypes from "prop-types";

import { slugify } from "utils/common";

import { SIZES } from "./constants";

const Input = forwardRef(
  (
    {
      id,
      size = SIZES.medium,
      type = "text",
      label = "",
      error = "",
      suffix = null,
      prefix = null,
      disabled = false,
      helpText = "",
      className = "",
      nakedInput = false,
      contentSize = null,
      required = false,
      maxLength,
      ...otherProps
    },
    ref
  ) => {
    const [valueInternal, setValueInternal] = useState(otherProps.value);

    const onChangeInternal = e => setValueInternal(e.target.value);

    const value = otherProps.value ?? valueInternal ?? "";
    const onChange = otherProps.onChange || onChangeInternal;

    const errorId = `error_${id}`;
    const helpTextId = `helpText_${id}`;

    const valueLength = value?.toString().length || 0;
    const isCharacterLimitVisible = valueLength >= maxLength * 0.9;
    const maxLengthError = !!maxLength && valueLength > maxLength;

    return (
      <div className={classnames(["ne-input__wrapper", className])}>
        <div className="ne-input__label-wrapper">
          {label && (
            <Label
              data-cy={`ne-${slugify(label)}-input-label`}
              htmlFor={id}
              required={required}
            >
              {label}
            </Label>
          )}
          {isCharacterLimitVisible && (
            <p
              className={classnames("ne-input__max-length", {
                "ne-input__max-length--error": maxLengthError,
              })}
            >
              {valueLength}/{maxLength}
            </p>
          )}
        </div>
        <div
          className={classnames("ne-input", {
            "ne-input--naked": !!nakedInput,
            "ne-input--error": !!error,
            "ne-input--disabled": !!disabled,
            "ne-input--small": size === "small",
            "ne-input--medium": size === "medium",
            "ne-input--large": size === "large",
          })}
        >
          {prefix && <div className="ne-input__prefix">{prefix}</div>}
          <input
            aria-invalid={!!error}
            data-cy="input-field"
            disabled={disabled}
            id={id}
            ref={ref}
            required={required}
            size={contentSize}
            type={type}
            aria-describedby={classnames({
              [errorId]: !!error,
              [helpTextId]: helpText,
            })}
            {...otherProps}
            value={value}
            onChange={onChange}
          />
          {suffix && <div className="ne-input__suffix">{suffix}</div>}
        </div>
        {!!error && (
          <p
            className="ne-input__error"
            data-cy={`ne-${slugify(label)}-input-error`}
            id={errorId}
          >
            {error}
          </p>
        )}
        {helpText && (
          <p
            className="ne-input__help-text"
            data-cy={`ne-${slugify(label)}-input-help`}
            id={helpTextId}
          >
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

Input.propTypes = {
  /**
   * To specify a unique ID to the input component.
   */
  id: PropTypes.string,
  /**
   * To specify the size of input.
   */
  size: PropTypes.oneOf(Object.values(SIZES)),
  /**
   * To specify the type of input field.
   */
  type: PropTypes.string,
  /**
   * To specify a maximum character limit to the input. Charater limit is visible only if the input value is greater than or equal to 90% of the maximum character limit.
   */
  maxLength: PropTypes.number,
  /**
   * To specify the text to be displayed above the input.
   */
  label: PropTypes.string,
  /**
   * To specify the error message to be shown in the input field.
   */
  error: PropTypes.string,
  /**
   * To specify the content to be added at the end of the input field.
   */
  suffix: PropTypes.node,
  /**
   * To specify the content to be added at the beginning of the input field.
   */
  prefix: PropTypes.node,
  /**
   * To specify whether the input field is disabled or not.
   */
  disabled: PropTypes.bool,
  /**
   * To specify the text that appears below the input field.
   */
  helpText: PropTypes.string,
  /**
   * To specify external classNames that can be provided as overrides to the main wrapper.
   */
  className: PropTypes.string,
  /**
   * To create an input field without any borders.
   */
  nakedInput: PropTypes.bool,
  /**
   * To specify the value to be passed as size attribute to the input field.
   */
  contentSize: PropTypes.number,
  /**
   * To specify whether the input field is required or not.
   */
  required: PropTypes.bool,
};

Input.displayName = "Input";
export default Input;
