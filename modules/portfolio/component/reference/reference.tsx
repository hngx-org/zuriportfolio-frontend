import Button from '@ui/Button';
import React, { useState, useRef, useEffect } from 'react';
import Modal from '@ui/Modal';
import DynamicInput from '../about/dynamic-input';
import axios from 'axios';
import { toast } from 'react-toastify';

interface formData {
  name: string;
  company: string;
  position: string;
  emailAddress: string;
  phoneNumber: string;
}
interface Errors {
  name?: string;
  company?: string;
  emailAddress?: string;
}

type referenceModalProps = {
  onClose: () => void;
  isOpen: boolean;
  userId: string;
};

const PortfolioReference: React.FC<referenceModalProps> = ({ isOpen, onClose, userId }) => {
  const initialFormData: formData = {
    name: '',
    company: '',
    position: '',
    emailAddress: '',
    phoneNumber: '',
  };

  const [formData, setFormData] = useState<formData>(initialFormData);
  const [loading, setLoading] = useState(false);
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
    const fieldsToValidate = ['name', 'emailAddress', 'company'];

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
      setErrors({ ...errors, name: '', emailAddress: '', company: '' });
      if (!loading) {
        response();
      }
    }
  }

  const API_BASE_URL = 'https://hng6-r5y3.onrender.com';
  const response = async () => {
    setLoading(true);
    console.log(formData);
    try {
      const axiosConfig = {
        method: 'post',
        url: `${API_BASE_URL}/api/references/${userId}`,
        data: formData,
      };

      const response = await axios(axiosConfig);

      if (response.status !== 200 && response.status !== 201) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setLoading(false);
      toast.success(`${response.data.message}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      console.log(response.data);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        console.error('An error occurred:', error);
        toast.error(`${error.message}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setLoading(false);
      }
    }
  };

  const callGet = () => {
    const response = async () => {
      const axiosConfig = {
        method: 'get',
        url: `${API_BASE_URL}/api/references`,
        // data: formData,
      };

      const response = await axios(axiosConfig);

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(response.data);
      onClose();
    };
    response();
  };
  return (
    <Modal isOpen={isOpen} closeModal={onClose} size="lg" isCloseIconPresent={false}>
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
            onClick={onClose}
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
            name="name"
            label="Name*"
            labelFor="fullname"
            value={formData.name}
            required={true}
            error={errors.name}
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
            name="emailAddress"
            label="Email*"
            labelFor="email"
            value={formData.emailAddress}
            required={true}
            error={errors.emailAddress}
          />
          <DynamicInput
            onChange={handleInputChange}
            type="number"
            placeholder=""
            InputId="ptfl-phone"
            name="phoneNumber"
            label="Phone Number"
            labelFor="phoneNumber"
            value={formData.phoneNumber}
            required={false}
            leftIcon={<span>+234</span>}
            pattern={'[0-9]{3}-[0-9]{2}-[0-9]{3}'}
          />
          <div className="flex gap-2 justify-end">
            <Button intent={'secondary'} size={'sm'} className="w-24 rounded-2xl" type="button" onClick={callGet}>
              Close
            </Button>
            <Button intent={'primary'} size={'sm'} className="w-24 rounded-2xl" type="button" onClick={handleSubmit}>
              {loading ? (
                <div className="block w-5 h-5">
                  <svg
                    aria-hidden="true"
                    className="text-brand-green-hover animate-spin fill-white-100"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              ) : (
                `Save`
              )}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PortfolioReference;
