'use-client';
import React, { useContext, useEffect, useState } from 'react';
import Button from '@ui/Button';
import {
  Add,
  Award,
  Briefcase,
  LanguageSquare,
  LikeTag,
  PathTool,
  Personalcard,
  UserCirlceAdd,
  Verify,
} from 'iconsax-react';
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
import Pabout from './placeholders/Pabout';
import Pskils from './placeholders/Pskills';
import Planguages from './placeholders/Planguages';
import Pinterests from './placeholders/Pinterest';
import Pprojects from './placeholders/Pprojects';
import Pawards from './placeholders/Pawards';
import Preferences from './placeholders/Preference';
import Pcertificates from './placeholders/Pcertificate';

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

      <div className="w-full flex flex-col justify-start items-start gap-8">
        {userSections?.map((section, i) => {
          return (
            <React.Fragment key={i}>
              {section?.id === 'about' && section?.data && (
                <Pabout
                  icon={<Personalcard variant="Bold" size="24" color="#006811" />}
                  section={section}
                  key={i}
                  i={i}
                  id={section.id}
                  title={section.title}
                  edit={() => editSection(section.id)}
                  remove={() => {
                    setIdToDelete(section.id);
                    setOpenDelete(true);
                  }}
                />
              )}

              {section?.id === 'workExperience' && section?.data?.length > 0 && (
                <PworkExperience
                  icon={<Briefcase variant="Bold" size="24" color="#006811" />}
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

              {section?.id === 'projects' && section?.data?.length > 0 && (
                <Pprojects
                  icon={<Briefcase variant="Bold" size="24" color="#006811" />}
                  section={section}
                  showMoreProjects={showMoreProjects}
                  toggleShowMoreProjects={toggleShowMoreProjects}
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

              {section?.id === 'skills' && section?.data?.length > 0 && (
                <Pskils
                  icon={<PathTool variant="Bold" size="24" color="#006811" />}
                  section={section}
                  key={i}
                  i={i}
                  id={section.id}
                  title={section.title}
                  edit={() => editSection(section.id)}
                  remove={() => {
                    setIdToDelete(section.id);
                    setOpenDelete(true);
                  }}
                />
              )}

              {section?.id === 'languages' && section?.data?.length > 0 && (
                <Planguages
                  icon={<LanguageSquare variant="Bold" size="24" color="#006811" />}
                  section={section}
                  key={i}
                  i={i}
                  id={section.id}
                  title={section.title}
                  edit={() => editSection(section.id)}
                  remove={() => {
                    setIdToDelete(section.id);
                    setOpenDelete(true);
                  }}
                />
              )}

              {section?.id === 'interests' && section?.data?.length > 0 && (
                <Pinterests
                  icon={<LikeTag variant="Bold" size="24" color="#006811" />}
                  section={section}
                  key={i}
                  i={i}
                  id={section.id}
                  title={section.title}
                  edit={() => editSection(section.id)}
                  remove={() => {
                    setIdToDelete(section.id);
                    setOpenDelete(true);
                  }}
                />
              )}

              {section?.id === 'awards' && section?.data?.length > 0 && (
                <Pawards
                  icon={<Award variant="Bold" size="24" color="#006811" />}
                  section={section}
                  key={i}
                  id={section.id}
                  title={section.title}
                  showMoreAwards={showMoreAwards}
                  toggleShowMoreAwards={toggleShowMoreAwards}
                  edit={() => editSection(section.id)}
                  remove={() => {
                    setIdToDelete(section.id);
                    setOpenDelete(true);
                  }}
                />
              )}

              {section?.id === 'reference' && section?.data?.length > 0 && (
                <Preferences
                  icon={<UserCirlceAdd variant="Bold" size="24" color="#006811" />}
                  section={section}
                  key={i}
                  id={section.id}
                  title={section.title}
                  showMoreReferences={showMoreReferences}
                  toggleShowMoreReferences={toggleShowMoreReferences}
                  edit={() => editSection(section.id)}
                  remove={() => {
                    setIdToDelete(section.id);
                    setOpenDelete(true);
                  }}
                />
              )}

              {section?.id === 'certificate' && section?.data?.length > 0 && (
                <Pcertificates
                  icon={<Verify variant="Bold" size="24" color="#006811" />}
                  section={section}
                  key={i}
                  id={section.id}
                  title={section.title}
                  showMoreCertificates={showMoreCertificates}
                  toggleShowMoreCertificates={toggleShowMoreCertificates}
                  edit={() => editSection(section.id)}
                  remove={() => {
                    setIdToDelete(section.id);
                    setOpenDelete(true);
                  }}
                />
              )}
              {/* todo */}
              {section?.id === 'education' && section?.data?.length > 0 && (
                <React.Fragment key={i}>
                  <Wrapper
                    id={section.id}
                    icon={<Shop />}
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
            </React.Fragment>
          );
        })}

        {selectedSections.length < 13 && (
          <Button intent="secondary" className="rounded-lg border-[1px] pr-6" onClick={() => buildPortfolio()}>
            <Add />
            Add section
          </Button>
        )}
      </div>

      <SectionDeleteModal />
    </>
  );
};

export default LandingPageFilled;

export const Line = () => {
  return <hr className="-mt-2 mb-3 w-full border-gray-200 opacity-10" />;
};
