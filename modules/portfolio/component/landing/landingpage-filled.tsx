'use-client';
import React, { useContext, useEffect, useState } from 'react';
import Button from '@ui/Button';
import { Add } from 'iconsax-react';
import Portfolio from '../../../../context/PortfolioLandingContext';
import {
  WorkExperience,
  Education,
  About,
  Awards,
  Contact,
  Custom,
  Interests,
  Language,
  Project,
  Reference,
  Shop,
  Skill,
  Certificate,
} from './Skeleton';

import {
  about,
  workexperiences,
  certificates,
  awards,
  educations,
  projects,
  skills,
  interests,
  languages,
  references,
  contacts,
} from './data';
import { SectionDeleteModal } from '../warningModals';

const LandingPageFilled: React.FC = () => {
  const {
    selectedSections,
    buildPortfolio,
    setOpenDelete,
    editSection,
    modals,
    modalStates,
    userSections,
    userData,
    setIdToDelete,
  } = useContext(Portfolio);

  // const deleteSection = (sectionID: string) => callDelete(sectionID);

  const [showMoreWorkExperience, setShowMoreWorkExperience] = useState(2);
  const [showMoreEducation, setShowMoreEducation] = useState(2);
  const [showMoreProjects, setShowMoreProjects] = useState(2);
  const [showMoreAwards, setShowMoreAwards] = useState(2);
  const [showMoreCertificates, setShowMoreCertificates] = useState(2);
  const [showMoreInterests, setShowMoreInterests] = useState(2);
  const [showMoreLanguages, setShowMoreLanguages] = useState(2);
  const [showMoreReferences, setShowMoreReferences] = useState(2);

  // Function to toggle "View More" and "View Less"
  const toggleShowMoreWorkExperience = () => {
    setShowMoreWorkExperience(showMoreWorkExperience === 2 ? 9999 : 2);
  };

  const toggleShowMoreEducation = () => {
    setShowMoreEducation(showMoreEducation === 2 ? 9999 : 2);
  };

  const toggleShowMoreProjects = () => {
    setShowMoreProjects(showMoreProjects === 2 ? 9999 : 2);
  };

  const toggleShowMoreAwards = () => {
    setShowMoreAwards(showMoreAwards === 2 ? 9999 : 2);
  };

  const toggleShowMoreCertificates = () => {
    setShowMoreCertificates(showMoreCertificates === 2 ? 9999 : 2);
  };

  const toggleShowMoreInterests = () => {
    setShowMoreInterests(showMoreInterests === 2 ? 9999 : 2);
  };

  const toggleShowMoreLanguages = () => {
    setShowMoreLanguages(showMoreLanguages === 2 ? 9999 : 2);
  };

  const toggleShowMoreReferences = () => {
    setShowMoreReferences(showMoreReferences === 2 ? 9999 : 2);
  };

  return (
    <>
      {/* Show modals to enter data */}
      {modals?.map((modalItem) => {
        const { id, modal } = modalItem;
        return <React.Fragment key={id}>{modalStates[id] && modal}</React.Fragment>;
      })}

      {/* data from backend */}
      <div className="w-full flex flex-col justify-start items-start gap-8">
        {userSections?.map((section, i) => {
          console.log(section);
          return (
            <React.Fragment key={i}>
              {/* <SectionDeleteModal sectionToDelete={`be ${section.id}`} /> */}
              {section?.id === 'workExperience' && section?.data?.length > 0 && (
                <React.Fragment key={i}>
                  <Wrapper
                    id={section.id}
                    title={section.title}
                    edit={() => editSection(section.id)}
                    remove={() => {
                      setIdToDelete(section.id);
                      setOpenDelete(true);
                    }}
                  >
                    {section.data.slice(0, showMoreWorkExperience).map((el: any, i: any) => {
                      return <WorkExperience key={i} data={el} />;
                    })}
                    {section.data.length > 2 && (
                      <div
                        className="text-brand-green-primary font-semibold cursor-pointer"
                        onClick={toggleShowMoreWorkExperience}
                      >
                        {showMoreWorkExperience === 2 ? 'View More' : 'View Less'}
                      </div>
                    )}
                  </Wrapper>
                  <Line />
                </React.Fragment>
              )}

              {section?.id === 'education' && section?.data?.length > 0 && (
                <React.Fragment key={i}>
                  <Wrapper
                    id={section.id}
                    title={section.title}
                    edit={() => editSection(section.id)}
                    remove={() => {
                      setIdToDelete(section.id);
                      setOpenDelete(true);
                    }}
                  >
                    {section.data.slice(0, showMoreEducation).map((el: any, i: any) => {
                      return <Education key={i} data={el} />;
                    })}
                    {section.data.length > 2 && (
                      <div
                        className="text-brand-green-primary font-semibold cursor-pointer"
                        onClick={toggleShowMoreEducation}
                      >
                        {showMoreEducation === 2 ? 'View More' : 'View Less'}
                      </div>
                    )}
                  </Wrapper>
                  <Line />
                </React.Fragment>
              )}

              {section?.id === 'interests' && section?.data?.length > 0 && (
                <React.Fragment key={i}>
                  <Wrapper
                    id={section.id}
                    title={section.title}
                    edit={() => editSection(section.id)}
                    remove={() => {
                      setIdToDelete(section.id);
                      setOpenDelete(true);
                    }}
                  >
                    <Interests key={i} data={section.data} />
                  </Wrapper>
                  <Line />
                </React.Fragment>
              )}

              {section?.id === 'language' && section?.data?.length > 0 && (
                <React.Fragment key={i}>
                  {/* <SectionDeleteModal sectionToDelete={`be ${section.id}`} /> */}
                  <Wrapper
                    id={section.id}
                    title={section.title}
                    edit={() => editSection(section.id)}
                    remove={() => {
                      setIdToDelete(section.id);
                      setOpenDelete(true);
                    }}
                  >
                    <Language key={i} data={section.data[0]} />
                  </Wrapper>
                  <Line />
                </React.Fragment>
              )}

              {section?.id === 'about' && section?.data && (
                <React.Fragment key={i}>
                  {/* <SectionDeleteModal sectionToDelete={`be ${section.id}`} /> */}
                  <Wrapper
                    id={section?.id}
                    title={section.title}
                    edit={() => editSection(section?.id)}
                    remove={() => {
                      setIdToDelete(section.id);
                      setOpenDelete(true);
                    }}
                  >
                    <About key={i} bio={section?.data?.bio} />
                  </Wrapper>
                  <Line />
                </React.Fragment>
              )}

              {section?.id === 'skills' && section?.data?.length > 0 && (
                <React.Fragment key={i}>
                  {/* <SectionDeleteModal sectionToDelete={`be ${section.id}`} /> */}
                  <Wrapper
                    id={section.id}
                    title={section.title}
                    edit={() => editSection(section.id)}
                    remove={() => {
                      setIdToDelete(section.id);
                      setOpenDelete(true);
                    }}
                  >
                    <Skill key={i} data={section.data} />
                  </Wrapper>
                  <Line />
                </React.Fragment>
              )}

              {section?.id === 'projects' && section?.data?.length > 0 && (
                <React.Fragment key={i}>
                  <Wrapper
                    id={section.id}
                    title={section.title}
                    edit={() => editSection(section.id)}
                    remove={() => {
                      setIdToDelete(section.id);
                      setOpenDelete(true);
                    }}
                  >
                    {section.data.slice(0, showMoreProjects).map((el: any, i: number) => {
                      return <Project key={i} data={el} />;
                    })}
                    {section.data.length > 2 && (
                      <div
                        className="text-brand-green-primary font-semibold cursor-pointer"
                        onClick={toggleShowMoreProjects}
                      >
                        {showMoreProjects === 2 ? 'View More' : 'View Less'}
                      </div>
                    )}
                  </Wrapper>
                  <Line />
                </React.Fragment>
              )}

              {section?.id === 'awards' && section?.data?.length > 0 && (
                <React.Fragment key={i}>
                  <Wrapper
                    id={section.id}
                    title={section.title}
                    edit={() => editSection(section.id)}
                    remove={() => {
                      setIdToDelete(section.id);
                      setOpenDelete(true);
                    }}
                  >
                    {section.data.slice(0, showMoreAwards).map((el: any, i: number) => {
                      return <Awards key={i} data={el} />;
                    })}
                    {section.data.length > 2 && (
                      <div
                        className="text-brand-green-primary font-semibold cursor-pointer"
                        onClick={toggleShowMoreAwards}
                      >
                        {showMoreAwards === 2 ? 'View More' : 'View Less'}
                      </div>
                    )}
                  </Wrapper>
                  <Line />
                </React.Fragment>
              )}

              {section?.id === 'certificate' && section?.data?.length > 0 && (
                <React.Fragment key={i}>
                  <Wrapper
                    id={section.id}
                    title={section.title}
                    edit={() => editSection(section.id)}
                    remove={() => {
                      setIdToDelete(section.id);
                      setOpenDelete(true);
                    }}
                  >
                    {section.data.slice(0, showMoreCertificates).map((el: any, i: number) => {
                      return <Certificate key={i} data={el} />;
                    })}
                    {section.data.length > 2 && (
                      <div
                        className="text-brand-green-primary font-semibold cursor-pointer"
                        onClick={toggleShowMoreCertificates}
                      >
                        {showMoreCertificates === 2 ? 'View More' : 'View Less'}
                      </div>
                    )}
                  </Wrapper>
                  <Line />
                </React.Fragment>
              )}

              {/* Interests Section */}

              {/* Language Section */}
              {section?.id === 'language' && section?.data?.length > 0 && (
                <React.Fragment key={i}>
                  <Wrapper
                    id={section.id}
                    title={section.title}
                    edit={() => editSection(section.id)}
                    remove={() => {
                      setIdToDelete(section.id);
                      setOpenDelete(true);
                    }}
                  >
                    {section.data.slice(0, showMoreLanguages).map((el: any, i: number) => {
                      return <Language key={i} data={el} />;
                    })}
                    {section.data.length > 2 && (
                      <div
                        className="text-brand-green-primary font-semibold cursor-pointer"
                        onClick={toggleShowMoreLanguages}
                      >
                        {showMoreLanguages === 2 ? 'View More' : 'View Less'}
                      </div>
                    )}
                  </Wrapper>
                  <Line />
                </React.Fragment>
              )}

              {/* Reference Section */}
              {section?.id === 'reference' && section?.data?.length > 0 && (
                <React.Fragment key={i}>
                  <Wrapper
                    id={section.id}
                    title={section.title}
                    edit={() => editSection(section.id)}
                    remove={() => {
                      setIdToDelete(section.id);
                      setOpenDelete(true);
                    }}
                  >
                    {section.data.slice(0, showMoreReferences).map((el: any, i: number) => {
                      return <Reference key={i} data={el} />;
                    })}
                    {section.data.length > 2 && (
                      <div
                        className="text-brand-green-primary font-semibold cursor-pointer"
                        onClick={toggleShowMoreReferences}
                      >
                        {showMoreReferences === 2 ? 'View More' : 'View Less'}
                      </div>
                    )}
                  </Wrapper>
                  <Line />
                </React.Fragment>
              )}

              {/* Shop section */}
              {section?.id === 'shop' && section?.data?.length > 0 && (
                // {section?.id === 'shop' && section?.data?.length > 0 && (
                <React.Fragment key={i}>
                  <Wrapper
                    id={section.id}
                    title={section.title}
                    edit={() => editSection(section.id)}
                    remove={() => {
                      setIdToDelete(section.id);
                      setOpenDelete(true);
                    }}
                  >
                    {/* <Shop key={i} /> */}
                    <Shop key={i} data={section.data} />
                  </Wrapper>
                  <Line />
                </React.Fragment>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {selectedSections.length < 13 && (
        <Button intent="secondary" className="rounded-lg border-[1px] pr-6" onClick={() => buildPortfolio()}>
          <Add />
          Add section
        </Button>
      )}

      <SectionDeleteModal />
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
};

export const Wrapper = ({ id, title, children, edit, remove }: WrapperProps) => {
  return (
    <div className="flex justify-start items-start gap-2 md:gap-4 w-full" id={id}>
      {/* This is the icon */}
      <div>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="md:w-[23px] w-[19px] aspect-square mt-1"
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
            <h3 className="text-lg text-gray-600 md:text-[21px] font-semibold border-b-4 border-brand-green-primary pb-1 md:pb-2">
              {title}
            </h3>
          </div>
          <div className="flex gap-3 md:gap-5">
            <p className="text-blue-100 text-sm md:text-base font-semibold cursor-pointer select-none" onClick={edit}>
              Edit
            </p>
            <p className="text-red-305 text-sm md:text-base font-semibold cursor-pointer select-none" onClick={remove}>
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
