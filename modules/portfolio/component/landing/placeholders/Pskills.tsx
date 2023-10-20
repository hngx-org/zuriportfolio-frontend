import React from 'react';
import Wrapper from './Wrapper';
import { Skill } from '../Skeleton';

type PskilsProps = {
  i: number;
  id: string;
  title: string;
  edit: () => void;
  remove: () => void;
  section: any;
  icon?: React.ReactNode;
  showMoreSkills: number;
  toggleShowMoreSkills?: () => void;
};

const Pskils = ({ i, id, title, edit, remove, section, icon, showMoreSkills, toggleShowMoreSkills }: PskilsProps) => {
  const data = showMoreSkills === 9999 ? section?.data : section?.data ? section.data.slice(0, 5) : [];
  return (
    <Wrapper icon={icon} id={id} title={title} edit={edit} remove={remove}>
      <Skill key={i} data={data} />
      {section.data.length > 2 && (
        <div className="text-brand-green-primary font-semibold cursor-pointer mt-5" onClick={toggleShowMoreSkills}>
          {showMoreSkills === 2 ? 'View More' : 'View Less'}
        </div>
      )}
    </Wrapper>
  );
};

export default Pskils;
