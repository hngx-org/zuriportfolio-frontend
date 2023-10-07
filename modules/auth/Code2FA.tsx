'use client';
import React, { ChangeEvent, useState, useRef } from 'react';
import Button from '../../components/ui/Button';

function Code2FA() {
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
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
      <h2
        className="text-2xl md:text-4xl
        text-center lg:pt-0 font-bold lg:text-left max-w-[20ch] lg:self-start"
      >
        A code has been sent to your mail
      </h2>
      <form className="flex flex-col gap-10 items-center w-full">
        <p className="text-base lg:self-start text-gray-700 mb-[-1.8rem]">Enter 6 digit code</p>
        <div className="flex items-center justify-center space-x-2 lg:self-start">
          {digits.slice(0, 3).map((digit, index) => (
            <input
              key={index}
              name={index.toString()}
              type="text"
              maxLength={1}
              pattern="\d"
              required
              value={digit}
              onChange={(e) => handleDigitChange(index, e)}
              ref={inputRefs[index]}
              className="w-9 h-9 md:w-14 md:h-14 text-center border border-gray-300 rounded border-opacity-70 focus:outline-green-600"
            />
          ))}
          <span className="text-gray-500">-</span>
          {digits.slice(3).map((digit, index) => (
            <input
              key={index + 3}
              name={index.toString()}
              type="text"
              maxLength={1}
              pattern="\d"
              required
              value={digit}
              onChange={(e) => handleDigitChange(index + 3, e)}
              ref={inputRefs[index + 3]}
              className="w-9 h-9 md:w-14 md:h-14 text-center border border-gray-300 rounded border-opacity-70 focus:outline-green-600"
            />
          ))}
        </div>
        <Button
          href=""
          className={`w-full md:w-10/12 lg:w-11/12 m-auto md:m-0 h-14
          lg:self-start rounded-lg text-base
          ${isContinueDisabled ? 'rounded-lg bg-gray-300 hover:bg-gray-400 bg-opacity-50 text-gray-900' : ''}`}
        >
          Continue
        </Button>
      </form>
      <Button
        onClick={() => console.log('to be implmented with api integration')}
        className="bg-tranparent text-gray-700 hover:bg-transparent
        mx-auto p-0 justtify-self-center self-center font-base text-center"
      >
        Didn’t receive code? <span className="text-green-600 ml-[-4px]">Resend</span>
      </Button>
    </>
  );
}

export default Code2FA;
