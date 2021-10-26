import { useEffect } from "react";

const useOutsideClick = ({ ref, onClick }) => {
  useEffect(() => {
    const listener = ({ target }) => {
      if (!ref.current || !onClick) return;
      // Check if event target is inside reference node
      if (ref.current.contains(target)) return;
      onClick();
    };

    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, []);
};

export default useOutsideClick;
