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
        <div className="space-y bg-white-100 sm:p-10">
          <form className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-3 my-19">
              <div className="flex justify-between items-center">
                <p className="text-[1.2rem] sm:text-[1.5rem] font-bold text-[#2E3130] font-manropeL">Contact</p>
                <CloseSquare size="32" color="#009254" variant="Bold" onClick={onClose} className="cursor-pointer" />
              </div>
              <div className="bg-brand-green-primary h-1 rounded-sm"></div>
            </div>

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

            <div className="flex flex-col sm:flex-row items-center justify-between mx-auto w-full sm:w-[90%]  sm:gap-2 gap-5">
              <div className="w-full">
                <label className="font-semibold text-[#444846] text-[.9rem] mb-10">Select social</label>
                <Select
                  onValueChange={(value: string) => {
                    setSocial(value);
                  }}
                >
                  <SelectTrigger className="border-[#E1E3E2] w-[100%] border text-xs font-manropeL">
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

              <div className="flex flex-col justify-center w-[100%] h-full">
                <label className="font-semibold text-[#444846] text-[.9rem] mb-[.1rem]">Link to social</label>
                <div className="flex rounded-md justify-center items-center border h-[2.5rem] border-[#E1E3E2]">
                  <span className="font-manropeL w-1/3 text-xs text-center">Type link</span>
                  <Input
                    placeHolder="Enter social link"
                    onChange={(e) => {
                      setSocialLink(e.target.value);
                    }}
                    className="border-[#E1E3E2] w-[100%] rounded-none border-0 border-s h-full text-xs font-manropeL"
                    inputSize={'sm'}
                  />
                </div>
              </div>
            </div>

            <div className="mb-3 font-manropeL mx-auto w-full sm:w-[90%] text-right">
              <span className="font-semibold cursor-pointer text-brand-red-hover">Delete</span>
            </div>
          </form>

          <hr className="mt-1 border-t-1 border-[#E1E3E2] mx-auto w-full sm:w-[90%]" />

          <div className="flex justify-between flex-col sm:flex-row mt-3 gap-3 sm:w-[90%] mx-auto">
            <button className="text-brand-green-primary sm:self-center text-[14px] sm:text-[13px] flex items-center gap-1 font-semibold font-manropeB">
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
              <Button type="submit" className="w-full rounded-md sm:w-[4.5rem] sm:h-[2.5rem]" size={'sm'}>
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
