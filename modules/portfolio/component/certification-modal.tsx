import React, { useState, useEffect, createContext, useContext } from 'react';
import Button from '@ui/Button';
import { Input } from '@ui/Input';
import { ArrowLeft2, ArrowUp, CloseSquare } from 'iconsax-react';
import Link from 'next/link';
import Modal from '@ui/Modal';
import Portfolio from '../../../context/PortfolioLandingContext';
import { Certification, CertificationListProps, CertificationItemProps } from '../../../@types';
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

type certificationModalProps = {
  onCloseModal: () => void;
  onSaveModal: () => void;
  isOpen: boolean;
  userId?: string;
};

const myContext = createContext(initialContextValue);

const Certifications = ({ isOpen, onCloseModal, onSaveModal }: certificationModalProps) => {
  const { userId } = useContext(Portfolio);
  const [formData, setFormData] = useState({
    title: '',
    year: '',

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
  const [closeAllModal, setCloseAllModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = async (e: React.FormEvent) => {
    // console.log('openModal function called');
    e.preventDefault(); // Prevent the default form submission
    const newCertification = {
      year: formData.year,

      title: formData.title,
      organization: formData.organization,
      url: formData.url,
      description: formData.description,
    };
    setCertificationCounter(certificationCounter + 1);

    try {
      setIsLoading(true);
      const response = await fetch(`https://hng6-r5y3.onrender.com/api/add-certificate/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCertification),
      });
      console.log('0.this is the new certi', newCertification);
      console.log('1. Response Status:', response.status);
      console.log('2. Response Data:', await response.json());
      setIsLoading(false);
      if (response.ok) {
        setCreateCertificate('Certificate created successfully');
        setTimeout(() => {
          setCreateCertificate('');
        }, 2000);
        setError('');
        console.log('3. these are the datas sent', formData);

        setTimeout(() => {
          setFormData({
            title: '',
            year: '',
            organization: '',
            url: '',
            description: '',
          });
        }, 4000);

        // Delay setting IsModalOpen to true by a certain number of milliseconds
        setTimeout(() => {
          setIsModalOpen(false);
        }, 2000); // Adjust the delay time (1000 milliseconds = 1 second) as needed
      } else {
        setError('Error saving the certification.');
      }
    } catch (error) {
      setError('An error occurred while saving the certification.');
      // console.error(error);
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
        {' '}
        {isModalOpen && (
          <Modal closeOnOverlayClick isOpen={isModalOpen} closeModal={closeModal} isCloseIconPresent={false} size="xl">
            <div className="p-5 sm:p-6 lg:p-8 flex gap-6 flex-col font-manropeL">
              <div className="flex gap-6  border-b-4 border-brand-green-hover py-4 px-0 justify-between items-center">
                <div
                  className="flex items-center gap-6"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  <ArrowLeft2 />
                  <h1 className="font-bold text-2xl text-white-700">Certifications</h1>
                </div>
                <div onClick={onCloseModal}>
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
                    <label htmlFor="organization" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                      Organization*
                    </label>
                    <Input
                      type="text"
                      maxLength={21}
                      id="organization"
                      name="organization"
                      placeholder="Google"
                      className="p-4 border-brand-disabled w-full  text-[16px] leading-[24px]   text-gray-900 rounded-lg border-[1px]"
                      value={formData.organization}
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
                      required
                      placeholder="Type link"
                      className="p-4 border-brand-disabled  text-[16px] w-full  leading-[24px]    text-gray-900   rounded-lg border-[1px]"
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
                    minLength={30}
                    maxLength={200}
                    placeholder="Certificate ID & details "
                    className="p-4 w-full border-brand-disabled  text-[16px]  leading-[24px]    text-gray-900  rounded-lg border-[1px]"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex sm:justify-between sm:text-left gap-2 sm:gap-0 justify-center text-center  items-center sm:flex-row flex-col">
                  <div>
                    <div>
                      <p className="text-green-200 text-sm">{createCertificate}</p>
                    </div>
                    <div>
                      {isLoading ? (
                        <Loader />
                      ) : (
                        <div>
                          <pre className="text-red-205 font-manropeL">{error}</pre>
                        </div>
                      )}
                    </div>
                  </div>
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
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </Modal>
        )}
        {!isModalOpen && <CertificationRead isOpen={!isModalOpen} onClose={onCloseModal} />}
      </div>
    </myContext.Provider>
  );
};
const CertificationRead = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { setCloseAllModal, setIsModalOpen } = useContext(myContext);
  return (
    <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="xl">
      <div className="p-5 sm:p-6 lg:p-8 flex gap-6 flex-col font-manropeL">
        <div className="flex gap-6  border-b-4 border-brand-green-hover py-4 px-0 justify-between items-center">
          <div onClick={onClose} className="flex items-center gap-6">
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
            <p
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="font-bold cursor-pointer text-[16px] leading-6 text-brand-green-primary"
            >
              Add new certifications
            </p>
          </div>
          <div className="flex gap-4 justify-start items-center">
            <Button onClick={onClose} intent={'secondary'} className="w-full rounded-md sm:w-[6rem]" size={'md'}>
              Cancel
            </Button>{' '}
            <Button
              onClick={() => {
                setCloseAllModal(true);
                setIsModalOpen(false);
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
const CertificationList: React.FC<CertificationListProps> = () => {
  const { userId } = useContext(Portfolio);
  const { refreshPage, setError, isModalOpen, isLoading, setIsLoading } = useContext(myContext);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  // console.log(certifications);

  const fetchCertifications = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://hng6-r5y3.onrender.com/api/certificates/${userId}`);
      console.log('4. this is the response', response);

      setIsLoading(false);
      const res = await response.json();
      // console.log('Response Data:', await response.json());

      console.log('5. this is the data for it', res);

      if (response.ok) {
        // console.log('Response Status:', response.ok);
        console.log('6. this is the res.data', res.data);
        // console.log('Fetched certifications data:', data);
        setCertifications(res.data);
      } else {
        setError('Error fetching certifications data.');
      }
    } catch (error) {
      setError('An error occurred while fetching certifications data.');

      // console.error(error);
    }
  };
  useEffect(() => {
    if (!isModalOpen) {
      // Fetch data when the CertificationRead modal is opened
      fetchCertifications();
    }
  }, [isModalOpen, refreshPage]);
  useEffect(() => {
    // console.log('this is the data', certifications);
  }, [!isModalOpen]);
  // console.log('these are the certificates', certifications);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {certifications.length > 0 ? (
            certifications.map((certification, index) => (
              <CertificationItem key={certification.id} certification={certification} />
            ))
          ) : (
            <p>There are no certificates available.</p>
          )}
        </div>
      )}
    </div>
  );
};

const CertificationItem: React.FC<CertificationItemProps> = ({ certification }) => {
  const { userId } = useContext(Portfolio);
  const { id, year, title, organization, url, description } = certification;
  const [deletedMessage, setDeletedMessage] = useState('');
  const [editedMessage, setEditedMessage] = useState('');
  const [editMessageError, setEditMessageError] = useState('');
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const { refreshPage, setRefreshPage, isLoading, setIsLoading } = useContext(myContext);
  // console.log('this are the certifications', certification);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const initialEditedCertification = {
    id: id,
    year: year,
    title: title,
    organization: organization,
    url: url,
    description: description,
    sectionId: 1,
  };
  // State to store the edited data
  const [editedCertification, setEditedCertification] = useState(initialEditedCertification);
  // console.log('This is the edit certi', editedCertification);
  const openEditForm = () => {
    setIsEditFormOpen(true);
  };
  const extractHostname = (url: string) => {
    const { hostname } = new URL(url);
    return hostname;
  };

  // Function to close the Edit form
  const closeEditForm = () => {
    setIsEditFormOpen(false);
  };

  // Function to handle the save action
  const handleSave = async () => {
    // Send a PUT request to update the certification

    try {
      setEditLoading(true);
      const response = await fetch(`https://hng6-r5y3.onrender.com/api/update-certification/${userId}/${id}/1`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedCertification), // Send the edited data
      });
      setEditLoading(false);
      // console.log('this is the id ', id);
      // console.log(userId);
      // console.log('Response Status:', response.ok);
      // console.log('Response Data:', await response.json());
      if (response.ok) {
        setRefreshPage(!refreshPage);
        setEditedMessage('Edited successfully');
        setTimeout(() => {
          setEditedMessage('');
        }, 3000);

        closeEditForm(); // Close the Edit form
      } else {
        // console.error(`Error updating certificate with ID ${id}`);
        setEditMessageError('Error updating certificate');
      }
    } catch (error) {
      console.error('An error occurred while updating the certificate.', error);
    }
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Extract the id from the event

    try {
      setDeleteLoading(true);
      const response = await fetch(`https://hng6-r5y3.onrender.com/api/certificates/${id}`, {
        method: 'DELETE',
      });
      setDeleteLoading(false);
      if (response.ok) {
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
        <div className="flex flex-col sm:flex-row sm:gap-10 sm:w-[60%] lg:w-[40%] gap-6  ">
          <div>
            <p className="font-semibold text-[16px] leading-6  text-gray-300">{year}</p>
          </div>
          <div className="flex flex-col gap-2 overflow-hidden  text-ellipsis whitespace-nowrap ">
            <h1 className="font-semibold text-[22px] leading-7 text-white-700  text-left first-letter: overflow-hidden  text-ellipsis whitespace-nowrap ">
              {title}
            </h1>
            <h2 className="font-bold text-[16px] leading-6 text-white-700  text-left overflow-hidden  text-ellipsis whitespace-nowrap  ">
              {organization}
            </h2>
            <p className="font-semibold text-[14px] leading-5 text-brand-green-hover border-brand-green-primary text-left">
              <Link href={url} target="_blank" className="flex items-center ">
                <span className="whitespace-nowrap overflow-hidden text-ellipsis"> {extractHostname(url)}</span>{' '}
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
          <div>{deleteLoading ? <Loader /> : <p className="text-red-205 text-sm">{deletedMessage}</p>}</div>{' '}
          <div>{editLoading ? <Loader /> : <p className="text-green-200 text-sm">{editedMessage}</p>}</div>
          <p className="text-red-205 text-sm">{editMessageError}</p>
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
  const { error } = useContext(myContext);

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
    handleSave();
    onClose();
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
                maxLength={14}
                className="p-4 border-brand-disabled  text-[16px]  leading-6 w-full    text-gray-900   rounded-lg border-[1px]"
                value={certification.title}
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
                value={certification.year}
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
              <label htmlFor="organization" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                organization*
              </label>
              <Input
                type="text"
                id="organization"
                name="organization"
                placeholder="Google"
                maxLength={21}
                className="p-4 border-brand-disabled w-full  text-[16px] leading-[24px]   text-gray-900  rounded-lg border-[1px]"
                value={certification.organization}
                onChange={handleInputChange}
                required
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
                className="p-4 border-brand-disabled  text-[16px] w-full  leading-[24px]    text-gray-900   rounded-lg border-[1px]"
                value={certification.url}
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
              minLength={30}
              maxLength={200}
              placeholder="Certificate ID & details "
              className="p-4 w-full border-brand-disabled  text-[16px]  leading-[24px]   text-gray-900  rounded-lg border-[1px]"
              value={certification.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex sm:justify-between sm:text-left gap-2 sm:gap-0 justify-center text-center  items-center sm:flex-row flex-col">
            <div>
              <pre className="text-red-205 font-manropeL">{error}</pre>
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

export default Certifications;
