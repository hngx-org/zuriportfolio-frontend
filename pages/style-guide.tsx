import Button from '@ui/Button';
import { Input, SelectInput } from '@ui/Input';
import { I24Support, UserSquare } from 'iconsax-react';
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
      {/* <Button
        leftIcon={<I24Support color="#fff" />}
        intent={'primary'}
        onClick={() => setLoading(true)}
        size={'md'}
        isLoading={loading}
        spinnerColor="#000"
      >
        Button
      </Button> */}
      <br />
      <SelectInput
        leftIcon={<I24Support color="#777" />}
        size={'md'}
        options={[
          {
            value: 'helpme2',
            label: 'Help me out2',
          },
          {
            value: 'helpme',
            label: 'some random placeholder',
          },
        ]}
        disabled={false}
        intent="default"
        onChange={(e) => {
          console.log(e.target.value, e.target.name);
        }}
      />
      <br />
      <Input
        onChange={(e) => {
          console.log(e.target.value, e.target.name);
        }}
        leftIcon={<UserSquare color="#777" />}
        type="email"
        intent={'default'}
        disabled={false}
      />
    </div>
  );
}

export default StyleGuide;
