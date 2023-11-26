import React from 'react';
import Image from 'next/image';
import SignUpWithSocialsButton from './SignUpWithSocialsButton';
import googleLogo from '../../../../public/assets/Google.png';
import LogoCarousel from '@modules/home/carousel/logos/logosCarousel';

const SignUpWithGoogle = () => {
  return (
    // the google logo has white space around it, so i am reducing the margin on the right so all the buttons look similar
    <SignUpWithSocialsButton
      href="https://zuri-auth.up.railway.app/api/auth/api/auth"
      leftIcon={<Image src={googleLogo} alt="Google Logo" className="w-5 h-5" />}
    >
      Continue with Google
    </SignUpWithSocialsButton>
  );
};

export default SignUpWithGoogle;
