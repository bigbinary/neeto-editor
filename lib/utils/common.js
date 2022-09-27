import { useEffect } from "react";

import { isNil, isEmpty } from "ramda";

export const capitalize = string => {
  const fallbackString = "nui";

  if (string && string.replace) {
    return string
      .toLowerCase()
      .replace("-", " ")
      .replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
  }

  return fallbackString;
};

export const hyphenize = string => {
  const fallbackString = "nui";

  if (string && string.replace) {
    return string
      .replace(/[\s_]/g, "-")
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/-+/g, "-")
      .toLowerCase();
  }

  return fallbackString;
};

export const stringifyObject = (object, separator = ";") =>
  Object.entries(object).reduce(
    (acc, [key, value]) => (acc += `${key}:${value}${separator}`),
    ""
  );

export const isNilOrEmpty = object => isNil(object) || isEmpty(object);

export const noop = () => {};

export const useOnClickOutside = (insideRef, outsideRef, handler) => {
  useEffect(() => {
    const listener = event => {
      // Do nothing if clicking ref's element or descendent elements
      if (!insideRef.current || insideRef.current.contains(event.target)) {
        return;
      }

      if (outsideRef.current) {
        // If Outside ref exists, trigger the handler if it contains the event target.
        if (outsideRef.current.contains(event.target)) {
          handler(event);
        }

        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [insideRef, outsideRef, handler]);
};

export const focusElementsInModal = (ref, shouldFocusFirstFocusableElement) => {
  const focusableElements =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const firstFocusableElement =
    ref?.current?.querySelectorAll(focusableElements)[0];
  const focusableContent = ref?.current?.querySelectorAll(focusableElements);
  const lastFocusableElement = focusableContent[focusableContent?.length - 1];

  if (!shouldFocusFirstFocusableElement) return;

  document.addEventListener("keydown", function (e) {
    const isTabPressed = e.key === "Tab" || e.keyCode === 9;
    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  });

  firstFocusableElement?.focus();
};
