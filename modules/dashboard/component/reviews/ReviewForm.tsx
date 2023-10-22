import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@ui/Button';
import { Input } from '@ui/Input';
import Modal from '@ui/Modal';
import star1 from '../../../../public/assets/star1.svg';
import star2 from '../../../../public/assets/star2.svg';
import { Review, reviewProps } from '../../../../@types';
import axios from 'axios';
import { postReviewByProductId } from '../../../../http/api/controllerReview';
import { useRouter } from 'next/router';
import ReviewSentModal from '../../../../components/Modals/ReviewSentModal';
import { toast } from 'react-toastify';

function ReviewForms() {
  const router = useRouter();
  const { id } = router.query;

  const teamLiquidReviewUrl = 'https://team-liquid-repo.onrender.com/api/review/products/${id}/reviews';

  const [rateNo, setRating] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [load, setLoad] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleStarClick = (starIndex: any) => {
    setRating(starIndex + 1);
  };
  const renderStarImages = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const starImage = i < rateNo ? star1 : star2;
      stars.push(
        <Image
          key={i}
          src={starImage}
          alt="Star"
          className="object-contain lg:w-14 lg:h-14 md:w-10 md:h-10 w-6 h-6 cursor-pointer"
          onClick={() => handleStarClick(i)}
        />,
      );
    }
    return stars;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    setLoad(true);
    if (id) {
      try {
        const newReview: Review = {
          rateNo,
          customerName: name,
          description,
        };
        const config = {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        };
        await axios
          .post(`https://team-liquid-repo.onrender.com/api/review/products/${id}/reviews`, newReview)
          .then((res) => {
            setModalIsOpen(true);
            setTimeout(closeModal, 3000);
            console.log(res);
            // if (res.status === "BAD_REQUEST") {
            //   toast.error(res.data.rateNo);
            //   setLoad(false);
            // }
          });
        console.log(newReview);
        // router.push(`/dashboard/reviews/product-details/${id}`);
        // You can also handle success, show a message, or redirect the user
      } catch (error: any) {
        setLoad(false);
        if (name === '' || description === '' || rateNo === 0) {
          toast.error(
            `Kindly ensure to fill all fields. Remaining: || ${name === '' ? 'Your name ||' : ''} ${
              description === '' ? 'Your review ||' : ''
            } ${rateNo === 0 ? 'Rating ||' : ''}.`,
          );
        }
      }
    }
  };
  function closeModal() {
    setModalIsOpen(false);
    router.back();
  }

  return (
    <div className="flex flex-col h-full w-full justify-center items-center">
      <div className="my-5 mx-auto flex flex-col  w-full  content-center justify-center">
        <div className="flex space-x-2 ">{renderStarImages()}</div>
        <div className="">
          <div className=" my-3">
            <h2 className="font-semibold lg:leading-8 md:leading-6  text-lg md:text-base lg:text-2xl text-[#8D9290] font-manropeEL py-3">
              Name
            </h2>
            <Input
              value={name}
              onChange={handleNameChange}
              type="email"
              intent={'default'}
              inputSize={'lg'}
              placeHolder=""
              className="lg:w-[738px] md:w-[454px] text-black font-semibold  w-[324px]"
            />
          </div>
          <div className=" my-3">
            <h2 className="font-semibold lg:leading-8 md:leading-6 text-lg md:text-base lg:text-2xl text-[#8D9290] font-manropeEL py-3">
              Describe your experience
            </h2>
            <textarea
              title="Description"
              value={description}
              onChange={handleDescriptionChange}
              className="lg:w-[738px] md:w-[454px] border-2 resize-none rounded-[10px] font-semibold border-[#8D9290] font-manropeL text-black hide-caret transition-all select-none focus-within:border-brand-green-primary  px-4 py-3  outline-none  h-[177px] md:h-[240px] lg:h-[400px] relative  flex items-start justify-start w-[324px]"
            ></textarea>
          </div>
          <div className="my-5 ">
            {load === false ? (
              <Button
                onClick={handleSubmit}
                intent={'primary'}
                size={'lg'}
                isLoading={false}
                spinnerColor="#000"
                className="lg:w-[188px] md:w-[104px] w-[90px] "
              >
                Post
              </Button>
            ) : (
              <Button
                intent={'primary'}
                size={'lg'}
                isLoading={true}
                spinnerColor="#000"
                className="lg:w-[188px] md:w-[104px] w-[90px] "
              >
                Post
              </Button>
            )}
          </div>
        </div>
      </div>
      <ReviewSentModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        closeOnOverlayClick={false}
        title="Sent"
      ></ReviewSentModal>
    </div>
  );
}

export default ReviewForms;
