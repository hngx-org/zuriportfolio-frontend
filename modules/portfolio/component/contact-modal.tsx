import Button from '@ui/Button';
import React, { useState } from 'react';
import { Input } from '@ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
import Modal from '@ui/Modal';
import { Add, CloseSquare } from 'iconsax-react';
import useDisclosure from '../../../hooks/useDisclosure';

const generateUniqueId = () => {
  const timestamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 10000);
  return `id-${timestamp}-${randomNumber}`;
};

function ContactModal({ isOpen, onClose, userId }: { userId?: string; isOpen: boolean; onClose: () => void }) {
  // const { isOpen, onClose, onOpen } = useDisclosure();
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [socials, setSocials] = useState<any[]>([]);
  const [socialmediaid, setSocialMediaId] = useState('');
  const [isForm, setIsForm] = useState(true);

  const handleAddNewSocial = () => {
    setSocials((prevValues) => [
      ...prevValues,
      {
        id: generateUniqueId(),
        url: '',
        socialId: '',
      },
    ]);
  };

  const handleSocialInputChange = (id: string, newValue: string) => {
    // Find the index of the object with the matching id
    const index = socials.findIndex((item) => item.id === id);

    if (index !== -1) {
      // Creates a new array with the updated content for the specific input
      const updatedData = [...socials];
      updatedData[index] = { ...updatedData[index], url: newValue };

      // Update the state with the new array
      setSocials(updatedData);
    }
  };

  const handleSocialSelectChange = (id: string, newId: string) => {
    // Find the index of the object with the matching id
    const index = socials.findIndex((item) => item.id === id);

    if (index !== -1) {
      // Creates a new array with the updated content for the specific input
      const updatedData = [...socials];
      updatedData[index] = { ...updatedData[index], socialId: newId };

      // Update the state with the new array
      setSocials(updatedData);
    }
  };

  const handleSocialDelete = (id: string) => {
    // Filter out the object with the specified id to delete it
    const filteredData = socials.filter((item) => item.id !== id);

    // Update the state with the filtered array
    setSocials(filteredData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const contactObj = {
      url: url,
      social_media_id: socialmediaid,
      user_id: 'f8e1d17d-0d9e-4d21-89c5-7a564f8a1e90',
    };

    try {
      const res = await fetch('https://hng6-r5y3.onrender.com/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactObj),
      });
      if (res.ok) {
        console.log('Contact created successfully');
      } else {
        console.log('Failed to create contact');
      }
    } catch (err) {
      console.log('error', err);
    }
  };
  const handleDelete = async (e: React.FormEvent) => {
    console.log('delete clicked');
    const id = 5;
    try {
      const res = await fetch(`https://hng6-r5y3.onrender.com/api/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
      });
    } catch (err) {
      console.log('error', err);
    }
  };
  const toggleForm = () => {
    setIsForm(true);
  };
  return (
    <>
      <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="xl">
        <div className="space-y bg-white-100 sm:p-10">
          <form className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-3 my-19">
              <div className="flex justify-between items-center">
                <p className="text-[1.2rem] sm:text-[1.5rem] font-bold text-[#2E3130] font-manropeL">Contact</p>
                <CloseSquare size="32" color="#009254" variant="Bold" onClick={onClose} className="cursor-pointer" />
              </div>
              <div className="bg-brand-green-primary h-1 rounded-sm"></div>
            </div>
            ​
            <div className="flex mx-auto flex-col gap-[.5rem] w-full sm:w-[90%]">
              <label className="font-semibold text-[#444846] text-[.9rem]">Email</label>
              <Input
                placeHolder="Enter email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="border-[#E1E3E2] border w-[100%] font-manropeL rounded-md"
                inputSize={'sm'}
              />
            </div>
            {socials.length > 0 &&
              socials.map((social) => (
                <form key={social.id} onSubmit={handleSubmit} className="flex flex-col gap-y-5">
                  <div className="flex flex-col sm:flex-row items-center justify-between mx-auto w-full sm:w-[90%]  sm:gap-2 gap-5">
                    <div className="w-full">
                      <label className="font-semibold text-[#444846] text-[.9rem] mb-10">Select social</label>
                      <Select
                        onValueChange={(value: string) => {
                          handleSocialSelectChange(social.id, value);
                        }}
                        value={social.socialId}
                      >
                        <SelectTrigger className="border-[#E1E3E2] w-[100%] border text-xs font-manropeL">
                          <SelectValue placeholder="Select Social" />
                        </SelectTrigger>
                        <SelectContent className="border-[#E1E3E2]">
                          <SelectItem value="11">Behance</SelectItem>
                          <SelectItem value="12">Github</SelectItem>
                          <SelectItem value="13">Instagram</SelectItem>
                          <SelectItem value="14">LikedIn</SelectItem>
                          <SelectItem value="15">X</SelectItem>
                        </SelectContent>
                      </Select>
                      <p></p>
                    </div>

                    <div className="flex flex-col justify-center w-[100%] h-full">
                      <label className="font-semibold text-[#444846] text-[.9rem] mb-[.1rem]">Link to social</label>
                      <div className="flex rounded-md justify-center items-center border h-[2.5rem] border-[#E1E3E2]">
                        <span className="font-manropeL w-1/3 text-xs text-center">Type link</span>
                        <Input
                          placeHolder="Enter social link"
                          onChange={(e) => {
                            handleSocialInputChange(social.id, e.target.value);
                          }}
                          className="border-[#E1E3E2] w-[100%] rounded-none border-0 border-s h-full text-xs font-manropeL"
                          inputSize={'sm'}
                          value={social.url}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3 font-manropeL mx-auto w-full sm:w-[90%] text-right">
                    <span
                      className="font-semibold cursor-pointer text-brand-red-hover"
                      onClick={() => handleSocialDelete(social.id)}
                    >
                      Delete
                    </span>
                  </div>
                </form>
              ))}
          </form>
          <hr className="mt-1 border-t-1 border-[#E1E3E2] mx-auto w-full sm:w-[90%]" />
          <div className="flex justify-between flex-col sm:flex-row mt-3 gap-3 sm:w-[90%] mx-auto">
            <button
              className="text-brand-green-primary sm:self-center text-[14px] sm:text-[13px] flex items-center gap-1 font-semibold font-manropeB"
              onClick={handleAddNewSocial}
            >
              <Add size="16" color="#009254" /> Add new social
            </button>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                onClick={onClose}
                intent={'secondary'}
                className="border w-full rounded-md sm:w-[4.5rem] sm:h-[2.5rem]"
                size={'sm'}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full rounded-md sm:w-[4.5rem] sm:h-[2.5rem]"
                size={'sm'}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      {/* <Button onClick={onOpen} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Open Modal
      </Button> */}
    </>
  );
}
export default ContactModal;
