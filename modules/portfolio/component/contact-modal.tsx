import Button from '@ui/Button';
import React, { useState } from 'react';
import { Input } from '@ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
import Modal from '@ui/Modal';
import { Add, CloseSquare } from 'iconsax-react';
import useDisclosure from '../../../hooks/useDisclosure';

function ContactModal() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [email, setEmail] = useState('');
  const [socialLink, setSocialLink] = useState('');
  const [social, setSocial] = useState('');

  return (
    <>
      <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="xl">
        <div className="space-y-6 bg-white-100 p-4 py-5">
          <form className="flex flex-col gap-y-7">
            <div className="flex flex-col gap-3 my-19">
              <div className="flex justify-between items-center">
                <p className="text-[1.2rem] sm:text-[1.5rem] font-bold text-[#2E3130] font-manropeL">Contact</p>
                <CloseSquare size="32" color="#009254" variant="Bold" onClick={onClose} className="cursor-pointer" />
              </div>
              <div className="bg-brand-green-primary h-1 rounded-sm"></div>
            </div>

            <div className="flex flex-col gap-[.5rem] w-[100%]">
              <label className="font-semibold text-[#444846] text-[1rem]">Email</label>
              <Input
                placeHolder="Enter email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="border-[#E1E3E2] w-[100%]"
                inputSize={'lg'}
              />
            </div>

            <div className="flex items-center justify-between w-[100%] my-3">
              <div className=" w-[35%]">
                <label className="font-semibold text-[#444846] text-[1rem] mb-10">Select social</label>
                <Select
                  onValueChange={(value: string) => {
                    setSocial(value);
                  }}
                >
                  <SelectTrigger className="border-[#E1E3E2] w-[100%]">
                    <SelectValue placeholder="Select Social" />
                  </SelectTrigger>
                  <SelectContent className="border-[#E1E3E2]">
                    <SelectItem value="behance">Behance</SelectItem>
                    <SelectItem value="github">Github</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="linkedIn">LikedIn</SelectItem>
                    <SelectItem value="X">X</SelectItem>
                  </SelectContent>
                </Select>
                <p></p>
              </div>
              <div className="flex items-center gap-4 w-[60%]">
                <div className="flex flex-col gap-[.5rem] w-[100%]">
                  <label className="font-semibold text-[#444846] text-[1rem]">Link to social</label>
                  <Input
                    placeHolder="Enter social link"
                    onChange={(e) => {
                      setSocialLink(e.target.value);
                    }}
                    className="border-[#E1E3E2] w-[100%]"
                    inputSize={'lg'}
                  />
                </div>
              </div>
            </div>
            <div className="self-end flex font-manropeL my-2">
              <span className="font-semibold cursor-pointer text-brand-red-hover">Delete</span>
            </div>
          </form>
          <div className="px-3  flex justify-between flex-col sm:flex-row">
            <button className="text-brand-green-primary self-center text-[12px] sm:text-[15px] flex items-center gap-1 font-semibold font-manropeB">
              <Add size="16" color="#009254" /> Add new social
            </button>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                onClick={onClose}
                intent={'secondary'}
                className="w-full rounded-md sm:w-[6rem]"
                size={'lg'}
              >
                Cancel
              </Button>
              <Button type="submit" className="w-full rounded-md sm:w-[6rem]" size={'lg'}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <Button onClick={onOpen} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Open Modal
      </Button>
    </>
  );
}
export default ContactModal;
