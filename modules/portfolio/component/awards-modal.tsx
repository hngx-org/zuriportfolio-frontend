import React, { useState, useEffect, createContext, useContext } from 'react';
import Button from '@ui/Button';
import { Input } from '@ui/Input';
import { ArrowLeft2, ArrowUp, CloseSquare, Award } from 'iconsax-react';
import Link from 'next/link';
import Modal from '@ui/Modal';

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
};

const myContext = createContext(initialContextValue);
// Interfaces
interface Award {
  id: string;
  sectionId: number;
  year: string;
  title: string;
  presented_by: string;
  url: string;
  description: string;
}

interface AwardItemProps {
  award: Award;
}
interface AwardListProps {
  // awards: Award[];
  isModalOpen: boolean;
}

const Awards = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
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
  const [createCertificate, setCreateCertificate] = useState('');

  const validateUrl = (url: string) => {
    const urlPattern = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
    return urlPattern.test(url);
  };

  const isValid =
    formData.year && formData.title && formData.presented_by && formData.url && formData.description && !urlError;

  const openModal = async (e: React.FormEvent) => {
    // console.log('openModal function called');
    e.preventDefault(); // Prevent the default form submission
    const missingFields = [];

    if (!formData.title) {
      missingFields.push('Title');
    }
    if (!formData.presented_by) {
      missingFields.push('Organization');
    }

    if (!formData.description) {
      missingFields.push('Description');
    }
    if (!formData.year) {
      missingFields.push('Year');
    }
    if (!formData.url) {
      missingFields.push('URL');
    } else {
      if (!validateUrl(formData.url)) {
        setUrlError('Please enter a valid URL');
      } else {
        setUrlError('');
      }
    }

    if (
      !formData.title ||
      !formData.presented_by ||
      !formData.url ||
      !formData.description ||
      !formData.year ||
      !formData.url
    ) {
      setRender(true);
    } else {
      setRender(false); // Reset it when all required fields are filled
    }
    if (isValid && !urlError) {
      const newAward = {
        id: awardCounter.toString(),
        year: formData.year,
        sectionId: formData.sectionId,
        title: formData.title,
        presented_by: formData.presented_by,
        url: formData.url,
        description: formData.description,
      };
      setAwardCounter(awardCounter + 1);
      // console.log('URL:', 'https://hng6-r5y3.onrender.com/api/add-award/6ba7b810-9dad-11d1-80b4-00c04fd430c8');
      // console.log('Request Data:', JSON.stringify(newAward));

      // setAwards((prevAwards) => [...prevAwards, newAward]);
      // console.log('Updated Awards Array:', awards);

      try {
        const response = await fetch('https://hng6-r5y3.onrender.com/api/award/6ba7b810-9dad-11d1-80b4-00c04fd430c8', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newAward),
        });
        // console.log('Response Status:', response.status);
        // console.log('Response Data:', await response.json());

        if (response.ok) {
          setCreateCertificate('Award created successfully');
          setTimeout(() => {
            setCreateCertificate('');
          }, 3000);
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
            setIsModalOpen(true);
          }, 2000); // Adjust the delay time (1000 milliseconds = 1 second) as needed
        } else {
          setError('Error saving the award.');
        }
      } catch (error) {
        setError('An error occurred while saving the award.');
        // console.error(error);
      }
    } else {
      const missingFieldsMessage = missingFields.join(', ');
      setError(`Please fill in the following fields:\n${missingFieldsMessage}.`);
      // console.log('Please fill in all the form fields.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const characterCount = value.replace(/\s/g, '').length; // Remove white spaces and count characters
    const isValidDescription = characterCount >= 30 && characterCount <= 100;

    // console.log('Name:', name);
    // console.log('Value:', value);
    // console.log('Character Count:', characterCount);
    // console.log('IsValidDescription:', isValidDescription);

    setAcceptedDescription(isValidDescription);

    if (name === 'description') {
      setAcceptedDescription(isValidDescription);
      if (isValidDescription) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        setError(''); // Clear any previous errors
      } else {
        setError('Description must contain between 10 and 50 characters.');
      }
    }

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
      }}
    >
      <div>
        {!isModalOpen && (
          <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="xl">
            <div className="p-5 sm:p-6 lg:p-8 flex gap-6 flex-col font-manropeL">
              <div className="flex gap-6  border-b-4 border-brand-green-hover py-4 px-0 justify-between items-center">
                <div className="flex items-center gap-6" onClick={onClose}>
                  <ArrowLeft2 />
                  <h1 className="font-bold text-2xl text-white-700">Awards</h1>
                </div>
                <div onClick={onClose}>
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
                      className="p-4 border-brand-disabled  text-[16px]  leading-6 w-full    text-white-650   rounded-lg border-[1px]"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="flex  flex-col gap-2 flex-1">
                    <label htmlFor="year" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                      Year
                    </label>
                    <select
                      id="year"
                      name="year"
                      className="p-2 px-4 h-[48px] focus-within:border-brand-green-primary border-brand-disabled rounded-lg border-[1px] "
                      value={formData.year}
                      onChange={handleInputChange}
                    >
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
                      className="p-4 border-brand-disabled w-full  text-[16px] leading-[24px]   text-white-650  rounded-lg border-[1px]"
                      value={formData.presented_by}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex  flex-col gap-[10px] flex-1">
                    <label htmlFor="url" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                      Url
                    </label>
                    <Input
                      type="text"
                      id="url"
                      name="url"
                      placeholder="Type link"
                      className="p-4 border-brand-disabled  text-[16px] w-full  leading-[24px]    text-white-650   rounded-lg border-[1px]"
                      value={formData.url}
                      onChange={handleInputChange}
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
                    placeholder=" "
                    className="p-4 w-full border-brand-disabled  text-[16px]  leading-[24px]    text-white-650   rounded-lg border-[1px]"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div>
                      <p className="text-green-200 text-sm">{createCertificate}</p>
                    </div>
                    <div>
                      {render ? (
                        <pre className="text-red-205 font-manropeL">{error}</pre>
                      ) : (
                        urlError && <div className="text-red-205 text-sm">{urlError}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-4  items-center">
                    <Button
                      onClick={onClose}
                      className="py-3 px-5 rounded-lg bg-white-100 border-[#009444] border-[1px] text-[#009444] hover-bg-zinc-100"
                    >
                      Cancel
                    </Button>{' '}
                    <Button
                      type="submit"
                      // disabled={!isValid}
                      className="py-3 px-5 rounded-lg bg-[#009444] border-white-100 border-[1px] text-white-100"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </Modal>
        )}
        {isModalOpen && <AwardRead isOpen={isModalOpen} onClose={closeModal} />}
      </div>
    </myContext.Provider>
  );
};
const AwardRead = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="xl">
      <div className="p-5 sm:p-6 lg:p-8 flex gap-6 flex-col font-manropeL">
        <div className="flex gap-6  border-b-4 border-brand-green-hover py-4 px-0 justify-between items-center">
          <div className="flex items-center gap-6">
            <ArrowLeft2 />
            <h1 className="font-bold text-2xl text-white-700 ">Awards</h1>
          </div>
          <div onClick={onClose}>
            <CloseSquare className="fill-brand-green-primary text-white-100 h-7 w-7 cursor-pointer" />
          </div>
        </div>
        <AwardList isModalOpen={isOpen} />
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <p onClick={onClose} className="font-bold cursor-pointer text-[16px] leading-6 text-brand-green-primary">
              Add new awards
            </p>
          </div>
          <div className="flex gap-4 justify-start items-center">
            <Button
              onClick={onClose}
              className="py-3 px-5 rounded-lg bg-white-100 border-[#009444] border-[1px] text-[#009444] active:text-white-100 focus:text-white-100  hover:bg-zinc-100 "
            >
              Cancel
            </Button>{' '}
            <Button
              onClick={onClose}
              className="py-3 px-5 rounded-lg bg-[#009444] border-white-100 border-[1px] text-white-100"
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
  const { refreshPage, setError, isModalOpen } = useContext(myContext);
  const [awards, setAwards] = useState<Award[]>([]);

  const fetchAwards = async () => {
    try {
      const response = await fetch('https://hng6-r5y3.onrender.com/api/awards');
      if (response.ok) {
        const data = await response.json();
        // console.log('Fetched awards data:', data);
        setAwards(data.awards);
      } else {
        if (typeof setError === 'function') {
          setError('Error fetching awards data.');
        }
      }
    } catch (error) {
      if (typeof setError === 'function') {
        setError('An error occurred while fetching awards data.');
      }

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
    // console.log('this is the data', awards);
  }, [isModalOpen]);

  return (
    <div>
      {awards.length === 0 ? (
        <p>No Award available</p>
      ) : (
        awards.map((award, index) => <AwardItem key={award.id} award={award} />)
      )}
    </div>
  );
};

const AwardItem: React.FC<AwardItemProps> = ({ award }) => {
  const { id, year, title, presented_by, url, description } = award;
  const [deletedMessage, setDeletedMessage] = useState('');
  const [editedMessage, setEditedMessage] = useState('');
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const { refreshPage, setRefreshPage } = useContext(myContext);

  // State to store the edited data
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
      const response = await fetch(
        `https://hng6-r5y3.onrender.com/api/award/6ba7b810-9dad-11d1-80b4-00c04fd430c8/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedAward), // Send the edited data
        },
      );
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

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Extract the id from the event

    try {
      const response = await fetch(`https://hng6-r5y3.onrender.com/api/award/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Award deleted successfully, you can update the UI accordingly
        // console.log(response.json());
        // console.log(`Award with ID ${id} deleted.`);
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
          <div className="flex flex-col gap-2  overflow-hidden text-ellipsis ">
            <h1 className="font-semibold text-[22px] leading-7 text-white-700  text-left overflow-hidden text-ellipsis whitespace-nowrap">
              {title}
            </h1>
            <h2 className="font-bold text-[16px] leading-6 text-white-700  text-left">{presented_by}</h2>
            <p className="font-semibold text-[14px] leading-5 text-brand-green-hover border-brand-green-primary text-left">
              <Link href={url} target="_blank" className="flex items-center ">
                <span className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">{url}</span>{' '}
                <ArrowUp className="w-4 h-4  rotate-45" />
              </Link>
            </p>
          </div>
        </div>
        <div className="flex sm:w-[35%] lg:w-[55%]  ">
          <p className="font-bold text-left text-[16px] leading-6 text-white-650 overflow-hidden text-ellipsis">
            {description}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-red-205 text-sm">{deletedMessage}</p>
          <p className="text-green-200 text-sm">{editedMessage}</p>
        </div>
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
  const validateUrl = (url: string) => {
    const urlPattern = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
    return urlPattern.test(url);
  };

  const isValidEdit = award.year && award.title && award.presented_by && award.url && award.description && !urlError;
  const missingFields: string[] = [];

  if (!award.title) {
    missingFields.push('Title');
  }
  if (!award.presented_by) {
    missingFields.push('Organization');
  }
  if (!award.url) {
    missingFields.push('URL');
  }
  if (!award.description) {
    missingFields.push('Description');
  }
  if (!award.year) {
    missingFields.push('Year');
  }
  if (!award.url) {
    missingFields.push('URL');
  } else {
    if (!validateUrl(award.url)) {
      setUrlError('Please enter a valid URL');
    } else {
      setUrlError('');
    }
  }

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

    if (isValidEdit && !urlError) {
      setRender(true);

      // If description character count is within the desired range, trigger handleSave and onClose
      handleSave();
      onClose();
    } else {
      const missingFieldsMessage = missingFields.join(', ');
      setError(`Please fill in the following fields:\n${missingFieldsMessage}.`);
      // console.log('Please fill in all the form fields.');
    }
  };

  return (
    <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="xl">
      <div className="p-5 sm:p-6 lg:p-8 flex gap-6 flex-col font-manropeL">
        <div className="flex gap-6  border-b-4 border-brand-green-hover py-4 px-0 justify-between items-center">
          <div className="flex items-center gap-6">
            <ArrowLeft2 />
            <h1 className="font-bold text-2xl text-white-700">Awards </h1>
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
                name="title"
                placeholder="My best yet"
                className="p-4 border-brand-disabled  text-[16px]  leading-6 w-full    text-white-650   rounded-lg border-[1px]"
                value={award.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex  flex-col gap-2 flex-1">
              <label htmlFor="year" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                Year
              </label>
              <select
                id="year"
                name="year"
                className="p-2 px-4 h-[48px] focus-within:border-brand-green-primary border-brand-disabled rounded-lg border-[1px] "
                value={award.year}
                onChange={handleSelectChange}
              >
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
                className="p-4 border-brand-disabled w-full  text-[16px] leading-[24px]   text-white-650  rounded-lg border-[1px]"
                value={award.presented_by}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex  flex-col gap-[10px] flex-1">
              <label htmlFor="url" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                Url
              </label>
              <Input
                type="text"
                id="url"
                name="url"
                placeholder="Type link"
                className="p-4 border-brand-disabled  text-[16px] w-full  leading-[24px]    text-white-650   rounded-lg border-[1px]"
                value={award.url}
                onChange={handleInputChange}
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
              placeholder=" "
              className="p-4 w-full border-brand-disabled  text-[16px]  leading-[24px]    text-white-650   rounded-lg border-[1px]"
              value={award.description}
              onChange={handleInputChange}
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
              <Button
                onClick={onClose}
                className="py-3 px-5 rounded-lg bg-white-100 border-[#009444] border-[1px] text-[#009444] hover-bg-zinc-100"
              >
                Cancel
              </Button>{' '}
              <Button
                type="submit"
                // disabled={!isValid}
                className="py-3 px-5 rounded-lg bg-[#009444] border-white-100 border-[1px] text-white-100"
              >
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
