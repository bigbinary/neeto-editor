import React, { forwardRef } from "react";

import { Field } from "formik";

import Editor from ".";

import "../../index.scss";

const FormikEditor = ({ name, ...otherProps }, ref) => (
  <Field name={name}>
    {({ field, form, meta }) => (
      <Editor
        {...field}
        error={meta.touched ? meta.error : ""}
        handleBlur={() => form.setFieldTouched(name, true)}
        initialValue={field.value}
        ref={ref}
        onChange={value => form.setFieldValue(name, value)}
        {...otherProps}
      />
    )}
  </Field>
);

export default forwardRef(FormikEditor);
