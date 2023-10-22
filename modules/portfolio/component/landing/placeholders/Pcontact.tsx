import React from 'react';
import Wrapper from './Wrapper';
import { Contact, Reference } from '../Skeleton';

type PcontactProps = {
  id: string;
  title: string;
  edit: () => void;
  remove: () => void;
  section: any;
  icon?: React.ReactNode;
  showMoreContacts: number;
  toggleShowMoreContact: () => void;
};

const Pcontact = ({
  id,
  title,
  edit,
  remove,
  section,
  icon,
  showMoreContacts,
  toggleShowMoreContact,
}: PcontactProps) => {
  return (
    <Wrapper icon={icon} id={id} title={title} edit={edit} remove={remove}>
      <div className="flex flex-col gap-5">
        {section.data.slice(0, showMoreContacts).map((el: any, i: number) => {
          return <Contact key={i} data={el} />;
        })}
      </div>
      {section.data.length > 2 && (
        <div className="text-brand-green-primary font-semibold cursor-pointer" onClick={toggleShowMoreContact}>
          {showMoreContacts === 2 ? 'View More' : 'View Less'}
        </div>
      )}
    </Wrapper>
  );
};

export default Pcontact;
