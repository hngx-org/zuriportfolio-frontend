import Button from '@ui/Button';
import React, { useState, useRef, useEffect } from 'react';
import Modal from '@ui/Modal';
import DynamicInput from '../about/dynamic-input';
import axios from 'axios';
import { toast } from 'react-toastify';
import { countryData } from './countrycode';
import Loader from '@ui/Loader';

interface formData {
  referer: string;
  company: string;
  position: string;
  email: string;
  phoneNumber: string;
  userId: string;
  sectionid: number;
}
interface fetchedArrData {
  referer: string;
  company: string;
  email: string;
  id: number;
  phone_number: string;
  position: string;
}

interface Errors {
  referer?: string;
  company?: string;
  email?: string;
  phone?: string;
  position?: string;
}

type referenceModalProps = {
  onCloseModal: () => void;
  onSaveModal: () => void;
  isOpen: boolean;
  userId: string;
};
interface Reference {
  referer: string;
  company: string;
  email: string;
  position: string;
  phone_number: string;
  id: number;
}
interface EditFormData {
  referer?: string;
  company?: string;
  email?: string;
  phone_number?: string;
  position?: string;
}

const API_BASE_URL = 'https://hng6-r5y3.onrender.com';

const PortfolioReference: React.FC<referenceModalProps> = ({ isOpen, onCloseModal, onSaveModal, userId }) => {
  // console.log(countryData)
  const initialFormData: formData = {
    referer: '',
    company: '',
    position: '',
    email: '',
    phoneNumber: '',
    userId: userId,
    sectionid: 25,
  };

  const [formData, setFormData] = useState<formData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [editing, setEditing] = useState(false);
  const [arrData, setArrData] = useState<fetchedArrData[] | any>([]);
  const [isData, setIsData] = useState(false);
  const [isEditData, setIsEditData] = useState(false);
  const [refId, setRefId] = useState(Number);
  const [country, setCountry] = useState('+234');
  const [selHide, setselHide] = useState(true);

  function validatePhoneNumber(phoneNumber: string): boolean {
    return /^[0-9]{8,10}$/.test(phoneNumber);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // If the changed input is the phone number field, validate it
    if (name === 'phoneNumber') {
      // Check if the value contains non-numeric characters
      if (value.match(/[^0-9]/)) {
        // If non-numeric characters are present, prevent the change
        event.preventDefault();
        return;
      }

      // Clear the phone number error when it's valid
      setErrors({ ...errors, phone: '' });
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const selectToggle = () => {
    setselHide(!selHide);
  };

  const validateAllFieldsNotEmpty = () => {
    const fieldsToValidate = ['referer', 'email', 'company'];

    const onlyLettersAndSpacesRegExp = /^[A-Za-z\s]+$/; // Regular expression for letters and spaces

    let hasEmptyField = false; // Declare 'hasEmptyField' within the function scope

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
        } else if (
          (inputName === 'referer' || inputName === 'company') &&
          !onlyLettersAndSpacesRegExp.test(inputValue)
        ) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [inputName]: `${inputName} should contain only letters and spaces`,
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
      // Handle case when fields are not all filled in
      validateAllFieldsNotEmpty();
    } else {
      setErrors({ ...errors, referer: '', email: '', company: '' });
      if (formData.phoneNumber !== '' && !validatePhoneNumber(formData.phoneNumber)) {
        // Handle case when the phone number is invalid
        setErrors({ ...errors, phone: 'Invalid phone number' });
      } else {
        if (formData.position !== '' && formData.position.length < 4 && formData.position.length > 30) {
          setErrors({ ...errors, position: 'Enter a valid input' });
        } else {
          if (formData.referer.length < 3 && formData.referer.length > 35) {
            setErrors({ ...errors, referer: 'Name must not be less than 3 character' });
          } else {
            if (!loading) {
              setErrors({ ...errors, phone: '' });
              setErrors({ ...errors, position: '' });
              setErrors({ ...errors, referer: '' });
              if (isEditData) {
                handleEdit(refId);
              } else {
                response();
              }
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    const callGet = () => {
      setIsData(false);
      const response = async () => {
        const axiosConfig = {
          method: 'get',
          url: `${API_BASE_URL}/api/v1/references/${userId}`,
        };

        const response = await axios(axiosConfig);

        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // console.log(response.data.data);
        const fetchedArrData = response.data.data;

        setArrData((prevArray: fetchedArrData[]) => [...fetchedArrData]);
        // onSaveModal();
        setIsData(true);
      };
      response();
    };
    callGet();
  }, [userId]);

  const response = async () => {
    setLoading(true);
    console.log(formData);
    const correctData = {
      ...formData,
      phoneNumber: `${country + formData.phoneNumber}`,
    };
    try {
      const axiosConfig = {
        method: 'post',
        url: `${API_BASE_URL}/api/references/${userId}`,
        data: correctData,
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
      setEditing(false);
      callGet();
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
    setIsData(false);
    const response = async () => {
      const axiosConfig = {
        method: 'get',
        url: `${API_BASE_URL}/api/references/${userId}`,
      };

      const response = await axios(axiosConfig);

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // console.log(response.data.data);
      const fetchedArrData = response.data.data;

      setArrData((prevArray: fetchedArrData[]) => [...fetchedArrData]);
      // onSaveModal();
      setIsData(true);
    };
    response();
  };
  // console.log(arrData)
  const handleDelete = (id: number) => {
    setIsData(false);
    const response = async () => {
      const axiosConfig = {
        method: 'delete',
        url: `${API_BASE_URL}/api/references/${id}`,
      };

      const response = await axios(axiosConfig);

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(response.data);
      setIsData(true);
      callGet();
    };
    response();
  };
  const handleEdit = (id: number) => {
    const editObjData: EditFormData = {
      referer: formData.referer,
      company: formData.company,
      position: formData.position,
      email: formData.email,
      phone_number: `${country + formData.phoneNumber}`,
    };
    // console.log('Edited Data: ' + editObjData);
    const response = async () => {
      setLoading(true);
      console.log(formData);
      try {
        const axiosConfig = {
          method: 'put',
          url: `${API_BASE_URL}/api/references/${id}`,
          data: editObjData,
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
        setEditing(false);
        callGet();
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
    response();
  };
  const editData = (id: number) => {
    arrData.forEach((data: any) => {
      if (id === data.id) {
        const phoneNumber = data.phone_number;
        // Get the last 10 digits
        const last10Digits = phoneNumber.slice(-10);

        // Get the remaining characters before the last 10 digits
        const remainingCharacters = phoneNumber.slice(0, -10);

        console.log('Last 10 digits: ' + last10Digits);
        console.log('Remaining characters: ' + remainingCharacters);

        setIsEditData(true);
        setCountry(remainingCharacters);
        setFormData({
          ...formData,
          referer: data.referer,
          email: data.email,
          phoneNumber: last10Digits,
          company: data.company,
          position: data.position,
        });
      }
    });
  };

  function sortByCode(a: number | any, b: number | any) {
    // Extract the numeric part of the code, convert to a number, and compare
    const codeA = Number(a.code.match(/\d+/)[0]);
    const codeB = Number(b.code.match(/\d+/)[0]);

    return codeA - codeB;
  }

  // Map through the original data, sort it, and create a new array
  const sortedCountryData = countryData.slice().sort(sortByCode);
  return (
    <Modal isOpen={isOpen} closeModal={onCloseModal} size="xl" isCloseIconPresent={false}>
      <div
        className="mx-auto bg-white-100 rounded-md p-3 py-6"
        onClick={() => {
          !selHide ? setselHide(true) : '';
        }}
      >
        <div className="flex justify-between items-center border-b-[3.6px]  border-brand-green-primary pb-1">
          <div className="flex gap-4 items-center">
            <div
              onClick={() => {
                editing ? setEditing(false) : onCloseModal();
              }}
              className="cursor-pointer hover:bg-brand-green-shade95 rounded-full"
            >
              {/* <svg width="9" height="18" viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.99984 16.9201L1.47984 10.4001C0.709844 9.63008 0.709844 8.37008 1.47984 7.60008L7.99984 1.08008"
                  stroke="#464646"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg> */}
            </div>
            <span className="font-medium text-2xl">References</span>
          </div>
          <div
            className="flex item-center justify-center rounded-lg w-6 h-6 bg-brand-green-primary text-white-100 font-semibold cursor-pointer"
            onClick={onCloseModal}
          >
            x
          </div>
        </div>
        {editing ? (
          <form
            onSubmit={handleSubmit}
            className="p-4 mt-10 border-[.4px] flex transition-all flex-col gap-2 rounded-lg border-brand-disabled"
          >
            <div className="flex flex-col gap-2">
              <DynamicInput
                onChange={handleInputChange}
                type="text"
                placeholder="Let’s meet your referee"
                InputId="ptfl-fullname"
                name="referer"
                label="Name *"
                labelFor="referer"
                value={formData.referer}
                required={true}
                error={errors.referer}
              />
              <div className="w-full flex flex-col md:flex-row gap-2 justify-between">
                <div className="w-full md:w-[47%]">
                  <DynamicInput
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Google"
                    InputId="ptfl-company"
                    name="company"
                    label="Company *"
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
                    placeholder="Product Manager"
                    InputId="ptfl-position"
                    name="position"
                    label="Position"
                    labelFor="position"
                    value={formData.position}
                    required={false}
                    error={errors.position}
                  />
                </div>
              </div>
              <DynamicInput
                onChange={handleInputChange}
                type="email"
                placeholder="example@gmail.com"
                InputId="ptfl-email"
                name="email"
                label="Email *"
                labelFor="email"
                value={formData.email}
                required={true}
                error={errors.email}
              />
              <div className="w-full">
                <label htmlFor="phoneNumber" className="block mb-2 font-medium text-[#444846]">
                  Phone Number
                </label>
                <div className="w-full">
                  <div
                    onClick={selectToggle}
                    className="flex items-center text-sm justify-center font-medium text-dark-600 border-white-400 float-left h-[48px] w-[30%] md:w-[20%] border rounded-[10px] rounded-r-none border-r-0 cursor-pointer"
                  >
                    <div className="w-[60px] flex justify-start items-center text-ellipsis overflow-hidden whitespace-nowrap text-center">
                      {country}
                    </div>
                    <div
                      className={`top-10 h-full absolute overflow-auto w-32 pb-48 mt-1 scrollbar-none z-10 rounded-xl p-2 ${
                        selHide ? 'hidden' : 'block'
                      }`}
                    >
                      <div className="white-100 w-full h-auto bg-white-100 mt-1 z-10 rounded-xl shadow-md">
                        {sortedCountryData.map((country) => (
                          <div
                            onClick={() => {
                              setCountry(country.code);
                              setselHide(true);
                            }}
                            key={country.abbreviation}
                            className="p-2 hover:bg-white-200 text-base font-normal transition cursor-pointer"
                          >
                            {country.code}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <DynamicInput
                    onChange={handleInputChange}
                    type="text"
                    placeholder=""
                    InputId="ptfl-phone"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    error={errors.phone}
                    required={false}
                    className="rounded-l-none w-auto"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                intent={'secondary'}
                size={'sm'}
                className="w-24 rounded-2xl"
                type="button"
                onClick={onCloseModal}
              >
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
        ) : (
          <div className="md:pe-4 mt-5 ">
            {isData ? (
              <div className="mb-10  flex flex-col gap-2">
                {arrData.map((reference: Reference) => (
                  <div className="card md:ms-4 bg-gray-50 p-2 rounded-md" key={reference.id}>
                    <div className="text-base font-semibold text-dark-800 flex gap-3 capitalize">
                      Name
                      <p className="text-base font-normal capitalize">{reference.referer}</p>
                    </div>
                    <div className="text-base font-semibold text-dark-800 flex gap-3">
                      Company
                      <p className="text-base font-normal">{reference.company}</p>
                    </div>
                    <div className="text-base font-semibold text-dark-800 flex gap-3">
                      Email
                      <p className="text-base font-normal">{reference.email}</p>
                    </div>
                    <div
                      className={`${
                        reference.position === '' ? 'hidden' : 'block'
                      } text-base font-semibold text-dark-800 flex gap-3`}
                    >
                      Position
                      <p className={`text-base font-normal capitalize`}>{reference.position}</p>
                    </div>
                    <div
                      className={`text-base font-semibold text-dark-800 flex gap-3 ${
                        reference.phone_number === '' ? 'hidden' : 'block'
                      }`}
                    >
                      Phone
                      <p className={`text-base font-normal`}>{reference.phone_number}</p>
                    </div>

                    <div>
                      <div className="flex gap-3 justify-end px-2 mt-2 font-medium">
                        <p
                          onClick={() => {
                            setEditing(true);
                            editData(reference.id);
                            setIsEditData(true);
                            setRefId(reference.id);
                            setErrors({ ...errors, company: '', phone: '', email: '', referer: '', position: '' });
                            setselHide(true);
                          }}
                          className="text-blue-300 cursor-pointer"
                        >
                          Edit
                        </p>
                        <p
                          className={`text-brand-red-primary cursor-pointer`}
                          onClick={() => {
                            handleDelete(reference.id);
                          }}
                        >
                          Delete
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-36">
                <Loader />
              </div>
            )}
            <div className="w-full flex justify-between items-center">
              <div
                onClick={() => {
                  setEditing(true);
                  setFormData(initialFormData);
                  setIsEditData(false);
                  setselHide(true);
                  setCountry('+234');
                }}
                className="text-[1.05rem] text-brand-green-primary font-normal px-3 transition cursor-pointer py-1 rounded-full hover:bg-brand-green-primary hover:text-white-100"
              >
                + Add <span className="hidden md:inline">reference</span>
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  intent={'secondary'}
                  size={'sm'}
                  className="md:w-24 rounded-2xl"
                  type="button"
                  onClick={onCloseModal}
                >
                  Close
                </Button>
                <Button
                  intent={'primary'}
                  size={'sm'}
                  className="md:w-24 rounded-2xl"
                  type="button"
                  onClick={onSaveModal}
                >
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
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PortfolioReference;
