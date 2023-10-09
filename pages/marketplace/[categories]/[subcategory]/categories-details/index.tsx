import CategoryAllDetails from '@modules/marketplace/categoryDetailsPage';

import MainLayout from '../../../../../components/Layout/MainLayout';

const category = 'CategoryAllDetails';

export default function Home() {
  return (
    <MainLayout activePage="marketplace" showDashboardSidebar={false} showFooter={true} showTopbar={true}>
      <CategoryAllDetails category={category} />
    </MainLayout>
  );
}
