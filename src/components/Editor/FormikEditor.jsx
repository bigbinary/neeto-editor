import React, { forwardRef } from "react";

import { FastField } from "formik";
import { noop } from "neetocist";

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
  <FastField {...{ mentions, name, shouldUpdate, variables }}>
    {({ field, form, meta }) => (
      <Editor
        error={meta.touched ? meta.error : ""}
        initialValue={field.value}
        {...{ mentions, name, ref, variables }}
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
