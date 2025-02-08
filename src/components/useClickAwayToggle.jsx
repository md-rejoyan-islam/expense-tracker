import { useEffect, useRef, useState } from "react";

function useClickAwayToggle() {
  const [isDivVisible, setIsDivVisible] = useState(false);

  const buttonRef = useRef(null);
  const divRef = useRef(null);

  const handleButtonClick = () => {
    setIsDivVisible(!isDivVisible);
  };

  const handleClickOutside = (event) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target) &&
      divRef.current &&
      !divRef.current.contains(event.target)
    ) {
      setIsDivVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return {
    isDivVisible,
    buttonRef,
    divRef,
    handleButtonClick,
  };
}

export default useClickAwayToggle;
