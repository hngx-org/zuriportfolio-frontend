'use-client';
import Image from 'next/image';
import React, { useState } from 'react';
import useDisclosure from '../../../hooks/useDisclosure';
import Modal from '@ui/Modal';
import img from '../../../public/assets/images/image-zuri-9.png';

type WrapperProps = {
  id: string;
  title: string;
  children?: React.ReactNode;
  edit?: () => void;
  remove?: () => void;
};

const Wrapper = ({ id, title, children, edit, remove }: WrapperProps) => {
  return (
    <div className="flex justify-start items-start gap-2 md:gap-4 w-full" id={id}>
      <div>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="md:w-[30px] w-[22px] aspect-square mt-1"
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
        {/* <Image width={0} height={0} src={menu} alt=""  /> */}
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

type AboutProps = {
  text: string;
};

const About = ({ text }: AboutProps) => {
  return <p className="text-sm text-gray-300 font-semibold">{text}</p>;
};

type WorkExperienceProps = {
  startDate?: string;
  endDate?: string;
  company?: string;
  role?: string;
  description?: string;
};

const WorkExperience = ({ startDate, endDate, company, role, description }: WorkExperienceProps) => {
  return (
    <div className="flex md:flex-row flex-col justify-start items-start gap-x-28 md:gap-y-0 gap-y-2">
      <p className="min-w-max text-gray-300 font-semibold text-base">
        <span>{startDate}</span> - <span>{endDate}</span>
      </p>
      <div className="flex flex-col min-w-max  md:gap-1">
        <h3 className="text-lg font-semibold text-gray-200">{company}</h3>
        <p className="text-base text-brand-green-primary">{role}</p>
      </div>
      <p className="font-semibold text-sm text-gray-400">{description}</p>
    </div>
  );
};

type ProjectProps = {
  title?: string;
  description?: string;
  tags?: Array<{ id: number; name: string }>;
  link?: string;
  img?: any;
};

const Project = ({ title, description, img, tags, link }: ProjectProps) => {
  return (
    <div className="flex md:flex-row flex-col gap-4 md:gap-10">
      <Image width={0} height={0} src={img} alt="" className="w-[290px] aspect-square rounded-xl order-2 md:order-1" />
      <div className="order-1 md:order-2 flex flex-col gap-2">
        <h3 className="font-semibold text-xl tracking-tight">{title}</h3>
        <p className="font-semibold text-sm text-gray-400">{description}</p>
        <div className="order-2 md:order-1 flex my-2">
          {tags?.map((tag) => (
            <span className="grid place-content-center border-[1px] py-1 p-2 border-gray-300 rounded-3xl" key={tag.id}>
              <p className="text-sm text-gray-400"> {tag.name}</p>
            </span>
          ))}
        </div>
        <a className="text-blue-100 font-semibold" href={link}>
          View project
        </a>
      </div>
    </div>
  );
};

const Education = ({ startDate, endDate, company, role, description }: WorkExperienceProps) => {
  return (
    <div className="flex md:flex-row flex-col justify-start items-start gap-x-28 md:gap-y-0 gap-y-2">
      <p className="min-w-max text-gray-300 font-semibold text-lg">
        {startDate} - {endDate}
      </p>
      <div className="flex flex-col min-w-max gap-2">
        <h3 className="text-lg font-semibold text-gray-200">{company}</h3>
        <p className="text-base text-gray-300">{role}</p>
      </div>
      <p className="font-semibold text-sm text-gray-400">{description}</p>
    </div>
  );
};

type SkillProps = {
  skills?: Array<{ id: number; name: string }>;
};

const Skill = ({ skills }: SkillProps) => {
  return (
    <div className="flex md:flex-row flex-col gap-5 justify-start items-start">
      {skills?.map((skill) => (
        <span
          className="grid place-content-center border-[1px] md:py-1 md:p-2 p-4 border-gray-300 md:rounded-3xl rounded-lg border-opacity-50"
          key={skill.id}
        >
          <p className="text-sm text-gray-400 font-semibold opacity-70"> {skill.name}</p>
        </span>
      ))}
    </div>
  );
};

const Shop = () => {
  const shops = [
    {
      id: 1,
      image: img,
    },
  ];
  return (
    <div className="flex flex-col gap-5 min-w-full">
      {shops.map((shop) => (
        <div className="" key={shop.id}>
          <Image width={0} height={0} src={shop.image} alt="" className="w-[290px] aspect-square rounded-xl" />
        </div>
        <div className="flex flex-row gap-16 items-start mb-2 ml-8">
          <Image
            src="/assets/images/landingPageFilled/imageplace.png"
            id="ImagePlaceholder"
            width={200}
            height={250}
            alt="cover"
            className=""
          />
          <div className="flex flex-col justify-between gap-6 w-[848px] items-start">
            <div className="flex flex-col gap-3 items-start">
              <div className="text-xl font-['Manrope'] font-semibold leading-[28px] text-[#2e3130]">
                Byte financiap LandingPageFilled
              </div>
              <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] w-full">
                Implemented A/B testing for website redesign, leading to a 40% improvement in user retention and a 25%
                increase in conversion rates, ultimately resulting in a 20% boost in overall revenue.
              </div>
            </div>
            <div className="flex flex-row justify-between mr-64 items-start">
              <div className="border-solid border-[#8d9290] flex flex-col w-16 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">UI/UX</div>
              </div>
              <div className="border-solid border-[#8d9290] flex flex-col w-16 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">Figma</div>
              </div>
              <div className="border-solid border-[#8d9290] flex flex-col w-20 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">Sketch</div>
              </div>
              <div className="border-solid border-[#8d9290] flex flex-col w-16 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">Miro</div>
              </div>
              <div className="border-solid border-[#8d9290] flex flex-col w-24 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">Adobe XD</div>
              </div>
              <div className="border-solid border-[#8d9290] flex flex-col w-24 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">Adobe XD</div>
              </div>
              <div className="border-solid border-[#8d9290] flex flex-col w-16 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">Miro</div>
              </div>
            </div>
            <div className="flex flex-row items-start">
              <div className="text-right font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#5b8def]">
                <a href="#">Link to project</a>
              </div>
              <Image
                src="/assets/images/landingPageFilled/arrow.svg"
                id="Vuesaxlineararrowup"
                width={0}
                height={0}
                alt="cover"
                className="w-8 shrink-0"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-16 items-start mb-4 mx-8">
          <Image
            src="/assets/images/landingPageFilled/imageplace.png"
            id="ImagePlaceholder1"
            width={200}
            height={250}
            alt="cover"
            className=""
          />
          <div className="flex flex-col justify-between gap-6 w-[816px] items-start">
            <div className="flex flex-col gap-3 items-start">
              <div className="text-xl font-['Manrope'] font-semibold leading-[28px] text-[#2e3130]">
                Byte financiap LandingPageFilled
              </div>
              <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] w-full">
                Implemented A/B testing for website redesign, leading to a 40% improvement in user retention and a 25%
                increase in conversion rates, ultimately resulting in a 20% boost in overall revenue.
              </div>
            </div>
            <div className="flex flex-row justify-between mr-56 items-start">
              <div className="border-solid border-[#8d9290] flex flex-col w-16 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">UI/UX</div>
              </div>
              <div className="border-solid border-[#8d9290] flex flex-col w-16 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">Figma</div>
              </div>
              <div className="border-solid border-[#8d9290] flex flex-col w-20 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">Sketch</div>
              </div>
              <div className="border-solid border-[#8d9290] flex flex-col w-16 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">Miro</div>
              </div>
              <div className="border-solid border-[#8d9290] flex flex-col w-24 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">Adobe XD</div>
              </div>
              <div className="border-solid border-[#8d9290] flex flex-col w-24 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">Adobe XD</div>
              </div>
              <div className="border-solid border-[#8d9290] flex flex-col w-16 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">Miro</div>
              </div>
            </div>
            <div className="flex flex-row items-start">
              <div className="text-right font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#5b8def]">
                <a href="#">Link to project</a>
              </div>
              <Image
                src="/assets/images/landingPageFilled/arrow.svg"
                id="Vuesaxlineararrowup1"
                width={0}
                height={0}
                alt="cover"
                className="w-8 shrink-0"
              />
            </div>
          </div>
        </div>
        <div
          id="Divider2"
          className="border-solid border-[#e1e3e2] mb-4 h-px shrink-0 border-t border-b-0 border-x-0"
        />
        <div className="bg-white flex flex-row gap-2 items-end mb-4 mr-px rounded-lg">
          <Image
            src="/assets/images/landingPageFilled/menu.svg"
            id="Vuesaxboldmenu3"
            width={0}
            height={0}
            alt="cover"
            className="mt-5 w-6 shrink-0"
          />
          <div className="flex flex-col mr-[112px] gap-16 h-[208px] items-start">
            <div className="flex flex-col gap-6 w-[145px]">
              <div
                id="Experience6"
                className="border-solid border-[#009254] flex flex-col justify-center h-16 shrink-0 items-start ml-1 mr-5 border-t-0 border-b-4 border-x-0"
              >
                <div className="text-2xl font-['Manrope'] font-bold leading-[32px] text-[#2e3130]">Education</div>
              </div>
              <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#8d9290]">
                May 2021 - Present
              </div>
            </div>
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#8d9290]">
              May 2021 - Present
            </div>
          </div>
          <div className="flex flex-col gap-10 items-start mb-4 mr-20">
            <div className="flex flex-col gap-2 w-64 items-start">
              <div className="text-xl font-['Manrope'] font-semibold leading-[28px] text-[#2e3130]">
                M.Sc Interaction design
              </div>
              <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#737876]">
                University of Ghana
              </div>
            </div>
            <div className="flex flex-col gap-2 w-64 items-start">
              <div className="text-xl font-['Manrope'] font-semibold leading-[28px] text-[#2e3130]">
                M.Sc Interaction design
              </div>
              <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#737876]">
                University of Ghana
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-5 gap-6 w-1/2 items-end">
            <div className="flex flex-row mb-5 gap-6 items-start">
              <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#5b8def]">
                <a href="#" onClick={onOpen}>
                  Edit
                </a>
              </div>
              <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#ff5c5c]">
                <a href="#">Delete</a>
              </div>
            </div>
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] w-full">
              Implemented A/B testing for website redesign, leading to a 40% improvement in user retention and a 25%
              increase in conversion rates, ultimately resulting in a 20% boost in overall revenue.
            </div>
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] w-full">
              Implemented A/B testing for website redesign, leading to a 40% improvement in user retention and a 25%
              increase in conversion rates, ultimately resulting in a 20% boost in overall revenue.
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Line = () => {
  return <hr className="-mt-2 mb-3 w-full border-gray-200 opacity-10" />;
};

const LandingPageFilled: React.FC = () => {
  const [sections, setSections] = useState<Array<any>>([]);
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const btns = [
    { id: 1, title: 'About' },
    { id: 2, title: 'Work Experience' },
    { id: 3, title: 'Project' },
    { id: 4, title: 'Education' },
    { id: 5, title: 'Skill' },
    { id: 6, title: 'Shop' },
    { id: 7, title: 'Contact' },
  ];

  const addSection = (clickedButtonTitle: string) => {
    const matchingPlaceHolder = placeHolders.find((placeHolder) => {
      return placeHolder.title === clickedButtonTitle;
    });

    if (matchingPlaceHolder) {
      if (!sections.some((section) => section.title === clickedButtonTitle)) {
        setSections([...sections, matchingPlaceHolder]);
      }
    }
  };

  const deleteSection = (titleToDelete: string) => {
    const updatedSections = sections.filter((section) => section.id !== titleToDelete);
    setSections(updatedSections);
  };

  const edit = (sectionTodelete: any) => {
    onOpen();
  };

  return (
    <>
      {isOpen && (
        <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="xl"></Modal>
      )}

      <div className="mx-auto w-[min(90vw,1200px)] mt-[200px]">
        <div className="w-full flex flex-wrap gap-5 mb-5">
          {btns.map((btn) => (
            <button
              onClick={() => addSection(btn.title)}
              className="border-[1px] border-gray-100 py-1 px-3"
              key={btn.id}
            >
              {btn.title}
            </button>
          ))}
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-12">
          {sections?.map((section) => (
            <React.Fragment key={section.id}>
              <Wrapper
                id={section.id}
                title={section.title}
                edit={() => edit(section.id)}
                remove={() => deleteSection(section.id)}
              >
                {section.content}
              </Wrapper>
              <Line />
            </React.Fragment>
          ))}
        </div>
        <div className="flex flex-row justify-between w-1/2 items-start mb-3 ml-8">
          <div
            id="Tag"
            className="border-solid border-[#e1e3e2] bg-white flex flex-col justify-center h-12 items-center border rounded-[24px]"
          >
            <div
              id="Text1"
              className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] mx-4"
            >
              Graphic Design
            </div>
          </div>
          <div
            id="Tag1"
            className="border-solid border-[#e1e3e2] bg-white flex flex-col justify-center h-12 items-center border rounded-[24px]"
          >
            <div
              id="Text2"
              className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] mx-4"
            >
              UI/UX Design
            </div>
          </div>
          <div
            id="Tag2"
            className="border-solid border-[#e1e3e2] bg-white flex flex-col justify-center h-12 items-center border rounded-[24px]"
          >
            <div
              id="Text3"
              className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] mx-4"
            >
              Visual Branding
            </div>
          </div>
          <div
            id="Tag3"
            className="border-solid border-[#e1e3e2] bg-white flex flex-col justify-center h-12 items-center border rounded-[24px]"
          >
            <div
              id="Text4"
              className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] mx-4"
            >
              Illustrations
            </div>
          </div>
        </div>
        <div
          id="Divider4"
          className="border-solid border-[#e1e3e2] mb-4 h-px shrink-0 border-t border-b-0 border-x-0"
        />
        <div className="flex flex-row justify-between mb-2 items-start">
          <div className="flex flex-row gap-3 w-24 shrink-0 items-start">
            <Image
              src="/assets/images/landingPageFilled/menu.svg"
              id="Vuesaxboldmenu5"
              width={0}
              height={0}
              alt="cover"
              className="w-6 shrink-0"
            />
            <div
              id="Experience10"
              className="border-solid border-[#009254] flex flex-col justify-center w-16 shrink-0 h-16 items-start border-t-0 border-b-4 border-x-0"
            >
              <div className="text-2xl font-['Manrope'] font-bold leading-[32px] text-[#2e3130]">Shop</div>
            </div>
          </div>
          <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#ff5c5c] ml-[960px]">
            <a href="#">Delete</a>
          </div>
        </div>
        <Image
          src="/assets/images/landingPageFilled/book.jpg"
          id="ImagePlaceholder2"
          width={200}
          height={250}
          alt="cover"
          className="mb-2 ml-8"
        />
        <div className="flex flex-row gap-px items-start mb-4 ml-8">
          <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#5b8def]">
            <a href="#">Go to shop</a>
          </div>
          <Image
            src="/assets/images/landingPageFilled/arrow.svg"
            id="Vuesaxlineararrowup2"
            width={0}
            height={0}
            alt="cover"
            className="w-8 shrink-0"
          />
        </div>
        <div
          id="Divider5"
          className="border-solid border-[#e1e3e2] mb-4 h-px shrink-0 border-t border-b-0 border-x-0"
        />
        <div className="flex flex-row justify-between mb-2 items-start">
          <div className="flex flex-row gap-3 items-start">
            <Image
              src="/assets/images/landingPageFilled/menu.svg"
              id="Vuesaxboldmenu6"
              width={0}
              height={0}
              alt="cover"
              className="w-6 shrink-0"
            />
            <div
              id="Experience12"
              className="border-solid border-[#009254] flex flex-col justify-center w-24 shrink-0 h-16 items-start border-t-0 border-b-4 border-x-0"
            >
              <div className="text-2xl font-['Manrope'] font-bold leading-[32px] text-[#2e3130]">Interest</div>
            </div>
          </div>
          <div className="flex flex-row gap-6 items-start ml-[920px]">
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#5b8def]">
              <a href="#">Edit</a>
            </div>
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#ff5c5c]">
              <a>Delete</a>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-start mb-3 ml-8 mr-[366px]">
          <div
            id="Tag4"
            className="border-solid border-[#e1e3e2] bg-white flex flex-col justify-center h-12 items-center border rounded-[24px]"
          >
            <div
              id="Text5"
              className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] mx-10"
            >
              Dancing
            </div>
          </div>
          <div
            id="Tag5"
            className="border-solid border-[#e1e3e2] bg-white flex flex-col justify-center h-12 items-center border rounded-[24px]"
          >
            <div
              id="Text6"
              className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] mx-12"
            >
              Singing
            </div>
          </div>
          <div
            id="Tag6"
            className="border-solid border-[#e1e3e2] bg-white flex flex-col justify-center h-12 items-center border rounded-[24px]"
          >
            <div
              id="Text7"
              className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] mx-10"
            >
              Bowling
            </div>
          </div>
          <div
            id="Tag7"
            className="border-solid border-[#e1e3e2] bg-white flex flex-col justify-center h-12 items-center border rounded-[24px]"
          >
            <div
              id="Text8"
              className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] mx-12"
            >
              Hiking
            </div>
          </div>
          <div
            id="Tag8"
            className="border-solid border-[#e1e3e2] bg-white flex flex-col justify-center h-12 items-center border rounded-[24px]"
          >
            <div
              id="Text9"
              className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] mx-8"
            >
              Go carting
            </div>
          </div>
        </div>
        <div
          id="Divider6"
          className="border-solid border-[#e1e3e2] mb-4 h-px shrink-0 border-t border-b-0 border-x-0"
        />
        <div className="flex flex-row justify-between mb-2 items-start">
          <div className="flex flex-row gap-3 items-start">
            <Image
              src="/assets/images/landingPageFilled/menu.svg"
              id="Vuesaxboldmenu7"
              width={0}
              height={0}
              alt="cover"
              className="w-6 shrink-0"
            />
            <div
              id="Experience14"
              className="border-solid border-[#009254] flex flex-col justify-center w-24 shrink-0 h-16 items-start border-t-0 border-b-4 border-x-0"
            >
              <div className="text-2xl font-['Manrope'] font-bold leading-[32px] text-[#2e3130]">Contact</div>
            </div>
          </div>
          <div className="flex flex-row gap-6 items-start ml-[920px]">
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#5b8def]">
              <a href="#">Edit</a>
            </div>
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#ff5c5c]">
              <a>Delete</a>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between ml-8 gap-24 items-start">
          <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876]">Email</div>
          <div className="flex flex-row w-[208px] shrink-0 items-start">
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#5b8def]">
              <a href="#">Babatundende@gmailcom</a>
            </div>
            <Image
              src="/assets/images/landingPageFilled/arrow.svg"
              id="Vuesaxlineararrowup3"
              width={0}
              height={0}
              alt="cover"
              className="w-8 shrink-0"
            />
          </div>
        </div>
        <div className="flex flex-row ml-8 gap-20 items-start">
          <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876]">Twitter</div>
          <div className="flex flex-row w-32 shrink-0 items-start">
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#5b8def]">
              <a href="#">Babatunde</a>
            </div>
            <Image
              src="/assets/images/landingPageFilled/arrow.svg"
              id="Vuesaxlineararrowup4"
              width={0}
              height={0}
              alt="cover"
              className="w-8 shrink-0"
            />
          </div>
        </div>
        <div className="flex flex-row ml-8 gap-24 items-start">
          <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876]">Github</div>
          <div className="flex flex-row w-32 shrink-0 items-start">
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#5b8def]">
              <a href="#">Babatunde</a>
            </div>
            <Image
              src="/assets/images/landingPageFilled/arrow.svg"
              id="Vuesaxlineararrowup5"
              width={0}
              height={0}
              alt="cover"
              className="w-8 shrink-0"
            />
          </div>
        </div>
        <div className="flex flex-row gap-20 items-start mb-4 ml-8">
          <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876]">Linkedin</div>
          <div className="flex flex-row w-32 shrink-0 items-start">
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#5b8def]">
              <a href="#">Babatunde</a>
            </div>
            <Image
              src="/assets/images/landingPageFilled/arrow.svg"
              id="Vuesaxlineararrowup6"
              width={0}
              height={0}
              alt="cover"
              className="w-8 shrink-0"
            />
          </div>
        </div>
        <div
          id="Divider7"
          className="border-solid border-[#e1e3e2] mb-4 h-px shrink-0 border-t border-b-0 border-x-0"
        />
        <button
          id="Buttons"
          className="border-solid border-[#009254] bg-white flex flex-row justify-center gap-2 h-12 shrink-0 items-center px-8 py-3 border rounded-lg mb-3"
        >
          <Image
            src="/assets/images/landingPageFilled/add.svg"
            id="Vuesaxlinearadd"
            width={0}
            height={0}
            alt="cover"
            className="w-6 shrink-0"
          />
          <button
            id="Button1"
            className="text-center font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#009254]"
          >
            Add
            {'  '}
            section{' '}
          </button>
        </button>
      </div>
      {isSkillModalOpen && (
        <SkillsModal handleCloseSkillModal={handleCloseSkillModal} isSkillModalOpen={isSkillModalOpen} />
      )}
      <>{isOpen && <WorkExperienceSection isOpen={isOpen} onClose={onClose} />}</>
      <>{isOpen && <EducationSection isOpen={isOpen} onClose={onClose} />}</>
      <>
        {isAboutModalOpen && (
          <PortfolioAbout
            isAboutModalOpen={isAboutModalOpen}
            handleCloseAboutModal={() => {
              setIsAboutModalOpen(!isAboutModalOpen);
            }}
          />
        )}
      </>
      <>
        {isReferenceModalOpen && (
          <PortfolioReference
            isReferenceModalOpen={isReferenceModalOpen}
            handleCloseReferenceModal={() => {
              setIsReferenceModalOpen(!isReferenceModalOpen);
            }}
          />
        )}
      </>
    </div>
  );
};

export default LandingPageFilled;
