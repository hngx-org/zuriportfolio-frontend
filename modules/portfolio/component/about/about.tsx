'use client';
import React, { useState, useRef, useEffect } from 'react';
import Button from '@ui/Button';
import Modal from '@ui/Modal';
import { toast } from 'react-toastify';
import axios from 'axios';

type aboutModalProps = {
  onClose: () => void;
  isOpen: boolean;
  userId: string;
};

const PortfolioAbout: React.FC<aboutModalProps> = ({ onClose, isOpen, userId }) => {
  const [bio, setBio] = useState({ bio: '', section_id: 54 });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getloading, setgetLoading] = useState(false);
  const [hide, setHide] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState('');
  const [errorBorder, setErrorBorder] = useState('[#E1E3E2]');

  // POST ABOUT VALUE TO DATABASE
  const API_BASE_URL = 'https://hng6-r5y3.onrender.com';
  const createResponse = async () => {
    setLoading(true);
    try {
      const axiosConfig = {
        method: 'put',
        url: `${API_BASE_URL}/api/about/${userId}`,
        data: bio,
      };

      const response = await axios(axiosConfig);
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setLoading(false);
      toast.success(`Successful`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      const data = await response.data;
      console.log(data);
      onClose();
    } catch (error) {
      console.error('An error occurred:', error);
      toast.warning(`Waiting for endpoint`, {
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
  };

  // GET ABOUT VALUE FROM DATA BASE
  const getResponse = async () => {
    setgetLoading(true);
    try {
      const axiosConfig = {
        method: 'get',
        url: `${API_BASE_URL}/api/about/${userId}`,
      };

      const response = await axios(axiosConfig);
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.data;

      console.log(data.about);
      setBio({ ...bio, bio: data.about.bio });
      setgetLoading(false);
      toast.success(`${data.message}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (error) {
      console.error('An error occurred:', error);
      setgetLoading(false);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    getResponse();
  }, []);

  const handleEditClick = () => {
    if (!loading) {
      setIsEditing(false);
    }
  };
  const handleDeleteClick = () => {
    if (!loading) {
      setBio({ ...bio, bio: '' });
      setIsEditing(false);
    }
  };

  const submitAbout = (event: React.FormEvent<HTMLFormElement | any>) => {
    if (bio.bio !== '') {
      if (!isEditing) {
        setIsEditing(!isEditing);
        setErrorBorder('[#E1E3E2]');
        setError('');
      } else {
        if (!loading) {
          console.log('successfully loaded!');
          createResponse();
        }
      }
    } else {
      setErrorBorder('brand-red-primary');
      setError('This field is required');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      closeModal={() => {
        setHide(!hide);
      }}
      isCloseIconPresent={false}
      size="lg"
    >
      <div className="mx-auto bg-white-100 rounded-md sm:py-2 sm:px-3 md:py-3 md:px-5">
        <div className="flex justify-between border-b-[3.6px] border-brand-green-primary pb-1">
          <span className="font-semibold text-lg">About</span>
          <div
            className="flex item-center justify-center rounded-lg w-6 h-6 bg-brand-green-primary text-white-100 font-semibold cursor-pointer"
            onClick={onClose}
          >
            x
          </div>
        </div>
        {getloading ? (
          <div className="block w-[10%] mx-auto my-32">
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
          <form className="py-3 md:pt-7" onSubmit={submitAbout}>
            {!isEditing ? (
              <div className="w-full">
                <div className="w-full px-3">
                  <label htmlFor="about" className="block font-medium mb-2 text-[#444846]">
                    Description
                  </label>
                  <textarea
                    className={`resize-none overflow-auto border-[1.2px] border-solid border-${errorBorder} py-2 pl-2 text-dark-600 font-normal rounded-lg outline-none focus:border-brand-green-primary w-full`}
                    name="about"
                    id=""
                    rows={4}
                    value={bio.bio}
                    placeholder="Bio"
                    onChange={(e) => {
                      setBio({ ...bio, bio: e.target.value });
                      if (e.target.value !== '') {
                        setError('');
                        setErrorBorder('[#E1E3E2]');
                      }
                    }}
                  ></textarea>
                  <span className="text-brand-red-primary font-normal">{error}</span>
                </div>
              </div>
            ) : (
              <>
                <span className="text-[#737876] inline-block font-normal">{bio.bio}</span>
              </>
            )}
            <div className={`flex gap-2 flex-col justify-end mt-8 ${!isEditing ? 'px-3' : 'px-0'}`}>
              {isEditing ? (
                <div className="flex gap-3 justify-end mb-5 font-medium">
                  <p onClick={handleEditClick} className="text-blue-300 cursor-pointer">
                    Edit
                  </p>
                  <p onClick={handleDeleteClick} className={`text-brand-red-primary cursor-pointer`}>
                    Delete
                  </p>
                </div>
              ) : (
                ''
              )}
              <div className="flex justify-end flex-col md:flex-row font-medium gap-4 mt-0 md:mt-2">
                <Button
                  intent={'secondary'}
                  size={'sm'}
                  className="w-full md:w-24 rounded-lg"
                  type="button"
                  disabled={loading}
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button
                  intent={'primary'}
                  size={'sm'}
                  className="w-full md:w-24 rounded-lg border-[2px] border-brand-green-primary hover:border-brand-green-hover"
                  type="button"
                  onClick={submitAbout}
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
          </form>
        )}
      </div>
    </Modal>
  );
};

export default PortfolioAbout;
