'use client';
import { Input } from '@ui/Input';
import React, { useState, useRef, useEffect } from 'react';
import Button from '@ui/Button';
import Modal from '@ui/Modal';

function PortfolioAbout() {
  const [text, setText] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [hide, setHide] = useState('block');
  const inputRef = useRef<HTMLInputElement | null>(null);

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
      } else {
        alert('here is not editing');
      }
    } else {
      alert('Input is required');
    }
  };

  return (
    <Modal isOpen={true} closeModal={() => {}} size="lg">
      <div className="mx-auto bg-white-100 rounded-md">
        <div className="flex justify-between border-b-8 border-brand-green-primary pb-1">
          <span className="font-semibold text-lg">About</span>
        </div>
        <form className="p-6" onSubmit={submitAbout}>
          {!isEditing ? (
            <div className="w-full">
              <div className="w-full">
                <label htmlFor="about" className="block mb-2">
                  Description
                </label>
                <Input
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  type="text"
                  placeHolder="Bio"
                  className="w-full"
                  name="about"
                />
              </div>
            </div>
          ) : (
            <>
              <span className="text-dark-900 inline-block">{text}</span>
              <div className="flex justify-end font-medium gap-4 mt-2">
                <p onClick={handleEditClick} className="text-blue-300 cursor-pointer">
                  Edit
                </p>
                <p onClick={handleDeleteClick} className="text-brand-red-primary cursor-pointer">
                  Delete
                </p>
              </div>
            </>
          )}
          <div className="flex gap-2 justify-end mt-10">
            <Button intent={'secondary'} size={'sm'} className="w-24" type="button">
              Close
            </Button>
            <Button intent={'primary'} size={'sm'} className="w-24" type="button" onClick={handleClick}>
              Save
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default PortfolioAbout;
