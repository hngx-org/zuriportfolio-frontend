import React from 'react';
import Image from 'next/image';
import SignUpWithSocialsButton from './SignUpWithSocialsButton';
import facebookLogo from '../../../../public/assets/images/logo/facebook-logo.svg';

const SignUpWithFacebook = () => {
  return (
    <SignUpWithSocialsButton leftIcon={<Image src={facebookLogo} alt="Google logo" className="w-5 h-5" />}>
      Continue with Facebook
    </SignUpWithSocialsButton>
  );
};

export default SignUpWithFacebook;
