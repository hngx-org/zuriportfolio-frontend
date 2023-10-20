import React from 'react';
import MainLayout from '../../../components/Layout/MainLayout';
import SearchModule from '@modules/explore/searchPage';
import SEO from '../ExploreSEO';

export default function Search() {
  return (
    <MainLayout showTopbar={true} showDashboardSidebar={false} activePage="explore">
      <SEO
        title="Zuri Portfolio - Search Talents"
        description="Find the best Talent for your next Project. Filter through our talent pool to find the best fit for your needs that exceeds your expectations."
        image="/assets/explore/seo-image.png"
        url="https://staging.zuri.team/explore/"
      />
      <SearchModule />
    </MainLayout>
  );
}
