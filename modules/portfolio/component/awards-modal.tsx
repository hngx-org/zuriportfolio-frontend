import React, { useState } from 'react';
import Button from '@ui/Button';
import { Input } from '@ui/Input';
import Modal from '@ui/Modal';
import { ArrowLeft2, ArrowUp, CloseSquare } from 'iconsax-react';
import Link from 'next/link';

// Interfaces
interface Award {
  date: string;
  title: string;
  team: string;
  url: string;
  description: string;
}

interface AwardItemProps {
  award: Award;
}

const AwardItem: React.FC<AwardItemProps> = ({ award }) => {
  const { date, title, team, url, description } = award;

  return (
    <div className="border-b-[1px] border-b-brand-disabled gap-12 py-3">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col sm:flex-row sm:gap-10 sm:flex-[3] lg:flex-[3] gap-4 justify-between">
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
        <div className="flex sm:flex-[2] lg:flex-[3]">
          <p className="font-bold text-left text-[16px] leading-6 text-white-650">{description}</p>
        </div>
      </div>
      <div className="flex justify-end items-center">
        <Button className="border-none outline-none text-[#5B8DEF] bg-transparent hover:bg-transparent">Edit</Button>{' '}
        <Button className="border-none outline-none text-brand-red-hover bg-transparent hover:bg-transparent">
          Delete
        </Button>
      </div>
    </div>
  );
};

interface AwardListProps {
  awards: Award[];
}

const AwardList: React.FC<AwardListProps> = ({ awards }) => {
  return (
    <div>
      {awards.map((award, index) => (
        <AwardItem key={index} award={award} />
      ))}
    </div>
  );
};

const AwardRead = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const awards: Award[] = [
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
    // Add more award items as needed
  ];

  return (
    <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false}>
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
        <AwardList awards={awards} />
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <p className="font-bold text-[16px] leading-6 text-brand-green-primary">Add new awards</p>
          </div>
          <div className="flex gap-4 justify-start items-center">
            <Button className="py-3 px-5 rounded-lg bg-white-100 border-[#009444] border-[1px] text-[#009444] hover:bg-brand-disabled">
              Cancel
            </Button>{' '}
            <Button className="py-3 px-5 rounded-lg bg-[#009444] border-white-100 border-[1px] text-white-100">
              Save
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const Awards = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [selectedYear, setSelectedYear] = useState('2023');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div>
      {!isModalOpen && (
        <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false}>
          <div className="p-5 sm:p-6 lg:p-8 flex gap-12 flex-col font-manropeB">
            <div className="flex gap-2  border-b-4 border-brand-green-primary py-4 px-0 justify-between items-center">
              <div className="flex items-center gap-6">
                <ArrowLeft2 />
                <h1 className="font-bold text-2xl  text-white-700">Awards</h1>
              </div>
              <div onClick={onClose}>
                <CloseSquare className="fill-brand-green-primary text-white-100 h-7 w-7 cursor-pointer" />
              </div>
            </div>
            <div>
              <form className="flex flex-col gap-6 px-6">
                <div className="flex flex-col sm:flex-row w-full gap-[10px]">
                  <div className="flex  flex-col gap-2 flex-1">
                    <label htmlFor="home" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                      Awards Title*
                    </label>
                    <Input
                      type="text"
                      id="home"
                      name="home"
                      placeHolder="My best yet"
                      className="p-4 border-brand-disabled placeholder:text-[16px] placeholder:leading-6   placeholder:text-white-650 placeholder:font-semibold rounded-lg border-[1px]"
                    />
                  </div>
                  <div className="flex  flex-col gap-[10px] flex-1">
                    <label htmlFor="year" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                      Year
                    </label>

                    <select
                      id="year"
                      name="year"
                      className="p-4 border-brand-disabled rounded-lg border-[1px]"
                      value={selectedYear}
                      onChange={handleYearChange}
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
                    <label htmlFor="home" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                      Organization*
                    </label>
                    <Input
                      type="text"
                      id="home"
                      name="home"
                      placeHolder="Google"
                      className="p-4 border-brand-disabled  placeholder:text-[16px] placeholder:leading-[24px]   placeholder:text-white-650 placeholder:font-semibold rounded-lg border-[1px]"
                    />
                  </div>
                  <div className="flex  flex-col gap-[10px] flex-1">
                    <label htmlFor="home" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                      Url
                    </label>
                    <Input
                      type="text"
                      id="home"
                      name="home"
                      placeHolder="Type link"
                      className="p-4 border-brand-disabled placeholder:text-[16px] placeholder:leading-[24px]   placeholder:text-white-650 placeholder:font-semibold rounded-lg border-[1px]"
                    />
                  </div>
                </div>
                <div className="flex  flex-col gap-[10px]">
                  <label htmlFor="home" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                    Description
                  </label>
                  <Input
                    placeHolder=""
                    type="text"
                    name="home"
                    className="p-4 w-full border-brand-disabled placeholder:text-[16px] placeholder:leading-[24px]   placeholder:text-white-650 placeholder:font-semibold rounded-lg border-[1px]"
                  />
                </div>
                <div className="flex gap-4 justify-end items-center">
                  <Button className="py-3 px-5 rounded-lg bg-white-100 border-[#009444] border-[1px] text-[#009444] hover:bg-brand-disabled">
                    Cancel
                  </Button>{' '}
                  <Button
                    onClick={openModal}
                    className="py-3 px-5 rounded-lg bg-[#009444] border-white-100 border-[1px] text-white-100"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      )}
      {isModalOpen && <AwardRead isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  );
};

export default Awards;
