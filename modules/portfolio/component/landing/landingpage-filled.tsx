'use-client';
import React, { useContext, useEffect, useState } from 'react';
import Button from '@ui/Button';
import { Add } from 'iconsax-react';
import Portfolio from '../../../../context/PortfolioLandingContext';
import {
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

import { SectionDeleteModal } from '../warningModals';
import Wrapper from './placeholders/Wrapper';
import PworkExperience from './placeholders/PworkExperience';

const LandingPageFilled: React.FC = () => {
  const {
    selectedSections,
    buildPortfolio,
    setOpenDelete,
    editSection,
    modals,
    modalStates,
    userSections,
    setIdToDelete,
  } = useContext(Portfolio);

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
          return (
            <React.Fragment key={i}>
              {/* <SectionDeleteModal sectionToDelete={`be ${section.id}`} /> */}
              {section?.id === 'workExperience' && section?.data?.length > 0 && (
                <PworkExperience
                  section={section}
                  showMoreWorkExperience={showMoreWorkExperience}
                  toggleShowMoreWorkExperience={toggleShowMoreWorkExperience}
                  key={i}
                  id={section.id}
                  title={section.title}
                  edit={() => editSection(section.id)}
                  remove={() => {
                    setIdToDelete(section.id);
                    setOpenDelete(true);
                  }}
                />
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

              {section?.id === 'languages' && section?.data?.length > 0 && (
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
                    <Language key={i} data={section.data} />
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

export const Line = () => {
  return <hr className="-mt-2 mb-3 w-full border-gray-200 opacity-10" />;
};
