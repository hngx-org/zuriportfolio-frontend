import React, { useState, useRef } from 'react';
import { Check, CloseCircle } from 'iconsax-react';
import { PasswordPopoverProps, PasswordRequirementProps, ProgressBarProps } from '../../../@types';

function PasswordRequirement({ meets, label }: PasswordRequirementProps) {
  return (
    <div className={`flex items-center mt-7 text-sm ${meets ? 'text-green-600' : 'text-red-300'}`}>
      {meets ? <Check size={14} /> : <CloseCircle size={14} />} <div className="ml-2.5">{label}</div>
    </div>
  );
}

function ProgressBar({ color, value }: ProgressBarProps) {
  const bgColor = color === 'teal' ? 'bg-brand-green-primary' : color === 'yellow' ? 'bg-yellow-500' : 'bg-red-300';

  return (
    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2.5 mb-2.5">
      <div className={`${bgColor} h-full rounded-full`} style={{ width: `${value}%` }}></div>
    </div>
  );
}

const PasswordPopover: React.FC<PasswordPopoverProps> = ({ password, children }) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setPopoverVisible(true);
    document.addEventListener('mousedown', handleOutsideClick);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setPopoverVisible(false);
      document.removeEventListener('mousedown', handleOutsideClick);
    }
  };

  const requirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    // { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
  ];

  function getStrength(password: string) {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
      if (!requirement.re.test(password)) {
        multiplier += 1;
      }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
  }

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(password)} />
  ));

  const strength = getStrength(password);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  return (
    <div className="relative">
      <div ref={buttonRef} onClick={handleClick}>
        {children}
      </div>
      {popoverVisible && (
        <div ref={popoverRef} className="absolute bg-white-100 p-5 rounded shadow-md mt-2 z-50 top-15">
          <div>
            <ProgressBar color={color} value={strength} />
            <PasswordRequirement label="Includes at least 6 characters" meets={password.length > 5} />
            {checks}
            <button
              className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-gray-700 absolute top-2 right-2 hover:bg-gray-300"
              onClick={() => setPopoverVisible(false)}
            >
              {''}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordPopover;
