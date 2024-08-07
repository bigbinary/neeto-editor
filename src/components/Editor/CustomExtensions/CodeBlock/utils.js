export const handleCodeBlockVisibility = ({ entries, setIsVisible }) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setIsVisible(true);
      entry.target.style.visibility = "visible";
    } else {
      const rect = entry.boundingClientRect;
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        setIsVisible(false);
        entry.target.style.visibility = "hidden";
      } else if (rect.top < window.innerHeight + 200) {
        setIsVisible(true);
        entry.target.style.visibility = "visible";
      }
    }
  });
};
