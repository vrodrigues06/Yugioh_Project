import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";

type ModalProps = {
  isOpen: boolean;
  handleToggleModal: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  handleToggleModal,
  children,
}) => {
  const [isExiting, setIsExiting] = React.useState(false);
  const modalRef = React.useRef<HTMLDivElement | null>(null);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      handleToggleModal();
      setIsExiting(false);
    }, 300);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };
  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <motion.div
        className="fixed inset-0 bg-black opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 0.3 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      <Dialog.Panel className="fixed inset-0 flex justify-center items-center mx-auto p-4 xs:p-8 overflow-y-auto">
        <motion.div
          ref={modalRef}
          className="relative p-2 py-4 w-full mx-2 xs:p-6 bg-azul-950 rounded-lg xs:w-2xl shadow-lg border border-sky-900"
          initial={{ y: "-100%", opacity: 0 }}
          animate={{
            y: isExiting ? "-100%" : 0,
            opacity: isExiting ? 0 : 1,
          }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={handleClose}
            className="absolute top-0 right-0  text-xl p-2  xs:text-2xl font-semibold text-orange-500 z-[9999] cursor-pointer hover:text-orange-300 transition-colors"
          >
            <RiCloseCircleLine />
          </button>
          {children}
        </motion.div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default Modal;
