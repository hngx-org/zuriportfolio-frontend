import React from 'react';
import FeedbackHeader from './FeedbackHeader';
import Feedcard from './Feedcard';
import expertBag from '../../../public/assets/images/expertBag.png';
import beginnerImg from '../../../public/assets/images/bignneerbadge.png';
import intermidiate from '../../../public/assets/images/intermediateBadge.png';

const Feedback = () => {
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
  const beginner = {
    score: '49%',
    img: beginnerImg,
    retake: 'Retake',
    badgeName: 'beginner',
  };
  return (
    <div className=" bg-white-300">
      <FeedbackHeader />
      <Feedcard score={beginner.score} badge={beginner.img} badgeName={beginner.badgeName} retake="" />
    </div>
  );
};

export default Feedback;
