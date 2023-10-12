import React from 'react';
import Image from 'next/image';
import SignUpWithSocialsButton from './SignUpWithSocialsButton';
import githubLogo from '../../../../public/assets/images/logo/github-logo.svg';


const SignUpWithGithub = () => {
 
  return (
    <SignUpWithSocialsButton href="https://auth.akuya.tech/api/auth/github"  leftIcon={<Image src={githubLogo} alt="GitHub logo" className="w-5 h-5" />}>
      Continue with Github
    </SignUpWithSocialsButton>
  );
};

export default SignUpWithGithub;
