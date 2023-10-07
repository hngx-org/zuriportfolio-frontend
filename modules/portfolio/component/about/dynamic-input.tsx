import { Input } from '@ui/Input';
import React from 'react';

interface DynamicInputProps {
  placeholder: string;
  labelFor: string;
  InputId: string;
  label: string;
  name: string; // Use keyof to ensure that 'name' corresponds to a key in FormData
  type: string;
  value: string;
  required: boolean;
  leftIcon?: any;
  pattern?: any;
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
}) => {
  return (
    <div>
      <label htmlFor={labelFor} className="block mb-2">
        {label}
      </label>
      <Input
        onChange={onChange}
        type={type}
        name={name}
        value={value}
        placeHolder={placeholder}
        key={InputId}
        className="w-full"
        required={required}
        leftIcon={leftIcon}
        pattern={pattern}
      />
      {/* <input 
            type={type} 
            onChange={onChange}
            name={name}
            value={value}
            placeholder={placeholder}
            key={InputId}
            className='w-full'
        /> */}
    </div>
  );
};

export default DynamicInput;
