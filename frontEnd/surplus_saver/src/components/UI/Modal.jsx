/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

const Modal = ({
  id,
  title,
  children,
  onClose,
  open,
  action,
  onHandleConfirmDelete,
}) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.getElementById(id).showModal();
    } else {
      document.getElementById(id).close();
    }
  }, [id, open]);

  return (
    <dialog id={id} className="modal" ref={modalRef}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        {children}
        <div className="modal-action">
          <form method="dialog">
            <button className="btn space-x-3" onClick={onClose}>
              Close
            </button>
            <button onClick={onHandleConfirmDelete} className="btn space-x-10">
              {action}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
