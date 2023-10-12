import { Input, SelectInput } from '@ui/Input';
import Button from '@ui/Button';
import {
  ArrowDown,
  ArrowDown2,
  ArrowUp,
  ArrowUp2,
  EmptyWalletAdd,
  Eye,
  EyeSlash,
  I24Support,
  UserSquare,
} from 'iconsax-react';
import React, { useEffect, useRef, useState } from 'react';
import { CodeBlock, a11yDark } from 'react-code-blocks';
import SampleModal from '../components/Modals/SampleModal';
import useDisclosure from '../hooks/useDisclosure';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
import { notify } from '@ui/Toast';

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
  const [defaultInpType, setDefaultInpType] = useState<'password' | 'text'>('password');
  const [isDdOpen, setIsDdOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

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

  const handleToast = () => {
    notify({
      message: '🦄 Wow so easy!',
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
      type: 'success',
    });
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
          <a className="text-green-500 hover:text-green-800" href="#toasts">
            Toast
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
            onClick={(e) => handleClick(1)}
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

      {/* Toasts */}
      <div className="py-1 px-9 pb-10" id="toasts">
        <h3 className="text-3xl flex justify-center py-10">Toasts</h3>
        <div className="flex items-center justify-center gap-9">
          <Button intent={'primary'} onClick={() => handleToast()} size={'md'}>
            Show Toast
          </Button>
        </div>

        <div className="py-5 px-9 r-10">
          <ZuriCodeBlock
            code={`   // Toast
  import { notify } from '@ui/Toast';

  const handleToast = () => {
          notify({
            message: '🦄 Wow so easy!',
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            type: "success",
          });
  }

  <Button intent={'primary'} onClick={handleToast} size={'md'}>Show Toast </Button>
`}
            language={'JavaScript'}
            showLineNumbers={true}
          />
        </div>
      </div>

      {/* Inputs */}
      <div className="py-1 px-9 pb-10" id="inputs">
        <h3 className="text-3xl flex justify-center py-10">Inputs</h3>
        <div className="flex items-center justify-center gap-9">
          <Select onOpenChange={() => setIsDdOpen(!isDdOpen)} onValueChange={(value) => setSelectedValue(value)}>
            <SelectTrigger
              rightIcon={
                isDdOpen ? (
                  <ArrowUp2 />
                ) : selectedValue.length === 0 ? (
                  <ArrowDown2 />
                ) : (
                  <span className="text-dark-100">{selectedValue}</span>
                )
              }
              className="w-[180px]"
            >
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>

          <SelectInput
            leftIcon={<I24Support color="#777" />}
            inputSize={'md'}
            options={[
              {
                value: 'helpme2',
                label: 'With left icon',
                disabled: false,
              },
              {
                value: 'helpme',
                label: 'some random placeholder',
                disabled: true,
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
            rightIcon={
              defaultInpType === 'text' ? (
                <Eye color="#777" onClick={() => setDefaultInpType('password')} />
              ) : (
                <EyeSlash color="#777" onClick={() => setDefaultInpType('text')} />
              )
            }
            type={defaultInpType}
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

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';

// Flexible select input
// This allows you to customize the select input however way yu want using className.


<Select
  onValueChange={(value) => {
    console.log(value);
  }}
>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>
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
