import React from 'react';
import MainLayout from '../../../components/Layout/MainLayout';
import OrderDetails from '@modules/dashboard/component/order/OrderDetails/OrderDetails';
import withAuth from '../../../helpers/withAuth';

const details = () => {
  return (
    <MainLayout activePage="orders" showTopbar={true}>
      <OrderDetails />
    </MainLayout>
  );
};

export default withAuth(details);
