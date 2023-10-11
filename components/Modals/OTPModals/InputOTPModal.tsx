import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import cancel from '../../../public/assets/images/logo/otp-modal-cancel.svg';
import Link from 'next/link';
import Button from '@ui/Button';
import PaymentStatusModal from './PaymentStatusModal';
import checkedPayment from '../../../public/assets/images/check-1.png';

interface OTPModal {
  onClose: () => void;
}

const InputOTPModal = ({ onClose }: OTPModal) => {
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(''));
  const [otpError, setOtpError] = useState<boolean>(false); // To trigger the otp error, setOtpError to true. You can write a function to automate it.

  const [activeOTPIndexes, setActiveOTPIndexes] = useState<number[]>(Array(4).fill(0));

  const [paymentStatus, setPaymentStatus] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>(Array(4).fill(null));

  const isActive = false;
  const correctOTP: string = '1234';

  const maskPhoneNumber = (phoneNumber: any) => {
    const num = String(phoneNumber);
    if (typeof num !== 'string') {
      return 'Invalid phone number';
    }
    const length = num.length;
    if (length < 6) {
      return num;
    }

    const numAsterisks = Math.min(length - 4, 6);

    const maskedPhoneNumber = num.substring(0, 2) + '*'.repeat(numAsterisks) + num.substring(length - 3);

    return maskedPhoneNumber;
  };

  const phoneNumber = '08121212974'; // It can be any number
  const maskedNumber = maskPhoneNumber(phoneNumber);

  // OTP functionalities
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    const { value } = event.target;
    const OTP: string[] = [...otp];

    if (/^\d$/.test(value)) {
      OTP[index] = value;

      if (index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === '') {
      OTP[index] = value;

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }

    setOtp(OTP);
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
    if (event.key === 'Backspace' && !event.currentTarget.value) {
      if (index > 0) {
        event.preventDefault();
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>, index: number): void => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text').substring(0, 4);
    const OTP: string[] = [...otp];

    for (let i = 0; i < pastedText.length; i++) {
      OTP[index + i] = pastedText[i];
    }

    setOtp(OTP);

    if (index < 3) {
      inputRefs.current[index + pastedText.length]?.focus();
    }
  };

  const handleContinueClick = () => {
    // Join the OTP array to get the entered OTP
    const enteredOTP = otp.join('');

    // Check if the entered OTP matches the correct OTP
    if (enteredOTP === correctOTP) {
      // Correct OTP, allow the user to advance
      setPaymentStatus(true);
    } else {
      // Incorrect OTP, set error state to show red borders
      setOtpError(true);
    }
  };

  const goBackHome = () => {
    window.location.href = '/marketplace';
  };

  useEffect(() => {
    activeOTPIndexes.forEach((index) => {
      const inputRef = inputRefs.current[index];
      if (inputRef) {
        inputRef.focus();
      }
    });
  }, [activeOTPIndexes]);

  const otpInputClasses = `w-[80px] h-[80px] text-center border-[1px] border-[solid] rounded-[8px] 
    [@media(max-width:520px)]:w-[50px] [@media(max-width:520px)]:h-[50px] [@media(max-width:520px)]:items-center [@media(max-width:400px)]:w-[50px] [@media(max-width:400px)]:h-[50px]
    ${
      isActive
        ? 'border-brand-green-primary'
        : 'border-neutral-key-colour-n-94 focus:outline-none focus:border-brand-green-primary'
    }`;
  const otpErrorInputClasses = `w-[80px] h-[80px] text-center border-[1px] border-[solid] rounded-[8px] 
        [@media(max-width:520px)]:w-[60px] [@media(max-width:520px)]:h-[60px] [@media(max-width:520px)]:items-center [@media(max-width:400px)]:w-[50px] [@media(max-width:400px)]:h-[50px]
        border-[1px] border-[solid] border-brand-red-primary  focus:outline-none`;

  const otpErrorTextClasses = `text-brand-red-primary max-w-[422px] w-4/5 h-[44px] font-manropeL text-center text-[16px] not-italic font-normal leading-[24px] tracking-[0.08px] [@media(max-width:400px)]:text-[14px]`;
  const otpTextClasses =
    'max-w-[422px] w-4/5 h-[44px] font-manropeL text-center text-[16px] not-italic font-normal leading-[24px] tracking-[0.08px] [@media(max-width:400px)]:text-[14px]';

  const renderOTP = otp.map((_, index) => {
    return (
      <React.Fragment key={index}>
        <input
          ref={(element) => {
            inputRefs.current[index] = element!;
          }}
          type="number"
          placeholder=""
          className={otpError ? otpErrorInputClasses : otpInputClasses}
          onChange={(e) => handleOnChange(e, index)}
          onKeyDown={(e) => handleOnKeyDown(e, index)}
          onPaste={(e) => handlePaste(e, index)}
          value={otp[index]}
        />
      </React.Fragment>
    );
  });

  return paymentStatus ? (
    <PaymentStatusModal>
      <div className="bg-white-100 py-6 rounded text-center w-full h-full">
        <div className="flex justify-center">
          <Image src={checkedPayment} alt="checked" />
        </div>
        <h3 className="text-sm w-20 mx-auto font-bold my-4">Payment Successful!</h3>
        <button
          className="bg-green-700 hover:bg-green-600 rounded text-white-100 text-sm w-1/2 h-9 px-3"
          onClick={goBackHome}
        >
          Back to Home
        </button>
      </div>
    </PaymentStatusModal>
  ) : (
    <div className="flex justify-center items-center m-auto  flex-col rounded-[20px] w-full h-[475px] gap-[34px]">
      <div className="flex justify-center items-center gap-[264px] [@media(max-width:520px)]:gap-[120px]">
        <p className="text-center font-manropeL text-[24px] not-italic font-bold leading-[32px] [@media(max-width:520px)]:text-[18px]">
          Confirm OTP
        </p>
        <Image className="cursor-pointer" src={cancel} alt="cancel modal" onClick={onClose} />
      </div>
      <div className={otpError ? otpErrorTextClasses : otpTextClasses}>
        <p>A one-time password has been sent to {maskedNumber}. Kindly check and enter below.</p>
      </div>
      <div className="inline-flex flex-col items-start gap-[16px] max-w-[400px] w-[88%] [@media(max-width:520px)]:items-center">
        <p className="flex items-start font-manropeL text-[16px] not-italic font-semibold leading-[24px] [@media(max-width:400px)]:mt-[20px]">
          Enter OTP
        </p>
        <div className="flex justify-center items-center gap-[24px] [@media(max-width:400px)]:gap-[14px]">
          {renderOTP}
        </div>
      </div>
      <div>
        <p className="text-center font-manropeL text-[14px] not-italic font-normal leading-[20px] tracking-[0.035px] text-brand-red-100">
          Didn’t get an OTP?{' '}
          <Link href={''} className="text-brand-green-primary">
            Resend OTP
          </Link>
        </p>
      </div>
      <Button
        className="flex w-[313px] h-[56px] px-[16.923px] py-[10.154px] justify-center items-center gap-[13.538px] rounded-[10px] bg-brand-green-primary [@media(max-width:520px)]:w-[200px]"
        onClick={handleContinueClick}
      >
        <p className="text-center font-manropeL text-[22px] not-italic font-semibold text-white leading-[28px]">
          Continue
        </p>
      </Button>
    </div>
  );
};

export default InputOTPModal;
