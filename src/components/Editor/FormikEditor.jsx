import React, { forwardRef } from "react";

import { FastField } from "formik";
import { noop } from "neetocommons/pure";

import Editor from ".";

const FormikEditor = (
  {
    name,
    onChange = noop,
    shouldUpdate,
    mentions = [],
    variables = [],
    ...otherProps
  },
  ref
) => (
  <FastField
    mentions={mentions}
    name={name}
    shouldUpdate={shouldUpdate}
    variables={variables}
  >
    {({ field, form, meta }) => (
      <Editor
        error={meta.touched ? meta.error : ""}
        initialValue={field.value}
        mentions={mentions}
        name={name}
        ref={ref}
        variables={variables}
        onBlur={() => form.setFieldTouched(name, true)}
        onChange={value => {
          form.setFieldValue(name, value);
          onChange?.(value);
        }}
        {...otherProps}
      />
    )}
  </FastField>
);

export default forwardRef(FormikEditor);
