'use client';
import Image from 'next/image';
import cover from '../../../../public/assets/images/portfolioLanding/cover.png';
import profile from '../../../../public/assets/images/portfolioLanding/profile.png';
import React, { useState } from 'react';
import Button from '@ui/Button';
import Modal from '@ui/Modal';
import useDisclosure from '../../../../hooks/useDisclosure';
import LandinEmptyState from './landingpage-empty';
import LandingPageFilled from './landingpage-filled';
import Cover from './cover-avatar';

type LandingProps = {
  hasData: boolean;
  setHasData: React.Dispatch<React.SetStateAction<boolean>>;
};
const Landing = ({ hasData, setHasData }: LandingProps) => {
  const [coverImage, setCoverImage] = useState<File | any>(cover);
  const [avatarImage, setAvatarImage] = useState<File | any>(profile);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showProfileUpdate, setShowProfileUpdate] = useState<boolean>(false);
  const [showBuildPortfolio, setShowBuildPortfolio] = useState<boolean>(false);
  const [showViewtemplates, setShowViewtemplates] = useState<boolean>(false);

  const profileUpdate = () => {
    onOpen();
    setShowProfileUpdate((p) => !p);
  };

  const buildPortfolio = () => {
    onOpen();
    setShowBuildPortfolio((p) => !p);
  };

  const viewPortfolio = () => {
    onOpen();
    setShowViewtemplates((p) => !p);
  };

  const modal = () => {
    onClose();
    setShowProfileUpdate(false);
    setShowBuildPortfolio(false);
    setShowViewtemplates(false);
  };

  // const uploadCover = async (coverImage: string | Blob) => {
  //   const formData = new FormData();
  //   formData.append('images', coverImage as string | Blob);
  //   const response = await fetch('https://hng6-r5y3.onrender.com/api/cover/photos', {
  //     method: 'POST',
  //     body: formData,
  //   });
  //   const data = await response.json();
  //   console.log(data);
  // };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    console.log(file);
    if (file) {
      const image = URL.createObjectURL(file);
      console.log(image);
      if (e.target.id === 'coverUpload') {
        setCoverImage(image);
        // await uploadCover(image);
        setHasData(true);
      }
    }
  };

  const headerMargin =
    'mt-[89px] lg:mt-[96px]  h-[200px] md:h-[250px] lg:h-[300px] absolute top-0 left-0 -z-50 w-screen';

  return (
    <>
      {isOpen && (
        <div onClick={modal}>
          {showProfileUpdate && (
            <Modal isOpen={isOpen} closeModal={modal}>
              <p>Awaiting update profile modal</p>
            </Modal>
          )}
          {showBuildPortfolio && (
            <Modal isOpen={isOpen} closeModal={modal}>
              <p>Awaiting build portfolio modal</p>
            </Modal>
          )}
          {showViewtemplates && (
            <Modal isOpen={isOpen} closeModal={modal}>
              <p>Awaiting view template modal</p>
            </Modal>
          )}
        </div>
      )}
      <div className="mx-auto w-[min(90vw,1200px)]">
        <div className="h-[200px] md:h-[250px] lg:h-[300px]">
          {hasData ? (
            <Image src={coverImage} width={0} height={0} alt="cover" className={`${headerMargin}`} />
          ) : (
            <div className={`bg-[#F0F1F0] opacity-80 ${headerMargin}`}> {/* F0F1F0 */}</div>
          )}

          <Cover
            hasData={hasData}
            avatarImage={avatarImage}
            handleUpload={handleUpload}
            profileUpdate={profileUpdate}
          />
        </div>
        {!hasData ? (
          <LandinEmptyState
            buildPortfolio={buildPortfolio}
            hasData={hasData}
            profileUpdate={profileUpdate}
            viewPortfolio={viewPortfolio}
          />
        ) : (
          <LandingPageFilled />
        )}
      </div>
    </>
  );
};

export default Landing;
