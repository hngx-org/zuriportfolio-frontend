import React, { ChangeEvent, useEffect, useState, useRef, useContext } from 'react';
import useAuthMutation from '../../../../hooks/Auth/useAuthMutation';
import { verfiy2FA, resend2FACode, enabled2FA, disable2FA } from '../../../../http/auth';
import { useAuth } from '../../../../context/AuthContext';
import Router, { useRouter } from 'next/router';
import { notify } from '@ui/Toast';
import Logic2FA from '@modules/auth/Logic2FA';

type InputRef = React.RefObject<HTMLInputElement>; // Define a type for the input refs

function Code2FALogic() {
  const router = useRouter();
  const [token, setToken] = useState<string>('');
  //const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs: InputRef[] = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const { digits } = Logic2FA();
  const { auth, userCameFrom, handleAuth } = useAuth();
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
    handleSubmit,
    handleResend,
  };
}

export default Code2FALogic;
