import React, { useEffect, useState } from "react";
import { VerificationStore } from "../store/Store";

const VerificationInput = ({ index, inputLength }) => {
  const { code, setCode } = VerificationStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const timeout = setTimeout(() => {
        if (code.every((digit) => digit !== "")) {
          document.querySelector("form")?.requestSubmit(); // Trigger submit
        }
        setIsSubmitting(false);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [isSubmitting, code]);

  const handleInput = (e) => {
    const value = e.target.value;

    if (!/^\d?$/.test(value)) {
      e.target.value = "";
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value) {
      const nextInput = document.querySelector(`#input-${index + 1}`);
      if (nextInput) nextInput.focus();
      else e.target.blur();
    }

    setIsSubmitting(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      const prevInput = document.querySelector(`#input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const pasteInput = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, inputLength);
    const newCode = [...code];

    pasted.split("").forEach((char, i) => {
      const pos = index + i;
      if (pos < inputLength) {
        newCode[pos] = char;
      }
    });

    setCode(newCode);

    const nextFocusIndex = index + pasted.length;
    const nextFocus = document.getElementById(`input-${nextFocusIndex}`);
    if (nextFocus) nextFocus.focus();

    setIsSubmitting(true);
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
