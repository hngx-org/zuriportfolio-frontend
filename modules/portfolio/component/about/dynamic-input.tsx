import { Input } from '@ui/Input';
import React from 'react';

interface DynamicInputProps {
  placeholder: string;
  labelFor?: string;
  InputId: string;
  label?: string;
  name: string; // Use keyof to ensure that 'name' corresponds to a key in FormData
  type: string;
  value: string;
  required: boolean;
  leftIcon?: any;
  pattern?: any;
  error?: string;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DynamicInput: React.FC<DynamicInputProps> = ({
  placeholder,
  labelFor,
  InputId,
  label,
  name,
  type,
  value,
  onChange,
  required,
  leftIcon,
  pattern,
  error,
  className,
}) => {
  return (
    <div>
      <label htmlFor={labelFor} className="block mb-2 font-medium text-[#444846]">
        {label}
      </label>
      <Input
        onChange={onChange}
        type={type}
        name={name}
        value={value}
        placeHolder={placeholder}
        key={InputId}
        className={`w-full border text-dark-800 placeholder-white-110 ${className}`}
        required={required}
        leftIcon={leftIcon}
        pattern={pattern}
        autoComplete="off"
      />
      <span className="text-brand-red-primary mt-1 inline-block">{error}</span>
    </div>
  );
};

export default DynamicInput;
