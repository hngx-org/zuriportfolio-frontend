import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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

export default BadgeComponent;
