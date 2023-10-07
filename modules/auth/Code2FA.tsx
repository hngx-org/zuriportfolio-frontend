'use client';
import React, { ChangeEvent, useState, useRef } from 'react';
import { KeyboardEvent } from 'react';
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

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>, index: number) {
    const input = e.target as HTMLInputElement;
    const previousInput = inputRefs[index - 1];
    const nextInput = inputRefs[index + 1];

    if ((e.key === 'Backspace' || e.key === 'Delete') && input.value === '') {
      e.preventDefault();
      const newDigits = [...digits];
      newDigits[index] = '';
      setDigits(newDigits);
      if (previousInput?.current) {
        previousInput.current.focus();
      }
    } else if (e.key === 'ArrowRight' && nextInput?.current) {
      // Right arrow key
      nextInput.current.focus();
    } else if (e.key === 'ArrowLeft' && previousInput?.current) {
      // Left arrow key
      previousInput.current.focus();
    }
  }

  const handleDigitChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (/^\d?$/.test(newValue)) {
      // Allow single digit or empty value
      const newDigits = [...digits];
      newDigits[index] = newValue;
      setDigits(newDigits);

      // Move focus to the next input field if a digit is entered
      if (newValue && index < 5 && inputRefs[index + 1].current) {
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
        <div className="grid grid-cols-6 gap-3 justify-center lg:self-start relative">
          {digits.map((digit, index) => (
            <input
              key={index}
              name={index.toString()}
              type="tel"
              maxLength={1}
              pattern="\d"
              required
              value={digit}
              onChange={(e) => handleDigitChange(index, e)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={inputRefs[index]}
              className="w-9 h-9 md:w-14 md:h-14 text-center border
              border-gray-300 rounded border-opacity-70 focus:outline-green-600"
            />
          ))}
          <span className="text-gray-500 absolute top-2 md:top-5 left-1/2 ml-[-0.7%]">-</span>
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
