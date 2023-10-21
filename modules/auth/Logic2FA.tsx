import React, { ChangeEvent, useEffect, useState, useRef } from 'react';
import useAuthMutation from '../../hooks/Auth/useAuthMutation';
import { ADMIN_ID, useAuth } from '../../context/AuthContext';
import { verfiy2FA, resend2FACode } from '../../http/auth';
import { useRouter } from 'next/router';
import { notify } from '@ui/Toast';
import { error } from 'console';

type InputRef = React.RefObject<HTMLInputElement>; // Define a type for the input refs

function Code2FALogic() {
  const router = useRouter();
  const [token, setToken] = useState<string>('');
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRefs: InputRef[] = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const { auth, userCameFrom, handleAuth } = useAuth();
  const mutateFn = useAuthMutation(verfiy2FA, {
    onSuccess: (res: any) => {
      if (res.status === 200) {
        handleAuth(res.data);
        localStorage.setItem('zpt', res?.data?.token);
        localStorage.removeItem('email');
        localStorage.removeItem('2fa');

        // redirecting the user  to admin dashbord if they are an admin
        if (res.data.user.roleId === ADMIN_ID) {
          router.push('/super-admin/analytics-and-reporting');
          return;
        }

        notify({
          message: 'Login Successful',
          type: 'success',
          theme: 'light',
        });

        router.push(userCameFrom || '/explore');
        return;
      }
    },
    onError: (error: any) => {
      notify({
        message: error.message,
        type: 'error',
        theme: 'light',
      });
    },
  });

  useEffect(() => {
    let token = localStorage.getItem('2fa');
    if (typeof window !== undefined) {
      setToken(token as string);
    }
  }, []);

  const mutateRe = useAuthMutation(resend2FACode, {
    onSuccess: (res: any) => {
      console.log(res?.response);
      if (res?.response?.status === 200) {
        console.log(res?.response?.status);
        localStorage.setItem('2fa', res?.response?.token);
        setToken(res?.response?.token);
        notify({
          message: 'Two Factor Authentication Code Re-sent',
          type: 'success',
          theme: 'light',
        });
      }
    },
    onError: (error: any) => {
      notify({
        message: error.message,
        type: 'error',
        theme: 'light',
      });
    },
  });

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>, index: number) {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const pastedDigits = pastedData.replace(/\D/g, ''); // Remove non-digits

    if (digits.every((digit) => !digit)) {
      // If all input fields are empty, distribute the pasted digits
      const newDigits = pastedDigits.split('').slice(0, 6);
      setDigits([...newDigits, ...new Array(6 - newDigits.length).fill('')]);

      // Find the next empty field and focus it
      const nextEmptyFieldIndex = newDigits.findIndex((digit) => !digit);
      if (nextEmptyFieldIndex !== -1 && inputRefs[nextEmptyFieldIndex].current) {
        inputRefs[nextEmptyFieldIndex]?.current?.focus();
      }
    } else {
      // If not all input fields are empty, only paste to the current field
      const newDigits = [...digits];
      newDigits[index] = pastedDigits[0] || '';
      setDigits(newDigits);

      // If it's not the last field, move focus to the next field
      if (index < 5 && inputRefs[index + 1].current) {
        inputRefs[index + 1]?.current?.focus();
      }
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
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
      nextInput.current.focus();
    } else if (e.key === 'ArrowLeft' && previousInput?.current) {
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const code = digits.join('');
    setLoading(true);
    setTimeout(() => {
      mutateFn.mutate({ code, token });
      setLoading(false);
    }, 700);
  };

  const handleResend = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    let email = localStorage.getItem('email');
    setLoading(true);
    setTimeout(() => {
      mutateRe.mutate({ email: email as string });
      setLoading(false);
    }, 700);
  };

  return {
    digits,
    inputRefs,
    handlePaste,
    handleKeyDown,
    handleDigitChange,
    handleSubmit,
    handleResend,
    loading,
    auth,
  };
}

export default Code2FALogic;
