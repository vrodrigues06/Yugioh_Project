import React from "react";

const useModal = () => {
  const [open, setOpen] = React.useState(false);

  function handleToggleModal() {
    setOpen((prev) => {
      const newModalState = !prev;
      return newModalState;
    });
  }

  return { open, handleToggleModal };
};

export default useModal;
