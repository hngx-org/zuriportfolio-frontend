import Modal from '@ui/Modal';
import Image from 'next/image';
import { useState } from 'react';
import close_circle from '../../public/assets/icons/close-circle.svg';
import close1 from '../../public/assets/icons/close1.svg';
import add from '../../public/assets/icons/add.svg';
import Button from '@ui/Button';

const InterestModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [values, setValues] = useState<string[]>([]);

  const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default form submission
      if (inputValue.trim() !== '' && !values.includes(inputValue)) {
        setValues((prevValues) => [...prevValues, inputValue]);
        setInputValue('');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value !== '') {
      setInputValue(e.target.value);
    }
  };

  const handleListItemClick = (clickedValue: string) => {
    setInputValue('');
    const updatedValues = values.filter((value) => value.trim().toLowerCase() !== clickedValue.trim().toLowerCase());
    setValues(updatedValues);
  };

  const handleSuggestionAddition = (clickedValue: string) => {
    if (!values.includes(clickedValue)) {
      setValues((prevValues) => [...prevValues, clickedValue]);
    }
  };

  const items = values.map((value) => (
    <span
      key={value}
      className="py-1 px-2 flex items-center gap-3 bg-[#E6F5EA] text-sm font-semibold text-[#003A1B]  rounded-lg"
    >
      {value}
      <Image
        src={close_circle}
        width={24}
        height={24}
        alt="arrow-left"
        className="cursor-pointer"
        onClick={() => handleListItemClick(value)}
      />
    </span>
  ));

  const suggestionsArray = [
    'Dance',
    'Designing',
    'Reading',
    'Writing',
    'Movies',
    'Exercising',
    'Gardening',
    'Producing',
    'Painting',
    'Art',
    'Photography',
  ];
  const suggestions = suggestionsArray.map((suggestion) => (
    <span
      key={suggestion}
      className="border-[#D0D5DD] rounded-lg border bg-white-100 text-[#737876] text-base font-semibold p-4 flex items-center gap-2"
    >
      {suggestion}
      <Image
        src={add}
        width={24}
        height={24}
        alt="add"
        className="cursor-pointer"
        onClick={() => handleSuggestionAddition(suggestion)}
      />
    </span>
  ));

  return (
    <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false}>
      <section className="">
        <section className="flex justify-between items-center border-b-4 pb-3 border-b-[#009254]">
          <section className="flex items-center">
            <h4 className="text-2xl font-bold text-[#2E3130]"> Interest </h4>
          </section>
          <Image src={close1} width={24} height={24} alt="arrow-left" className="cursor-pointer" onClick={onClose} />
        </section>

        {values.length > 0 && <section className="flex items-center flex-wrap gap-2.5 mt-2 mb-5">{items}</section>}

        <section className="w-full flex items-center mt-10 rounded-lg border border-[#C4C7C6] px-2">
          <input
            type="text"
            className="w-full h-full focus:outline-none text-black text-base font-semibold bg-transparent py-3 placeholder:text-[#8D9290] placeholder:font-normal"
            placeholder="Enter your skill and press “ENTER”"
            onChange={handleInputChange}
            onKeyDown={handleEnterKeyPress}
          />
        </section>

        <section className="mt-2.5">
          <h5 className="text-[#009254] text-base font-bold"> Suggestions </h5>

          <section className="flex items-center flex-wrap gap-4 mt-2.5 mb-5">{suggestions}</section>
        </section>

        <section className="mt-8 sm:mt-16 ml-auto w-fit flex justify-end gap-2.5">
          <Button
            onClick={onClose}
            className="border flex justify-center border-[#009444] bg-white-100 py-3 px-5 text-sm sm:text-base font-normal text-[#009444] text-center rounded-lg hover:bg-white-100 hover:text-[#009444]"
          >
            Cancel
          </Button>
          <Button className="border flex justify-center border-[#009444] bg-[#009444] py-3 px-5 text-sm sm:text-base font-normal text-white-100 text-center rounded-lg">
            {' '}
            Save{' '}
          </Button>
        </section>
      </section>
    </Modal>
  );
};

export default InterestModal;
