import React from 'react';
import MainLayout from '../../../components/Layout/MainLayout';
import OrderDetails from '@modules/dashboard/component/order/OrderDetails/OrderDetails';

const details = () => {
  return (
    <MainLayout activePage="orders" showTopbar={true}>
      <OrderDetails />
    </MainLayout>
  );
};

export default details;
