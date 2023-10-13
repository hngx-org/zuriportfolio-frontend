import React, { useState } from 'react';
import Image from 'next/image';
import mainImage from '../../../../../public/assets/mainImage.png';
import profileimage from '../../../../../public/assets/profile.png';
import badgesanctioned from '../../../../../public/assets/BadgeSanctioned.svg';
import star1 from '../../../../../public/assets/star1.svg';
import star2 from '../../../../../public/assets/star2.svg';
import Button from '@ui/Button';
import Slider from '../../../../../modules/shop/component/slider';
import SuperAdminNavbar from '../../navigations/SuperAdminNavbar';
import arrowRight from '../../../../../public/assets/arrowtoRight.svg';
import { useRouter } from 'next/router';
import { useRemoveSanction } from '../../../../../http';
import { toast } from 'react-toastify';

const SuperAdminProdDetails = ({
  setOpenModal,
  data,
  id,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: Record<string, any> | null;
  id: string;
}) => {
  const route = useRouter();
  const [image, setImage] = useState(mainImage);
  const { removeSanction, isLoading } = useRemoveSanction();

  const updateImage = (newImage: any) => {
    setImage(newImage);
  };

  const handleRemoveSaction = () => {
    removeSanction(id, {
      onSuccess: (response) => {
        toast.error(response.message);
        // route.push('.');
      },
      // onError: () => {
      //   toast.error('Error, try again.');
      // },
    });
  };

  function formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}-${month}-${year}`;
  }

  return (
    <>
      <SuperAdminNavbar />
      <div className="container">
        <div className="lg:mx-5 mx-3">
          <div className="flex gap-[16px] py-3 border-b-[1px] border-custom-color1">
            <Image src={arrowRight} alt="arrowRight" onClick={() => route.push('.')} className="cursor-pointer" />
            <p className="font-manropeB text-[18px] font-medium text-gray-900">Products Details</p>
          </div>
          <div className="flex gap-[28px] items-center flex-col lg:flex-row mb-8">
            <div className="flex flex-col mt-6 gap-[16px] lg:w-1/2">
              <Image
                src={image}
                alt="Main Image"
                className="w-full lg:h-[520px] md:h-[600px] h-[340px] object-cover rounded-3xl"
              />
              <Slider updateImage={updateImage} />
            </div>

            <div className="flex w-full lg:w-1/2 lg:mt-6 flex-col">
              <h1 className="font-manropeEB md:text-[32px] text-[22px] mb-2 lg:font-semibold text-custom-color11 font-bold  ">
                {data?.name}
              </h1>

              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-[4px] items-start ">
                  <Image src={profileimage} alt="profileimg" />
                  <p className="font-manropeB font-semibold tracking-[0.035px] md:tracking-[0.08px]">Fola Kingsley</p>
                </div>
                <div className="flex space-y-2 items-end flex-col">
                  <div className="flex font-manropeB gap-[18px] text-custom-color43 text-[12px]">
                    <p className="font-bold">Date Added</p>
                    <p>{formatDate(data?.createdAt)}</p>
                  </div>
                  <div className="flex font-manropeB text-custom-color43  gap-[18px] text-[12px]">
                    <p className="font-bold">
                      Date {route.pathname.includes('sanctioned-products') ? 'Sanctioned' : 'Deleted'}
                    </p>
                    <p>{formatDate(data?.updatedAt)}</p>
                  </div>
                  {route.pathname.includes('sanctioned-products') ? (
                    <Image src={badgesanctioned} alt="badgeStatus" />
                  ) : (
                    <div className="flex bg-pink-120 text-custom-color34 rounded-2xl py-0.5 pl-1.5 pr-2 text-center font-manropeL text-xs font-medium md:flex items-center justify-center gap-2">
                      <span className="inline-block w-2 h-2 bg-custom-color34 rounded-full"></span>
                      <span className=" capitalize">Deleted</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-y-4 flex-col pb-6">
                <p className="font-manropeL text-[12px] md:text-[16px] md:tracking-[0.08px] text-white-700 lg:text-[16px]">
                  {data?.description}
                </p>

                <div className="flex flex-col gap-y-2 ">
                  <div className="flex gap-x-1">
                    <p className=" text-base font-semibold font-manropeB leading-normal tracking-[0.08px]">3.3/5</p>
                    <Image src={star1} alt="rating star" />
                    <Image src={star1} alt="rating star" />
                    <Image src={star1} alt="rating star" />
                    <Image src={star2} alt="rating star" />
                    <Image src={star2} alt="rating star" />
                  </div>
                  <p className="text-base font-manropeL text-[14px] leading-normal tracking-[0.035px] md:text-[16px] lg:tracking-[0.08px]">
                    (50 Customers)
                  </p>
                </div>
              </div>
              <div className="flex space-y-8  lg:space-y-4 flex-col">
                <div className="flex flex-col space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="font-manropeB text-[14px]  tracking-[0.035px] text-custom-color43  md:text-[16px]">
                      Sales Price (Incl. taxes)
                    </p>
                    <p className="font-manropeB text-[16px]  font-semibold md:text-[24px]"> ${data?.tax}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-manropeB text-[14px]  tracking-[0.035px] text-custom-color43  md:text-[16px]">
                      Collection(s)
                    </p>
                    <p className="font-manropeB text-[16px]  font-semibold md:text-[24px]"> Templates, Courses</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-manropeB text-[14px]  tracking-[0.035px] text-custom-color43  md:text-[16px]">
                      Total Sold
                    </p>
                    <p className="font-manropeB text-[16px]  font-semibold md:text-[24px] "> {data?.price}</p>
                  </div>
                </div>

                <div className="flex py-8 justify-center space-x-9">
                  <Button
                    intent={'secondary'}
                    className="text-brand-red-primary active:bg-brand-red-pressed hover:bg-brand-red-hover hover:text-white-100 border-brand-red-primary lg:w-[284.5px] lg:h-[60px] md:w-[359px] md:h-[52px] w-[145.5px]"
                    onClick={() => setOpenModal(true)}
                  >
                    <span className="font-manropeL text-[12px]">Permanently Delete</span>
                  </Button>
                  <Button
                    intent={'primary'}
                    className="lg:w-[284.5px] lg:h-[60px]lg:w-[284.5px] lg:h-[60px] md:w-[359px] md:h-[52px] w-[145.5px]"
                    isLoading={isLoading}
                    onClick={route.pathname.includes('sanctioned-products') ? handleRemoveSaction : () => null}
                  >
                    <span className="font-manropeL text-[12px]">
                      {route.pathname.includes('sanctioned-products') ? 'Remove Sanction' : 'Restore'}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdminProdDetails;
