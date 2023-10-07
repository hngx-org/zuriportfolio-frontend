import React from 'react';
import FeedbackHeader from './FeedbackHeader';
import Feedcard from './Feedcard';
import expertBag from '../../../public/assets/images/expertBag.png';
import beginnerImg from '../../../public/assets/images/bignneerbadge.png';
import intermidiate from '../../../public/assets/images/intermediateBadge.png';

const Feedback = () => {
  const exepert = {
    score: '90',
    img: expertBag,
    badgeName: 'Expert',
  };
  const midiate = {
    score: '79',
    img: intermidiate,
    retake: 'Retake',
    badgeName: 'Intermediate',
  };
  const beginner = {
    score: '49',
    img: beginnerImg,
    retake: 'Retake',
    badgeName: 'Beginner',
  };
  return (
    <div className=" bg-white-300 w-full">
      <FeedbackHeader />
      <Feedcard score={beginner.score} badge={beginner.img} badgeName={beginner.badgeName} retake="" />
    </div>
  );
};

export default Feedback;
