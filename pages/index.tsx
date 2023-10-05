import Link from 'next/link';
import MainLayout from '../components/Layout/MainLayout';
import Summary from '../components/cart/checkout/Summary';

function Home() {
  return (
    <MainLayout activePage="home" showDashboardSidebar showTopbar>
      <div className="w-full flex items-start justify-start"></div>
    </MainLayout>
  );
}

export default Home;
