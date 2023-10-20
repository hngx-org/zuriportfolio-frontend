import React from 'react';
import Wrapper from './Wrapper';
import { About } from '../Skeleton';

type PaboutProps = {
  i: number;
  id: string;
  title: string;
  edit: () => void;
  remove: () => void;
  section: any;
  icon?: React.ReactNode;
};

const Pabout = ({ i, id, title, edit, remove, section, icon }: PaboutProps) => {
  return (
    <Wrapper icon={icon} id={id} title={title} edit={edit} remove={remove}>
      <About key={i} bio={section?.data?.bio} />
    </Wrapper>
  );
};

export default Pabout;
