import { useRef, useState } from 'react';
import Modal from '@ui/Modal';
import { useAuth } from '../../../../context/AuthContext';
import { CloseCircle } from 'iconsax-react';
import Help from '../../../../public/assets/inviteAssets/Help.svg';
import Image from 'next/image';

interface OTPValues {
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  otp5: string;
  [key: string]: string;
}

const Twofa = () => {
  const [open2Fa, setOpen2Fa] = useState<boolean>(false);
  const [countinue2Fa, setContinue2Fa] = useState<boolean>(false);
  const [otpValues, setOtpValues] = useState<OTPValues>({
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
    otp5: '',
  });

  const inputRefs: React.RefObject<HTMLInputElement>[] = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const [error, setError] = useState<string>('');
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;

    // Make sure the value is a number and limit it to a single digit
    if (/^\d*$/.test(value) && value.length <= 1) {
      setOtpValues({
        ...otpValues,
        [`otp${index + 1}`]: value,
      });

      // Focus on the next input field if available
      if (index < inputRefs.length - 1) {
        const nextInputRef = inputRefs[index + 1];
        if (nextInputRef.current) {
          nextInputRef.current.focus();
        }
      }
    }
  };
  const [inputError, setInputError] = useState(false);
  const handleContinue = () => {
    if (Object.values(otpValues).some((value) => value === '')) {
      setError('Please fill in all OTP fields');
      setInputError(true);
    } else {
      setError('');
    }
  };

  const toggleModal = () => {
    setOpen2Fa((prev: boolean) => !prev);
  };

  const toggleModal2 = () => {
    setContinue2Fa((prev: boolean) => !prev);
    setOpen2Fa(false);
  };
  const { auth } = useAuth();

  return (
    <div className="space-y-[4px] mb-6 text-dark-110 text-[14px]">
      <div className="space-y-[4px] mb-6 text-dark-110">
        <p className="font-manropeB text-[14px] ">2FA security</p>
        <span className="font-manropeL text-[14px] ">Add an extra layer of security to your system</span>
      </div>
      <div
        className="flex justify-between font-manropeL  text-[ #555555;
] "
      >
        <p>Two factor authentication</p>

        <label htmlFor="2fa" className="relative inline-flex items-center cursor-pointer mx-end">
          <input
            type="checkbox"
            name=""
            id="2fa"
            checked={open2Fa}
            value={'Disabled'}
            onChange={() => setOpen2Fa((prv) => !prv)}
            className="sr-only peer"
          />
          <div
            className={`w-11 h-6 bg-[#D4D4D4] rounded-full peer peer-focus:ring-white
      dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:bg-white-100 
    after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white
     after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
       peer-checked:bg-brand-green-primary`}
          ></div>
          <span className="ml-3 text-sm font-medium text-gray-900 ">
            {open2Fa || countinue2Fa ? 'Enabled' : 'Disabled'}
          </span>
        </label>
      </div>
      <Modal isOpen={open2Fa} closeModal={toggleModal} size={'sm'} isCloseIconPresent={false}>
        <div className=" relative  max-w-[440px] px-5 text-[14px] py-[40px]">
          <button onClick={toggleModal} className="absolute right-0 top-[-10px]">
            {' '}
            <CloseCircle size="20" color="#009254" />
          </button>
          <h3 className="w-full text-center mb-[8px] text-[#252525] font-manropeB">Turn on 2FA </h3>
          <p>Enhance your security by enabling a verification code to verify your identity</p>

          <label htmlFor="" className="flex my-[24px] relative flex-col gap-[6px] text-[ #344054]">
            Enter phone number
            <input
              type="text"
              readOnly
              value={auth?.user.email}
              className="border-[1px] outline-none  rounded-lg py-[10px] px-[14px] border-[#D0D5DD]"
            />
            <Image
              src={Help}
              width={'20'}
              height={'20'}
              alt="help"
              className="absolute right-[12px]   top-[35px]"
            ></Image>
          </label>

          <button
            onClick={toggleModal2}
            className="w-full bg-brand-green-primary text-white-100 text-center
                             font-manropeB text-[16px] py-[14px] rounded-lg "
          >
            Continue
          </button>
        </div>
      </Modal>

      <Modal isOpen={countinue2Fa} closeModal={toggleModal2} size={'sm'} isCloseIconPresent={false}>
        <div className=" relative  max-w-[440px] px-5 text-[14px] py-6 flex flex-col self-center   md:py-[40px]">
          <button onClick={toggleModal2} className="absolute right-0 top-[-10px]">
            {' '}
            <CloseCircle size="20" color="#009254" />
          </button>
          <h3 className="w-full text-center mb-[8px] text-[#252525] font-manropeB">Confirm Email </h3>
          <p className="mt-3 mb-5 mx-auto">Enter the OTP sent to your Email</p>
          <div className="space-x-3 mb-6  mx-auto">
            {' '}
            {Object.keys(otpValues).map((key, index) => (
              <input
                key={key}
                name={key}
                value={otpValues[key]}
                onChange={(e) => handleOtpChange(e, index)}
                ref={inputRefs[index]}
                className={`border-[1px] w-[30px] h-[30px] text-center text-dark-110 outline-none
              rounded-lg py-[10px]  border-[#D0D5DD] ${otpValues[key] == '' && inputError && 'border-red-200'}`}
              />
            ))}
          </div>

          <button
            className="w-full text-[#6C6C6C] text-center
                             font-manropeL text-[12px] py-[14px] rounded-lg "
          >
            Resend OTP
          </button>

          <button
            onClick={handleContinue}
            className="w-full bg-brand-green-primary text-white-100 text-center
                             font-manropeB text-[16px]  mt-6 py-[14px] rounded-lg "
          >
            Continue
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default Twofa;
