import { useEffect } from "react";

import { isNilOrEmpty } from "utils/common";

const useEditorWarnings = ({ initialValue }) => {
  useEffect(() => {
    const isProduction = [process.env.RAILS_ENV, process.env.NODE_ENV].includes(
      "production"
    );
    if (!isProduction && isNilOrEmpty(initialValue)) {
      // eslint-disable-next-line no-console
      console.warn(
        `[neeto-editor]: Empty value of "initialValue" in needtoEditor is expected to be "<p></p>" instead of "${initialValue}".`
      );
    }
  }, [initialValue]);
};

export default useEditorWarnings;
