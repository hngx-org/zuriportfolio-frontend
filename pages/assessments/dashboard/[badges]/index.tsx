import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '@ui/Button';
import MainLayout from '../../../../components/Layout/MainLayout';
import BadgeComponent from '@modules/assessment/component/Badges/BadgeComponent';
import ErrorData from '@modules/assessment/component/Badges/errordata';
import BadgesComponentHeader from '@modules/assessment/component/Badges/BadgesComponentHeader';
import { withUserAuth } from '../../../../helpers/withAuth';

interface Skill {
  id: number;
  category_name: string;
  description: string;
  parent_skill_id: number | null;
  created_at: string;
  updated_at: string;
}

interface Assessment {
  id: number;
  skill_id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  duration_minutes: number;
  pass_score: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Badge {
  id: number;
  skill_id: number;
  name: string;
  min_score: number;
  max_score: number;
  created_at: string;
  updated_at: string;
  Skill: Skill;
}

interface User {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  section_order: string;
  password: string;
  profile_pic: string;
  refresh_token: string;
  created_at: string;
  updated_at: string;
}

interface UserAssessment {
  id: number;
  user_id: string;
  assessment_id: number;
  score: number;
  time_spent: number;
  submisssion_date: string;
  status: string;
  created_at: string;
  updated_at: string;
  Assessment: Assessment;
}

interface BadgeData {
  id: number;
  skill_id: number;
  user_id: string;
  badge_id: number;
  assessment_id: number;
  user_assessment_id: number;
  created_at: string;
  updated_at: string;
  user: User;
  Badge: Badge;
  UserAssessment: UserAssessment;
}

const Earnedbadges: React.FC = () => {
  const router = useRouter();

  const [badges, setBadges] = useState<BadgeData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  function formatDate(dateString: string) {
    const date = new Date(dateString);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  }

  useEffect(() => {
    const bearerToken = localStorage.getItem('zpt');
    console.log(bearerToken);

    const fetchData = async () => {
      try {
        const badgelabel = router.query?.badges;
        console.log(badgelabel);
        if (badgelabel) {
          const apiUrl = `https://staging.zuri.team/api/badges/user/badges?badges=${badgelabel}`;
          console.log(apiUrl);

          const response = await fetch(apiUrl, {
            method: 'GET',
            redirect: 'follow',
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          });

          if (!response.ok) {
            setIsLoading(false);
            setErrorMessage('Error Loading Data');
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setBadges(data.data.badges);
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setErrorMessage('');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router.query]);

  return (
    <MainLayout activePage="marketplace" showDashboardSidebar={false} showFooter={true} showTopbar={true}>
      <div className="w-full flex flex-col items-center h-auto font-manropeL">
        <BadgesComponentHeader />

        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full border-t-4 border-b-4 border-brand-green-pressed h-16 w-16"></div>
          </div>
        ) : errorMessage ? (
          <ErrorData />
        ) : (
          <div className="h-full w-full lg:max-w-[1440px]  lg:px-[60px] xl:px-[100px] px-[40px] flex flex-col justify-start sm:mt-[80px] mt-[34px] lg:mt-[100px] pb-[80px] sm:pb-[200px] gap-[26px]">
            <h1 className="text-[16px] font-[600] leading-[24px] tracking-normal w-full text-center md:text-start capitalize">
              {router.query?.badges} Badges
            </h1>
            {badges.length <= 0 ? (
              <>
                <h2 className="capitalize">Oops You Have Not Earned A {router.query?.badges} Badge Yet </h2>
                <Button href="/assessments/dashboard">Take Assessment</Button>
              </>
            ) : (
              <div className="badgecomponents flex flex-col md:flex-row items-center justif gap-[30px]  md:gap-[24px]  ">
                {badges.map((badge, index) => (
                  <BadgeComponent
                    key={badge.id}
                    imageSrc={`/assets/images/badges/${badge.Badge.name}.png`}
                    imageAlt={`${badge.Badge.name} Page`}
                    title={`${badge.Badge.name}`}
                    description={`Badge earned in the ${badge.Badge.Skill.category_name} category.`}
                    earnedDate={`Earned on: ${formatDate(badge.Badge.Skill.created_at)}`}
                    badgelabel={'nfj'}
                    href="/assessments/dashboard/badge/[id]"
                    as={`/assessments/dashboard/badge/${badge.id}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default withUserAuth(Earnedbadges);
