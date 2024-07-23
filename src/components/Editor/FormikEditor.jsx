import React, { forwardRef, memo } from "react";

import { FastField } from "formik";
import { noop } from "neetocist";

import Editor from ".";

const FormikEditor = (
  {
    name,
    onChange = noop,
    shouldUpdate,
    attachments = [],
    mentions = [],
    variables = [],
    ...otherProps
  },
  ref
) => (
  <FastField {...{ attachments, mentions, name, shouldUpdate, variables }}>
    {({ field, form, meta }) => (
      <Editor
        {...{ attachments, mentions, name, ref, variables }}
        error={meta.touched ? meta.error : ""}
        initialValue={field.value}
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

FormikEditor.displayName = "FormikNeetoEditor";

export default memo(forwardRef(FormikEditor));
