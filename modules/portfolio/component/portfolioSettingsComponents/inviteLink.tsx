import React, { useState, useRef, useEffect } from 'react';
import { types } from 'util';
import { Copy, CloseCircle } from 'iconsax-react';
import Modal from '@ui/Modal';
import Image from 'next/image';
import Social from '../../../../public/assets/inviteAssets/Social.svg';
import Social2 from '../../../../public/assets/inviteAssets/Social2.svg';
import Social3 from '../../../../public/assets/inviteAssets/Social3.svg';
import Social1 from '../../../../public/assets/inviteAssets/Social1.svg';
import Share from '../../../../public/assets/inviteAssets/share-01.svg';
import { useAuth } from '../../../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import Profile from '../landing/avatars';

export default function InviteLink() {
  const { auth } = useAuth();
  const websiteURL = window.location.origin;
  const profileUrl = `${websiteURL}/portfolio}`;
  const copyInvite = useRef<any>(null);
  const handleCopyToClipboard = () => {
    if (copyInvite.current) {
      copyInvite.current.select();
      document.execCommand('copy');
      toast('copy to clipboard', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const [openModal, setOPenModal] = useState<boolean>(false);

  const toggleModal = () => {
    const idd = '00fdd774-d5c3-46e7-8457-b3bba0603baf';
    setOPenModal((prev: boolean) => !prev);
    // console.log(`${websiteURL}/portfolio`)
  };

  return (
    <div className={`  space-y-4 font-manropeB container mx-auto  `}>
      <p className="  text-dark-110  font-manropeB text-sm md:text-[22px]">Invite your friends! </p>
      <p className="text-white-650 leading-[20px]  font-manropeL  text-sm">
        Use the website link to help us grow the community and get rewards.{' '}
      </p>
      <div className="w-full flex  ">
        <input
          type="text"
          id="invite"
          ref={copyInvite}
          className="  appearance-none font-manropeL
           outline-none px-[8px] border-[1px] leading-6  grow max-w-[232px]
            md:max-w-[268px] height-[24px] border-[#D0D5DD]
             lg:px-[12px] py-[10px] text-[12px] md:text-[14px] rounded-l-md text-[#667085]"
          value={profileUrl}
          readOnly
        />

        <button
          onClick={handleCopyToClipboard}
          className="py-1  px-2 border-[1px] border-l-0 font-manropeL md:text-[16px]   border-[#D0D5DD] text-[12px]
          w-fit flex rounded-r-md items-center gap-1 text-[#344054]"
        >
          <Copy size={20} />
          Copy
        </button>
      </div>
      <div>
        <button
          onClick={() => toggleModal()}
          className="text-brand-green-primary  appearance-none w-fit font-normal flex items-center gap-1 text-sm"
        >
          <Image src={Share} height={16} width={16} alt="share" />
          share
        </button>
      </div>
      <Modal isOpen={openModal} closeModal={toggleModal} size={'sm'} isCloseIconPresent={false}>
        <div className="block  font-manropeB space-y-4  p-6">
          <div className="w-full flex justify-between items-center text-brand-green-primary text-md">
            <p className=" font-semibold">share</p>
            <span onClick={toggleModal}>
              <CloseCircle size="32" color="#009254" />
            </span>
          </div>
          <p className=" text-[#8d9290] font-manropeEL font-normal">
            share your profile link to help us grow the community
          </p>
          <div className="flex  w-[90%] justify-between">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                'Check out my portfolio at ' + profileUrl,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={Social} height={30} width={30} alt="social" />
            </a>

            <a href={`https://wa.me/?text=${encodeURIComponent(profileUrl)}`} target="_blank" rel="noopener noreferrer">
              <Image src={Social1} height={30} width={30} alt="social1" />
            </a>

            <a href={`https://www.instagram.com `} target="_blank" rel="noopener noreferrer">
              <Image src={Social2} height={30} width={30} alt="social2" />
            </a>

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={Social3} height={30} width={30} alt="social3" />
            </a>
          </div>
        </div>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
