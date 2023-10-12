import React, { useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import Image from 'next/image';
import badgeExpert from '../../public/assets/images/CATAYST.png';
import badgeInterMediate from '../../public/assets/images/badge-tablet.png';
import badgeBeginner from '../../public/assets/images/badge-reward.png';
import peaceIcon from '../../public/assets/images/peace-icon.png';
import Button from '@ui/Button';
import { useRouter } from 'next/router';

function BadgeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isShown, setIsShown] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);
  const [selection, setSelection] = useState<null | string>(null);
  const [badgeType, setBadgeType] = useState<null | string>(null);

  const router = useRouter();

  useEffect(() => {
    const { badge: level } = router.query;
    if (typeof level === 'string') {
      setBadgeType(level);
    }
  }, [router.query]);

  let badgeImage, badgeTitle, badgeDescription;

  if (badgeType === 'beginner') {
    badgeImage = badgeBeginner;
    badgeTitle = 'Beginner Badge';
    badgeDescription =
      'You just unlocked the Beginner Badge as you have scored 90 points or above by completing this assessment.';
  } else if (badgeType === 'intermediate') {
    badgeImage = badgeInterMediate;
    badgeTitle = 'Intermediate Badge';
    badgeDescription =
      'You just unlocked the Intermediate Badge as you have scored 90 points or above by completing this assessment.';
  } else {
    badgeImage = badgeExpert;
    badgeTitle = 'Expert Badge';
    badgeDescription =
      'You just unlocked the Expert Badge as you have scored 90 points orabove by completing this assessment.';
  }
  const toggleSelection = () => {
    setIsShown((prev) => !prev);
  };

  const handleSelect = (event: React.MouseEvent) => {
    setHasSelected(true);
    setIsShown((prev) => !prev);
    setSelection(event.currentTarget.textContent);
  };

  const handleDownload = () => {
    if (!hasSelected) {
      setIsShown((prev) => !prev);

      return;
    }
    router.push(`/badges/badge/${router.query.badge}/certificate?type=${selection?.toLocaleLowerCase()}`);
  };

  return (
    <Modal isOpen={isOpen} closeModal={onClose} closeOnOverlayClick isCloseIconPresent={false}>
      <div className="bg-white rounded-lg pt-[110px] mx-auto flex flex-col gap-[22px] items-center">
        <h4 className="text-green-600 font-manropeB text-[32px] ">Congratulations!</h4>

        <Image src={badgeImage} alt="user badge" className="w-40" priority />

        <div className="flex gap-2 items-center">
          <h4 className="font-manropeB text-[28px] text-xl">{badgeTitle}</h4>
          <Image src={peaceIcon} alt="Peace icon" className="w-[43px] h-[43px]" />
        </div>
        <p className="font-manrope text-[14px] text-center w-[288px] md:w-[399px]">{badgeDescription}</p>

        <div className={`flex flex-col gap-2 overflow-y-hidden duration-300 ${isShown ? 'h-[11rem]' : 'h-14'}`}>
          <Button
            className="mt-2 px-6 py-3 text-white text-sm w-fit flex items-center gap-4 bg-[#009254] rounded-2xl"
            onClick={handleDownload}
          >
            <span className="text-white-100">Download</span>
            {hasSelected ? (
              <p className="text-white-100">{selection}</p>
            ) : isShown ? (
              <span>
                <svg
                  className="w-5"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.4201 15.7734L13.9001 9.25338C13.1301 8.48338 11.8701 8.48338 11.1001 9.25338L4.58008 15.7734"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            ) : (
              <span>
                <svg
                  className="w-5"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </Button>
          <div className="border border-[#4E4E4E] rounded-md">
            <ul className="text-left flex flex-col">
              <li className="py-1 px-2 cursor-pointer hover:bg-green-300" onClick={handleSelect}>
                PDF
              </li>
              <li className="py-1 px-2 cursor-pointer hover:bg-green-300" onClick={handleSelect}>
                JPG
              </li>
              <li className="py-1 px-2 cursor-pointer hover:bg-green-300" onClick={handleSelect}>
                PNG
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default BadgeModal;
