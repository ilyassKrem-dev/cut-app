import React, { useState, useRef, ChangeEvent, KeyboardEvent, SetStateAction, useEffect } from 'react';

interface VerfiyProps {
  verificationCode:string;
  setVerificationCode:React.Dispatch<SetStateAction<string>>
}

const VerificationInput:React.FC<Readonly<VerfiyProps>> = ({verificationCode,setVerificationCode}) => {
 
  const inputRefs = useRef<HTMLInputElement[]>(Array.from({ length: 6 }, () => null as unknown as HTMLInputElement));

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input.length === 1 && /^[0-9]+$/.test(input)) {
      const newCode = verificationCode.substring(0, index) + input + verificationCode.substring(index + 1);
      setVerificationCode(newCode);
      if (index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    }   
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      // Clear the input at the current index
      const newCode = verificationCode.substring(0, index) + verificationCode.substring(index + 1);
      setVerificationCode(newCode);
      // Move focus to the previous input if available
      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    if (pasteData.length === 6 && /^[0-9]+$/.test(pasteData)) {
      setVerificationCode(pasteData);
    }
  };

  return (
      <div className="flex gap-2 mt-4">
        {[...Array(6)].map((_, index) => (
          <input
            key={index}
            type="text"
            id={`input-${index}`}
            maxLength={1}
            value={verificationCode[index] || ''}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={(e) => handlePaste(e)}
            className='max-[360px]:w-[40px] max-[430px]:w-[50px] w-[60px] text-black h-[60px] rounded-xl focus-within:outline-none focus-within:border-2 focus-within:border-black text-center font-bold text-2xl'
            ref={(el) => (inputRefs.current[index] = el as any)}
          />
        ))}
      </div>
  );
};

export default VerificationInput;
