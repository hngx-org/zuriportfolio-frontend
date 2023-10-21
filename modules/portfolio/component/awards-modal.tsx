import React, { useState, useEffect, createContext, useContext } from 'react';
import Button from '@ui/Button';
import { Input } from '@ui/Input';
import { Add, ArrowLeft2, ArrowUp, CloseSquare } from 'iconsax-react';
import Link from 'next/link';
import Modal from '@ui/Modal';
import { Award, AwardItemProps, AwardListProps } from '../../../@types';
import Loader from '@ui/Loader';
import Portfolio from '../../../context/PortfolioLandingContext';
import { Edit2, Trash } from 'iconsax-react';

import { notify } from '@ui/Toast';

interface Context {
  refreshPage: boolean;
  setRefreshPage: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen?: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
  urlError: boolean | string;
  setUrlError: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  render: boolean;

  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}
const initialContextValue: Context = {
  refreshPage: false,
  setRefreshPage: () => {},
  setError: () => {},
  isModalOpen: false,
  setIsModalOpen: () => {},
  setRender: () => {},
  urlError: false,
  setUrlError: () => {},
  error: '',
  render: false,
  setIsLoading: () => {},
  isLoading: false,
};

type awardsModalProps = {
  onCloseModal: () => void;
  onSaveModal: () => void;
  isOpen: boolean;
  userId: string;
};

const myContext = createContext(initialContextValue);
// Interfaces

const Awards = ({ isOpen, onCloseModal, onSaveModal }: awardsModalProps) => {
  const { userId } = useContext(Portfolio);
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    presented_by: '',
    url: '',
    description: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlError, setUrlError] = useState('');
  const [error, setError] = useState('');
  const [render, setRender] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const [createAward, setCreateAward] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const openModal = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission

    const newAward = {
      year: formData.year,
      title: formData.title,
      presented_by: formData.presented_by,
      url: formData.url,
      description: formData.description,
    };

    try {
      setIsLoading(true);
      const response = await fetch(`https://hng6-r5y3.onrender.com/api/v1/awards/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAward),
      });
      setIsLoading(false);
      const status = response.status;
      console.log(response);

      if (response.ok) {
        // Handle success (status 200)

        notify({
          message: 'Award created successfully',
          position: 'top-center',
          theme: 'light',
          type: 'success',
        });
        setIsModalOpen(false);
        setTimeout(() => {
          setFormData({
            title: '',
            year: '',
            presented_by: '',
            url: '',
            description: '',
          });
        }, 4000);
      } else if (status === 400) {
        notify({
          message: 'Bad Request: Invalid data',
          position: 'top-center',
          theme: 'light',
          type: 'error',
        });
        // Handle a 400 Bad Request error
      } else if (status === 402) {
        notify({
          message: 'Payment Required: Payment is required for this action',
          position: 'top-center',
          theme: 'light',
          type: 'error',
        });
        // Handle a 402 Payment Required error
      } else if (status === 500) {
        notify({
          message: 'Internal Server Error: Something went wrong on the server',
          position: 'top-center',
          theme: 'light',
          type: 'error',
        });
        // Handle a 500 Internal Server Error
      } else {
        notify({
          message: 'An error occurred',
          position: 'top-center',
          theme: 'light',
          type: 'error',
        });
        // Handle other errors
      }
    } catch (error) {
      notify({
        message: `${error} `,
        position: 'top-center',
        theme: 'light',
        type: 'error',
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // console.log('Name:', name);
    // console.log('Value:', value);
    // console.log('Character Count:', characterCount);
    // console.log('IsValidDescription:', isValidDescription);

    if (name === 'year') {
      setFormData((prevData) => ({
        ...prevData,
        year: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <myContext.Provider
      value={{
        refreshPage,
        setRefreshPage,
        setError,
        isModalOpen,
        setIsModalOpen,
        setUrlError,
        urlError,
        setRender,
        render,
        error,
        setIsLoading,
        isLoading,
      }}
    >
      <div>
        {' '}
        {isModalOpen && (
          <Modal closeOnOverlayClick isOpen={isModalOpen} closeModal={closeModal} isCloseIconPresent={false} size="xl">
            <div className="p-5 sm:p-6 lg:p-8 flex gap-6 flex-col font-manropeL">
              <div className="flex gap-6  border-b-4 border-brand-green-hover py-4 px-0 justify-between items-center">
                <div className="flex items-center gap-6" onClick={onCloseModal}>
                  <h1 className="font-bold text-2xl text-white-700">Awards</h1>
                </div>
                <div onClick={onCloseModal}>
                  <CloseSquare className="fill-brand-green-primary text-white-100 h-7 w-7 cursor-pointer" />
                </div>
              </div>
              <form className="flex flex-col gap-6 px-2 sm:px-4" onSubmit={openModal}>
                <div className="flex flex-col sm:flex-row w-full gap-[10px]">
                  <div className="flex  flex-col gap-2 flex-1">
                    <label htmlFor="title" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                      Award Title*
                    </label>
                    <Input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="My best yet"
                      maxLength={14}
                      className="p-4 border-brand-disabled  text-[16px]  leading-6 w-full    text-gray-900   rounded-lg border-[1px]"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="flex  flex-col gap-2 flex-1">
                    <label htmlFor="year" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                      Year
                    </label>
                    <select
                      id="year"
                      name="year"
                      className="p-2 px-4 h-[48px] focus-within:border-brand-green-primary border-brand-disabled rounded-lg border-[1px]"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                    >
                      {/* Add the default placeholder option */}
                      <option value="" disabled>
                        Year
                      </option>
                      {Array.from({ length: 124 }, (_, index) => {
                        const year = 2023 - index;
                        if (year >= 1900) {
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          );
                        }
                        return null;
                      })}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row w-full gap-[10px]">
                  <div className="flex  flex-col gap-[10px] flex-1">
                    <label htmlFor="presented_by" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                      Organization*
                    </label>
                    <Input
                      type="text"
                      id="presented_by"
                      name="presented_by"
                      placeholder="Google"
                      maxLength={21}
                      className="p-4 border-brand-disabled w-full  text-[16px] leading-[24px]   text-gray-900  rounded-lg border-[1px]"
                      value={formData.presented_by}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex  flex-col gap-[10px] flex-1">
                    <label htmlFor="url" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                      Url
                    </label>
                    <Input
                      type="url"
                      id="url"
                      name="url"
                      pattern="https?://.+"
                      placeholder="Type link"
                      className="p-4 border-brand-disabled  text-[16px] w-full  leading-[24px]    text-gray-900   rounded-lg border-[1px]"
                      value={formData.url}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex  flex-col gap-[10px]">
                  <label htmlFor="description" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                    Description
                  </label>
                  <Input
                    type="text"
                    id="description"
                    name="description"
                    maxLength={200}
                    minLength={30}
                    placeholder=""
                    className="p-4 w-full border-brand-disabled  text-[16px]  leading-[24px]    text-gray-900   rounded-lg border-[1px]"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex sm:justify-between sm:text-left gap-2 sm:gap-0 justify-center text-center  items-center sm:flex-row flex-col">
                  <div>{isLoading && <Loader />}</div>
                  <div className="flex gap-4  items-center">
                    <Button
                      onClick={() => {
                        setIsModalOpen(false);
                      }}
                      intent={'secondary'}
                      className="w-full rounded-md sm:w-[6rem]"
                      size={'md'}
                    >
                      Cancel
                    </Button>{' '}
                    <Button
                      type="submit"
                      // disabled={!isValid}

                      className="w-full rounded-md sm:w-[6rem]"
                      size={'md'}
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader /> : 'Save'}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </Modal>
        )}
        {!isModalOpen && <AwardRead isOpen={!isModalOpen} onClose={onCloseModal} />}
      </div>
    </myContext.Provider>
  );
};
const AwardRead = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { setIsModalOpen } = useContext(myContext);
  return (
    <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="xl">
      <div className="p-5 sm:p-6 lg:p-8 flex gap-6 flex-col font-manropeL">
        <div className="flex gap-6  border-b-4 border-brand-green-hover py-4 px-0 justify-between items-center">
          <div onClick={onClose} className="flex items-center gap-6">
            <h1 className="font-bold text-2xl text-white-700 ">Awards</h1>
          </div>
          <div
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <CloseSquare onClick={onClose} className="fill-brand-green-primary text-white-100 h-7 w-7 cursor-pointer" />
          </div>
        </div>
        <AwardList isModalOpen={isOpen} />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <p
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="font-bold cursor-pointer leading-6  justify-center text-[12px] sm:text-[15px] flex items-center gap-1 text-brand-green-primary"
          >
            <Add size="16" color="#009254" />
            Add new awards
          </p>

          <div className="flex gap-4 justify-start items-center">
            <Button onClick={onClose} intent={'secondary'} className="w-full rounded-md sm:w-[6rem]" size={'md'}>
              Cancel
            </Button>{' '}
            <Button onClick={onClose} className="w-full rounded-md sm:w-[6rem]" size={'md'}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
const AwardList: React.FC<AwardListProps> = () => {
  const { refreshPage, setError, isModalOpen, setIsLoading } = useContext(myContext);
  const { userId } = useContext(Portfolio);
  const [awards, setAwards] = useState<Award[]>([]);

  const fetchAwards = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://hng6-r5y3.onrender.com/api/v1/awards`);
      setIsLoading(false);
      const status = response.status;

      if (response.ok) {
        const data = await response.json();
        setAwards(data.awards);
      } else if (status === 400) {
        notify({
          message: 'Bad Request: Invalid data',
          position: 'top-center',
          theme: 'light',
          type: 'error',
        });
        // Handle a 400 Bad Request error
      } else if (status === 402) {
        notify({
          message: 'Payment Required: Payment is required for this action',
          position: 'top-center',
          theme: 'light',
          type: 'error',
        });
        // Handle a 402 Payment Required error
      } else if (status === 500) {
        notify({
          message: 'Internal Server Error: Something went wrong on the server',
          position: 'top-center',
          theme: 'light',
          type: 'error',
        });
        // Handle a 500 Internal Server Error
      } else {
        notify({
          message: 'Error occurred while fetching awards',
          position: 'top-center',
          theme: 'light',
          type: 'error',
        });
      }
    } catch (error) {
      notify({
        message: `${error}`,
        position: 'top-center',
        theme: 'light',
        type: 'error',
      });
    }
  };
  useEffect(() => {
    if (!isModalOpen) {
      // Fetch data when the AwardRead modal is opened
      fetchAwards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen, refreshPage]);
  useEffect(() => {}, [isModalOpen]);

  return (
    <div>
      {awards.length > 0 ? (
        awards.map((award, index) => <AwardItem key={award.id} award={award} />)
      ) : (
        <p>There are no awards available.</p>
      )}
    </div>
  );
};

const AwardItem: React.FC<AwardItemProps> = ({ award }) => {
  const { id, year, title, presented_by, url, description } = award;
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const { refreshPage, setRefreshPage } = useContext(myContext);

  const [editedAward, setEditedAward] = useState(award);
  const openEditForm = () => {
    setIsEditFormOpen(true);
  };
  // Function to close the Edit form
  const closeEditForm = () => {
    setIsEditFormOpen(false);
  };

  // Function to handle the save action
  const handleSave = async () => {
    // Send a PUT request to update the award
    try {
      setEditLoading(true);
      const response = await fetch(`https://hng6-r5y3.onrender.com/api/v1/awards/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedAward),
        // Send the edited data
      });
      const status = response.status;
      setEditLoading(false);
      if (response.ok) {
        notify({
          message: 'Edited successfully',
          position: 'top-center',
          theme: 'light',
          type: 'success',
        });
        setRefreshPage(!refreshPage);
        closeEditForm(); // Close the Edit form
      } else if (status === 400) {
        notify({
          message: 'Bad Request: Invalid data',
          position: 'top-center',
          theme: 'light',
          type: 'error',
        });
        // Handle a 400 Bad Request error
      } else if (status === 402) {
        notify({
          message: 'Payment Required: Payment is required for this action',
          position: 'top-center',
          theme: 'light',
          type: 'error',
        });
        // Handle a 402 Payment Required error
      } else if (status === 500) {
        notify({
          message: 'Internal Server Error: Something went wrong on the server',
          position: 'top-center',
          theme: 'light',
          type: 'error',
        });
        // Handle a 500 Internal Server Error
      } else {
        notify({
          message: 'An error occurred',
          position: 'top-center',
          theme: 'light',
          type: 'error',
        });
        // Handle other errors
      }
    } catch (error) {
      notify({
        message: `${error} `,
        position: 'top-center',
        theme: 'light',
        type: 'error',
      });
    }
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Extract the id from the event

    try {
      setDeleteLoading(true);
      const response = await fetch(`https://hng6-r5y3.onrender.com/api/v1/awards/${id}`, {
        method: 'DELETE',
      });
      const status = response.status;
      if (response.ok) {
        setDeleteLoading(false);
        notify({
          message: 'Deleted successfully',
          position: 'top-center',
          theme: 'light',
          type: 'success',
        });

        setRefreshPage(!refreshPage);
      } else if (status === 400) {
        notify({
          message: 'Bad Request: Invalid data',
          position: 'top-center',
          theme: 'light',
          type: 'error',
        });
        // Handle a 400 Bad Request error
      } else if (status === 402) {
        notify({
          message: 'Payment Required: Payment is required for this action',
          position: 'top-center',
          theme: 'light',
          type: 'error',
        });
        // Handle a 402 Payment Required error
      } else if (status === 500) {
        notify({
          message: 'Internal Server Error: Something went wrong on the server',
          position: 'top-center',
          theme: 'light',
          type: 'error',
        });
        // Handle a 500 Internal Server Error
      } else {
        notify({
          message: 'An error occurred',
          position: 'top-center',
          theme: 'light',
          type: 'error',
        });
        // Handle other errors
      }
    } catch (error) {
      notify({
        message: `There was a ${error} error`,
        position: 'top-center',
        theme: 'light',
        type: 'success',
      });
    }
  };

  return (
    <div className="border-b-[1px] border-b-brand-disabled gap-12 py-2">
      <div className="flex flex-col sm:flex-row gap-6 w-full justify-between">
        <div className="flex flex-col sm:flex-row sm:gap-10 sm:w-[60%] lg:w-[35%] gap-4  justify-between">
          <div>
            <p className="font-semibold text-[16px] leading-6  text-gray-300">{year}</p>
          </div>
          <div className="flex flex-col gap-2 w-full overflow-hidden text-ellipsis whitespace-nowrap ">
            <h1 className="font-semibold text-[22px] leading-7 text-white-700  text-left ">{title}</h1>
            <h2 className="font-bold text-[16px] leading-6 text-white-700  text-left">{presented_by}</h2>
            <p className="font-semibold text-[14px] leading-5 text-brand-green-hover border-brand-green-primary text-left">
              <Link href={url} target="_blank" className="flex items-center ">
                <span className="whitespace-nowrap overflow-hidden text-ellipsis "> {url}</span>{' '}
                <ArrowUp className="w-4 h-4  rotate-45" />
              </Link>
            </p>
          </div>
        </div>
        <div className="flex sm:w-[35%] lg:w-[55%]  ">
          <p className="font-bold text-left text-[16px] leading-6 text-white-650  overflow-hidden text-ellipsis">
            {description}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>{deleteLoading || editLoading ? <Loader /> : ''}</div>
        <div className="flex justify-between items-center">
          {' '}
          <Button
            onClick={openEditForm}
            className="border-none outline-none text-[#5B8DEF] bg-transparent hover:bg-zinc-100 focus:bg-zinc-200 active:bg-zinc-100 duration-300"
          >
            <Edit2 size="24" color="#37d67a" variant="Outline" />
          </Button>{' '}
          <Button
            onClick={handleDelete}
            className="border-none outline-none text-brand-red-hover bg-transparent hover:bg-zinc-100 focus:bg-zinc-200 active:bg-zinc-100 duration-300"
          >
            <Trash size="24" color="#f47373" variant="Outline" />
          </Button>
        </div>
      </div>
      {isEditFormOpen && (
        <EditForm
          handleSave={handleSave}
          award={editedAward}
          setAward={setEditedAward}
          isOpen={isEditFormOpen}
          onClose={closeEditForm}
        />
      )}
    </div>
  );
};

const EditForm: React.FC<{
  handleSave: () => void;
  isOpen: boolean;
  award: Award;
  setAward: React.Dispatch<React.SetStateAction<Award>>;
  onClose: () => void;
}> = ({ isOpen, award, setAward, onClose, handleSave }) => {
  const { urlError, setUrlError, setRender, error, render, setError } = useContext(myContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Update the award state
    setAward((prevAward: Award) => ({
      ...prevAward,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Update the award state for the select input
    setAward((prevAward: Award) => ({
      ...prevAward,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setRender(true);

    // If description character count is within the desired range, trigger handleSave and onClose
    handleSave();
    onClose();
  };

  return (
    <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="xl">
      <div className="p-5 sm:p-6 lg:p-8 flex gap-6 flex-col font-manropeL">
        <div className="flex gap-6  border-b-4 border-brand-green-hover py-2 px-0 justify-between items-center">
          <div className="flex items-center gap-6">
            <ArrowLeft2 />
            <h1 className="font-bold text-2xl text-white-700">Awards</h1>
          </div>
          <div onClick={onClose}>
            <CloseSquare className="fill-brand-green-primary text-white-100 h-7 w-7 cursor-pointer" />
          </div>
        </div>
        <form className="flex flex-col gap-6 px-2 sm:px-4" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row w-full gap-[10px]">
            <div className="flex  flex-col gap-2 flex-1">
              <label htmlFor="title" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                Award Title *
              </label>
              <Input
                type="text"
                id="title"
                name="title"
                placeholder="My best yet"
                maxLength={14}
                className="p-4 border-brand-disabled  text-[16px]  leading-6 w-full    text-gray-900   rounded-lg border-[1px]"
                value={award.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex  flex-col gap-2 flex-1">
              <label htmlFor="year" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                Year *
              </label>
              <select
                id="year"
                name="year"
                className="p-2 px-4 h-[48px] focus-within:border-brand-green-primary border-brand-disabled rounded-lg border-[1px]"
                value={award.year}
                onChange={handleSelectChange}
                required
              >
                {/* Add the default placeholder option */}
                <option value="" disabled>
                  Year
                </option>
                {Array.from({ length: 124 }, (_, index) => {
                  const year = 2023 - index;
                  if (year >= 1900) {
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  }
                  return null;
                })}
              </select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row w-full gap-[10px]">
            <div className="flex  flex-col gap-[10px] flex-1">
              <label htmlFor="presented_by" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                Organization *
              </label>
              <Input
                type="text"
                id="presented_by"
                name="presented_by"
                placeholder="Google"
                maxLength={21}
                className="p-4 border-brand-disabled w-full  text-[16px] leading-[24px]   text-gray-900  rounded-lg border-[1px]"
                value={award.presented_by}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex  flex-col gap-[10px] flex-1">
              <label htmlFor="url" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                Url *
              </label>
              <Input
                type="url"
                id="url"
                name="url"
                pattern="https?://.+"
                placeholder="Type link"
                className="p-4 border-brand-disabled  text-[16px] w-full  leading-[24px]    text-gray-900   rounded-lg border-[1px]"
                value={award.url}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="flex  flex-col gap-[10px]">
            <label htmlFor="description" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
              Description *
            </label>
            <Input
              type="text"
              id="description"
              name="description"
              maxLength={200}
              minLength={30}
              placeholder=""
              className="p-4 w-full border-brand-disabled  text-[16px]  leading-[24px]    text-gray-900   rounded-lg border-[1px]"
              value={award.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex justify-end items-center">
            <div className="flex gap-4  items-center">
              <Button onClick={onClose} intent={'secondary'} className="w-full rounded-md sm:w-[6rem]" size={'md'}>
                Cancel
              </Button>{' '}
              <Button type="submit" className="w-full rounded-md sm:w-[6rem]" size={'md'}>
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};
function setDeleteLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}

export default Awards;
