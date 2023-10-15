import Modal from '@ui/Modal';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import close_circle from '../../public/assets/icons/close-circle.svg';
import close1 from '../../public/assets/icons/close1.svg';
import arrow_left from '../../public/assets/icons/arrow-left.svg';
import Button from '@ui/Button';
import axios from 'axios';
import { notify } from '@ui/Toast';

const endpoint = 'https://hng6-r5y3.onrender.com';

const LanguageModal = ({ isOpen, onClose, userId }: { isOpen: boolean; onClose: () => void; userId?: string }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [values, setValues] = useState<string[]>([]);

  const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default form submission
      if (inputValue.trim() !== '' && !values.includes(inputValue)) {
        const empty = '';
        setValues((prevValues) => [...prevValues, inputValue]);
        setInputValue(empty);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
  };

  const handleListItemClick = (clickedValue: string) => {
    const updatedValues = values.filter((value) => value.trim().toLowerCase() !== clickedValue.trim().toLowerCase());
    setValues(updatedValues);
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

  const handleSubmit = () => {
    const userID = 'f8e1d17d-0d9e-4d21-89c5-7a564f8a1e90';
    if (values.length === 0) return;
    const data = {
      userId: userID,
      languages: values,
    };
    axios
      .post(`${endpoint}/api/language`, data)
      .then((res) => {
        notify({
          message: 'Language created successfully',
          position: 'top-center',
          theme: 'light',
          type: 'success',
        });
        setValues([]);
        onClose();
      })
      .catch((err) => {
        notify({
          message: 'Error occurred',
          position: 'top-center',
          theme: 'light',
          type: 'error',
        });
        console.log(err);
      });
  };

  const getAllLanguages = () => {
    const userID = 'f8e1d17d-0d9e-4d21-89c5-7a564f8a1e90';
    axios
      .get(`${endpoint}/api/language/${userID}`)
      .then((res) => {
        const languagesArray: string[] = res.data?.data.map((obj: any) => obj.language);
        setValues(languagesArray ? languagesArray : []);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllLanguages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false}>
      <section className="">
        <section className="flex justify-between items-center border-b-4 pb-3 border-b-[#009254]">
          <section className="flex items-center gap-5">
            <Image src={arrow_left} width={24} height={24} alt="arrow-left" />
            <h4 className="text-2xl font-bold text-[#2E3130]"> Language </h4>
          </section>
          <Image src={close1} width={24} height={24} alt="arrow-left" className="cursor-pointer" onClick={onClose} />
        </section>

        {values.length > 0 && <section className="flex items-center flex-wrap gap-2.5 mt-2 mb-5">{items}</section>}

        <section className="w-full flex items-center mt-10 rounded-lg border border-[#C4C7C6] px-2">
          <input
            type="text"
            className="w-full h-full focus:outline-none text-black text-base font-semibold bg-transparent py-3 placeholder:text-[#8D9290] placeholder:font-normal"
            placeholder="Enter your preferred language and press “ENTER”"
            onChange={handleInputChange}
            onKeyDown={handleEnterKeyPress}
          />
          <Image src={arrow_left} width={24} height={24} alt="arrow-left" className="rotate-[270deg]" />
        </section>

        <section className="mt-8 sm:mt-16 ml-auto w-fit flex justify-end gap-2.5">
          <Button
            onClick={onClose}
            className="border flex justify-center border-[#009444] bg-white-100 py-3 px-5 text-sm sm:text-base font-normal text-text-green-600 text-center rounded-lg hover:bg-white-100 text-[#009444] hover:text-[#009444]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="border flex justify-center border-[#009444] bg-[#009444] py-3 px-5 text-sm sm:text-base font-normal text-white-100 text-center rounded-lg"
          >
            {' '}
            Save{' '}
          </Button>
        </section>
      </section>
    </Modal>
  );
};

export default LanguageModal;
