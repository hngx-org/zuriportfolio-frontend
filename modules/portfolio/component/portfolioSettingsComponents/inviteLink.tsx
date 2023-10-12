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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';

export default function InviteLink() {
  const websiteURL = 'https://zuriportfolio-frontend-pw1h.vercel.app';
  const copyInvite = useRef<any>(null);
  const handleCopyToClipboard = () => {
    if (copyInvite.current) {
      copyInvite.current.select();
      document.execCommand('copy');
      alert('Text copied to clipboard!');
    }
  };

  const [openModal, setOPenModal] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const toggleModal = () => {
    setOPenModal((prev: boolean) => !prev);
  };

  const handleInvite = async (): Promise<void> => {
    try {
      const url = 'https://hng6-r5y3.onrender.com/api/users/f8e1d17d-0d9e-4d21-89c5-7a564f8a1e90';
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        setUserName(data.user.username);
      } else {
        console.error('Failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    handleInvite()
      .then((data) => {
        // Do something when the promise resolves (optional).
      })
      .catch((error) => {
        console.error('Error in handleInvite:', error);
      });
  }, []);

  return (
    <div className={`  space-y-4 font-manropeB container mx-auto  `}>
      <p className="  text-dark-110  font-manropeB text-sm md:text-[22px]">Invite your friends! </p>
      <p className="text-white-650 leading-[20px]  font-manropeL  text-sm">
        Use your referral link to help us grow the community and get rewards.{' '}
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
          value={`portfolio.zuri/invite?=${userName}`}
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
            share your referal link to help us grow the community
          </p>
          <div className="flex  w-[90%] justify-between">
            <a
              href={`https://www.twitter.com/sharer/sharer.php?u=${encodeURIComponent(websiteURL)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={Social} height={30} width={30} alt="social" />
            </a>

            <a
              href={`https://web.whatsapp.com/send?text=${encodeURIComponent(websiteURL)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={Social1} height={30} width={30} alt="social1" />
            </a>

            <a href={`https://www.instagram.com `} target="_blank" rel="noopener noreferrer">
              <Image src={Social2} height={30} width={30} alt="social2" />
            </a>

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteURL)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={Social3} height={30} width={30} alt="social3" />
            </a>
          </div>
        </div>
      </Modal>
    </div>
  );
}
