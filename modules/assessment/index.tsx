import React from 'react';
import FeedbackHeader from './component/FeedbackHeader';
// import Feedcard from './component/Feedcard'

const beginer = [
  {
    score: '90%',
  },
];
const Assesment = () => {
  return (
    <div className=" bg-white-300">
      <FeedbackHeader />
      {/* <Feedcard /> */}
    </div>
  );
};

export default Assesment;
