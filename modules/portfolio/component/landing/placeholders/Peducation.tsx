import React from 'react';
import Wrapper from './Wrapper';
import { Education, WorkExperience } from '../Skeleton';

type PeducationProps = {
  id: string;
  title: string;
  edit: () => void;
  remove: () => void;
  section: any;
  toggleShowMoreEducation: () => void;
  showMoreEducation: number;
  icon?: React.ReactNode;
};

const Peducation = ({
  id,
  title,
  edit,
  remove,
  section,
  icon,
  toggleShowMoreEducation,
  showMoreEducation,
}: PeducationProps) => {
  return (
    <Wrapper icon={icon} id={id} title={title} edit={edit} remove={remove}>
      {section.data.slice(0, showMoreEducation).map((el: any, i: any) => {
        return (
          <>
            <Education key={i} data={el} />
            {section.data.length > 1 && <hr className="mb-5 border-gray-100 opacity-20" />}
          </>
        );
      })}
      {section.data.length > 2 && (
        <div className="text-brand-green-primary font-semibold cursor-pointer" onClick={toggleShowMoreEducation}>
          {showMoreEducation === 2 ? 'View More' : 'View Less'}
        </div>
      )}
    </Wrapper>
  );
};

export default Peducation;
