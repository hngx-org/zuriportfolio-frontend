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
      ))}
      <a className="text-blue-100 font-semibold" href="">
        Go to shop
      </a>
    </div>
  );
};

type ContactProps = {
  contacts?: Array<{ id: number; title: string; info: string }>;
};

const Contact = ({ contacts }: ContactProps) => {
  return (
    <div className="flex flex-col">
      {contacts?.map((contact) => (
        <div className="flex flex-col gap-2" key={contact.id}>
          <div className="flex justify-start items-center gap-10">
            <span className="text-gray-300 font-semibold text-sm min-w-min flex-[1]">{contact.title}</span>
            <span className="text-blue-100 font-semibold text-sm flex-[2]">{contact.info}</span>
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
      </div>
    </>
  );
};

export default LandingPageFilled;

const placeHolders = [
  {
    id: 'about',
    title: 'About',
    content: (
      <>
        <About
          text={`I'm prosper, a digital product designer based in Lagos, Nigeria. My design journey has taken me across various
companies, startups, and agencies in both Africa and Europe. With a unique blend of design and engineering
expertise, I've applied design methodologies to tackle diverse problem domains, taking charge of the entire design
process, from research to implementation.Beyond my product design journey, you'll often find me on the tennis
court. I also nurture my creativity through music, language learning, and exploration of new destinations.`}
        />
      </>
    ),
  },
  {
    id: 'workEexperience',
    title: 'Work Experience',
    content: (
      <>
        <WorkExperience
          startDate="May 2021"
          endDate="Present"
          company="Pepsi, Nigeria"
          role="Senior product designer"
          description="Implemented A/B testing for website redesign, leading to a 40% improvement in user retention and a 25% increase in conversion rates, ultimately resulting in a 20% boost in overall revenue."
        />
      </>
    ),
  },
  {
    id: 'project',
    title: 'Project',
    content: (
      <>
        <Project
          description={`Implemented A/B testing for website redesign, leading to a 40% improvement in user retention and a 25% increase in conversion rates, ultimately resulting in a 20% boost in overall revenue.`}
          img={img}
          link="https://www.google.com"
          tags={[
            {
              id: 1,
              name: 'UX Design',
            },
          ]}
          title="Byte financial app"
        />
      </>
    ),
  },
  {
    id: 'education',
    title: 'Education',
    content: (
      <>
        <Education
          startDate="May 2020"
          endDate="June 2023"
          company="Havard, Usa"
          role="Bsc in Computer Science"
          description="Implemented A/B testing for website redesign, leading to a 40% improvement in user retention and a 25% increase in conversion rates, ultimately resulting in a 20% boost in overall revenue."
        />
      </>
    ),
  },
  {
    id: 'skill',
    title: 'Skill',
    content: (
      <>
        <Skill
          skills={[
            {
              id: 1,
              name: 'UX Design',
            },
            {
              id: 2,
              name: 'UX Design',
            },
            {
              id: 3,
              name: 'UX Design',
            },
          ]}
        />
      </>
    ),
  },
  {
    id: 'shop',
    title: 'Shop',
    content: (
      <>
        <Shop />
      </>
    ),
  },
  {
    id: 7,
    title: 'Contact',
    content: (
      <>
        <Contact
          contacts={[
            {
              id: 1,
              title: 'Email',
              info: 'aaa@aaaa.aa',
            },
            {
              id: 2,
              title: 'Phone',
              info: '08000000000',
            },
            {
              id: 3,
              title: 'Address',
              info: 'Lagos, Nigeria',
            },
          ]}
        />
      </>
    ),
  },
];
