import Modal from '@ui/Modal';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import close_circle from '../../public/assets/icons/close-circle.svg';
import close1 from '../../public/assets/icons/close1.svg';
import arrow_left from '../../public/assets/icons/arrow-left.svg';
import Button from '@ui/Button';
import axios from 'axios';
import { notify } from '@ui/Toast';
import { checkObjectProperties } from '@modules/portfolio/functions/checkObjectProperties';
import Loader from '@ui/Loader';
import { AiOutlineClose, AiOutlineCloseCircle } from 'react-icons/ai';

type languageModalProps = {
  onCloseModal: () => void;
  onSaveModal: () => void;
  isOpen: boolean;
  userId: string;
};

const endpoint = 'https://hng6-r5y3.onrender.com';
const programmingLanguages = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C',
  'C++',
  'C#',
  'Go',
  'Rust',
  'Swift',
  'Kotlin',
  'Ruby',
  'PHP',
  'Scala',
  'Elixir',
  'Clojure',
  'Haskell',
  'Lua',
  'Dart',
  'R',
  'Julia',
  'Groovy',
  'Objective-C',
  'CoffeeScript',
  'F#',
  'Perl',
  'MATLAB',
  'VB.NET',
  'Shell Scripting',
];

const LanguageModal = ({ isOpen, onCloseModal, onSaveModal, userId }: languageModalProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [values, setValues] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialoading, setInitialLoading] = useState<boolean>(false);
  const [checks, setChecks] = useState<boolean>(true);

  const languageItems = {
    languages: values,
  };

  const debounce = (func: (...args: any[]) => void, delay: number): ((...args: any[]) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = (searchValue: string) => {
    const filteredSuggestions = programmingLanguages.filter((language) =>
      language.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setSuggestions(filteredSuggestions);
    setShowSuggestions(!!searchValue && filteredSuggestions.length > 0); // Show suggestions only if searchValue is not empty and there is at least a matching suggestion
  };

  const delayedSearch = debounce(handleSearch, 300);

  const handleItemSelect = (value: string) => {
    if (!values.includes(inputValue)) {
      setValues((prevValues) => [...prevValues, value]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    delayedSearch(value);
  };

  const handleListItemClick = (clickedValue: string) => {
    const updatedValues = values.filter((value) => value.trim().toLowerCase() !== clickedValue.trim().toLowerCase());
    setValues(updatedValues);
    handleDelete(updatedValues);
  };

  const handleDelete = async (params: any) => {
    const data = await fetch(`https://hng6-r5y3.onrender.com/api/v1/languages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        languages: params,
      }),
    });
    const response = await data.json();
  };

  const items = values.map((value) => (
    <span
      key={value}
      className="py-1 px-2 flex items-center gap-3 bg-[#E6F5EA] text-sm font-semibold text-[#003A1B]  rounded-lg"
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
    const { allChecksPassed, failedChecks } = checkObjectProperties(languageItems);
    setChecks(allChecksPassed);
    if (allChecksPassed) {
      setLoading(true);
      const data = {
        ...languageItems,
        userId: userId,
        sectionId: 5,
      };
      axios
        .post(`${endpoint}/api/v1/languages`, data)
        .then(async (res) => {
          setLoading(false);
          notify({
            message: 'Language created successfully',
            position: 'top-center',
            theme: 'light',
            type: 'success',
          });
          setValues([]);
          await fetch(`${endpoint}/api/v1/getPorfolio/${userId}`);
          onSaveModal();
        })
        .catch((err) => {
          setLoading(false);
          notify({
            message: 'Error occurred',
            position: 'top-center',
            theme: 'light',
            type: 'error',
          });
        });
    }
  };

  const getAllLanguages = () => {
    setInitialLoading(true);
    axios
      .get(`${endpoint}/api/v1/languages/${userId}`)
      .then((res) => {
        if (res.data.data !== null) {
          setInitialLoading(false);
          const languagesArray: string[] = res.data?.data.map((obj: any) => obj.language);
          setValues(languagesArray ? languagesArray : []);
        }
      })
      .catch((err) => {
        setInitialLoading(false);
      });
  };

  useEffect(() => {
    getAllLanguages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal size="xl" closeOnOverlayClick isOpen={isOpen} closeModal={onCloseModal} isCloseIconPresent={false}>
      {initialoading ? (
        <>
          <Loader />
          <p className="text-center text-green-400 my-3 font-semibold text-lg animate-pulse">Please wait</p>
        </>
      ) : (
        <>
          <section className="py-6 px-16">
            <section className="flex justify-between items-center border-b-4 pb-3 mb-12 border-b-[#009254]">
              <section className="flex items-center gap-5">
                <h4 className="text-[1.2rem] sm:text-[1.4rem] font-bold text-[#2E3130] font-manropeL"> Language </h4>
              </section>
              <button
                className="bg-green-500 w-8 h-8 rounded-lg flex justify-center items-center text-white-100"
                onClick={onCloseModal}
              >
                <AiOutlineClose />
              </button>
            </section>

            {values.length > 0 && <section className="flex items-center flex-wrap gap-2.5 mt-2 mb-5">{items}</section>}

            <section
              className={`w-full flex items-center mt-10 rounded-lg border relative ${
                checks ? 'border-[#C4C7C6]' : 'border-red-205'
              }  px-2`}
            >
              <input
                type="text"
                className={`w-full h-full focus:outline-none text-black text-base font-semibold bg-transparent py-3 placeholder:text-[#8D9290] placeholder:font-normal`}
                placeholder="Search for your preferred language"
                onChange={handleInputChange}
                value={inputValue}
                maxLength={30}
              />
            </section>
            {showSuggestions && (
              <section className="w-full shadow-md h-fit max-h-[80px] overflow-y-auto">
                {suggestions.map((suggestion) => (
                  <span
                    onClick={() => handleItemSelect(suggestion)}
                    className="w-full block font-manropeL text-sm p-2 text-start hover:bg-green-600  hover:text-white-100 cursor-pointer"
                    key={suggestion}
                  >
                    {suggestion}
                  </span>
                ))}
              </section>
            )}

            <section className="mt-8 sm:mt-16 ml-auto w-fit flex justify-end gap-4">
              <Button onClick={onCloseModal} intent={'secondary'} className="w-full rounded-md sm:w-[6rem]" size={'lg'}>
                Cancel
              </Button>
              <Button
                disabled={loading}
                onClick={handleSubmit}
                className={`${loading ? 'opacity-80' : 'opacity-100'} w-full rounded-md sm:w-[6rem]`}
                size={'lg'}
              >
                {' '}
                Save{' '}
              </Button>
            </section>
          </section>
        </>
      )}
    </Modal>
  );
};

export default LanguageModal;
