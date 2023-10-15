import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '@ui/Button';
import MainLayout from '../../../../components/Layout/MainLayout';
import BadgeComponent from '@modules/assessment/component/Badges/BadgeComponent';
import ErrorData from '@modules/assessment/component/Badges/errordata';
import BadgesComponentHeader from '@modules/assessment/component/Badges/BadgesComponentHeader';

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

const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

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
    const fetchData = async () => {
      try {
        const badgelabel = router.query?.badges;
        console.log(badgelabel);
        if (badgelabel) {
          console.log('e dey');
          const apiUrl = `https://demerzel-badges-production.up.railway.app/api/user/009bb007-25c7-414d-96b4-bf28ef149f5d/badges?badge=${badgelabel}`;
          const response = await fetch(apiUrl, { method: 'GET', redirect: 'follow' });

          if (!response.ok) {
            setIsLoading(false);
            setErrorMessage('Error Loading Data');
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setBadges(data.data.badges);
          console.log(data.data.badges[0].Badge.Skill.id);
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
      <div className="w-full h-auto font-manropeL">
        <BadgesComponentHeader />

        {isLoading ? (
          <div className="flex justify-center items-center h-50">
            <div className="animate-spin rounded-full border-t-4 border-b-4 border-brand-green-pressed h-16 w-16"></div>
          </div>
        ) : errorMessage ? (
          <ErrorData />
        ) : (
          <div className="h-full lg:px-[60px] xl:px-[150px] px-[40px] flex flex-col justify-start sm:mt-[80px] mt-[34px] lg:mt-[100px] pb-[80px] sm:pb-[200px] gap-[26px]">
            <h1 className="text-[16px] font-[600] leading-[24px] tracking-normal w-full text-center md:text-start">
              {router.query?.badges} Badges
            </h1>
            {badges.length <= 0 ? (
              <>
                <h2>Oops You Have Not Earned A {router.query?.badges} Badge Yet </h2>
                <Button href="/assessments/take-test/intro">Take Assessment</Button>
              </>
            ) : (
              <div className="badgecomponents flex flex-col md:flex-row items-center justify-between gap-[30px]  md:gap-[24px]  ">
                {badges.map((badge, index) => (
                  <BadgeComponent
                    key={badge.id}
                    imageSrc={`/assets/images/badges/${badge.Badge.name}.png`}
                    imageAlt={`${badge.Badge.name} Page`}
                    title={`${badge.Badge.name}`}
                    description={`Badge earned in the ${badge.Badge.Skill.category_name} category.`}
                    earnedDate={`Earned on: ${formatDate(badge.Badge.Skill.created_at)}`}
                    badgelabel={'nfj'}
                    href="/assessments/dashboard/[badges]/badge/[id]"
                    as={`/assessments/dashboard/${router.query.badges}/badge/${badge.Badge.Skill.id}`}
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

export default Earnedbadges;
