"use client"
import React, { ChangeEvent, useState, useRef } from "react";
import Button from "@ui/Button";

function Code2FA() {
    const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const isContinueDisabled = digits.some((digit) => !digit);
  const [resend, setResend] = useState<boolean>(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleDigitChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (/^\d$/.test(newValue)) {
      const newDigits = [...digits];
      newDigits[index] = newValue;
      setDigits(newDigits);

      // Move focus to the next input field
      if (index < 5 && inputRefs[index + 1].current) {
        inputRefs[index + 1]?.current?.focus();
      }
    }
  };

  return (
    <>
        <h2 className="text-3xl
        text-center pt-[3rem] md:pt-0 md:text-left max-w-[20ch] md:self-start">
          A code has been sent to your mail
        </h2>
            <form className="flex flex-col gap-4 items-center w-full">
          <p className="text-sm font-light md:self-start">Enter 6 digit code</p>
          <div className="flex items-center justify-center space-x-2 md:self-start">
            {digits.slice(0, 3).map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                pattern="\d"
                required
                value={digit}
                onChange={(e) => handleDigitChange(index, e)}
                ref={inputRefs[index]}
                className="w-9 h-9 text-center border border-gray-300 rounded border-opacity-70"
              />
            ))}
            <span className="text-gray-500">-</span>
            {digits.slice(3).map((digit, index) => (
              <input
                key={index + 3}
                type="text"
                maxLength={1}
                pattern="\d"
                required
                value={digit}
                onChange={(e) => handleDigitChange(index + 3, e)}
                ref={inputRefs[index + 3]}
                className="w-9 h-9 text-center border border-gray-300 rounded border-opacity-70"
              />
            ))}
          </div>
          <Button
          href=""
          className={` w-[90%] m-auto md:m-0 h-[52px]
          md:self-start rounded-lg text-base mt-3 md:mt-6
          ${isContinueDisabled ?
            "rounded-lg bg-gray-400 hover:bg-gray-400 bg-opacity-50 text-gray-900"
          :
          ""}`}
           >
            Continue
          </Button>
        </form>
        <Button
        onClick={() => console.log("to be implmented with api integration")}
        className="bg-tranparent text-black hover:bg-transparent w-fit md:self-center"
        >
          Didn’t receive code? <span className="text-green-600">Resend</span>
        </Button>
    </>
  )

}

export default Code2FA;