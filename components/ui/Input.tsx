import { VariantProps, cva } from 'class-variance-authority';
import { ArrowDown2, Car } from 'iconsax-react';
import React, { DetailedHTMLProps, InputHTMLAttributes, SelectHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

const inputVariants = cva(
  'relative px-4 py-3 flex items-center justify-center gap-3 w-fit h-[48px] rounded-[10px] font-manropeL text-dark-100 hide-caret transition-all select-none focus-within:border-brand-green-primary ',
  {
    variants: {
      intent: {
        default: 'border-solid border-[2px] border-white-400 text-dark-600 ',
        primary: 'border-solid border-[2px] focus-within:text-dark-100 text-white-400 ',
      },
      inputSize: {
        sm: 'text-sm py-2',
        md: 'text-base py-3',
        lg: 'text-lg py-4',
      },
    },
    defaultVariants: {
      intent: 'default',
      inputSize: 'sm',
    },
  },
);

export interface InputVariants
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

export interface SelectInputVariants
  extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
    VariantProps<typeof inputVariants> {}

interface SelectInputVariantsProps extends SelectInputVariants {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  isLoading?: boolean;
  disabled?: boolean;
  href?: string;
  caretColor?: string;
  caretSize?: string | number;
  className?: React.ComponentProps<'div'>['className'];
  leftIcon?: React.ReactNode;
}

interface TextInputProps extends InputVariants {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  disabled?: boolean;
  iconColor?: string;
  iconSize?: string | number;
  type?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  placeHolder?: string;
}

export function SelectInput({
  className,
  options,
  leftIcon,
  caretSize,
  caretColor,
  onChange,
  disabled,
  intent,
  inputSize,
  ...props
}: SelectInputVariantsProps) {
  const classNames = twMerge(
    inputVariants({ intent, inputSize }),
    className,
    disabled && 'bg-brand-disabled opacity-[.8] border-[1px] border-brand-disabled2 cursor-not-allowed',
  );
  return (
    <div className={classNames}>
      {leftIcon && <div className="absolute top-2.5 left-2">{leftIcon}</div>}
      <select
        onChange={onChange}
        className={twMerge(
          'pr-2 border-none outline-none bg-transparent hide-caret mr-3',
          leftIcon && 'pl-7',
          disabled ? 'cursor-not-allowed' : '',
        )}
        {...(props as any)}
        disabled={disabled}
      >
        {options.map((op, idx) => (
          <option key={idx} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>
      <svg
        width={caretSize ?? '30'}
        height={caretSize ?? '30'}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-2 right-2"
      >
        <path
          fill={caretColor ?? '#7777'}
          fillRule="evenodd"
          d="M16.53 8.97a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 1 1 1.06-1.06L12 12.44l3.47-3.47a.75.75 0 0 1 1.06 0Z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  );
}

export function Input({
  className,
  leftIcon,
  rightIcon,
  type,
  isLoading,
  iconColor,
  iconSize,
  disabled,
  onChange,
  placeHolder,
  intent,
  inputSize,
  ...props
}: TextInputProps) {
  const classNames = twMerge(
    inputVariants({ intent, inputSize }),
    className,
    disabled || isLoading
      ? 'bg-brand-disabled opacity-[.8] border-[1px] border-brand-disabled2 cursor-not-allowed'
      : '',
  );
  return (
    <div className={classNames}>
      {leftIcon && leftIcon}
      <input
        onChange={onChange}
        type={type}
        className={twMerge(
          'w-full outline-none hide-caret',
          disabled ?? isLoading ? 'cursor-not-allowed' : '',
          leftIcon && 'pl-1',
        )}
        placeholder={placeHolder ?? 'Placeholder'}
        disabled={isLoading ?? disabled}
      />
      {rightIcon && rightIcon}
    </div>
  );
}
