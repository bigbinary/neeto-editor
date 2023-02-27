import i18next from "i18next";
import { mergeDeepLeft } from "ramda";
import { initReactI18next } from "react-i18next";

import { en } from "../translations";

export const initializeI18n = resources => {
  i18next.use(initReactI18next).init({
    resources: mergeDeepLeft({ en: { translation: en } }, resources),
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
      skipOnVariables: false,
    },
  });
};
