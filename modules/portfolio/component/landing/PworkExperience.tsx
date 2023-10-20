import React from 'react';
import Wrapper from './placeholders/Wrapper';
import { WorkExperience } from './Skeleton';

type PworkExperienceProps = {
  id: string;
  title: string;
  edit: () => void;
  remove: () => void;
  section: any;
  toggleShowMoreWorkExperience: () => void;
  showMoreWorkExperience: number;
  icon?: React.ReactNode;
};

const PworkExperience = ({
  id,
  title,
  edit,
  remove,
  section,
  icon,
  toggleShowMoreWorkExperience,
  showMoreWorkExperience,
}: PworkExperienceProps) => {
  return (
    <Wrapper icon={icon} id={id} title={title} edit={edit} remove={remove}>
      {section.data.slice(0, showMoreWorkExperience).map((el: any, i: any) => {
        return (
          <>
            <WorkExperience key={i} data={el} />
            {section.data.length > 1 && <hr className="mb-5 border-gray-100 opacity-20" />}
          </>
        );
      })}
      {section.data.length > 2 && (
        <div className="text-brand-green-primary font-semibold cursor-pointer" onClick={toggleShowMoreWorkExperience}>
          {showMoreWorkExperience === 2 ? 'View More' : 'View Less'}
        </div>
      )}
    </Wrapper>
  );
};

export default PworkExperience;
