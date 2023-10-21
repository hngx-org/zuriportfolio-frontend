import Modal from '@ui/Modal';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import close_circle from '../../public/assets/icons/close-circle.svg';
import close1 from '../../public/assets/icons/close1.svg';
import add from '../../public/assets/icons/add.svg';
import Button from '@ui/Button';
import axios from 'axios';
import { notify } from '@ui/Toast';
import { checkObjectProperties } from '@modules/portfolio/functions/checkObjectProperties';
import Loader from '@ui/Loader';
import { AiOutlineClose, AiOutlineCloseCircle, AiOutlinePlus } from 'react-icons/ai';

const endpoint = 'https://hng6-r5y3.onrender.com';

type interestModalProps = {
  onCloseModal: () => void;
  onSaveModal: () => void;
  isOpen: boolean;
  userId: string;
};

const InterestModal = ({ isOpen, onCloseModal, onSaveModal, userId }: interestModalProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [values, setValues] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialoading, setInitialLoading] = useState<boolean>(false);
  const [checks, setChecks] = useState<boolean>(true);

  const interestItems = {
    interests: values,
  };

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
      className="py-2 px-2 flex items-center gap-3 bg-[#E6F5EA] text-sm font-semibold text-[#003A1B] font-manropeL rounded-lg"
    >
      {value}
      <span
        className="text-base rounded-full m-auto ml-4 flex items-center justify-center  group-hover/skillsbtn:border-white-100 cursor-pointer"
        onClick={() => handleListItemClick(value)}
      >
        <AiOutlineCloseCircle />
      </span>
    </span>
  ));

  const handleSubmit = () => {
    // checks if all input paramters has been filled, allChecksPassed - returns a boolean, failedChecks returns an array of calues that failed the checks
    const { allChecksPassed, failedChecks } = checkObjectProperties(interestItems);
    setChecks(allChecksPassed);
    if (allChecksPassed) {
      setLoading(true);
      const data = {
        ...interestItems,
        sectionId: 5,
        userId: userId,
      };
      axios
        .post(`${endpoint}/api/v1/interests`, data)
        .then((res) => {
          setLoading(false);
          notify({
            message: 'Interests created successfully',
            position: 'top-center',
            theme: 'light',
            type: 'success',
          });
          setChecks(true);
          setValues([]);
          onSaveModal();
        })
        .catch((err) => {
          setLoading(false);
          notify({
            message: err?.response?.data?.message || 'Error occurred',
            position: 'top-center',
            theme: 'light',
            type: 'error',
          });
          setChecks(true);
          console.log(err);
        });
    }
  };

  const suggestionsArray = [
    'Dance',
    'Designing',
    'Art',
    'Reading',
    'Writing',
    'Movies',
    'Exercising',
    'Gardening',
    'Producing',
    'Painting',
    'Photography',
  ];
  const suggestions = suggestionsArray.map((suggestion) => (
    <li key={suggestion}>
      <Button
        className="text-[#737876] group/addSkillsBtn  bg-white border-2 border-brand-disabled2 hover:text-white-100 focus:text-white-100 "
        onClick={() => {
          handleSuggestionAddition(suggestion);
        }}
        type="button"
      >
        {suggestion}
        <span className="group-hover/skillsbtn:border-white-100">
          <AiOutlinePlus />
        </span>
      </Button>
    </li>
  ));

  const getAllInterests = () => {
    setInitialLoading(true);
    axios
      .get(`${endpoint}/api/v1/interests/${userId}`)
      .then((res) => {
        setInitialLoading(false);
        const interestsArray: string[] = res.data?.interestArray;
        setValues(interestsArray ? interestsArray : []);
      })
      .catch((err) => {
        setInitialLoading(false);
        notify({
          message: err?.response?.data?.message || 'Error occurred when fetching Interests',
          position: 'top-center',
          theme: 'light',
          type: 'error',
        });
      });
  };

  useEffect(() => {
    getAllInterests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal size="xl" closeOnOverlayClick isOpen={isOpen} closeModal={onCloseModal} isCloseIconPresent={false}>
      <section className="py-6 px-16">
        <section className="flex justify-between items-center border-b-4 pb-3 border-b-[#009254]">
          <section className="flex items-center">
            <h4 className="text-[1.2rem] sm:text-[1.4rem] font-bold text-[#2E3130] font-manropeL"> Interest </h4>
          </section>
          <button
            className="bg-green-500 w-8 h-8 rounded-lg flex justify-center items-center text-white-100"
            onClick={onCloseModal}
          >
            <AiOutlineClose />
          </button>
        </section>

        {values.length > 0 && <section className="flex items-center flex-wrap gap-3 mt-10 mb-5">{items}</section>}

        <section
          className={`w-full flex items-center mt-10 mb-2 rounded-lg border ${
            checks ? 'border-[#C4C7C6]' : 'border-red-205'
          } px-2 `}
        >
          <input
            type="text"
            className="w-full h-full focus:outline-none font-manropeL text-black text-base font-semibold bg-transparent py-3 placeholder:text-[#8D9290] placeholder:font-normal"
            placeholder=""
            onChange={handleInputChange}
            onKeyDown={handleEnterKeyPress}
            maxLength={30}
            value={inputValue}
          />
        </section>
        <label htmlFor="" className="text-brand-green-primary mb-2 ">
          Enter your tags and press enter
        </label>
        <section className="mt-5">
          <h5 className="text-green-600 text-base font-extrabold font-manropeL"> Suggestions </h5>
          <ul className=" pt-4 flex gap-6 rounded-sm flex-wrap w-full max-sm:p-2 max-sm:text-sm">{suggestions}</ul>
        </section>

        <section className="mt-8 sm:mt-16 ml-auto w-fit flex justify-end gap-4">
          <Button onClick={onCloseModal} intent={'secondary'} className="w-full rounded-md sm:w-[6rem]" size={'lg'}>
            Cancel
          </Button>
          <Button
            disabled={loading || initialoading}
            onClick={handleSubmit}
            className={`${loading ? 'opacity-80' : 'opacity-100'} w-full rounded-md sm:w-[6rem]`}
            size={'lg'}
          >
            {loading || initialoading ? <Loader /> : 'Save'}
          </Button>
        </section>
      </section>
    </Modal>
  );
};

export default InterestModal;
