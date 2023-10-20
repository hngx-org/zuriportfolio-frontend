import React from 'react';
import Wrapper from './Wrapper';
import { Language } from '../Skeleton';

type PlanguagesProps = {
  i: number;
  id: string;
  title: string;
  edit: () => void;
  remove: () => void;
  section: any;
  icon?: React.ReactNode;
};

const Planguages = ({ i, id, title, edit, remove, section, icon }: PlanguagesProps) => {
  return (
    <Wrapper icon={icon} id={id} title={title} edit={edit} remove={remove}>
      <Language key={i} data={section.data} />
    </Wrapper>
  );
};

export default Planguages;
