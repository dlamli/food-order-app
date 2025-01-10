import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  open?: boolean;
  className?: string;
}

const Modal = ({ open, children, className = "" }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = dialogRef.current;
    if (open) modal!.showModal();

    return () => modal!.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialogRef} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById("modal")!
  );
};

export default Modal;
