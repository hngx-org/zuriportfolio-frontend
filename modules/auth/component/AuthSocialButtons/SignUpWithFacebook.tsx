import React from 'react';
import Image from 'next/image';
import SignUpWithSocialsButton from './SignUpWithSocialsButton';
import facebookLogo from '../../../../public/assets/images/logo/facebook-logo.svg';
import { AUTH_HTTP_URL } from '../../../../http/auth';

const SignUpWithFacebook = () => {
  return (
    <SignUpWithSocialsButton
      onClick={function (): void {
        throw new Error('Function not implemented.');
      }}
      href={`${AUTH_HTTP_URL}/auth/facebook`}
      leftIcon={<Image src={facebookLogo} alt="Facebook Logo" className="w-5 h-5" />}
    >
      Continue with Facebook
    </SignUpWithSocialsButton>
  );
};

export default SignUpWithFacebook;
