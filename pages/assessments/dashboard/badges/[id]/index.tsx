import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '../../../../../components/Layout/MainLayout';

interface BadgeComponentProps {
  locked: boolean;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  earnedDate: string;
  isLocked: boolean;
  href: string;
  badgelabel: string;
  as: string;
}

type AssessmentDetails = {
  assessment_id: number;
  skill_id: number;
  title?: string;
  description: string;
  duration_minutes: string;
  status: string;
  start_date: Date;
  end_date: Date;
};

const BadgeComponent: React.FC<BadgeComponentProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  earnedDate,
  isLocked,
  badgelabel,
}) => {
  const [result, setResult] = React.useState<AssessmentDetails>();
  const id = '02cac250-ccbf-409f-9c67-ecbbdb5bc31e';

  return (
    <Link
      href={`/assessments/dashboard/badge/${badgelabel}`}
      as={`/assessments/dashboard/badge/${id}`}
      passHref
      className="badgecomponent w-[330px] h-[330px] sm:w-[236px] sm:h-[236px] lg:min-w-[300px] lg:min-h-[300px] xl:min-w-[330px] xl:min-h-[330px] p-[16px] flex flex-col items-center border border-neutral-200 rounded-[8px] gap-[12px] relative overflow-hidden"
    >
      {/* {isLocked && (
          <div className="badgelockoverlay absolute w-full h-full top-0 bg-opacity-60 bg-black flex items-center justify-center z-10 ">
          <div className="badgelockimage w-[139px] sm:w-[90px] lg:w-[139px] lg:h-[139px]  h-[139px] sm:h-[90px] relative">
            <Image
              src="/assets/images/badges/badgelock.png"
              fill={true}
              alt="expert reward badge image"
              priority={true}
              />
          </div>
        </div>
      )} */}
      <div className="badgerewardimage w-[160px] h-[128px] relative">
        <Image src={imageSrc} fill={true} alt={imageAlt} style={{ objectFit: 'contain' }} />
      </div>
      <div className="flex flex-col gap-[12px]">
        <h1 className="text-center text-[22px] sm:text-[16px] lg:text-[22px] font-[600]">{title}</h1>
        <p className="text-center block sm:hidden lg:block text-[14px] font-[400] leading-[20px] tracking-wide w-full">
          {description}
        </p>
        <p className="text-center block sm:hidden lg:block font-[700] leading-[20px] tracking-wider">{earnedDate}</p>
      </div>
    </Link>
  );
};

const Earnedbadges: React.FC<BadgeComponentProps> = ({ locked }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const badgelabel = router.query?.id;
  console.log(badgelabel);

  const [badgeData, setBadgeData] = useState(null) as any;
  useEffect(() => {
    const apiUrl = `https://demerzel-badges-production.up.railway.app/api/user/02cac250-ccbf-409f-9c67-ecbbdb5bc31e/badges?badge=${badgelabel}`;

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, { method: 'GET', redirect: 'follow' });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setBadgeData(data);
        console.log(badgeData.data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <MainLayout activePage="marketplace" showDashboardSidebar={false} showFooter={true} showTopbar={true}>
      <div className="w-full h-auto font-manropeL">
        <div className="w-full h-[130px] bg-[#005427] px-[15px] sm:px-[68px] xl:px-[230px] flex items-center sm:justify-start  relative ">
          <div className="gap-[8px] flex flex-col ">
            <h1 className="text-[22px] sm:text-[32px] font-[600] text-white-100 leading-[36px] md:leading-[40px] tracking-normal lg:pr-[100px]">
              Keep tabs on all yours badges
            </h1>
            <p className="text-[14px] leading-[20px] font-[500] text-white-100">
              Start your journey and earn a badge today!
            </p>
          </div>
          <div className="absolute top-0 sm:hidden sm:top-0 right-0  mix-blend-burn lg:hidden block overflow-hidden">
            <Image
              src="/assets/images/badges/bannerexpertsmallbadge.svg"
              width={145}
              height={130}
              alt="expert badge image"
              priority={true}
            />
          </div>
          <div className="absolute right-[5%] md:right-[6%] hidden lg:block mix-blend-burn  overflow-hidden">
            <Image
              src="/assets/images/badges/expertbadgebanner.svg"
              width={430}
              height={30}
              alt="expert badge image"
              priority={true}
            />
          </div>
          <div className="absolute sm:top-0 right-0 hidden sm:block  mix-blend-burn lg:hidden overflow-hidden">
            <Image
              src="/assets/images/badges/bannerexpertbadge.png"
              width={181}
              height={130}
              alt="expert badge image"
            />
          </div>
          <div className="absolute block sm:hidden top-0 left-0 overflow-hidden">
            <Image
              src="/assets/images/badges/smallscreenexpertfloatingbadge.png"
              width={35}
              height={44}
              alt="expert badge image"
            />
          </div>
          <div className="absolute bottom-0 hidden sm:block sm:right-[20%] md:right-[10%] lg:right-[30%] mix-blend-hard-light ">
            <Image
              src="/assets/images/badges/bannerintermediatebadge.svg"
              width={290}
              height={30}
              alt="expert badge image"
            />
          </div>
          <div className="absolute top-[-20px] sm:top-0 right-0 hidden lg:block">
            <Image
              src="/assets/images/badges/bannerbeginnerbadge.png"
              width={160}
              height={128}
              alt="expert badge image"
            />
          </div>
          <div className="absolute bottom-0 right-0 block sm:hidden mix-blend-hard-light ">
            <Image
              src="/assets/images/badges/bannerintermediatesmallbadge.svg"
              width={100}
              height={30}
              alt="expert badge image"
              priority={true}
            />
          </div>
        </div>
        <div className="h-full lg:px-[60px] xl:px-[150px] px-[40px] flex flex-col justify-start sm:mt-[80px] mt-[34px] lg:mt-[100px] pb-[80px] sm:pb-[200px] gap-[26px]">
          <h1 className="text-[16px] font-[600] leading-[24px] tracking-normal w-full text-center md:text-start">
            Product design Badges
          </h1>
          <div className="badgecomponents flex flex-col md:flex-row  items-center justify-between gap-[94px]  md:gap-[24px]  ">
            {/* beginner badge component */}

            <BadgeComponent
              imageSrc="/assets/images/badges/beginnerbadgereward.png"
              imageAlt="beginner reward badge image"
              title="BEGINNER"
              description="Badge earned in the Product designed category."
              earnedDate="Earned on: Sept 12, 2023"
              isLocked={false}
              locked={true}
              href="/badges/badge/[badge]"
              badgelabel="beginner"
              as={''}
            />
            {/* intermediate badge component */}
            <BadgeComponent
              imageSrc="/assets/images/badges/intermediatebadgereward.png"
              imageAlt="intermediate reward badge image"
              title="INTERMEDIATE"
              description="Badge earned in the Product designed category."
              earnedDate="Earned on: Sept 12, 2023"
              isLocked={true}
              locked={true}
              badgelabel="intermediate"
              href="/badges/badge/[badge]"
              as={''}
            />

            {/* expert badge component */}

            <BadgeComponent
              imageSrc="/assets/images/badges/expertbadgereward.png"
              imageAlt="expert reward badge image"
              title="EXPERT"
              description="Badge earned in the Product designed category."
              earnedDate="Earned on: Sept 12, 2023"
              isLocked={true}
              locked={true}
              badgelabel="expert"
              href="/badges/badge/[badge]"
              as={''}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Earnedbadges;
