import React, { useState, useRef } from 'react';
import { types } from 'util';
import { Copy, CloseCircle } from 'iconsax-react';
import Modal from '@ui/Modal';
import Image from 'next/image';
import Social from '../../../../public/assets/inviteAssets/Social.svg';
import Social2 from '../../../../public/assets/inviteAssets/Social2.svg';
import Social3 from '../../../../public/assets/inviteAssets/Social3.svg';
import Social1 from '../../../../public/assets/inviteAssets/Social1.svg';
import Share from '../../../../public/assets/inviteAssets/share-01.svg';

export default function InviteLink() {
  const copyInvite = useRef<any>(null);
  const handleCopyToClipboard = () => {
    if (copyInvite.current) {
      copyInvite.current.select();
      document.execCommand('copy');
      alert('Text copied to clipboard!');
    }
  };

  const [openModal, setOPenModal] = useState<boolean>(false);
  const toggleModal = () => {
    setOPenModal((prev: boolean) => !prev);
  };
  return (
    <div className={`space-y-5 font-manropeB   `}>
      <p className="fon  text-dark-110 text-md">invite your friends </p>
      <p className="text-white-650 font-manropeEB font-normal text-sm">
        use your referral link to help us grow the community and receive reward{' '}
      </p>
      <div className="w-fit flex boder-[1px]  rounded-md border-dark-[#D0D5DD] ">
        <input
          type="text"
          id="invite"
          ref={copyInvite}
          className="py-1 appearance-none outline-none  border-[1px]  px-2 text-[12px] rounded-l-md text-[#667085]"
          value="tftyfugfuigihijh?=pleroma"
          readOnly
        />
        <button
          onClick={handleCopyToClipboard}
          className="py-1 px-2 border-[1px] border-l-0  text-[12px]
         border-dark-100 w-fit flex rounded-r-md items-center gap-1 text-[#344054]"
        >
          <Copy size={12} />
          copy
        </button>
      </div>
      <div>
        <button
          onClick={() => toggleModal()}
          className="text-brand-green-primary appearance-none w-fit font-normal flex items-center gap-1 text-sm"
        >
          <Image src={Share} height={10} width={20} alt="so" />
          share
        </button>
      </div>
      <Modal isOpen={openModal} closeModal={toggleModal} size={'sm'} isCloseIconPresent={false}>
        <div className="block  font-manropeB space-y-4 p-6">
          <div className="w-full flex justify-between items-center text-brand-green-primary text-md">
            <p className=" font-semibold">share</p>
            <span onClick={toggleModal}>
              <CloseCircle size="32" color="#009254" />
            </span>
          </div>
          <p className=" text-[#8d9290] font-manropeEB font-normal">
            share your referal link to help us grow the community
          </p>
          <div className="flex  w-[90%] justify-between">
            <Image src={Social} height={30} width={30} alt="so" />
            <Image src={Social1} height={30} width={30} alt="so" />
            <Image src={Social2} height={30} width={30} alt="so" />
            <Image src={Social3} height={30} width={30} alt="so" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
