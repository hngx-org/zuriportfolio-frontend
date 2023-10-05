import React from 'react';
import FeedbackHeader from './component/FeedbackHeader';
import Feedcard from './component/Feedcard';
import expertBag from '../../public/assets/images/banner/expertBag.png';
import beginner from '../../public/assets/images/banner/bignneerbadge.png';
import intermidiate from '../../public/assets/images/banner/intermediateBadge.png';

const Assesment = () => {
  const exepert = {
    score: '90%',
    img: expertBag,
    badgeName: 'expert',
  };
  const midiate = {
    score: '79%',
    img: intermidiate,
    retake: 'Retake',
    badgeName: 'intermediate',
  };
  const beginer = {
    score: '49%',
    img: expertBag,
    retake: 'Retake',
    intermediate: 'beginner',
  };
  return (
    <div className=" bg-white-300">
      <FeedbackHeader />
      <Feedcard score={exepert.score} badge={exepert.img} badgeName={exepert.badgeName} retake="" />
    </div>
  );
};

export default Assesment;
