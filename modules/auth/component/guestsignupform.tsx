import React, { useState } from 'react';
import { Input } from '@ui/Input';
import Button from '@ui/Button';
import Link from 'next/link';
import AuthLayout from './AuthLayout';

const Guestsignupform: React.FC = () => {
  const [passwordVisible, togglePasswordVisibility] = usePasswordVisibility();
  const [confirmPasswordVisible, toggleConfirmPasswordVisibility] = usePasswordVisibility();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <AuthLayout isBottomLeftPadlockShown isTopRightBlobShown>
      <div className="text-center lg:text-left">
        <h1 className="mb-1 md:mb-6 text-2xl md:text-[36px] leading-[44px] font-semibold text-dark-100">
          Finish setting up your account
        </h1>
        <p className="md:text-[22px] text-[#6b797f] leading-7">Femiadesina@gmail.com</p>
      </div>
      <div className="mt-6 md:mt-12">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <FormField label="First name" placeholder="Enter first name" id="firstname" type="text" />
          <FormField label="Last name" placeholder="Enter last name" id="lastname" type="text" />
          <PasswordField
            label="Password"
            placeholder="Enter password"
            id="password"
            passwordVisible={passwordVisible}
            togglePasswordVisibility={togglePasswordVisibility}
          />
          <PasswordField
            label="Confirm password"
            placeholder="Enter confirm password"
            id="confirmPassword"
            passwordVisible={confirmPasswordVisible}
            togglePasswordVisibility={toggleConfirmPasswordVisibility}
          />
          <div className="flex items-center leading-[27.04px] my-4 mb-8 h-5">
            <Checkbox label="I agree with Zuri stores" />
          </div>
          <SubmitButton label="Continue" />
        </form>
        <div className="mt-7">
          <p className="text-center text-gray-200 text-base">
            Already have an account?{' '}
            <Link href="#" className="text-brand-green-primary hover:text-brand-green-hover">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

const usePasswordVisibility = (): [boolean, () => void] => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = (): void => {
    setIsVisible((prevVisible) => !prevVisible);
  };

  return [isVisible, toggleVisibility];
};

interface FormFieldProps {
  label: string;
  placeholder: string;
  id: string;
  type: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, placeholder, id, type }) => {
  return (
    <div className="flex flex-col gap-2 mb-2">
      <label htmlFor={id} className="leading-[27.04px] font-medium text-gray-600 text-base">
        {label}
      </label>
      <Input
        placeHolder={placeholder}
        id={id}
        name={id}
        className="w-full font-bold rounded-lg text-base bg-transparent"
        type={type}
      />
    </div>
  );
};

interface PasswordFieldProps {
  label: string;
  placeholder: string;
  id: string;
  passwordVisible: boolean;
  togglePasswordVisibility: () => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  placeholder,
  id,
  passwordVisible,
  togglePasswordVisibility,
}) => {
  return (
    <div className="flex flex-col gap-2 mb-2">
      <label htmlFor={id} className="leading-[27.04px] font-medium text-gray-600 text-base	">
        {label}
      </label>
      <Input
        placeHolder={placeholder}
        id={id}
        name={id}
        className="w-full font-bold rounded-lg text-base	"
        type={passwordVisible ? 'text' : 'password'}
        rightIcon={<TogglePasswordVisibilityButton isVisible={passwordVisible} onToggle={togglePasswordVisibility} />}
      />
    </div>
  );
};

interface TogglePasswordVisibilityButtonProps {
  isVisible: boolean;
  onToggle: () => void;
}

const TogglePasswordVisibilityButton: React.FC<TogglePasswordVisibilityButtonProps> = ({ isVisible, onToggle }) => {
  return (
    <button type="button" onClick={onToggle} className="cursor-pointer">
      {isVisible ? <PasswordVisibleIcon /> : <PasswordHiddenIcon />}
    </button>
  );
};

const PasswordVisibleIcon: React.FC = () => {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.90212 13.9566C8.73085 13.9566 8.55958 13.8935 8.42436 13.7583C7.68519 13.0191 7.27954 12.0365 7.27954 10.9999C7.27954 8.84546 9.02832 7.09668 11.1827 7.09668C12.2194 7.09668 13.202 7.50232 13.9411 8.2415C14.0673 8.3677 14.1395 8.53897 14.1395 8.71926C14.1395 8.89955 14.0673 9.07082 13.9411 9.19702L9.37988 13.7583C9.24467 13.8935 9.07339 13.9566 8.90212 13.9566ZM11.1827 8.44883C9.77651 8.44883 8.63169 9.59365 8.63169 10.9999C8.63169 11.4506 8.74888 11.8833 8.96522 12.2619L12.4448 8.78236C12.0662 8.56602 11.6335 8.44883 11.1827 8.44883Z"
        fill="#464646"
      />
      <path
        d="M5.41371 16.8683C5.26046 16.8683 5.09821 16.8142 4.97201 16.706C4.00747 15.8857 3.14209 14.8761 2.40292 13.7043C1.4474 12.2169 1.4474 9.79203 2.40292 8.29565C4.60242 4.85217 7.80251 2.86902 11.1829 2.86902C13.166 2.86902 15.1221 3.55411 16.8349 4.84316C17.1323 5.06852 17.1954 5.49219 16.9701 5.78966C16.7447 6.08714 16.3211 6.15024 16.0236 5.92488C14.5452 4.8071 12.8686 4.22117 11.1829 4.22117C8.27125 4.22117 5.48582 5.96995 3.53873 9.02581C2.86265 10.0805 2.86265 11.9194 3.53873 12.9741C4.2148 14.0288 4.99003 14.9392 5.8464 15.6784C6.12584 15.9218 6.1619 16.3455 5.91851 16.6339C5.79231 16.7872 5.60301 16.8683 5.41371 16.8683Z"
        fill="#464646"
      />
      <path
        d="M11.1828 19.1308C9.98388 19.1308 8.81202 18.8874 7.68523 18.4097C7.34268 18.2655 7.18042 17.8688 7.32465 17.5263C7.46888 17.1837 7.86551 17.0215 8.20806 17.1657C9.16358 17.5714 10.1642 17.7787 11.1738 17.7787C14.0854 17.7787 16.8708 16.0299 18.8179 12.974C19.494 11.9194 19.494 10.0804 18.8179 9.02576C18.5385 8.58406 18.232 8.16039 17.9075 7.76375C17.6731 7.4753 17.7182 7.05162 18.0066 6.80824C18.2951 6.57386 18.7188 6.60992 18.9622 6.90739C19.3137 7.34008 19.6563 7.80883 19.9628 8.2956C20.9183 9.78297 20.9183 12.2078 19.9628 13.7042C17.7633 17.1477 14.5632 19.1308 11.1828 19.1308Z"
        fill="#464646"
      />
      <path
        d="M11.8047 14.8491C11.4892 14.8491 11.2008 14.6237 11.1377 14.2992C11.0655 13.9296 11.3089 13.578 11.6785 13.5149C12.6701 13.3346 13.4994 12.5053 13.6797 11.5137C13.7518 11.1442 14.1034 10.9098 14.473 10.9729C14.8426 11.045 15.0859 11.3966 15.0138 11.7661C14.7254 13.3256 13.4814 14.5606 11.9309 14.8491C11.8859 14.84 11.8498 14.8491 11.8047 14.8491Z"
        fill="#464646"
      />
      <path
        d="M2.16845 20.6903C1.99718 20.6903 1.82591 20.6272 1.69069 20.492C1.42927 20.2306 1.42927 19.7979 1.69069 19.5365L8.4244 12.8028C8.68582 12.5413 9.1185 12.5413 9.37992 12.8028C9.64134 13.0642 9.64134 13.4969 9.37992 13.7583L2.64621 20.492C2.511 20.6272 2.33972 20.6903 2.16845 20.6903Z"
        fill="#464646"
      />
      <path
        d="M13.4635 9.39525C13.2922 9.39525 13.1209 9.33215 12.9857 9.19694C12.7243 8.93552 12.7243 8.50283 12.9857 8.24142L19.7194 1.50771C19.9809 1.24629 20.4135 1.24629 20.675 1.50771C20.9364 1.76912 20.9364 2.20181 20.675 2.46323L13.9413 9.19694C13.806 9.33215 13.6348 9.39525 13.4635 9.39525Z"
        fill="#464646"
      />
    </svg>
  );
};

const PasswordHiddenIcon: React.FC = () => {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.1827 14.9031C9.02832 14.9031 7.27954 13.1543 7.27954 10.9999C7.27954 8.84546 9.02832 7.09668 11.1827 7.09668C13.3372 7.09668 15.086 8.84546 15.086 10.9999C15.086 13.1543 13.3372 14.9031 11.1827 14.9031ZM11.1827 8.44883C9.77651 8.44883 8.63169 9.59365 8.63169 10.9999C8.63169 12.4061 9.77651 13.5509 11.1827 13.5509C12.589 13.5509 13.7338 12.4061 13.7338 10.9999C13.7338 9.59365 12.589 8.44883 11.1827 8.44883Z"
        fill="#464646"
      />
      <path
        d="M11.1827 19.1309C7.79335 19.1309 4.59326 17.1477 2.39376 13.7043C1.43824 12.2169 1.43824 9.79203 2.39376 8.29565C4.60228 4.85217 7.80237 2.86902 11.1827 2.86902C14.5631 2.86902 17.7632 4.85217 19.9627 8.29565C20.9182 9.78302 20.9182 12.2079 19.9627 13.7043C17.7632 17.1477 14.5631 19.1309 11.1827 19.1309ZM11.1827 4.22117C8.27111 4.22117 5.48568 5.96995 3.53858 9.02581C2.86251 10.0805 2.86251 11.9194 3.53858 12.9741C5.48568 16.03 8.27111 17.7787 11.1827 17.7787C14.0944 17.7787 16.8798 16.03 18.8269 12.9741C19.503 11.9194 19.503 10.0805 18.8269 9.02581C16.8798 5.96995 14.0944 4.22117 11.1827 4.22117Z"
        fill="#464646"
      />
    </svg>
  );
};

interface CheckboxProps {
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label }) => {
  return (
    <label className="flex items-start my-auto">
      <span className="flex mr-2 mt-2 md:mt-1.5 ">
        <input type="checkbox" name="checkbox" className="custom-checkbox cursor-pointer" />
      </span>
      <span className="text-gray-200 text-base ">
        {label} <Link href="#">Terms of Service</Link> & <Link href="#">Privacy Policy</Link>.
      </span>
      <style jsx>{`
        .custom-checkbox {
          appearance: none;
          background-color: #fff;
          margin: 0;
          font: inherit;
          color: currentColor;
          width: 16px;
          height: 16px;
          border: 1px solid #009254;
          border-radius: 4px;
          transform: translateY(-0.075em);
          display: grid;
          place-content: center;
        }
        .custom-checkbox::before {
          content: '';
          width: 6.67px;
          height: 7.67px;
          border-radius: 2px;
          transform: scale(0);
          transition: 120ms transform ease-in-out;
          box-shadow: inset 1em 1em #009254;
        }

        .custom-checkbox:checked::before {
          transform: scale(1);
        }
      `}</style>
    </label>
  );
};

interface SubmitButtonProps {
  label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label }) => {
  return (
    <Button intent="primary" size="sm" className="w-full text-lg rounded-lg" type="submit">
      {label}
    </Button>
  );
};

export default Guestsignupform;
