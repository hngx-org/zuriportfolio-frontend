import Button, { ButtonVariants } from '@ui/Button';
import React, { FC } from 'react';
import useUserSession from '../../../../hooks/Auth/useUserSession';
import { AuthButtonProps } from '../../../../@types';

const SignUpWithSocialsButton: FC<AuthButtonProps> = ({ children, leftIcon, onClick, ...props }) => {
  const { setCurrentPathForOAuth } = useUserSession();

  return (
    <Button
      intent={'tertiary'}
      size={'sm'}
      className="w-full bg-white-100 text-custom-color20 border-custom-color21 border rounded-md hover:bg-white-100 hover:border-brand-green-primary sm:text-base flex justify-center"
      onClick={setCurrentPathForOAuth}
      {...props}
    >
      <div className="items-center flex gap-5 justify-between">
        <div className="">{leftIcon}</div>
        <p className="text-center">{children}</p>
      </div>
    </Button>
  );
};

export default SignUpWithSocialsButton;
