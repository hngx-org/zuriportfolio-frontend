import { Input, SelectInput } from '@ui/Input';
import Button from '@ui/Button';
import { I24Support, UserSquare } from 'iconsax-react';
import React, { useEffect, useRef, useState } from 'react';
import { CodeBlock, a11yDark } from 'react-code-blocks';

function ZuriCodeBlock({
  code,
  language,
  showLineNumbers,
}: {
  code: string;
  language: string;
  showLineNumbers: boolean;
}) {
  return <CodeBlock text={code} language={language} showLineNumbers={showLineNumbers} theme={a11yDark} wrapLongLines />;
}

const codes = [
  {
    variant: 'primary',
    code: `   // Primary button
    <Button
          leftIcon={<I24Support color="#fff" />}
          intent={'primary'}
          size={'md'}
          isLoading={loading}
          spinnerColor="#000"
          >
              Primary
      </Button>`,
  },
  {
    variant: 'secondary',
    code: `   // Secondary button
    <Button
          leftIcon={<I24Support color="#06C270" />}
          intent={'secondary'}
          size={'md'}
          isLoading={loading}
          spinnerColor="#000"
          >
              Secondary
      </Button>`,
  },
  {
    variant: 'success',
    code: `   // Success button
    <Button
            leftIcon={<I24Support color="#fff" />}
            intent={'success'}
            size={'md'}
            isLoading={loading}
            spinnerColor="#000"
          >
            Success
          </Button>`,
  },
  {
    variant: 'error',
    code: `   // Error button
    <Button
            leftIcon={<I24Support color="#fff" />}
            intent={'error'}
            size={'md'}
            isLoading={loading}
            spinnerColor="#000"
          >
            Error
          </Button>`,
  },
  {
    variant: 'link',
    code: `   // Link button
    <Button
            leftIcon={<I24Support color="#fff" />}
            intent={'primary'}
            href="#"
            size={'md'}
          >
            Link Button
          </Button>`,
  },
];

function StyleGuide() {
  const [loading, setLoading] = useState(false);
  const [codeSelected, setCodeSelected] = useState(0);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(!loading);
      }, 2000);
    }
  }, [loading]);

  const handleClick = (num: number) => {
    setLoading(true);
    setCodeSelected(num);
  };

  return (
    <div>
      {/* Buttons */}
      <div className="py-5 px-9">
        <h3 className="text-3xl flex justify-center py-10">Buttons</h3>
        <div className="flex items-center justify-center gap-9">
          <Button
            leftIcon={<I24Support color="#fff" />}
            intent={'primary'}
            onClick={() => handleClick(0)}
            size={'md'}
            isLoading={loading}
            spinnerColor="#000"
          >
            Primary
          </Button>
          <Button
            leftIcon={<I24Support color="#06C270" />}
            intent={'secondary'}
            onClick={() => handleClick(1)}
            size={'md'}
            isLoading={loading}
            spinnerColor="#000"
          >
            Secondary
          </Button>
          <Button
            leftIcon={<I24Support color="#fff" />}
            intent={'success'}
            onClick={() => handleClick(2)}
            size={'md'}
            isLoading={loading}
            spinnerColor="#000"
          >
            Success
          </Button>
          <Button
            leftIcon={<I24Support color="#fff" />}
            intent={'error'}
            onClick={() => handleClick(3)}
            size={'md'}
            isLoading={loading}
            spinnerColor="#000"
          >
            Error
          </Button>
          <Button
            leftIcon={<I24Support color="#fff" />}
            intent={'primary'}
            href="#"
            onClick={() => setCodeSelected(4)}
            size={'md'}
          >
            Link Button
          </Button>
        </div>

        <div className="py-5 px-9 r-10">
          <ZuriCodeBlock
            code={codeSelected === codeSelected ? codes[codeSelected].code : ''}
            language={'JavaScript'}
            showLineNumbers={true}
          />
        </div>
      </div>

      {/* Inputs */}

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
