import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Badges from '@modules/assessment/component/Badges/Badges';
import BadgesHeader from '@modules/assessment/component/Badges/BadgesHeader';
import MainLayout from '../../../components/Layout/MainLayout';

const Page: React.FC = () => {
  const router = useRouter();
  const { badgelabel } = router.query;

  const [scorePercentage, setScorePercentage] = useState<number>(90);
  const [image, setImage] = useState<string>('/assets/images/badges/badge expert.png');
  const [isdownloadOpen, setIsdownloadOpen] = useState(false);
  const onClose = () => {
    setIsdownloadOpen(false);
  };

  useEffect(() => {
    if (badgelabel === 'beginner-badge') {
      setImage('/assets/images/badges/badge expert.png');
    } else if (badgelabel === 'intermediate-badge') {
      setImage('/assets/images/badges/badge intermediary.png');
    } else {
      setImage('/assets/images/badges/badge intermediary.png');
    }
  });

  return (
    <>
      <MainLayout activePage="marketplace" showDashboardSidebar={false} showFooter={true} showTopbar={true}>
        <BadgesHeader />
        <Badges
          scorePercentage={scorePercentage}
          badgelabel={badgelabel}
          image={image}
          setIsdownloadOpen={setIsdownloadOpen}
          isdownloadOpen={isdownloadOpen}
          onClose={onClose}
        />
      </MainLayout>
    </>
  );
};

export default Page;
