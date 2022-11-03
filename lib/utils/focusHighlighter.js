const highlightFocussedNode = () =>
  document.documentElement.style.setProperty(
    "--focus-background-color",
    "rgba(234, 243, 252, 0.5)"
  );

const resetFocussedNode = () =>
  document.documentElement.style.setProperty(
    "--focus-background-color",
    "transparent"
  );

const focusProps = {
  onMouseEnter: highlightFocussedNode,
  onMouseLeave: resetFocussedNode,
};

const generateFocusProps = (highlight = false) => (highlight ? focusProps : {});

export {
  highlightFocussedNode,
  resetFocussedNode,
  focusProps,
  generateFocusProps,
};
