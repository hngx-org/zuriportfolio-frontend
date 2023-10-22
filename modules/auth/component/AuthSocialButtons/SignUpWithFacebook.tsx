import React from 'react';
import Image from 'next/image';
import SignUpWithSocialsButton from './SignUpWithSocialsButton';
import facebookLogo from '../../../../public/assets/images/logo/facebook-logo.svg';

const SignUpWithFacebook = () => {
  return (
    <SignUpWithSocialsButton
      href="https://staging.zuri.team/api/auth/api/auth/facebook"
      leftIcon={<Image src={facebookLogo} alt="Facebook Logo" className="w-5 h-5" />}
    >
      Continue with Facebook
    </SignUpWithSocialsButton>
  );
};

export default SignUpWithFacebook;
