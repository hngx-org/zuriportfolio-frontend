'use client';
import React, { ChangeEvent } from 'react';
import Button from '../../components/ui/Button';
import Logic2FA from '../../modules/auth/Logic2FA';
import { resend2FACode } from '../../http/auth';

function Code2FAUI() {
  const { digits, inputRefs, handlePaste, handleKeyDown, handleDigitChange, handleSubmit, loading, handleResend } =
    Logic2FA();

  return (
    <>
      <h2 className="text-2xl md:text-4xl text-center lg:pt-0 font-bold lg:text-left max-w-[20ch] lg:self-start">
        A code has been sent to your mail
      </h2>
      <form className="flex flex-col gap-10 items-center w-full" onSubmit={handleSubmit}>
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
              onPaste={(e) => handlePaste(e, index)}
              ref={inputRefs[index]}
              aria-label={`Digit ${index + 1}`}
              className="w-9 h-9 md:w-[43px] md:h-14 lg:w-12 text-center border border-gray-300 rounded border-opacity-70 focus:outline-green-600"
            />
          ))}
          <span className="text-gray-500 absolute top-2 md:top-5 left-1/2 ml-[-0.7%]">-</span>
        </div>

        <Button
          isLoading={loading}
          className={`w-full md:w-10/12 lg:w-11/12 m-auto md:m-0 h-14
          lg:self-start rounded-lg text-base
          ${
            digits.some((digit) => !digit) ? 'rounded-lg bg-gray-300 hover:bg-gray-400 bg-opacity-50 text-gray-900' : ''
          }`}
        >
          Continue
        </Button>
      </form>
      <Button
        onClick={handleResend}
        aria-label="Resend code"
        className="bg-tranparent text-gray-700 hover-bg-transparent
        mx-auto p-0 justtify-self-center self-center font-base text-center
        active:bg-transparent focus:bg-transparent hover:bg-transparent"
      >
        Did not receive code? <span className="text-green-600 ml-[-4px]">Resend</span>
      </Button>
    </>
  );
}

export default Code2FAUI;
