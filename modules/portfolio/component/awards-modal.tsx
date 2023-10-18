import React, { useState, useEffect, createContext, useContext } from 'react';
import Button from '@ui/Button';
import { Input } from '@ui/Input';
import { ArrowLeft2, ArrowUp, CloseSquare } from 'iconsax-react';
import Link from 'next/link';
import Modal from '@ui/Modal';
import { Award, AwardItemProps, AwardListProps } from '../../../@types';
import Loader from '@ui/Loader';

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
  setCloseAllModal: React.Dispatch<React.SetStateAction<boolean>>;
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
  setCloseAllModal: () => {},
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

const Awards = ({ isOpen, onCloseModal, onSaveModal, userId }: awardsModalProps) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    year: '',
    sectionId: 22,
    presented_by: '',
    url: '',
    description: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlError, setUrlError] = useState('');
  const [error, setError] = useState('');
  const [render, setRender] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const [awardCounter, setAwardCounter] = useState(0);
  const [acceptedDescription, setAcceptedDescription] = useState(false);
  const [createAward, setCreateAward] = useState('');
  const [closeAllModal, setCloseAllModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = async (e: React.FormEvent) => {
    // console.log('openModal function called');
    e.preventDefault(); // Prevent the default form submission

    console.log('This is the formdata', formData);

    const newAward = {
      id: awardCounter.toString(),
      year: formData.year,
      section_id: formData.sectionId,
      title: formData.title,
      presented_by: formData.presented_by,
      url: formData.url,
      description: formData.description,
    };
    setAwardCounter(awardCounter + 1);

    try {
      setIsLoading(true);
      const response = await fetch(`https://hng6-r5y3.onrender.com/api/award/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAward),
      });
      console.log('Response Status:', response.status);
      console.log('Response Data:', await response.json());
      setIsLoading(false);

      if (response.ok) {
        setCreateAward('Award created successfully');
        setTimeout(() => {
          setCreateAward('');
        }, 2000);
        setError('');

        setTimeout(() => {
          setFormData({
            id: '',
            sectionId: 22,
            title: '',
            year: '',
            presented_by: '',
            url: '',
            description: '',
          });
        }, 4000);

        // Delay setting IsModalOpen to true by a certain number of milliseconds
        setTimeout(() => {
          setIsModalOpen(false);
        }, 2000); // Adjust the delay time (1000 milliseconds = 1 second) as needed
      } else {
        setError('Error saving the award.');
      }
    } catch (error) {
      setError('An error occurred while saving the award.');
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

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
        setCloseAllModal,
        setIsLoading,
        isLoading,
      }}
    >
      <div>
        {!closeAllModal && (
          <div>
            {isModalOpen && (
              <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onCloseModal} isCloseIconPresent={false} size="xl">
                <div className="p-5 sm:p-6 lg:p-8 flex gap-6 flex-col font-manropeL">
                  <div className="flex gap-6  border-b-4 border-brand-green-hover py-4 px-0 justify-between items-center">
                    <div className="flex items-center gap-6" onClick={onCloseModal}>
                      <ArrowLeft2 />
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
                          maxLength={14}
                          placeholder="My best yet"
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
                        <label
                          htmlFor="presented_by"
                          className="font-semibold text-[16px] leading-[24px]  text-[#444846]"
                        >
                          Organization*
                        </label>
                        <Input
                          type="text"
                          maxLength={21}
                          id="presented_by"
                          name="presented_by"
                          placeholder="Google"
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
                      <div>
                        {isLoading ? (
                          <Loader />
                        ) : (
                          <div>
                            <div>
                              <p className="text-green-200 text-sm">{createAward}</p>
                            </div>
                            <div>
                              <pre className="text-red-205 font-manropeL">{error}</pre>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-4  items-center">
                        <Button
                          onClick={onCloseModal}
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
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </Modal>
            )}
            {!isModalOpen && <AwardRead isOpen={isOpen} onClose={closeModal} />}
          </div>
        )}
      </div>
    </myContext.Provider>
  );
};
const AwardRead = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { setCloseAllModal, setIsModalOpen } = useContext(myContext);
  return (
    <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="xl">
      <div className="p-5 sm:p-6 lg:p-8 flex gap-6 flex-col font-manropeL">
        <div className="flex gap-6  border-b-4 border-brand-green-hover py-4 px-0 justify-between items-center">
          <div onClick={onClose} className="flex items-center gap-6">
            <ArrowLeft2 />
            <h1 className="font-bold text-2xl text-white-700 ">Awards</h1>
          </div>
          <div
            onClick={() => {
              setCloseAllModal(true);
            }}
          >
            <CloseSquare className="fill-brand-green-primary text-white-100 h-7 w-7 cursor-pointer" />
          </div>
        </div>
        <AwardList isModalOpen={isOpen} />
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <p
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="font-bold cursor-pointer text-[16px] leading-6 text-brand-green-primary"
            >
              Add new awards
            </p>
          </div>
          <div className="flex gap-4 justify-start items-center">
            <Button onClick={onClose} intent={'secondary'} className="w-full rounded-md sm:w-[6rem]" size={'md'}>
              Cancel
            </Button>{' '}
            <Button
              onClick={() => {
                setCloseAllModal(true);
              }}
              className="w-full rounded-md sm:w-[6rem]"
              size={'md'}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
const AwardList: React.FC<AwardListProps> = () => {
  const { refreshPage, setError, isModalOpen, isLoading, setIsLoading } = useContext(myContext);
  const [awards, setAwards] = useState<Award[]>([]);
  console.log('why this is the ', awards);

  const fetchAwards = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://hng6-r5y3.onrender.com/api/awards/`);
      setIsLoading(false);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched awards data:', data.awards);
        setAwards(data.awards);
      } else {
        setError('Error fetching awards data.');
      }
    } catch (error) {
      setError('An error occurred while fetching awards data.');

      // console.error(error);
    }
  };
  useEffect(() => {
    if (isModalOpen) {
      // Fetch data when the AwardRead modal is opened
      fetchAwards();
    }
  }, [isModalOpen, refreshPage]);
  useEffect(() => {
    console.log('this is the data', awards);
  }, [isModalOpen]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {awards.length > 0 ? (
            awards.map((award, index) => <AwardItem key={award.id} award={award} />)
          ) : (
            <p>There are no awards available.</p>
          )}
        </div>
      )}
    </div>
  );
};

const AwardItem: React.FC<AwardItemProps> = ({ award }) => {
  const { id, year, title, presented_by, url, description } = award;
  const [deletedMessage, setDeletedMessage] = useState('');
  const [editedMessage, setEditedMessage] = useState('');
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const { refreshPage, setRefreshPage, isLoading, setIsLoading } = useContext(myContext);
  console.log('these are the awards', award);

  const [editedAward, setEditedAward] = useState(award);
  const openEditForm = () => {
    setIsEditFormOpen(true);
  };

  const closeEditForm = () => {
    setIsEditFormOpen(false);
  };

  // Function to handle the save action
  const handleSave = async () => {
    // Send a PUT request to update the award
    try {
      setEditLoading(true);
      const response = await fetch(`https://hng6-r5y3.onrender.com/api/award/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedAward),
        // Send the edited data
      });
      setEditLoading(false);
      if (response.ok) {
        // console.log(`Award with ID ${id} updated.`);
        setRefreshPage(!refreshPage);
        setEditedMessage('Edited successfully');
        setTimeout(() => {
          setEditedMessage('');
        }, 3000);

        closeEditForm(); // Close the Edit form
      } else {
        // console.error(`Error updating award with ID ${id}`);
      }
    } catch (error) {
      // console.error('An error occurred while updating the award.', error);
    }
  };
  const extractHostname = (url: string) => {
    const { hostname } = new URL(url);
    return hostname;
  };
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Extract the id from the event

    try {
      setDeleteLoading(true);
      const response = await fetch(`https://hng6-r5y3.onrender.com/api/award/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Award deleted successfully, you can update the UI accordingly
        // console.log(response.json());
        // console.log(`Award with ID ${id} deleted.`);
        setDeleteLoading(false);
        setDeletedMessage('Deleted successfully');

        setRefreshPage(!refreshPage);
      } else {
        // console.error(`Error deleting award with ID ${id}`);
      }
    } catch (error) {
      // console.error('An error occurred while deleting the award.', error);
    }
  };

  return (
    <div className="border-b-[1px] border-b-brand-disabled gap-12 py-3">
      <div className="flex flex-col sm:flex-row gap-6 w-full justify-between">
        <div className="flex flex-col sm:flex-row sm:gap-10 sm:w-[60%] lg:w-[35%] gap-4  justify-between">
          <div>
            <p className="font-semibold text-[16px] leading-6  text-gray-300">{year}</p>
          </div>
          <div className="flex flex-col gap-2 w-full overflow-hidden text-ellipsis whitespace-nowrap text-right">
            <h1 className="font-semibold text-[22px] leading-7 text-white-700  text-left ">{title}</h1>
            <h2 className="font-bold text-[16px] leading-6 text-white-700  text-left">{presented_by}</h2>
            <p className="font-semibold text-[14px] leading-5 text-brand-green-hover border-brand-green-primary text-left">
              <Link href={url} target="_blank" className="flex items-center ">
                <span className="whitespace-nowrap overflow-hidden text-ellipsis "> {extractHostname(url)}</span>{' '}
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
        <div>{deleteLoading ? <Loader /> : <p className="text-red-205 text-sm">{deletedMessage}</p>}</div>{' '}
        <div>{editLoading ? <Loader /> : <p className="text-green-200 text-sm">{editedMessage}</p>}</div>
        <div className="flex justify-between items-center">
          {' '}
          <Button
            onClick={openEditForm}
            className="border-none outline-none text-[#5B8DEF] bg-transparent hover:bg-zinc-100 focus:bg-zinc-200 active:bg-zinc-100 duration-300"
          >
            Edit
          </Button>{' '}
          <Button
            onClick={handleDelete}
            className="border-none outline-none text-brand-red-hover bg-transparent hover:bg-zinc-100 focus:bg-zinc-200 active:bg-zinc-100 duration-300"
          >
            Delete
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

    handleSave();
    onClose();
  };

  return (
    <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="xl">
      <div className="p-5 sm:p-6 lg:p-8 flex gap-6 flex-col font-manropeL">
        <div className="flex gap-6  border-b-4 border-brand-green-hover py-4 px-0 justify-between items-center">
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
                Award Title*
              </label>
              <Input
                type="text"
                id="title"
                maxLength={14}
                name="title"
                placeholder="My best yet"
                className="p-4 border-brand-disabled  text-[16px]  leading-6 w-full    text-gray-900   rounded-lg border-[1px]"
                value={award.title}
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
                value={award.year}
                onChange={handleSelectChange}
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
                maxLength={21}
                id="presented_by"
                name="presented_by"
                placeholder="Google"
                className="p-4 border-brand-disabled w-full  text-[16px] leading-[24px]   text-gray-900  rounded-lg border-[1px]"
                value={award.presented_by}
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
                value={award.url}
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
              value={award.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <div>
              {render ? (
                <pre className="text-red-205 font-manropeL">{error}</pre>
              ) : (
                urlError && <div className="text-red-205 text-sm">{urlError}</div>
              )}
            </div>
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

export default Awards;
