import React, { useState, useEffect, createContext, useContext } from 'react';
import Button from '@ui/Button';
import { Input } from '@ui/Input';
import { ArrowLeft2, ArrowUp, CloseSquare } from 'iconsax-react';
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
interface Certification {
  id: string;
  sectionId: number;
  year: string;
  title: string;
  organization: string;
  url: string;
  description: string;
}

interface CertificationItemProps {
  certification: Certification;
}
interface CertificationListProps {
  // certifications: Certification[];
  isModalOpen: boolean;
}

const Certifications = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    year: '',
    sectionId: 10,
    organization: '',
    url: '',
    description: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlError, setUrlError] = useState('');
  const [error, setError] = useState('');
  const [render, setRender] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const [certificationCounter, setCertificationCounter] = useState(0);
  const [acceptedDescription, setAcceptedDescription] = useState(false);
  const [createCertificate, setCreateCertificate] = useState('');

  const validateUrl = (url: string) => {
    const urlPattern = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
    return urlPattern.test(url);
  };

  const isValid =
    formData.year && formData.title && formData.organization && formData.url && formData.description && !urlError;

  const openModal = async (e: React.FormEvent) => {
    // console.log('openModal function called');
    e.preventDefault(); // Prevent the default form submission
    const missingFields = [];

    if (!formData.title) {
      missingFields.push('Title');
    }
    if (!formData.organization) {
      missingFields.push('organization');
    }
    if (!formData.url) {
      missingFields.push('URL');
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
      !formData.organization ||
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
      const newCertification = {
        id: certificationCounter.toString(),
        year: formData.year,
        sectionId: formData.sectionId,
        title: formData.title,
        organization: formData.organization,
        url: formData.url,
        description: formData.description,
      };
      setCertificationCounter(certificationCounter + 1);
      // console.log('URL:', 'https://hng6-r5y3.onrender.com/api/add-certificate/6ba7b810-9dad-11d1-80b4-00c04fd430c8');
      // console.log('Request Data:', JSON.stringify(newCertification));

      // setCertifications((prevCertifications) => [...prevCertifications, newCertification]);
      // console.log('Updated Certifications Array:', certifications);

      try {
        const response = await fetch(
          'https://hng6-r5y3.onrender.com/api/add-certificate/6ba7b810-9dad-11d1-80b4-00c04fd430c8',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCertification),
          },
        );
        // console.log('Response Status:', response.status);
        // console.log('Response Data:', await response.json());

        if (response.ok) {
          setCreateCertificate('Certificate created successfully');
          setTimeout(() => {
            setCreateCertificate('');
          }, 3000);
          setError('');

          setTimeout(() => {
            setFormData({
              id: '',
              sectionId: 10,
              title: '',
              year: '',
              organization: '',
              url: '',
              description: '',
            });
          }, 4000);

          // Delay setting IsModalOpen to true by a certain number of milliseconds
          setTimeout(() => {
            setIsModalOpen(true);
          }, 2000); // Adjust the delay time (1000 milliseconds = 1 second) as needed
        } else {
          setError('Error saving the certification.');
        }
      } catch (error) {
        setError('An error occurred while saving the certification.');
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
    const isValidDescription = characterCount >= 30 && characterCount <= 200;

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
        setError('Description must contain between 30 and 200 characters.');
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
                  <h1 className="font-bold text-2xl text-white-700">Certifications</h1>
                </div>
                <div onClick={onClose}>
                  <CloseSquare className="fill-brand-green-primary text-white-100 h-7 w-7 cursor-pointer" />
                </div>
              </div>
              <form className="flex flex-col gap-6 px-2 sm:px-4" onSubmit={openModal}>
                <div className="flex flex-col sm:flex-row w-full gap-[10px]">
                  <div className="flex  flex-col gap-2 flex-1">
                    <label htmlFor="title" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                      Certification Title*
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
                    <label htmlFor="organization" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                      organization*
                    </label>
                    <Input
                      type="text"
                      id="organization"
                      name="organization"
                      placeholder="Google"
                      className="p-4 border-brand-disabled w-full  text-[16px] leading-[24px]   text-white-650  rounded-lg border-[1px]"
                      value={formData.organization}
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
                    placeholder="Certificate ID & details "
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
        {isModalOpen && <CertificationRead isOpen={isModalOpen} onClose={closeModal} />}
      </div>
    </myContext.Provider>
  );
};
const CertificationRead = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="xl">
      <div className="p-5 sm:p-6 lg:p-8 flex gap-6 flex-col font-manropeL">
        <div className="flex gap-6  border-b-4 border-brand-green-hover py-4 px-0 justify-between items-center">
          <div className="flex items-center gap-6">
            <ArrowLeft2 />
            <h1 className="font-bold text-2xl text-white-700 ">Certifications</h1>
          </div>
          <div onClick={onClose}>
            <CloseSquare className="fill-brand-green-primary text-white-100 h-7 w-7 cursor-pointer" />
          </div>
        </div>
        <CertificationList isModalOpen={isOpen} />
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <p onClick={onClose} className="font-bold cursor-pointer text-[16px] leading-6 text-brand-green-primary">
              Add new certifications
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
const CertificationList: React.FC<CertificationListProps> = () => {
  const { refreshPage, setError, isModalOpen } = useContext(myContext);
  const [certifications, setCertifications] = useState<Certification[]>([]);

  const fetchCertifications = async () => {
    try {
      const response = await fetch('https://hng6-r5y3.onrender.com/api/certificates');
      if (response.ok) {
        const data = await response.json();
        // console.log('Fetched certifications data:', data);
        setCertifications(data.data);
      } else {
        if (typeof setError === 'function') {
          setError('Error fetching certifications data.');
        }
      }
    } catch (error) {
      if (typeof setError === 'function') {
        setError('An error occurred while fetching certifications data.');
      }

      // console.error(error);
    }
  };
  useEffect(() => {
    if (isModalOpen) {
      // Fetch data when the CertificationRead modal is opened
      fetchCertifications();
    }
  }, [isModalOpen, refreshPage]);
  useEffect(() => {
    // console.log('this is the data', certifications);
  }, [isModalOpen]);

  return (
    <div>
      {certifications.length === 0 ? (
        <p>No Certification available</p>
      ) : (
        certifications.map((certification, index) => (
          <CertificationItem key={certification.id} certification={certification} />
        ))
      )}
    </div>
  );
};

const CertificationItem: React.FC<CertificationItemProps> = ({ certification }) => {
  const { id, year, title, organization, url, description } = certification;
  const [deletedMessage, setDeletedMessage] = useState('');
  const [editedMessage, setEditedMessage] = useState('');
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const { refreshPage, setRefreshPage } = useContext(myContext);

  // State to store the edited data
  const [editedCertification, setEditedCertification] = useState(certification);
  const openEditForm = () => {
    setIsEditFormOpen(true);
  };

  // Function to close the Edit form
  const closeEditForm = () => {
    setIsEditFormOpen(false);
  };

  // Function to handle the save action
  const handleSave = async () => {
    // Send a PUT request to update the certification
    try {
      const response = await fetch(
        `https://hng6-r5y3.onrender.com/api/update-certification/6ba7b810-9dad-11d1-80b4-00c04fd430c8/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedCertification), // Send the edited data
        },
      );
      if (response.ok) {
        // console.log(`Certificate with ID ${id} updated.`);
        setRefreshPage(!refreshPage);
        setEditedMessage('Edited successfully');
        setTimeout(() => {
          setEditedMessage('');
        }, 3000);

        closeEditForm(); // Close the Edit form
      } else {
        // console.error(`Error updating certificate with ID ${id}`);
      }
    } catch (error) {
      // console.error('An error occurred while updating the certificate.', error);
    }
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Extract the id from the event

    try {
      const response = await fetch(`https://hng6-r5y3.onrender.com/api/certificates/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Certificate deleted successfully, you can update the UI accordingly
        // console.log(response.json());
        // console.log(`Certificate with ID ${id} deleted.`);
        setDeletedMessage('Deleted successfully');

        setRefreshPage(!refreshPage);
      } else {
        // console.error(`Error deleting certificate with ID ${id}`);
      }
    } catch (error) {
      // console.error('An error occurred while deleting the certificate.', error);
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
            <h2 className="font-bold text-[16px] leading-6 text-white-700  text-left">{organization}</h2>
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
          certification={editedCertification}
          setCertification={setEditedCertification}
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
  certification: Certification;
  setCertification: React.Dispatch<React.SetStateAction<Certification>>;
  onClose: () => void;
}> = ({ isOpen, certification, setCertification, onClose, handleSave }) => {
  const { urlError, setUrlError, setRender, error, render, setError } = useContext(myContext);
  const validateUrl = (url: string) => {
    const urlPattern = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
    return urlPattern.test(url);
  };

  const isValidEdit =
    certification.year &&
    certification.title &&
    certification.organization &&
    certification.url &&
    certification.description &&
    !urlError;
  const missingFields: string[] = [];

  if (!certification.title) {
    missingFields.push('Title');
  }
  if (!certification.organization) {
    missingFields.push('organization');
  }
  if (!certification.url) {
    missingFields.push('URL');
  }
  if (!certification.description) {
    missingFields.push('Description');
  }
  if (!certification.year) {
    missingFields.push('Year');
  }
  if (!certification.url) {
    missingFields.push('URL');
  } else {
    if (!validateUrl(certification.url)) {
      setUrlError('Please enter a valid URL');
    } else {
      setUrlError('');
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Update the certification state
    setCertification((prevCertification: Certification) => ({
      ...prevCertification,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Update the certification state for the select input
    setCertification((prevCertification: Certification) => ({
      ...prevCertification,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isValidEdit && !urlError) {
      setRender(true);
      if (certification.description.length > 30 && certification.description.length < 200) {
        // If description character count is within the desired range, trigger handleSave and onClose
        handleSave();
        onClose();
      } else {
        // Character count is not within the desired range, display an error message
        setError('Description should be between 30 and 200 characters.');
        // console.log(error);
      }
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
            <h1 className="font-bold text-2xl text-white-700">Certifications</h1>
          </div>
          <div onClick={onClose}>
            <CloseSquare className="fill-brand-green-primary text-white-100 h-7 w-7 cursor-pointer" />
          </div>
        </div>
        <form className="flex flex-col gap-6 px-2 sm:px-4" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row w-full gap-[10px]">
            <div className="flex  flex-col gap-2 flex-1">
              <label htmlFor="title" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                Certification Title*
              </label>
              <Input
                type="text"
                id="title"
                name="title"
                placeholder="My best yet"
                className="p-4 border-brand-disabled  text-[16px]  leading-6 w-full    text-white-650   rounded-lg border-[1px]"
                value={certification.title}
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
                value={certification.year}
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
              <label htmlFor="organization" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                organization*
              </label>
              <Input
                type="text"
                id="organization"
                name="organization"
                placeholder="Google"
                className="p-4 border-brand-disabled w-full  text-[16px] leading-[24px]   text-white-650  rounded-lg border-[1px]"
                value={certification.organization}
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
                value={certification.url}
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
              placeholder="Certificate ID & details "
              className="p-4 w-full border-brand-disabled  text-[16px]  leading-[24px]    text-white-650   rounded-lg border-[1px]"
              value={certification.description}
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

export default Certifications;
