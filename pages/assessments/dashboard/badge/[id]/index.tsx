import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Badges from '@modules/assessment/component/Badges/Badges';
import BadgesHeader from '@modules/assessment/component/Badges/BadgesHeader';
import MainLayout from '../../../../../components/Layout/MainLayout';
import ErrorData from '../../../../../modules/assessment/component/Badges/errordata';

const Page: React.FC = () => {
  const router = useRouter();
  const badgelabel = router.query?.id;
  console.log(badgelabel);

  const [isdownloadOpen, setIsdownloadOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const onClose = () => {
    setIsdownloadOpen(false);
  };

  const [badgeData, setBadgeData] = useState(null) as any;
  useEffect(() => {
    const apiUrl = `https://demerzel-badges-production.up.railway.app/api/user/02cac250-ccbf-409f-9c67-ecbbdb5bc31e/badgeshttps://demerzel-badges-production.up.railway.app/api/user/02cac250-ccbf-409f-9c67-ecbbdb5bc31e/badges?badge=beginner`;

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, { method: 'GET', redirect: 'follow' });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setBadgeData(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(badgeData);

  return (
    <>
      <MainLayout activePage="marketplace" showDashboardSidebar={false} showFooter={true} showTopbar={true}>
        <>
          {isLoading ? (
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full border-t-4 border-b-4 border-brand-green-pressed h-16 w-16"></div>
            </div>
          ) : errorMessage ? (
            <ErrorData />
          ) : (
            <>
              <BadgesHeader />
              <Badges
                scorePercentage={badgeData.data.badges[0].UserAssessment.score}
                badgelabel={badgelabel}
                setIsdownloadOpen={setIsdownloadOpen}
                isdownloadOpen={isdownloadOpen}
                onClose={onClose}
              />
            </>
          )}
        </>
      </MainLayout>
    </>
  );
};

export default Page;
