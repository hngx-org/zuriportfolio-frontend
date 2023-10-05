import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

const buttonVariants = cva(
  'relative px-4 py-3 flex items-center justify-center gap-5 w-fit h-[48px] rounded-[16px] font-manropeB text-white-100',
  {
    variants: {
      intent: {
        primary:
          ' bg-brand-green-primary hover:bg-brand-green-hover focus:bg-brand-green-focused active:bg-brand-green-pressed disabled:bg-brand-disabled disabled:cursor-not-allowed ',
        secondary:
          'bg-white-100 text-brand-green-primary hover:bg-[#F4FBF6] focus:shadow-brand-green-shd active:bg-brand-green-shd disabled:bg-brand-disabled border-solid border-[2px] border-brand-green-primary ',
        success:
          'bg-brand-success-primary hover:bg-brand-success-hover focus:bg-brand-success-focused active:bg-brand-success-pressed disabled:bg-brand-disabled disabled:cursor-not-allowed ',
        tertiary:
          'bg-brand-green-ttr text-brand-green-primary hover:bg-[#F4FBF6] focus:shadow-brand-green-shd active:bg-brand-green-shd disabled:bg-brand-disabled disabled:cursor-not-allowed ',
        error:
          'bg-brand-red-primary text-white-100 hover:bg-brand-red-hover focus:bg-brand-red-focused active:bg-brand-red-pressed disabled:bg-brand-disabled disabled:cursor-not-allowed',
      },
      size: {
        sm: 'text-sm py-2',
        md: 'text-base py-3',
        lg: 'text-lg py-4',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonVariants
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

interface ButtonProps extends ButtonVariants {
  onClick?: () => void;
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

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  isLoading,
  disabled,
  leftIcon,
  rightIcon,
  className,
  href,
  spinnerColor,
  spinnerSize,
  ...props
}) => {
  const classNames = twMerge(buttonVariants(props), className);

  if (href) {
    return (
      // @ts-expect-error
      <Link href={href} className={classNames} onClick={onClick} {...props}>
        {leftIcon && leftIcon}
        {children}
        {rightIcon && rightIcon}
      </Link>
    );
  }

  return (
    <button onClick={onClick} disabled={isLoading ?? disabled} className={classNames} {...props}>
      <div className="w-full h-full absolute top-0 flex flex-col items-center justify-center">
        <svg
          width={spinnerSize ?? '20'}
          height={spinnerSize ?? '20'}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className={twMerge(
            ' animate-spin transition delay-[.2] ',
            isLoading ? 'opacity-1 visible' : 'opacity-0 hidden',
          )}
        >
          <path
            fill={spinnerColor ?? '#fff'}
            d="M12 21a9 9 0 1 1 6.18-15.55a.75.75 0 0 1 0 1.06a.74.74 0 0 1-1.06 0A7.51 7.51 0 1 0 19.5 12a.75.75 0 0 1 1.5 0a9 9 0 0 1-9 9Z"
          />
        </svg>
      </div>
      <div className={twMerge('flex items-center justify-center gap-2', isLoading ? 'opacity-0' : 'opacity-1')}>
        {leftIcon}
        {children}
        {rightIcon && (
          <span
            style={{
              opacity: isLoading ? 0 : 1,
            }}
          >
            {rightIcon}
          </span>
        )}
      </div>
    </button>
  );
};

export default Button;
