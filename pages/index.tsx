import Link from 'next/link';
import MainLayout from '../components/Layout/MainLayout';

function Home() {
  return (
    <MainLayout activePage="home" showDashboardSidebar showTopbar>
      <p className="text-dark-100">Home Page</p>
    </MainLayout>
  );
}

export default Home;
