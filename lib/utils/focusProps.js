export const highlightFocussedNode = () =>
  document.documentElement.style.setProperty(
    "--focus-background-color",
    "rgba(234, 243, 252, 0.5)"
  );

export const resetFocussedNode = () =>
  document.documentElement.style.setProperty(
    "--focus-background-color",
    "transparent"
  );

export default {
  onMouseEnter: highlightFocussedNode,
  onMouseLeave: resetFocussedNode,
};
