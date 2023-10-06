import { Input, SelectInput } from '@ui/Input';
import Button from '@ui/Button';
import { EmptyWalletAdd, I24Support, UserSquare } from 'iconsax-react';
import React, { useEffect, useRef, useState } from 'react';
import { CodeBlock, a11yDark } from 'react-code-blocks';
import SampleModal from '../components/Modals/SampleModal';
import useDisclosure from '../hooks/useDisclosure';

function ZuriCodeBlock({
  code,
  language,
  showLineNumbers,
}: {
  code: string;
  language: string;
  showLineNumbers: boolean;
}) {
  return <CodeBlock text={code} language={language} showLineNumbers={showLineNumbers} theme={a11yDark} />;
}

const codes = [
  {
    variant: 'primary',
    code: `   // Primary button
    import Button from '@ui/Button';

    <Button
          leftIcon={<I24Support color="#fff" />}
          intent={'primary'}
          size={'md'}
          isLoading={true}
          spinnerColor="#000"
          >
              Primary
      </Button>`,
  },
  {
    variant: 'secondary',
    code: `   // Secondary button
    import Button from '@ui/Button';

    <Button
          leftIcon={<I24Support color="#06C270" />}
          intent={'secondary'}
          size={'md'}
          isLoading={true}
          spinnerColor="#000"
          >
              Secondary
      </Button>`,
  },
  {
    variant: 'success',
    code: `   // Success button
    import Button from '@ui/Button';

    <Button
            leftIcon={<I24Support color="#fff" />}
            intent={'success'}
            size={'md'}
            isLoading={true}
            spinnerColor="#000"
          >
            Success
          </Button>`,
  },
  {
    variant: 'error',
    code: `   // Error button
    import Button from '@ui/Button';

    <Button
            leftIcon={<I24Support color="#fff" />}
            intent={'error'}
            size={'md'}
            isLoading={true}
            spinnerColor="#000"
          >
            Error
          </Button>`,
  },
  {
    variant: 'link',
    code: `   // Link button
    import Button from '@ui/Button';

    <Button
            leftIcon={<I24Support color="#fff" />}
            intent={'primary'}
            href="#"
            size={'md'}
          >
            Link Button
          </Button>`,
  },
  {
    variant: 'primary',
    code: `   // Size - sm
    import Button from '@ui/Button';

    <Button intent={'primary'} size={'sm'}>
            Size - sm
    </Button>`,
  },
  {
    variant: 'primary',
    code: `   // Size - lg
    import Button from '@ui/Button';
    
    <Button intent={'primary'} size={'lg'}>
            Size - lg
    </Button>`,
  },
];

function StyleGuide() {
  const [loading, setLoading] = useState(false);
  const [codeSelected, setCodeSelected] = useState(0);
  const { isOpen, onClose, onOpen } = useDisclosure();

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
      {/* Navigation */}
      <ul className="flex flex-wrap md:flex-nowrap gap-6 py-5 px-9">
        <li className="mr-6 mb-4 md:mb-0">
          <a className="text-green-500 hover:text-green-800" href="#buttons">
            Buttons
          </a>
        </li>
        <li className="mr-6 mb-4 md:mb-0">
          <a className="text-green-500 hover:text-green-800" href="#inputs">
            Inputs
          </a>
        </li>
      </ul>

      {/* Buttons */}
      <div className="py-0 px-9" id="buttons">
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
          <Button leftIcon={<I24Support color="#fff" />} onClick={onOpen} size={'md'}>
            Open Modal
          </Button>
        </div>
        <div className="flex items-center justify-center gap-9 pt-10">
          <Button intent={'primary'} onClick={() => setCodeSelected(5)} size={'sm'}>
            Size - sm
          </Button>
          <Button intent={'primary'} onClick={() => setCodeSelected(6)} size={'lg'}>
            Size - lg
          </Button>
          <Button
            leftIcon={<I24Support color="#fff" />}
            intent={'primary'}
            onClick={() => handleClick(7)}
            size={'md'}
            disabled
            spinnerColor="#000"
          >
            Disabled
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
      <div className="py-1 px-9 pb-10" id="inputs">
        <h3 className="text-3xl flex justify-center py-10">Inputs</h3>
        <div className="flex items-center justify-center gap-9">
          <SelectInput
            leftIcon={<I24Support color="#777" />}
            inputSize={'md'}
            options={[
              {
                value: 'helpme2',
                label: 'With left icon',
              },
              {
                value: 'helpme',
                label: 'some random placeholder',
              },
            ]}
            disabled={false}
            intent="default"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
          <Input
            onChange={(e) => {
              console.log(e.target.value);
            }}
            leftIcon={<UserSquare color="#777" />}
            type="email"
            intent={'default'}
            disabled={false}
          />
          <Input
            onChange={(e) => {
              console.log(e.target.value);
            }}
            type="email"
            intent={'default'}
            placeHolder="Disabled"
            disabled={true}
          />
        </div>
        <div className="flex items-center justify-center gap-9 pt-5">
          {/* Select */}
          <SelectInput
            inputSize={'md'}
            options={[
              {
                value: 'helpme2',
                label: 'Without Icon',
              },
              {
                value: 'helpme',
                label: 'some random placeholder',
              },
            ]}
            disabled={false}
            intent="default"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />

          {/* Inout */}
          <Input
            onChange={(e) => {
              console.log(e.target.value);
            }}
            type="email"
            intent={'default'}
            disabled={false}
            placeHolder="Without Icon"
          />
          <Input
            onChange={(e) => {
              console.log(e.target.value);
            }}
            type="email"
            intent={'default'}
            inputSize={'lg'}
            placeHolder="Size - lg and right Icon"
            rightIcon={<EmptyWalletAdd color="#777" />}
          />
        </div>
        <div className="py-5 px-9 r-10">
          <ZuriCodeBlock
            code={`   // Input and Select
  import { Input, SelectInput } from '@ui/Input';

  <Input
        onChange={(e) => {
            console.log(e.target.value);
        }}
        type="email"
        intent={'default'}
        size={'lg'}
        placeHolder="Size - lg and right Icon"
        rightIcon={<EmptyWalletAdd color="#777" />}
      />
  
      // Select

  <SelectInput
          size={'md'}
          options={[
            {
              value: 'helpme2',
              label: 'Without Icon',
            },
            {
              value: 'helpme',
              label: 'some random placeholder',
            },
          ]}
          disabled={false}
          intent="default"
          onChange={(e) => {
            console.log(e.target.value);
          }}
/>
`}
            language={'JavaScript'}
            showLineNumbers={true}
          />
        </div>
      </div>

      {/* {'Modals'} */}
      <div className="">
        <SampleModal isOpen={isOpen} onClose={onClose} />
      </div>
    </div>
  );
}

export default StyleGuide;
