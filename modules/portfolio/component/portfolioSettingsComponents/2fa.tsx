import { useEffect, useRef, useState, useMemo } from 'react';
import Modal from '@ui/Modal';
import { useAuth } from '../../../../context/AuthContext';
import { CloseCircle } from 'iconsax-react';
import Help from '../../../../public/assets/inviteAssets/Help.svg';
import Image from 'next/image';
import Router, { useRouter } from 'next/router';
import { notify } from '@ui/Toast';
import { verfiy2FA, resend2FACode, enabled2FA, disable2FA } from '../../../../http/auth';
import _2FA from '../../../../pages/auth/2fa';
import Logic2FA from '../../../../modules/auth/Logic2FA';
import Button from '@ui/Button';

interface close {
  closeAcc: boolean;
  setCloseAcc: React.Dispatch<React.SetStateAction<boolean>>;
}
const Handling2FA = (props: close) => {
  const { auth, handleAuth } = useAuth();
  const [open2Fa, setOpen2Fa] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [countinue2Fa, setContinue2Fa] = useState<boolean>(false);
  const [lgModal, setLgModal] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [fill, setFill] = useState<boolean>(false);

  const { digits, inputRefs, handlePaste, handleKeyDown, handleDigitChange } = Logic2FA();
  const router = useRouter();

  const handleResend2FACode = async () => {
    setLoading(true);
    try {
      const email = auth?.user.email;
      if (email) {
        const resendResponse = await resend2FACode({ email });
        console.log(resendResponse);
        if (resendResponse?.statues === 200) {
          setToken(resendResponse?.response?.token);
          setLoading(false);
          setOpen2Fa(false);
          setContinue2Fa(true);

          notify({
            message: 'code sent check your mail',
            type: 'success',
          });
          setTimeout(() => {
            if (inputRefs.length > 0) {
              inputRefs[0]?.current?.focus();
            }
          }, 500);
          setFill(false);
        } else {
          setLoading(false);
          setOpen2Fa(false);
          notify({
            message: `${resendResponse?.message}`,
            type: 'error',
          });
        }
      } else {
        setLoading(false);
        notify({
          message: 'unable to  send code mail',
          type: 'error',
        });
      }
    } catch (error) {
      setLoading(false);
      notify({
        message: 'unable to  send code mail',
        type: 'error',
      });

      console.error(error);
    }
  };

  const handleEnable2FA = async () => {
    setLoading(true);
    const unFilled = digits.filter((o) => o === '').map((o) => o);
    setFill(true);
    try {
          const token = auth?.token as string;
          const enableResponse = await enabled2FA({ token });
          if (enableResponse.status === 200) {
            handleAuth(enableResponse.data);
            console.log(enableResponse);
            setLoading(false);
            setOpen2Fa(false);
            notify({
              message: '2FA Enabled',
              type: 'success',
            });
          } else {
            setLoading(false);
            notify({
              message: 'Invalid Code',
              type: 'error',
            });
          }
    } catch (error) {
      setLoading(false);
      notify({
        message: 'error occurred',
        type: 'error',
      });
    }
  };


  const handleDisable2FA = async () => {
    setLoading(true);
    const unFilled = digits.filter((o) => o === '').map((o) => o);
    setFill(true);
    try {
          const token = auth?.token as string;
          const enableResponse = await disable2FA({ token });
          if (enableResponse.status === 200) {
            handleAuth(enableResponse.data);
            console.log(enableResponse);
            setLoading(false);
            setOpen2Fa(false);
            notify({
              message: '2FA Disabled',
              type: 'success',
            });
          } else {
            setLoading(false);
            notify({
              message: 'Invalid Code',
              type: 'error',
            });
          }
    } catch (error) {
      setLoading(false);
      notify({
        message: 'error occurred',
        type: 'error',
      });
    }
  };


  const handleVerifyAndEnable2FA = async () => {
    setLoading(true);
    const unFilled = digits.filter((o) => o === '').map((o) => o);
    setFill(true);
    try {
      const code = digits.join('');

      if (token && unFilled.length == 0) {
        const verificationResponse = await verfiy2FA({ token, code });

        if (verificationResponse.status === 200) {
          console.log('approved');

          const enableResponse = await enabled2FA({ token });
          if (enableResponse.status === 200) {
            handleAuth(enableResponse.data);
            console.log(enableResponse);
            setLoading(false);
            setOpen2Fa(false);
            notify({
              message: '2FA Enabled',
              type: 'success',
            });
            setTimeout(() => {
              router.push('/');
            }, 3000);
          } else {
            setLoading(false);
            notify({
              message: 'Invalid Code',
              type: 'error',
            });
          }
        } else {
          setLoading(false);
          notify({
            message: 'Invalid code',
            type: 'error',
          });
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      notify({
        message: 'error occurred',
        type: 'error',
      });
    }
  };

  const handleVerifyAndDisable2FA = async () => {
    setLoading(true);
    const unFilled = digits.filter((o) => o === '').map((o) => o);
    setFill(true);
    try {
      const code = digits.join('');

      if (token && unFilled.length == 0) {
        const verificationResponse = await verfiy2FA({ token, code });

        if (verificationResponse.status === 200) {
          const disableResponse = await disable2FA({ token });
          if (disableResponse.status === 200) {
            handleAuth(disableResponse?.data);
            console.log('disable');
            console.log('diabled', disableResponse);
            setLoading(false);
            notify({
              message: '2FA disabled',
              type: 'success',
            });

            setTimeout(() => {
              router.push('/');
            }, 3000);
          } else {
            setLoading(false);
            notify({
              message: 'Invalid Code',
              type: 'error',
            });
          }
        } else {
          setLoading(false);
          notify({
            message: 'Invalid code',
            type: 'error',
          });
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      notify({
        message: 'error occurred',
        type: 'error',
      });
    }
  };

  const [showHint, setShowHint] = useState<boolean>(false);

  const toggleModal = () => {
    setOpen2Fa((prev: boolean) => !prev);
    props.setCloseAcc(false);
    setLoading(false);
  };

  const toggleModal2 = () => {
    setContinue2Fa((prev: boolean) => !prev);
    setOpen2Fa(false);
    setLoading(false);
  };

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setLgModal(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleResize();
  }, []);

  return (
    <div className="space-y-[4px] mb-6 max-w-[500px] text-dark-110 text-[14px]">
      {props.closeAcc || lgModal ? (
        <>
          {' '}
          <div className="space-y-[4px] mb-6 text-dark-110">
            <p className="font-manropeB text-[14px] ">2FA security</p>
            <span className="font-manropeL text-[14px] ">Add an extra layer of security to your system</span>
          </div>
          <div
            className="flex justify-between flex-wrap font-manropeL  text-[ #555555;
] "
          >
            <p>Two factor authentication</p>

            <label
              onClick={() => {
                if(!auth?.user?.twoFactorAuth) {
                  setOpen2Fa((prv) => !prv);
                  !lgModal && props.setCloseAcc(false);
                } else {
                    handleDisable2FA()
                  }
              }} 
              className="relative inline-flex items-center cursor-pointer mx-end"
            >
              <input
                type="checkbox"
                name=""
                id="2fa"
                disabled
                checked={auth?.user?.twoFactorAuth || auth?.user?.two_factor_auth}
                onChange={() => {
                  // setOpen2Fa((prv) => !prv);
                  // !lgModal && props.setCloseAcc(false);
                }}
                className="sr-only peer"
              />
              <div
                className={`w-11 h-6 bg-[#D4D4D4] rounded-full peer peer-focus:ring-white
    peer-checked:after:translate-x-full peer-checked:bg-brand-green-primary
   peer-checked:after:border-white after:bg-white-100 
    after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white
     after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
       `}
              ></div>
              <span className="ml-3 text-sm font-medium text-gray-900 ">
                {auth?.user?.twoFactorAuth || auth?.user?.two_factor_auth ? 'Enabled' : 'Disabled'}
              </span>
            </label>
          </div>{' '}
        </>
      ) : (
        ''
      )}

      {!props.closeAcc && !countinue2Fa && (
        <div className=" relative md:hidden font-manropeL   max-w-[440px] text-[14px] py-[40px]">
          <h3 className="w-full text-start mb-[8px] text-[24px] text-[#252525] font-manropeB">Turn on 2FA </h3>
          <p>Enhance your security by enabling a verification code to verify your identity Setting</p>

          <label htmlFor="" className="flex my-[24px] relative flex-col gap-[6px] text-[ #344054]">
            Email
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

          <Button
            intent={'secondary'}
            size={'sm'}
            isLoading={loading}
            spinnerColor="#39D98A"
            onClick={handleResend2FACode}
            className="w-full bg-brand-green-primary  hover:bg-brand-green-hover border-[0px] text-white-100 text-center
                             font-manropeB text-[16px] py-[14px] rounded-lg "
          >
            Continue
          </Button>
        </div>
      )}

      {countinue2Fa && (
        <div
          className=" relative md:hidden max-w-[440px]
         text-[14px] font-manropeL justify-start flex flex-col    "
        >
          <h3
            className="w-full text-start mb-[8px] text-[24px]
           text-[#252525] font-manropeB"
          >
            Confirm Email{' '}
          </h3>
          <p className="mt-3 mb-5">Enter the OTP sent to your Email</p>
          <div className="space-x-3 mb-6  space-y-3 ">
            {' '}
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
                className={`w-[30px] h-[30px] ${
                  digit == '' && fill && 'border-red-200'
                }  text-center border border-gray-300 rounded-lg border-opacity-70 
                focus:outline-green-600`}
              />
            ))}
          </div>

          <button
            onClick={handleResend2FACode}
            className={`w-full text-[#6C6C6C] text-center
                             font-manropeL text-[12px] py-[14px] rounded-lg            `}
          >
            Resend OTP
          </button>

          <Button
            intent={'secondary'}
            size={'sm'}
            isLoading={loading}
            spinnerColor="#39D98A"
            onClick={() => {
              auth?.user?.twoFactorAuth || auth?.user?.two_factor_auth
                ? handleVerifyAndDisable2FA()
                : handleVerifyAndEnable2FA();
            }}
            className={`w-full bg-brand-green-primary border-0  hover:bg-brand-green-hover text-white-100 text-center
                           font-manropeB text-[16px]  mt-6 py-[14px] rounded-lg ${
                             digits.some((digit) => !digit)
                               ? 'rounded-lg bg-gray-300 hover:bg-gray-400 bg-opacity-50 text-gray-900'
                               : ''
                           } `}
          >
            Continue{' '}
          </Button>
        </div>
      )}

      {lgModal && (
        <div className="hidden md:block">
          <Modal isOpen={open2Fa} closeModal={toggleModal} size={'sm'} isCloseIconPresent={false}>
            <div className=" relative  max-w-[440px] px-5 text-[14px] py-[40px]">
              <button onClick={toggleModal} className="absolute right-0 top-3">
                {' '}
                <CloseCircle size="20" color="#009254" />
              </button>
              <h3 className="w-full text-center mb-[8px] text-[#252525] font-manropeB">Turn on 2FA </h3>
              <p>Enhance your security by enabling a verification code to verify your identity Other</p>

              <label htmlFor="" className="flex my-[24px] relative flex-col gap-[6px] text-[ #344054]">
                Email
                <input
                  type="text"
                  readOnly
                  value={auth?.user.email}
                  className="border-[1px] outline-none  rounded-lg py-[10px] px-[14px] border-[#D0D5DD]"
                />
                <Image
                  // onClick={() =>  setShowHint(prv=>!prv)}
                  onMouseOver={() => setShowHint((prv) => !prv)}
                  onMouseOut={() => setShowHint((prv) => !prv)}
                  src={Help}
                  width={'20'}
                  height={'20'}
                  alt="help"
                  className="absolute
                   right-[12px] hover:before:content-['your OTP will be sent here']   top-[35px]"
                ></Image>
                <p
                  className={`${
                    showHint
                      ? 'absolute lg:-bottom-7 -bottom-6 right-0 text-[9px] lg:text-[10px] text-[#667085] p-2 font-manropeL'
                      : 'hidden'
                  }`}
                >
                  The otp code will be sent here
                </p>
              </label>

              <Button
                intent={'secondary'}
                size={'sm'}
                isLoading={loading}
                spinnerColor="#39D98A"
                // onClick={handleResend2FACode}
                onClick={handleEnable2FA}
                className="w-full bg-brand-green-primary border-[0px]  hover:bg-brand-green-hover text-white-100 text-center
                             font-manropeB text-[16px] py-[14px] rounded-lg "
              >
                Continue
              </Button>
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
                    className={`w-[45px] h-[44px] ${
                      digit == '' && fill && 'border-red-200'
                    }  text-center border border-gray-300 rounded-lg border-opacity-70 
                    focus:outline-green-600`}
                  />
                ))}
              </div>

              <button
                onClick={handleResend2FACode}
                className={`w-full text-[#6C6C6C] text-center
                             font-manropeL text-[12px] py-[14px] rounded-lg  `}
              >
                Resend OTP
              </button>
              {/* <button
                            onClick={() => {
                              auth?.user?.twoFactorAuth || auth?.user?.two_factor_auth ? handleVerifyAndDisable2FA(): handleVerifyAndEnable2FA() ;
                            }}
                className={`w-full bg-brand-green-primary text-white-100 text-center
                             font-manropeB text-[16px]  mt-6 py-[14px] rounded-lg           ${
                               digits.some((digit) => !digit)
                                 ? 'rounded-lg bg-gray-300 hover:bg-gray-400 bg-opacity-50 text-gray-900'
                                 : ''
                             } `}
              >
                Continue
              </button> */}

              <Button
                //leftIcon={<I24Support color="#06C270" />}
                intent={'secondary'}
                onClick={() => {
                  auth?.user?.twoFactorAuth || auth?.user?.two_factor_auth
                    ? handleVerifyAndDisable2FA()
                    : handleVerifyAndEnable2FA();
                }}
                size={'sm'}
                isLoading={loading}
                spinnerColor="#39D98A"
                className={`w-full bg-brand-green-primary border-[0px] hover:bg-brand-green-hover text-white-100 text-center
          font-manropeB text-[16px]  mt-6 py-[14px] rounded-lg           ${
            digits.some((digit) => !digit) ? 'rounded-lg bg-gray-300 hover:bg-gray-400 bg-opacity-50 text-gray-900' : ''
          } `}
              >
                Continue
              </Button>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};
export default Handling2FA;
