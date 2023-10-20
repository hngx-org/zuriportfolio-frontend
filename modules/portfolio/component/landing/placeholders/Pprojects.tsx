import React from 'react';
import Wrapper from './Wrapper';
import { Project, WorkExperience } from '../Skeleton';

type PprojectsProps = {
  id: string;
  title: string;
  edit: () => void;
  remove: () => void;
  section: any;
  showMoreProjects: number;
  toggleShowMoreProjects: () => void;
  icon?: React.ReactNode;
};

const Pprojects = ({
  id,
  title,
  edit,
  remove,
  section,
  icon,
  showMoreProjects,
  toggleShowMoreProjects,
}: PprojectsProps) => {
  return (
    <Wrapper icon={icon} id={id} title={title} edit={edit} remove={remove}>
      {section.data.slice(0, showMoreProjects).map((el: any, i: number) => {
        return <Project key={i} data={el} />;
      })}
      {section.data.length > 1 && (
        <div className="text-brand-green-primary font-semibold cursor-pointer" onClick={toggleShowMoreProjects}>
          {showMoreProjects === 2 ? 'View More' : 'View Less'}
        </div>
      )}
    </Wrapper>
  );
};

export default Pprojects;
