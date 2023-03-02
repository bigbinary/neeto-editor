import React, { forwardRef } from "react";

import { Field } from "formik";

import Editor from ".";

const FormikEditor = ({ name, ...otherProps }, ref) => (
  <Field name={name}>
    {({ field, form, meta }) => (
      <Editor
        error={meta.touched ? meta.error : ""}
        initialValue={field.value}
        ref={ref}
        onBlur={() => form.setFieldTouched(name, true)}
        onChange={value => form.setFieldValue(name, value)}
        {...otherProps}
      />
    )}
  </Field>
);

export default forwardRef(FormikEditor);
