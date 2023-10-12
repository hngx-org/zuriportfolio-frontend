import React, { useState, useEffect } from 'react';
import Button from '@ui/Button';
import { Input } from '@ui/Input';
import { ArrowLeft2, ArrowUp, CloseSquare } from 'iconsax-react';
import Link from 'next/link';
import Modal from '@ui/Modal';

// Interfaces
interface Certification {
  date: string;
  title: string;
  team: string;
  url: string;
  description: string;
}

interface CertificationItemProps {
  certification: Certification;
}

const CertificationItem: React.FC<CertificationItemProps> = ({ certification }) => {
  const { date, title, team, url, description } = certification;

  return (
    <div className="border-b-[1px] border-b-brand-disabled gap-12 py-3">
      <div className="flex flex-col sm:flex-row gap-6 w-full justify-between">
        <div className="flex flex-col sm:flex-row sm:gap-10 sm:w-[60%] lg:w-[30%] gap-4 justify-between">
          <div>
            <p className="font-semibold text-[16px] leading-6  text-gray-300">{date}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-[22px] leading-7 text-white-700 ">{title}</h1>
            <h2 className="font-bold text-[16px] leading-6 text-white-700 ">{team}</h2>
            <p className="font-semibold text-[14px] leading-5 text-brand-green-hover border-brand-green-primary">
              <Link href={url} target="_blank" className="flex items-center">
                {url} <ArrowUp className="w-4 h-4 whitespace-nowrap rotate-45" />
              </Link>
            </p>
          </div>
        </div>
        <div className="flex sm:w-[35%] lg:w-[55%]">
          <p className="font-bold text-left text-[16px] leading-6 text-white-650">{description}</p>
        </div>
      </div>
      <div className="flex justify-end items-center">
        <Button className="border-none outline-none text-[#5B8DEF] bg-transparent hover:bg-zinc-100 focus:bg-zinc-200 active:bg-zinc-100 duration-300">
          Edit
        </Button>{' '}
        <Button className="border-none outline-none text-brand-red-hover bg-transparent hover:bg-zinc-100 focus:bg-zinc-200 active:bg-zinc-100 duration-300">
          Delete
        </Button>
      </div>
    </div>
  );
};

interface CertificationListProps {
  certifications: Certification[];
}

const CertificationList: React.FC<CertificationListProps> = ({ certifications }) => {
  return (
    <div>
      {certifications.map((certification, index) => (
        <CertificationItem key={index} certification={certification} />
      ))}
    </div>
  );
};

const CertificationRead = ({
  isOpen,
  onClose,
  certifications,
}: {
  isOpen: boolean;
  onClose: () => void;
  certifications: Certification[];
}) => {
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
        <CertificationList certifications={certifications} />
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <p onClick={onClose} className="font-bold cursor-pointer text-[16px] leading-6 text-brand-green-primary">
              Add new certifications
            </p>
          </div>
          <div className="flex gap-4 justify-start items-center">
            <Button
              onClick={onClose}
              className="py-3 px-5 rounded-lg bg-white-100 border-[#009444] border-[1px] text-[#009444] hover:bg-zinc-100"
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

const Certifications = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    date: '',
    team: '',
    url: '',
    description: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [certifications, setCertifications] = useState<Certification[]>([
    {
      date: 'August 2023',
      title: 'HNG Internship',
      team: 'Zuri Team',
      url: 'www.zuriinternship.com',
      description:
        'Implemented A/B testing for website redesign, leading to a 40% improvement in user retention and a 25% increase in conversion rates, ultimately resulting in a 20% boost in overall revenue.',
    },
    {
      date: 'May 2022',
      title: 'Design guru',
      team: 'Google',
      url: 'www.googledesign.com',
      description:
        'Implemented A/B testing for website redesign, leading to a 40% improvement in user retention and a 25% increase in conversion rates, ultimately resulting in a 20% boost in overall revenue.',
    },
  ]);
  const openModal = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission
    const newCertification = {
      date: formData.date,
      title: formData.title,
      team: formData.team,
      url: formData.url,
      description: formData.description,
    };
    setCertifications((prevCertifications) => [...prevCertifications, newCertification]);
    console.log('Updated Certifications Array:', certifications);
    setIsModalOpen(true);
    setFormData({
      title: '',
      year: '', // This field is initially empty
      date: '', // Initialize the date field with an empty string
      team: '',
      url: '',
      description: '',
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Update the state based on the input name
    if (name === 'year') {
      setFormData((prevData) => ({
        ...prevData,
        year: value, // Update the year field
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    // You can perform any additional actions when the component mounts here
  }, []);

  return (
    <div>
      {!isModalOpen && (
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
                    onChange={(e) => {
                      const selectedYear = e.target.value;
                      const selectedDate = `January ${selectedYear}`;

                      // Update both 'year' and 'date' fields in formData
                      setFormData((prevData) => ({
                        ...prevData,
                        year: selectedYear,
                        date: selectedDate,
                      }));
                    }}
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
                  <label htmlFor="team" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                    Organization*
                  </label>
                  <Input
                    type="text"
                    id="team"
                    name="team"
                    placeholder="Google"
                    className="p-4 border-brand-disabled w-full  text-[16px] leading-[24px]   text-white-650  rounded-lg border-[1px]"
                    value={formData.team}
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
              <div className="flex gap-4 justify-end items-center">
                <Button className="py-3 px-5 rounded-lg bg-white-100 border-[#009444] border-[1px] text-[#009444] hover:bg-zinc-100">
                  Cancel
                </Button>{' '}
                <Button
                  type="submit"
                  className="py-3 px-5 rounded-lg bg-[#009444] border-white-100 border-[1px] text-white-100"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}
      {isModalOpen && <CertificationRead isOpen={isModalOpen} onClose={closeModal} certifications={certifications} />}
    </div>
  );
};

export default Certifications;
