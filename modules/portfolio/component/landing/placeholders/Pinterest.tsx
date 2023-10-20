import React from 'react';
import Wrapper from './Wrapper';
import { Interests } from '../Skeleton';

type PinterestsProps = {
  i: number;
  id: string;
  title: string;
  edit: () => void;
  remove: () => void;
  section: any;
  icon?: React.ReactNode;
  showMoreInterests: number;
  toggleShowMoreInterest?: () => void;
};

const Pinterests = ({
  i,
  id,
  title,
  edit,
  remove,
  section,
  icon,
  showMoreInterests,
  toggleShowMoreInterest,
}: PinterestsProps) => {
  const data = showMoreInterests === 9999 ? section?.data : section?.data ? section.data.slice(0, 2) : [];
  return (
    <Wrapper icon={icon} id={id} title={title} edit={edit} remove={remove}>
      <Interests key={i} data={data} />
      {section.data.length > 2 && (
        <div className="text-brand-green-primary font-semibold cursor-pointer mt-5" onClick={toggleShowMoreInterest}>
          {showMoreInterests === 2 ? 'View More' : 'View Less'}
        </div>
      )}
    </Wrapper>
  );
};

export default Pinterests;
