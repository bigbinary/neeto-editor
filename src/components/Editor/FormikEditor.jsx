import React, { forwardRef } from "react";

import { FastField } from "formik";

import Editor from ".";

const FormikEditor = ({ name, ...otherProps }, ref) => (
  <FastField name={name}>
    {({ field, form, meta }) => (
      <Editor
        error={meta.touched ? meta.error : ""}
        initialValue={field.value}
        name={name}
        ref={ref}
        onBlur={() => form.setFieldTouched(name, true)}
        onChange={value => form.setFieldValue(name, value)}
        {...otherProps}
      />
    )}
  </FastField>
);

export default forwardRef(FormikEditor);
