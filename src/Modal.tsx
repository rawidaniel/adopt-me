import { useEffect, useRef, ReactElement, MutableRefObject } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }: { children: ReactElement }) => {
  const elref: MutableRefObject<HTMLDivElement | null> = useRef(null);

  if (!elref.current) {
    elref.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (!modalRoot || !elref.current) return;
    modalRoot.appendChild(elref.current);

    return () => {
      if (!elref.current) return;
      modalRoot.removeChild(elref.current);
    };
  }, []);
  return createPortal(<div>{children}</div>, elref.current);
};

export default Modal;
