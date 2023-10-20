import React from 'react';
import Wrapper from './Wrapper';
import { Certificate } from '../Skeleton';

type PcertificatesProps = {
  id: string;
  title: string;
  edit: () => void;
  remove: () => void;
  section: any;
  icon?: React.ReactNode;
  showMoreCertificates: number;
  toggleShowMoreCertificates: () => void;
};

const Pcertificates = ({
  id,
  title,
  edit,
  remove,
  section,
  icon,
  showMoreCertificates,
  toggleShowMoreCertificates,
}: PcertificatesProps) => {
  return (
    <Wrapper icon={icon} id={id} title={title} edit={edit} remove={remove}>
      {section.data.slice(0, showMoreCertificates).map((el: any, i: number) => {
        return (
          <>
            <Certificate key={i} data={el} />
            {section.data.length > 1 && <hr className="mb-5 border-gray-100 opacity-20" />}
          </>
        );
      })}
      {section.data.length > 2 && (
        <div className="text-brand-green-primary font-semibold cursor-pointer" onClick={toggleShowMoreCertificates}>
          {showMoreCertificates === 2 ? 'View More' : 'View Less'}
        </div>
      )}
    </Wrapper>
  );
};

export default Pcertificates;
