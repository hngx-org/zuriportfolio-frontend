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
};

const Pinterests = ({ i, id, title, edit, remove, section, icon }: PinterestsProps) => {
  return (
    <Wrapper icon={icon} id={id} title={title} edit={edit} remove={remove}>
      <Interests key={i} data={section.data} />
    </Wrapper>
  );
};

export default Pinterests;
