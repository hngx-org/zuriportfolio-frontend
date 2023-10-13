import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import jwtDecode from 'jwt-decode';
import useAuthMutation from '../../hooks/Auth/useAuthMutation';
import { verfiy2FA } from '../../http/auth';
import isAuthenticated from '../../helpers/isAuthenticated';

type InputRef = React.RefObject<HTMLInputElement>; // Define a type for the input refs

function Code2FALogic() {
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs: InputRef[] = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  interface DecodedToken {
    email: string;
  }
  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token !== null) {
      const decodedToken = jwtDecode(token) as DecodedToken;

      if (isAuthenticated(token)) {
        const userEmail = decodedToken.email;

        console.log(`User's email: ${userEmail}`);
      } else {
        console.log('User is not authenticated.');
      }
    } else {
      console.log('Token is null.');
    }
  }, []);

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

  const loginFn = useAuthMutation(verfiy2FA);
  const handleSubmit = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const Token = localStorage.getItem('authToken');
    if (Token !== null) {
      const decodedToken = jwtDecode(Token) as DecodedToken; // Assuming you've defined DecodedToken
      const email = decodedToken.email;
      const token = digits.toString();
      loginFn.mutate({ email, token });
    } else {
      console.log('Token is null. Unable to proceed.');
    }
  };

  const handleResend = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
  };
  return { digits, inputRefs, handlePaste, handleKeyDown, handleDigitChange, handleSubmit, handleResend };
}

export default Code2FALogic;
