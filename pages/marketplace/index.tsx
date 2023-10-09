import Link from 'next/link';
import MainLayout from '../../components/Layout/MainLayout';
import LandingPage from '../../modules/marketplace/component/landingpage/landing-page';

function Home() {
  return (
    <MainLayout activePage="marketplace" showDashboardSidebar={false} showFooter={true} showTopbar={true}>
      <LandingPage />
    </MainLayout>
  );
}

export default Home;
