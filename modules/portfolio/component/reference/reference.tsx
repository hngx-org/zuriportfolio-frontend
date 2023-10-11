import Button from '@ui/Button';
import React, { useState, useRef, useEffect } from 'react';
import Modal from '@ui/Modal';
import DynamicInput from '../about/dynamic-input';

interface formData {
  fullname: string;
  company: string;
  position: string;
  email: string;
  phone: string;
}
interface Errors {
  fullname?: string;
  company?: string;
  email?: string;
}

type referenceModalProps = {
  handleCloseReferenceModal: () => void;
  isReferenceModalOpen: boolean;
};

const PortfolioReference: React.FC<referenceModalProps> = ({ isReferenceModalOpen, handleCloseReferenceModal }) => {
  const initialFormData: formData = {
    email: '',
    fullname: '',
    company: '',
    position: '',
    phone: '',
  };

  const [formData, setFormData] = useState<formData>(initialFormData);
  const [hide, setHide] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateAllFieldsNotEmpty = () => {
    let hasEmptyField = false;
    const fieldsToValidate = ['fullname', 'email', 'company'];

    Object.entries(formData).forEach(([inputName, inputValue]) => {
      // Check if inputName is one of the fields to validate
      if (fieldsToValidate.includes(inputName)) {
        if (!inputValue.trim()) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [inputName]: `${inputName} is required`.charAt(0).toUpperCase() + `${inputName} is required`.slice(1),
          }));
          hasEmptyField = true;
        } else if (inputName === 'email' && !isValidEmail(inputValue)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [inputName]: 'Invalid email format'.charAt(0).toUpperCase() + 'Invalid email format'.slice(1),
          }));
          hasEmptyField = true;
        }
      }
    });

    console.log(hasEmptyField);
    return !hasEmptyField;
  };

  // Function to validate email format
  const isValidEmail = (email: string) => {
    // Regular expression pattern for a typical email address format
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailPattern.test(email);
  };

  function handleSubmit() {
    if (!validateAllFieldsNotEmpty()) {
      validateAllFieldsNotEmpty();
    } else {
      setErrors({ ...errors, fullname: '', email: '', company: '' });
    }
  }

  return (
    <Modal isOpen={isReferenceModalOpen} closeModal={() => {}} size="lg" isCloseIconPresent={false}>
      <div className="mx-auto bg-white-100 rounded-md p-3 py-5">
        <div className="flex justify-between items-center border-b-[3.6px]  border-brand-green-primary pb-1">
          <div className="flex gap-4 items-center">
            <div className="cursor-pointer hover:bg-brand-green-shade95 p-3 rounded-full">
              <svg width="9" height="18" viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.99984 16.9201L1.47984 10.4001C0.709844 9.63008 0.709844 8.37008 1.47984 7.60008L7.99984 1.08008"
                  stroke="#464646"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <span className="font-semibold text-lg">References</span>
          </div>
          <div
            className="flex item-center justify-center rounded-lg w-6 h-6 bg-brand-green-primary text-white-100 font-semibold cursor-pointer"
            onClick={handleCloseReferenceModal}
          >
            x
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-4 mt-10 border-[.4px] flex flex-col gap-2 rounded-lg border-brand-disabled"
        >
          <DynamicInput
            onChange={handleInputChange}
            type="text"
            placeholder="Let’s meet your referee"
            InputId="ptfl-fullname"
            name="fullname"
            label="Name*"
            labelFor="fullname"
            value={formData.fullname}
            required={true}
            error={errors.fullname}
          />
          <div className="w-full flex flex-col md:flex-row gap-2 justify-between">
            <div className="w-full md:w-[47%]">
              <DynamicInput
                onChange={handleInputChange}
                type="text"
                placeholder="Google"
                InputId="ptfl-company"
                name="company"
                label="Company*"
                labelFor="company"
                value={formData.company}
                required={true}
                error={errors.company}
              />
            </div>
            <div className="w-full md:w-[47%]">
              <DynamicInput
                onChange={handleInputChange}
                type="text"
                placeholder="Type link"
                InputId="ptfl-position"
                name="position"
                label="Position"
                labelFor="position"
                value={formData.position}
                required={false}
              />
            </div>
          </div>
          <DynamicInput
            onChange={handleInputChange}
            type="email"
            placeholder="example@gmail.com"
            InputId="ptfl-email"
            name="email"
            label="Email*"
            labelFor="email"
            value={formData.email}
            required={true}
            error={errors.email}
          />
          <DynamicInput
            onChange={handleInputChange}
            type="number"
            placeholder=""
            InputId="ptfl-phone"
            name="phone"
            label="Phone Number"
            labelFor="phone"
            value={formData.phone}
            required={false}
            leftIcon={<span>+234</span>}
            pattern={'[0-9]{3}-[0-9]{2}-[0-9]{3}'}
          />
          <div className="flex gap-2 justify-end">
            <Button intent={'secondary'} size={'sm'} className="w-24 rounded-2xl" type="button">
              Close
            </Button>
            <Button intent={'primary'} size={'sm'} className="w-24 rounded-2xl" type="button" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PortfolioReference;
