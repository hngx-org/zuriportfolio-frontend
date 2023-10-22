'use-client';
import React, { useContext } from 'react';
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
import Wrapper from './placeholders/Wrapper';
import {
  Book,
  Briefcase,
  LanguageSquare,
  LikeTag,
  PathTool,
  Personalcard,
  Profile2User,
  UserCirlceAdd,
  Verify,
} from 'iconsax-react';
import { useState } from 'react';
type Props = {
  userSections: any;
};

const ExternalView: React.FC<Props> = ({ userSections }) => {
  return (
    <>
      {/* data from backend */}
      <div className="w-full flex flex-col justify-start items-start gap-8">
        {userSections?.map((section: any, i: any) => {
          return (
            <React.Fragment key={i}>
              {section?.id === 'workExperience' && section?.data?.length > 0 && (
                <React.Fragment key={i}>
                  <Wrapper
                    icon={<Briefcase variant="Bold" size="24" color="#006811" />}
                    disableEdit={true}
                    id={section.id}
                    title={section.title}
                  >
                    {section.data.map((el: any, i: any) => {
                      return <WorkExperience key={i} data={el} />;
                    })}
                  </Wrapper>
                </React.Fragment>
              )}

              {section?.id === 'education' && section?.data?.length > 0 && (
                <React.Fragment key={i}>
                  <Wrapper
                    icon={<Book variant="Bold" size="24" color="#006811" />}
                    id={section.id}
                    disableEdit={true}
                    title={section.title}
                  >
                    {section.data.map((el: any, i: any) => {
                      return <Education key={i} data={el} />;
                    })}
                  </Wrapper>
                </React.Fragment>
              )}

              {section?.id === 'certificate' && section?.data?.length > 0 && (
                <React.Fragment key={i}>
                  <Wrapper
                    id={section.id}
                    disableEdit={true}
                    icon={<Verify variant="Bold" size="24" color="#006811" />}
                    title={section.title}
                  >
                    {section.data.map((el: any, i: any) => {
                      return <Certificate key={i} data={el} />;
                    })}
                  </Wrapper>
                </React.Fragment>
              )}

              {section?.id === 'interests' && section?.data?.length > 0 && (
                <React.Fragment key={i}>
                  <Wrapper
                    icon={<LikeTag variant="Bold" size="24" color="#006811" />}
                    id={section.id}
                    disableEdit={true}
                    title={section.title}
                  >
                    <Interests key={i} data={section?.data} />
                  </Wrapper>
                </React.Fragment>
              )}

              {section?.id === 'languages' && section?.data?.length > 0 && (
                <React.Fragment key={i}>
                  <Wrapper
                    icon={<LanguageSquare variant="Bold" size="24" color="#006811" />}
                    id={section.id}
                    disableEdit={true}
                    title={section.title}
                  >
                    <Language key={i} data={section.data} />
                  </Wrapper>
                </React.Fragment>
              )}

              {section?.id === 'about' && section?.data?.bio && (
                <React.Fragment key={i}>
                  <Wrapper
                    icon={<Personalcard variant="Bold" size="24" color="#006811" />}
                    id={section.id}
                    disableEdit={true}
                    title={section.title}
                  >
                    <About key={i} bio={section.data.bio} />
                  </Wrapper>
                </React.Fragment>
              )}

              {section?.id === 'skills' && section?.data?.length > 0 && (
                <React.Fragment key={i}>
                  <Wrapper
                    icon={<PathTool variant="Bold" size="24" color="#006811" />}
                    id={section.id}
                    disableEdit={true}
                    title={section.title}
                  >
                    <Skill key={i} data={section.data} />
                  </Wrapper>
                </React.Fragment>
              )}

              {section?.id === 'projects' && section?.data?.length > 0 && (
                <React.Fragment key={i}>
                  <Wrapper
                    icon={<Briefcase variant="Bold" size="24" color="#006811" />}
                    id={section.id}
                    disableEdit={true}
                    title={section.title}
                  >
                    {section?.data.map((el: any, i: number) => {
                      return <Project key={i} data={el} />;
                    })}
                  </Wrapper>
                </React.Fragment>
              )}
              {section?.id === 'reference' && section?.data?.length > 0 && (
                <React.Fragment key={i}>
                  <Wrapper
                    id={section.id}
                    disableEdit={true}
                    icon={<UserCirlceAdd variant="Bold" size="24" color="#006811" />}
                    title={section.title}
                  >
                    {section?.data.map((el: any, i: number) => {
                      return <Reference key={i} data={el} />;
                    })}
                  </Wrapper>
                </React.Fragment>
              )}

              {section?.id === 'contact' && section?.data?.length > 0 && (
                <React.Fragment key={i}>
                  <Wrapper
                    id={section.id}
                    disableEdit={true}
                    icon={<Profile2User variant="Bold" size="24" color="#006811" />}
                    title={section.title}
                  >
                    <Contact key={i} data={section.data} />
                  </Wrapper>
                </React.Fragment>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default ExternalView;
