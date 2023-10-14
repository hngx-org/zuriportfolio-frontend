import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Badges from '@modules/assessment/component/Badges/Badges';
import BadgesHeader from '@modules/assessment/component/Badges/BadgesHeader';
import MainLayout from '../../../../../components/Layout/MainLayout';
import ErrorData from '../../errordata'

const Page: React.FC = () => {
  const router = useRouter();

  const [scorePercentage, setScorePercentage] = useState<number>(0);
  const [isdownloadOpen, setIsdownloadOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [screenLoading, setScreenLoading] = useState<boolean>(false);
  const [badgeName, setbadgeName] = useState<string>('');
  const onClose = () => {
    setIsdownloadOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const badgelabel = router.query?.id;

        if (badgelabel) {
          setIsLoading(true);

          const apiUrl = `https://demerzel-badges-production.up.railway.app/api/badges/${badgelabel}`;
          const response = await fetch(apiUrl, { method: 'GET', redirect: 'follow' });

          if (!response.ok) {
            setIsLoading(false);
            setErrorMessage('Error Loading Data');
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setbadgeName(data.data.badge.Badge.name);
          setScorePercentage(data.data.badge.UserAssessment.score);
          setScorePercentage(data.data.badge.UserAssessment.score);
          console.log(data.data.badge);
          setIsLoading(false);
        }
      } catch (error) {
        setErrorMessage('Error fetching Data');
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, [router.query]);
  console.log(scorePercentage);

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
                scorePercentage={scorePercentage}
                badgelabel={badgeName}
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
