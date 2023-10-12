import Button, { ButtonVariants } from '@ui/Button';
import React, { FC } from 'react';

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

const SignUpWithSocialsButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      intent={'tertiary'}
      size={'sm'}
      className="w-full bg-white-100 text-custom-color20 border-custom-color21 border rounded-md hover:bg-white-100 hover:border-brand-green-primary sm:text-base"
      {...props}
    >
      {children}
    </Button>
  );
};

export default SignUpWithSocialsButton;
