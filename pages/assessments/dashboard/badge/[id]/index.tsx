import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Badges from '@modules/assessment/component/Badges/Badges';
import BadgesHeader from '@modules/assessment/component/Badges/BadgesHeader';
import MainLayout from '../../../../../components/Layout/MainLayout';

const Page: React.FC = () => {
  const params = useRouter();
  const badgelabel = params.query?.id;

  const [scorePercentage, setScorePercentage] = useState<number>(10);
  const [isdownloadOpen, setIsdownloadOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [badgeData, setBadgeData] = useState([]);
  const onClose = () => {
    setIsdownloadOpen(false);
  };

  useEffect(() => {
    const apiUrl = `https://demerzel-badges-production.up.railway.app/api/badges/1`;

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, { method: 'GET', redirect: 'follow' });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setBadgeData(data.badge);
        console.log(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <MainLayout activePage="marketplace" showDashboardSidebar={false} showFooter={true} showTopbar={true}>
        <BadgesHeader />
        <Badges
          scorePercentage={scorePercentage}
          badgelabel={badgelabel}
          setIsdownloadOpen={setIsdownloadOpen}
          isdownloadOpen={isdownloadOpen}
          onClose={onClose}
        />
      </MainLayout>
    </>
  );
};

export default Page;
