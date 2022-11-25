import { EditorProps } from "./index";

interface FormikEditorProps extends EditorProps {
  name: string;
}

function FormikEditor(props: FormikEditorProps): JSX.Element;

export default FormikEditor;
