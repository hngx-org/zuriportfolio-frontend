import React, { useEffect, useRef, useState } from 'react';
import Modal from '../ui/Modal';
import Image from 'next/image';
import peaceIcon from '../../public/assets/images/peace-icon.png';
import Button from '@ui/Button';
import { toJpeg, toPng } from 'html-to-image';
import generatePDF, { Margin } from 'react-to-pdf';

function BadgeModal({
  isOpen,
  onClose,
  badgeType,
  score,
}: {
  isOpen: boolean;
  onClose: () => void;
  badgeType: string | string[] | undefined;
  score: number;
}) {
  const [isShown, setIsShown] = useState(false);
  const [hasSelected, setHasSelected] = useState(false);
  const [selection, setSelection] = useState<null | string>(null);

  const downloadRef = useRef<HTMLDivElement>(null);

  const toggleSelection = (event: React.MouseEvent) => {
    event.stopPropagation();
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
    switch (selection?.toLowerCase()) {
      case 'pdf':
        generatePDF(downloadRef, {
          filename: 'zuri-badge.pdf',

          page: {
            margin: Margin.SMALL,
            format: [100, 130],
            orientation: 'portrait',
          },
        });
        break;
      case 'png':
        toPng(downloadRef.current!, {
          backgroundColor: '#fff',
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          },
          cacheBust: true,
        })
          .then((dataUrl) => {
            const link = document.createElement('a');
            link.download = 'zuri-badge.png';
            link.href = dataUrl;
            link.click();
          })
          .catch((err) => {
            console.log(err);
          });
        break;

      default:
        toJpeg(downloadRef.current!, {
          quality: 0.95,
          backgroundColor: '#fff',
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          },
          cacheBust: true,
        })
          .then((dataUrl) => {
            const link = document.createElement('a');
            link.download = 'zuri-badge.jpg';
            link.href = dataUrl;
            link.click();
          })
          .catch((err) => {
            console.log(err);
          });
        break;
    }
  };

  return (
    <Modal isOpen={isOpen} closeModal={onClose} closeOnOverlayClick isCloseIconPresent={false}>
      <div className="bg-white rounded-lg mx-auto flex flex-col gap-[22px] items-center">
        <div ref={downloadRef} className="p-8 flex flex-col gap-8 items-center justify-center">
          <h4 className="text-green-600 font-manropeB font-[700] text-[24px] sm:text-[32px] ">Congratulations!</h4>

          <Image
            src={`/assets/images/badges/${badgeType}.png`}
            alt="user badge"
            className="w-40 border-transparent rounded-full"
            sizes="100vw"
            width={50}
            height={50}
            priority
          />

          <div className="flex gap-2 items-center">
            <h4 className="font-manropeB font-[600] text-[28px] text-xl">{badgeType}</h4>
            <Image
              src={peaceIcon}
              alt="Peace icon"
              className="w-[43px] h-[43px]"
              sizes="100vw"
              width={50}
              height={50}
            />
          </div>
          <p className="font-manrope font-[400] text-[14px] text-center w-[288px] md:w-[399px]">
            You just unlocked the {badgeType} Badge as you have scored {score} points or above by completing this
            assessment.
          </p>
        </div>

        <div className={`flex flex-col gap-2 overflow-y-hidden duration-300 ${isShown ? 'h-[11rem]' : 'h-14'}`}>
          <Button intent={'primary'} onClick={handleDownload}>
            <span>Download</span>
            {hasSelected ? (
              <p onClick={toggleSelection} className="relative z-10">
                {selection}
              </p>
            ) : isShown ? (
              <span onClick={toggleSelection}>
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
              <span onClick={toggleSelection}>
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
