import Button, { ButtonVariants } from '@ui/Button';
import React, { FC } from 'react';
import useUserSession from '../../../../hooks/Auth/useUserSession';

// TODO: Update to the exported type when it has been exported in the button component
interface ButtonProps extends ButtonVariants {
  children: React.ReactNode;
  className?: React.ComponentProps<'div'>['className'];
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  href?: string;
  spinnerColor?: string;
  spinnerSize?: string | number;
}

const SignUpWithSocialsButton: FC<ButtonProps> = ({ children, leftIcon, ...props }) => {
  // Once button is clicked, set the current path user is in so we can redirect there if an error is thrown
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
