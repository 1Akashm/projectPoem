import React, { useEffect, useState } from "react";

const VerificationInput = ({
  index,
  inputLength,
  code,
  setCode,
  handleSubmit,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delay form submission to allow user to finish typing
  useEffect(() => {
    if (isSubmitting) {
      const timeout = setTimeout(() => {
        if (code.every((digit) => digit !== "")) {
          handleSubmit(); // Trigger form submission when all inputs are filled
        }
        setIsSubmitting(false); // Reset submission state
      }, 200); // Delay of 200ms to allow input to update fully
      return () => clearTimeout(timeout);
    }
  }, [isSubmitting, code, handleSubmit]);

  const handleInput = (e) => {
    const value = e.target.value;

    if (value !== "") {
      e.target.classList.add("bg-green-600");
    } else {
      e.target.classList.remove("bg-green-600");
    }

    // Only allow a single digit
    if (!/^\d?$/.test(value)) {
      e.target.value = "";
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value) {
      if (index < inputLength - 1) {
        const nextInput = document.querySelector(`#input-${index + 1}`);
        if (nextInput) nextInput.focus();
      } else {
        e.target.blur();
      }
    }

    setIsSubmitting(true); // Set submitting state to true
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      const prevInput = document.querySelector(`#input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const pasteInput = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, inputLength);
    const newCode = [...code];

    pasted.split("").forEach((char, i) => {
      const pos = index + i;
      if (pos < inputLength) {
        newCode[pos] = char;
      }
    });

    setCode(newCode);

    const nextFocusIndex = index + pasted.length;
    if (nextFocusIndex < inputLength) {
      const nextFocus = document.getElementById(`input-${nextFocusIndex}`);
      if (nextFocus) nextFocus.focus();
    }

    setIsSubmitting(true); // Set submitting state to true
  };

  return (
    <input
      id={`input-${index}`}
      type="text"
      inputMode="numeric"
      value={code[index] || ""}
      maxLength={1}
      onChange={handleInput}
      onKeyDown={handleKeyDown}
      onPaste={pasteInput}
      className="bg-green-200 w-full text-center h-[50px] rounded-xl text-green-800 shadow-2xl focus:bg-green-400 outline-0 border-0"
    />
  );
};

export default VerificationInput;
