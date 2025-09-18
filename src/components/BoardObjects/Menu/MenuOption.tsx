import React from "react";

function MenuOption({ id, isOpen, setIsOpen, index, children }) {
  const isThisOpen = isOpen[index];

  const toggleIsOpen = () => {
    setIsOpen((prev) => {
      const newState = new Array(prev.length).fill(false);
      newState[index] = !isThisOpen;
      return newState;
    });
  };

  return React.cloneElement(children, {
    id,
    isOpen: isThisOpen,
    toggleIsOpen,
  });
}

export default MenuOption;
