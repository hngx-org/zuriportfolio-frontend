import React from 'react';
import Wrapper from './Wrapper';
import { Reference } from '../Skeleton';

type PreferencesProps = {
  id: string;
  title: string;
  edit: () => void;
  remove: () => void;
  section: any;
  icon?: React.ReactNode;
  showMoreReferences: number;
  toggleShowMoreReferences: () => void;
};

const Preferences = ({
  id,
  title,
  edit,
  remove,
  section,
  icon,
  showMoreReferences,
  toggleShowMoreReferences,
}: PreferencesProps) => {
  return (
    <Wrapper icon={icon} id={id} title={title} edit={edit} remove={remove}>
      {section.data.slice(0, showMoreReferences).map((el: any, i: number) => {
        return (
          <>
            <Reference key={i} data={el} />
            {section.data.length > 1 && <hr className="mb-5 border-gray-100 opacity-20" />}
          </>
        );
      })}
      {section.data.length > 2 && (
        <div className="text-brand-green-primary font-semibold cursor-pointer" onClick={toggleShowMoreReferences}>
          {showMoreReferences === 2 ? 'View More' : 'View Less'}
        </div>
      )}
    </Wrapper>
  );
};

export default Preferences;
