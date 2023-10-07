import Button from '@ui/Button';
import Modal from '@ui/Modal';
import { ArrowLeft2, ArrowUp, CloseSquare } from 'iconsax-react';
import Link from 'next/link';
import React from 'react';

// Define the Award interface
interface Award {
  date: string;
  title: string;
  team: string;
  url: string;
  description: string;
}

// Define the AwardItem component
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
            <p className="font-semibold text-[14px] leading-5 text-brand-green-hover border-brand-green-primary ">
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

// Define the AwardList component
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

// Define the AwardRead component
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

export default AwardRead;
