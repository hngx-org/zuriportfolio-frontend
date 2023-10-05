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
    <div className="py-5 px-9 flex items-center justify-center gap-9">
      <Button
        leftIcon={<I24Support color="#fff" />}
        intent={'primary'}
        onClick={() => setLoading(true)}
        size={'md'}
        isLoading={loading}
        spinnerColor="#000"
      >
        Button
      </Button>
      <Button
        leftIcon={<I24Support color="#06C270" />}
        intent={'secondary'}
        onClick={() => setLoading(true)}
        size={'md'}
        isLoading={loading}
        spinnerColor="#000"
      >
        Button
      </Button>
      <Button
        leftIcon={<I24Support color="#fff" />}
        intent={'success'}
        onClick={() => setLoading(true)}
        size={'md'}
        isLoading={loading}
        spinnerColor="#000"
      >
        Button
      </Button>
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
      <Button
        leftIcon={<I24Support color="#fff" />}
        intent={'primary'}
        href="#"
        onClick={() => setLoading(true)}
        size={'md'}
      >
        Link Button
      </Button>
    </div>
  );
}

export default StyleGuide;
