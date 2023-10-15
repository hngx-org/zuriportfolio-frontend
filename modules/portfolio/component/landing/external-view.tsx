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
                  <ExternalWrapper id={section.id} title={section.title}>
                    {section.data.map((el: any, i: any) => {
                      return <WorkExperience key={i} data={el} />;
                    })}
                  </ExternalWrapper>
                  <Line />
                </React.Fragment>
              )}

              {section?.id === 'education' && section?.data?.length > 0 && (
                <React.Fragment key={i}>
                  <ExternalWrapper id={section.id} title={section.title}>
                    {section.data.map((el: any, i: any) => {
                      return <Education key={i} data={el} />;
                    })}
                  </ExternalWrapper>
                  <Line />
                </React.Fragment>
              )}

              {section?.id === 'interests' && section?.data?.length > 0 && (
                <React.Fragment key={i}>
                  <ExternalWrapper id={section.id} title={section.title}>
                    <Interests key={i} data={section.data[0]} />
                  </ExternalWrapper>
                  <Line />
                </React.Fragment>
              )}

              {section?.id === 'about' && section?.data?.length > 0 && (
                <React.Fragment key={i}>
                  <ExternalWrapper id={section.id} title={section.title}>
                    <About key={i} bio={section.data[0]} />
                  </ExternalWrapper>
                  <Line />
                </React.Fragment>
              )}
              {section?.id === 'skills' && section?.data?.length > 0 && (
                <React.Fragment key={i}>
                  <ExternalWrapper id={section.id} title={section.title}>
                    <Skill key={i} data={section.data} />
                  </ExternalWrapper>
                  <Line />
                </React.Fragment>
              )}

              {section?.id === 'projects' && section?.data?.length > 0 && (
                <React.Fragment key={i}>
                  <ExternalWrapper id={section.id} title={section.title}>
                    <Project key={i} data={section.data} />
                  </ExternalWrapper>
                  <Line />
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

type WrapperProps = {
  id: string;
  title: string;
  children?: React.ReactNode;
  edit?: () => void;
  remove?: () => void;
};

export const ExternalWrapper = ({ id, title, children, edit, remove }: WrapperProps) => {
  return (
    <div className="flex justify-start items-start gap-2 md:gap-4 w-full" id={id}>
      {/* This is the icon */}
      <div></div>
      <div className="w-full">
        <div className="flex justify-between items-start w-full">
          <div className="flex gap-2 mb-6 md:mb-4">
            <h3 className="text-lg text-gray-600 md:text-[21px] font-semibold border-b-4 border-brand-green-primary pb-1 md:pb-2">
              {title}
            </h3>
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
