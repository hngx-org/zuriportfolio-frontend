import React, { useState } from 'react';
import Image from 'next/image';
import SignUpWithSocialsButton from './SignUpWithSocialsButton';
import googleLogo from '../../../../public/assets/Google.png';
import LogoCarousel from '@modules/home/carousel/logos/logosCarousel';
import { AUTH_HTTP_URL } from '../../../../http/auth';

const SignUpWithGoogle = () => {
  const [isloading, setIsLoading] = useState(false);

  const handleLinkClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = `${AUTH_HTTP_URL}/auth/google`
    }, 5000);
  };

  
  return (
    // the google logo has white space around it, so i am reducing the margin on the right so all the buttons look similar
    <SignUpWithSocialsButton
      onClick={handleLinkClick}
      isLoading={isloading}
      //onClick={handleGoogleSignIn}
      leftIcon={<Image src={googleLogo} alt="Google Logo" className="" />}
    >
      Continue with Google
    </SignUpWithSocialsButton>
  );
};

export default SignUpWithGoogle;
