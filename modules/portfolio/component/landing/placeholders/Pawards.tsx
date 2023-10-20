import React from 'react';
import Wrapper from './Wrapper';
import { Awards } from '../Skeleton';

type PawardsProps = {
  id: string;
  title: string;
  edit: () => void;
  remove: () => void;
  section: any;
  showMoreAwards: number;
  toggleShowMoreAwards: () => void;
  icon?: React.ReactNode;
};

const Pawards = ({ id, title, edit, remove, section, icon, showMoreAwards, toggleShowMoreAwards }: PawardsProps) => {
  return (
    <Wrapper icon={icon} id={id} title={title} edit={edit} remove={remove}>
      {section.data.slice(0, showMoreAwards).map((el: any, i: number) => {
        return (
          <>
            <Awards key={i} data={el} />
            {section.data.length > 1 && <hr className="mb-5 border-gray-100 opacity-20" />}
          </>
        );
      })}
      {section.data.length > 2 && (
        <div className="text-brand-green-primary font-semibold cursor-pointer" onClick={toggleShowMoreAwards}>
          {showMoreAwards === 2 ? 'View More' : 'View Less'}
        </div>
      )}
    </Wrapper>
  );
};

export default Pawards;
