import React from 'react';
import Image from 'next/image';
import SignUpWithSocialsButton from './SignUpWithSocialsButton';
import githubLogo from '../../../../public/assets/images/logo/github-logo.svg';
import { AUTH_HTTP_URL } from '../../../../http/auth';
const SignUpWithGithub = () => {
  return (
    <SignUpWithSocialsButton
      onClick={function (): void {
        throw new Error('Function not implemented.');
      }}
      href={`${AUTH_HTTP_URL}/auth/github`}
      leftIcon={<Image src={githubLogo} alt="GitHub logo" className="w-5 h-5" />}
    >
      Continue with Github
    </SignUpWithSocialsButton>
  );
};
export default SignUpWithGithub;
