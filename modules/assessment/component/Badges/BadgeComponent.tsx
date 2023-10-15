import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface BadgeComponentProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  earnedDate: string;
  href: string;
  badgelabel: string;
  as: string;
}

const BadgeComponent: React.FC<BadgeComponentProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  earnedDate,
  href,
  as,
}) => {
  console.log(as, href);

  return (
    <Link
      href={href}
      as={as}
      passHref
      className="badgecomponent w-[330px] h-[330px] sm:w-[236px] sm:h-[236px] lg:min-w-[300px] lg:min-h-[300px] xl:min-w-[330px] xl:min-h-[330px] p-[16px] flex flex-col items-center border border-neutral-200 rounded-[8px] gap-[12px] relative overflow-hidden"
    >
      <div className="badgerewardimage w-[160px] h-[128px] relative">
        <Image src={imageSrc} fill={true} alt={imageAlt} style={{ objectFit: 'contain' }} />
      </div>
      <div className="flex flex-col gap-[12px]">
        <h1 className="text-center text-[22px] uppercase sm:text-[16px] lg:text-[22px] font-[600]">{title}</h1>
        <p className="text-center block sm:hidden lg:block text-[14px] font-[400] leading-[20px] tracking-wide w-full">
          {description}
        </p>
        <p className="text-center block sm:hidden lg:block font-[700] leading-[20px] tracking-wider">{earnedDate}</p>
      </div>
    </Link>
  );
};

export default BadgeComponent;
