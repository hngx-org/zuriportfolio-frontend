import React from 'react';
import Image from 'next/image';
import SignUpWithSocialsButton from './SignUpWithSocialsButton';
import googleLogo from '../../../../public/assets/images/logo/google-logo.svg';

const SignUpWithGoogle = () => {
  return (
    // the google logo has white space around it, so i am reducing the margin on the right so all the buttons look similar
    <SignUpWithSocialsButton leftIcon={<Image src={googleLogo} alt="Google logo" className="w-8 h-8 -mr-1.5" />}>
      Continue with Google
    </SignUpWithSocialsButton>
  );
};

export default SignUpWithGoogle;
