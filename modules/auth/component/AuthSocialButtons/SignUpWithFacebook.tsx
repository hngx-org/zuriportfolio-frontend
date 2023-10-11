import React from 'react';
import Image from 'next/image';
import SignUpWithSocialsButton from './SignUpWithSocialsButton';
import facebookLogo from '../../../../public/assets/images/logo/facebook-logo.svg';

const SignUpWithfacebook = () => {
  return (
    <SignUpWithSocialsButton leftIcon={<Image src={facebookLogo} alt="Google logo" className="w-8 h-8" />}>
      Continue with Facebook
    </SignUpWithSocialsButton>
  );
};

export default SignUpWithfacebook;
