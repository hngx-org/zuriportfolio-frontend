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
};

const Pskils = ({ i, id, title, edit, remove, section, icon }: PskilsProps) => {
  return (
    <Wrapper icon={icon} id={id} title={title} edit={edit} remove={remove}>
      <Skill key={i} data={section.data} />
    </Wrapper>
  );
};

export default Pskils;
