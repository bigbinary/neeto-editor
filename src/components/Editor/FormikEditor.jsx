import React, { forwardRef } from "react";

import { FastField } from "formik";
import { noop } from "neetocommons/pure";

import Editor from ".";

const FormikEditor = (
  {
    name,
    onChange = noop,
    shouldFormikEditorUpdate,
    mentions,
    variables,
    ...otherProps
  },
  ref
) => (
  <FastField
    mentions={mentions}
    name={name}
    shouldUpdate={shouldFormikEditorUpdate}
    variables={variables}
  >
    {({ field, form, meta }) => (
      <Editor
        error={meta.touched ? meta.error : ""}
        initialValue={field.value}
        name={name}
        ref={ref}
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
