export const autoHide = {
  name: "hideOnEsc",
  defaultValue: true,
  fn: ({ hide }) => {
    const onKeyDown = (event) => {
      // Hide on typing in editor
      if (
        Array.from(event.target.classList).includes("ProseMirror") &&
        event.keyCode !== 13
      ) {
        hide();
      }

      // Hide on pressing `Escape`
      else if (event.keyCode === 27) {
        hide();
      }
    };

    return {
      onShow: () => document.addEventListener("keydown", onKeyDown),
      onHide: () => document.removeEventListener("keydown", onKeyDown),
    };
  },
};
