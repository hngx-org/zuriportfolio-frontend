import BuyersView from '@modules/dashboard/component/reviews/reviewPages/BuyersView';
import CreateReviewForm from '@modules/dashboard/component/reviews/reviewPages/CreateReviewForm';
import SellersView from '@modules/dashboard/component/reviews/reviewPages/SellersView';
import React from 'react';

export default function page() {
  return (
    <div>
      {/* <SellersView/> */}
      <BuyersView />
      {/* <CreateReviewForm shopNav/> */}
    </div>
  );
}
