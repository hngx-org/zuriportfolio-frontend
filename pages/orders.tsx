import Footer from '../components/Footer';
// import withAuth from '../helpers/withAuth';
import NavDashBoard from '../modules/dashboard/component/Navbar';
import OrderHistory from '../modules/dashboard/component/order/OrderHistory/OrderHistory';

const Orders: React.FC = () => {
  return (
    <>
      <NavDashBoard active="orders" />
      <OrderHistory />
      <Footer />
    </>
  );
};

export default Orders;
