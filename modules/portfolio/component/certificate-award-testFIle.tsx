import React, { useState } from 'react';
import Awards from './awards';
import Button from '@ui/Button';
import Certification from './certification';

function Tester() {
  const [isModalOpenForCerti, setIsModalOpenForCerti] = useState(false);

  const openModalForCerti = () => {
    setIsModalOpenForCerti(true);
  };

  const closeModalForCerti = () => {
    setIsModalOpenForCerti(false);
  };
  const [isModalOpenForAwards, setIsModalOpenForAwards] = useState(false);

  const openModalForAwards = () => {
    setIsModalOpenForAwards(true);
  };

  const closeModalForAwards = () => {
    setIsModalOpenForAwards(false);
  };

  return (
    <div>
      <div className="flex">
        <Button onClick={openModalForCerti}>Certification</Button>
        <Button onClick={openModalForAwards}>Awards</Button>
      </div>
      <Certification isOpen={isModalOpenForCerti} onClose={closeModalForCerti} />
      <Awards isOpen={isModalOpenForAwards} onClose={closeModalForAwards} />
    </div>
  );
}

export default Tester;
