import React from "react";

import { Formik, Form } from "formik";
import * as yup from "yup";

import { isEditorEmpty, FormikEditor } from "../../lib";
import Button from "../../lib/components/Common/Button";

const INITIAL_VALUES = {
  description: "<p></p>",
};

const VALIDATION_SCHEMA = yup.object().shape({
  description: yup
    .string()
    .test(
      "description",
      "Description is required",
      value => !isEditorEmpty(value)
    ),
});

const App = () => (
  <Formik
    initialValues={INITIAL_VALUES}
    validationSchema={VALIDATION_SCHEMA}
    onSubmit={values => console.log(values)}
  >
    <Form>
      <FormikEditor required label="Description" name="description" />
      <Button label="Submit" type="submit" />
    </Form>
  </Formik>
);

export default App;
