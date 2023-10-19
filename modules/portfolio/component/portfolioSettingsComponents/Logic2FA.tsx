import React, { ChangeEvent, useEffect, useState, useRef, useContext } from 'react';
import useAuthMutation from '../../../../hooks/Auth/useAuthMutation';
import { verfiy2FA, resend2FACode, enabled2FA, disable2FA } from '../../../../http/auth';
import { useAuth } from '../../../../context/AuthContext';
import Router, { useRouter } from 'next/router';
import { notify } from '@ui/Toast';
import Logic2FA from '@modules/auth/Logic2FA';

type InputRef = React.RefObject<HTMLInputElement>;

function Code2FALogic() {
  const router = useRouter();
  const [token, setToken] = useState<string>('');
  //const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [enabled, setEnabled] = useState<boolean>(false);
  //const inputRefs: InputRef[] = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const { digits, inputRefs, handlePaste, handleKeyDown, handleDigitChange } = Logic2FA();

  const { auth } = useAuth();
  const mutateFn = useAuthMutation(verfiy2FA, {
    onSuccess: (res: any) => {
      console.log(res);
    },
  });

  const mutateRe = useAuthMutation(resend2FACode, {
    onSuccess: (res: any) => {
      console.log(res?.response);
      if (res?.response?.statues === 200) {
        setToken(res?.response?.token);
        console.log('token', token);

        notify({
          message: 'code sent check your mail',
          type: 'success',
        });
      } else {
        notify({
          message: 'unable to  send code mail',
          type: 'error',
        });
      }
    },
  });

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    const code = digits.join('');
    mutateFn.mutate({ code, token });
  };

  const handleResend = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    let email = auth?.user.email;
    console.log('THE EMIAL ' + email);

    mutateRe.mutate({ email: email as string });
  };

  return {
    digits,
    inputRefs,
    handlePaste,
    handleKeyDown,
    handleDigitChange,
    handleSubmit,
    handleResend,
  };
}

export default Code2FALogic;
