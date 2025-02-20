import { useEffect, useLayoutEffect, useRef } from "react";

interface Props {
  element: HTMLElement | null;
  callback: () => void;
}

const useClickOutside = ({ element, callback }: Props) => {
  const refCallback = useRef(callback);
  const refElement = useRef(element);

  useLayoutEffect(() => {
    refElement.current = element;
    refCallback.current = callback;
  });

  useEffect(() => {
    const handle = (e: MouseEvent | TouchEvent) => {
      if (!refElement.current || !e.target) {
        return;
      }

      if (!refElement.current.contains(e.target as Node)) {
        refCallback.current();
      }
    };

    window.addEventListener("mousedown", handle);
    window.addEventListener("touchstart", handle);

    return () => {
      window.removeEventListener("mousedown", handle);
      window.removeEventListener("touchstart", handle);
    };
  }, []);
};

export default useClickOutside;
