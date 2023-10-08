import React from 'react';
import useDisclosure from '../../hooks/useDisclosure'; // Import your custom hook
import Certifications from '@modules/portfolio/component/certification-modal';
import Awards from '@modules/portfolio/component/awards-modal';
import Button from '@ui/Button';

function Tester() {
  const { isOpen: isModalOpenForCerti, onOpen: openModalForCerti, onClose: closeModalForCerti } = useDisclosure();
  const { isOpen: isModalOpenForAwards, onOpen: openModalForAwards, onClose: closeModalForAwards } = useDisclosure();

  return (
    <div>
      <div className="flex  flex-col h-screen w-full justify-center items-center gap-24">
        <Button onClick={openModalForCerti}>Certification</Button>
        <Button onClick={openModalForAwards}>Awards</Button>
      </div>
      <Certifications isOpen={isModalOpenForCerti} onClose={closeModalForCerti} />
      <Awards isOpen={isModalOpenForAwards} onClose={closeModalForAwards} />
    </div>
  );
}

export default Tester;
