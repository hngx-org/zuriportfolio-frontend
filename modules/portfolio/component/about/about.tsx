'use client';
import React, { useState, useRef, useEffect } from 'react';
import Button from '@ui/Button';
import Modal from '@ui/Modal';

type aboutModalProps = {
  handleCloseAboutModal: () => void;
  isAboutModalOpen: boolean;
};

const PortfolioAbout: React.FC<aboutModalProps> = ({ handleCloseAboutModal, isAboutModalOpen }) => {
  const [text, setText] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [hide, setHide] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState('');
  const [errorBorder, setErrorBorder] = useState('[#E1E3E2]');

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(false);
  };
  const handleDeleteClick = () => {
    setText('');
    setIsEditing(false);
  };

  const submitAbout = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text !== '') {
      if (!isEditing) {
        setIsEditing(!isEditing);
      } else {
        console.log('here is not editing');
      }
    } else {
      console.log('Enter input');
    }
  };

  const handleClick = () => {
    if (text !== '') {
      if (!isEditing) {
        setIsEditing(!isEditing);
        setErrorBorder('[#E1E3E2]');
        setError('');
      } else {
        console.log('successfully loaded!');
      }
    } else {
      setErrorBorder('brand-red-primary');
      setError('This field is required');
    }
  };

  return (
    <Modal
      isOpen={isAboutModalOpen}
      closeModal={() => {
        setHide(!hide);
      }}
      isCloseIconPresent={false}
      size="lg"
    >
      <div className="mx-auto bg-white-100 rounded-md sm:py-2 sm:px-3 md:py-3 md:px-5">
        <div className="flex justify-between border-b-[3.6px] border-brand-green-primary pb-1">
          <span className="font-semibold text-lg">About</span>
          <div
            className="flex item-center justify-center rounded-lg w-6 h-6 bg-brand-green-primary text-white-100 font-semibold cursor-pointer"
            onClick={handleCloseAboutModal}
          >
            x
          </div>
        </div>
        <form className="py-3 md:pt-7" onSubmit={submitAbout}>
          {!isEditing ? (
            <div className="w-full">
              <div className="w-full px-2">
                <label htmlFor="about" className="block font-medium mb-2 text-[#444846]">
                  Description
                </label>
                <textarea
                  className={`resize-none overflow-auto border-[1.2px] border-solid border-${errorBorder} py-2 pl-2 text-dark-600 font-normal rounded-lg outline-none focus:border-brand-green-primary w-full`}
                  name="about"
                  id=""
                  rows={4}
                  value={text}
                  placeholder="Bio"
                  onChange={(e) => {
                    setText(e.target.value);
                    if (e.target.value !== '') {
                      setError('');
                      setErrorBorder('[#E1E3E2]');
                    }
                  }}
                ></textarea>
                <span className="text-brand-red-primary font-normal">{error}</span>
              </div>
            </div>
          ) : (
            <>
              <span className="text-[#737876] inline-block font-normal">{text}</span>
            </>
          )}
          <div className={`flex gap-2 flex-col justify-end mt-10 ${!isEditing ? 'px-3' : 'px-0'}`}>
            {isEditing ? (
              <div className="flex gap-3 justify-end mb-2 font-medium">
                <p onClick={handleEditClick} className="text-blue-300 cursor-pointer">
                  Edit
                </p>
                <p onClick={handleDeleteClick} className="text-brand-red-primary cursor-pointer">
                  Delete
                </p>
              </div>
            ) : (
              ''
            )}
            <div className="flex justify-end font-medium gap-4 mt-0 md:mt-2">
              <Button intent={'secondary'} size={'sm'} className="w-24 rounded-lg" type="button">
                Close
              </Button>
              <Button
                intent={'primary'}
                size={'sm'}
                className="w-24 rounded-lg border-[2px] border-brand-green-primary hover:border-brand-green-hover"
                type="button"
                onClick={handleClick}
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PortfolioAbout;
