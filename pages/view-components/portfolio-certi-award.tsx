import React, { useState } from 'react';
import Button from '@ui/Button';
import Certifications from '@modules/portfolio/component/certification-modal';
import Awards from '@modules/portfolio/component/awards-modal';

function Tester() {
  const [isModalOpenForCerti, setIsModalOpenForCerti] = useState(false);
  const [isModalOpenForAwards, setIsModalOpenForAwards] = useState(false);

  return (
    <div>
      <div className="flex  flex-col h-screen w-full justify-center items-center gap-24">
        <Button onClick={() => setIsModalOpenForCerti(true)}>Certification</Button>
        <Button onClick={() => setIsModalOpenForAwards(true)}>Awards</Button>
      </div>
      <Certifications isOpen={isModalOpenForCerti} onClose={() => setIsModalOpenForCerti(false)} />
      <Awards isOpen={isModalOpenForAwards} onClose={() => setIsModalOpenForAwards(false)} />
    </div>
  );
}

export default Tester;
