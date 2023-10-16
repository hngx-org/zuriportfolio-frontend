import Image from 'next/image';
import React from 'react';
import star from '/public/assets/vendor/grade.png';
import star_outline from '/public/assets/vendor/star_outline.png';

function StarRating({ rating }: any) {
  const starElements = [];
  for (let i = 1; i <= rating; i++) {
    starElements.push(<Image key={i} src={star} alt="star" />);
  }

  for (let i = rating + 1; i <= 5; i++) {
    starElements.push(<Image key={i} src={star_outline} alt="star" />);
  }

  return (
    <div className="star-rating flex">
      {starElements.map((element, index) => (
        <span key={index}>{element}</span>
      ))}
    </div>
  );
}

export default StarRating;
