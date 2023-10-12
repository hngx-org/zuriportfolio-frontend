'use-client';
import React, { useContext, useState } from 'react';
import Button from '@ui/Button';
import { Add } from 'iconsax-react';
import Portfolio from '../../../../context/PortfolioLandingContext';

const LandingPageFilled: React.FC = () => {
  const { sections, buildPortfolio, deleteSection, editSection, modals, modalStates } = useContext(Portfolio);
  const [draggedSection, setDraggedSection] = useState<string | null>(null);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, sectionId: string) => {
    e.dataTransfer.setData('text/plain', sectionId);
    setDraggedSection(sectionId);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (draggedSection === null) return;
    // Your drag-and-drop logic to reorder sections goes here
  };

  return (
    <>
      {modals?.map((modalItem) => {
        const { id, modal } = modalItem;
        return <React.Fragment key={id}>{modalStates[id] && modal}</React.Fragment>;
      })}

      <div className="w-full flex flex-col justify-start items-start gap-12" onDragOver={(e) => onDragOver(e)}>
        {sections?.map((section) => (
          <React.Fragment key={section.id}>
            <Wrapper
              id={section.id}
              title={section.title}
              edit={() => editSection(section.id)}
              remove={() => deleteSection(section.id)}
              onDragStart={(e, sectionId) => onDragStart(e, sectionId)}
              onDragOver={onDragOver}
            >
              {section.content}
            </Wrapper>
            <Line />
          </React.Fragment>
        ))}
      </div>

      <Button intent="secondary" className="rounded-lg border-[1px] px-8" onClick={() => buildPortfolio()}>
        <Add />
        Add section
      </Button>
    </>
  );
};

export default LandingPageFilled;

type WrapperProps = {
  id: string;
  title: string;
  children?: React.ReactNode;
  edit?: () => void;
  remove?: () => void;
  onDragStart: () => void;
  onDragOver: () => void;
};

export const Wrapper = ({
  id,
  title,
  children,
  edit,
  remove,
  onDragStart,
  onDragOver,
}: WrapperProps & {
  onDragStart: (e: React.DragEvent<HTMLDivElement>, sectionId: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}) => {
  return (
    <div
      className="flex justify-start items-start gap-2 md:gap-4 w-full"
      id={id}
      draggable
      onDragStart={(e) => onDragStart(e, id)}
      onDragOver={(e) => onDragOver(e)}
    >
      {/* This is the icon */}
      <div>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="md:w-[25px] w-[22px] aspect-square mt-1"
        >
          <path
            d="M17.5401 8.81063C19.1748 8.81063 20.5001 7.48539 20.5001 5.85062C20.5001 4.21586 19.1748 2.89062 17.5401 2.89062C15.9053 2.89062 14.5801 4.21586 14.5801 5.85062C14.5801 7.48539 15.9053 8.81063 17.5401 8.81063Z"
            fill="#464646"
          />
          <path
            d="M6.46 8.81063C8.09476 8.81063 9.42 7.48539 9.42 5.85062C9.42 4.21586 8.09476 2.89062 6.46 2.89062C4.82524 2.89062 3.5 4.21586 3.5 5.85062C3.5 7.48539 4.82524 8.81063 6.46 8.81063Z"
            fill="#464646"
          />
          <path
            d="M17.5401 21.1095C19.1748 21.1095 20.5001 19.7842 20.5001 18.1495C20.5001 16.5147 19.1748 15.1895 17.5401 15.1895C15.9053 15.1895 14.5801 16.5147 14.5801 18.1495C14.5801 19.7842 15.9053 21.1095 17.5401 21.1095Z"
            fill="#464646"
          />
          <path
            d="M6.46 21.1095C8.09476 21.1095 9.42 19.7842 9.42 18.1495C9.42 16.5147 8.09476 15.1895 6.46 15.1895C4.82524 15.1895 3.5 16.5147 3.5 18.1495C3.5 19.7842 4.82524 21.1095 6.46 21.1095Z"
            fill="#464646"
          />
        </svg>
      </div>
      <div className="w-full">
        <div className="flex justify-between items-start w-full">
          <div className="flex gap-2 mb-6 md:mb-4">
            <h3 className="text-[21px] font-semibold border-b-4 border-brand-green-primary pb-1 md:pb-2">{title}</h3>
          </div>
          <div className="flex gap-3 md:gap-5">
            <p className="text-blue-100 font-semibold cursor-pointer" onClick={edit}>
              Edit
            </p>
            <p className="text-red-305 font-semibold cursor-pointer" onClick={remove}>
              Delete
            </p>
          </div>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export const Line = () => {
  return <hr className="-mt-2 mb-3 w-full border-gray-200 opacity-10" />;
};
