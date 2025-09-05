import React from "react";

function MenuOption({ id, isOpen, setIsOpen, index, children }) {
  const isThisOpen = isOpen[index];

  const toggleIsOpen = () => {
    setIsOpen((prev) => new Array(prev.length).fill(false));
    if (!isThisOpen) {
      setIsOpen((prev) => {
        prev[index] = true;
        return prev;
      });
    }
  };

  return React.cloneElement(children, {
    id,
    isOpen: isThisOpen,
    toggleIsOpen,
  });
}

export default MenuOption;
