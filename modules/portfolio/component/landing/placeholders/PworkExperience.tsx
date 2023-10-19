import React from 'react';
import Wrapper from './Wrapper';
import { WorkExperience } from '../Skeleton';

type PworkExperienceProps = {
  id: string;
  title: string;
  edit: () => void;
  remove: () => void;
  section: any;
  toggleShowMoreWorkExperience: () => void;
  showMoreWorkExperience: number;
};

const PworkExperience = ({
  id,
  title,
  edit,
  remove,
  section,
  toggleShowMoreWorkExperience,
  showMoreWorkExperience,
}: PworkExperienceProps) => {
  return (
    <Wrapper id={id} title={title} edit={edit} remove={remove}>
      {section.data.slice(0, showMoreWorkExperience).map((el: any, i: any) => {
        return <WorkExperience key={i} data={el} />;
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
