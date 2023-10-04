import Button from '@ui/Button';
import { I24Support } from 'iconsax-react';
import React, { useEffect, useState } from 'react';

function StyleGuide() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(!loading);
      }, 2000);
    }
  }, [loading]);
  return (
    <div className="py-5 px-9">
      <Button
        leftIcon={<I24Support color="#fff" />}
        intent={'error'}
        onClick={() => setLoading(true)}
        size={'md'}
        isLoading={loading}
        spinnerColor="#000"
      >
        Button
      </Button>
    </div>
  );
}

export default StyleGuide;
