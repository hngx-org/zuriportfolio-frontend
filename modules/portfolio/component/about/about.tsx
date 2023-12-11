'use client';
import React, { useState, useRef, useEffect } from 'react';
import Button from '@ui/Button';
import Modal from '@ui/Modal';
import Loader from '@ui/Loader';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_BASE_URL } from '../../../../http/checkout';

type aboutModalProps = {
  onCloseModal: () => void;
  onSaveModal: () => void;
  isOpen: boolean;
  userId: string;
};

const PortfolioAbout: React.FC<aboutModalProps> = ({ onCloseModal, onSaveModal, isOpen, userId }) => {
  const [bio, setBio] = useState({ bio: '', section_id: 54 });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getloading, setgetLoading] = useState(false);
  const [hide, setHide] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState('');
  const [errorBorder, setErrorBorder] = useState('[#E1E3E2]');
  const [bioId, setBioId] = useState(Number);
  const [create, setCreate] = useState(false);

  // POST ABOUT VALUE TO DATABASE
  const API_URL = (`${API_BASE_URL}/portfolio`) as string;
  const createResponse = async () => {
    try {
      const axiosConfig = {
        method: 'post',
        url: `${API_URL}/about/${userId}`,
        data: bio,
      };

      const response = await axios(axiosConfig);
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
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
      onSaveModal();
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error(`An error occured!`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  // GET ABOUT VALUE FROM DATA BASE
  const getResponse = async () => {
    setCreate(false);
    setgetLoading(true);
    try {
      const axiosConfig = {
        method: 'get',
        url: `${API_URL}/about/${userId}`,
      };

      const response = await axios(axiosConfig);
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.data;

      console.log(data.about);
      setBio({ ...bio, bio: data.about.bio });
      setgetLoading(false);
      setBioId(data.about.id);
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
      setCreate(true);
    }
  };

  // Edit ABOUT VALUE FROM DATA BASE
  const editResponse = async (id: number) => {
    setLoading(true);
    try {
      const axiosConfig = {
        method: 'put',
        url: `${API_URL}/about/${id}`,
        data: bio,
      };

      const response = await axios(axiosConfig);
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
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
      setLoading(false);
      console.log(data);
      onSaveModal();
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error(`An error occured!`, {
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
      // setCreate(false);
    }
  };
  const handleDeleteClick = () => {
    if (!loading) {
      setBio({ ...bio, bio: '' });
      setIsEditing(false);

      const delResponse = async (id: number) => {
        console.log(bio);
        try {
          const axiosConfig = {
            method: 'delete',
            url: `${API_URL}/about/${id}`,
          };

          const response = await axios(axiosConfig);
          if (response.status !== 200 && response.status !== 201) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.data;

          console.log(data);
          setBio({ ...bio, bio: '' });
          toast.success(`About deleted`, {
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
        }
      };

      delResponse(bioId);
    }
  };

  const submitAbout = (event: React.FormEvent<HTMLFormElement | any>) => {
    if (bio.bio !== '') {
      if (bio.bio.length > 1000) {
        setErrorBorder('brand-red-primary');
        setError('About must be less than 140 words');
      } else if (bio.bio.length < 20) {
        setErrorBorder('brand-red-primary');
        setError('Must be greater than 20 characters');
      } else {
        if (!isEditing) {
          setIsEditing(!isEditing);
          setErrorBorder('[#E1E3E2]');
          setError('');
        } else {
          if (!loading) {
            console.log('successfully loaded!');
            if (create) {
              createResponse();
            } else {
              console.log('update');
              editResponse(bioId);
            }
          }
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
      size="xl"
    >
      {
        <div className="mx-auto py-6  bg-white-100 rounded-md sm:py-2 sm:px-3 md:py-3 fontFamily-manropeEL  md:px-5">
          <div className="flex justify-between border-b-[3.6px] border-brand-green-primary pb-1">
            <span className="font-medium text-2xl ">About</span>
            <div
              className="flex item-center justify-center rounded-lg w-6 h-6 bg-brand-green-primary text-white-100 font-semibold cursor-pointer"
              onClick={onCloseModal}
            >
              x
            </div>
          </div>
          {
            <form className="py-3 md:pt-7" onSubmit={submitAbout}>
              {!isEditing ? (
                <div className="w-full">
                  <div className="w-full px-">
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
                  <div className="w-full">
                    <span className="text-[#737876] flex w-full font-normal break-all">{bio.bio}</span>
                  </div>
                </>
              )}
              <div className={`flex gap-2 flex-col justify-end mt-8 ${!isEditing ? 'px-3' : 'px-0'}`}>
                {isEditing ? (
                  <div className="flex gap-3 justify-end mb-5 font-medium flex-wrap break-all">
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
                    onClick={onCloseModal}
                  >
                    Close
                  </Button>
                  <Button
                    intent={'primary'}
                    size={'sm'}
                    className="w-full md:w-24 rounded-lg border-brand-green-primary hover:border-brand-green-hover"
                    type="button"
                    onClick={submitAbout}
                    disabled={loading || getloading}
                  >
                    {loading || getloading ? <Loader /> : `Save`}
                  </Button>
                </div>
              </div>
            </form>
          }
        </div>
      }
    </Modal>
  );
};

export default PortfolioAbout;
