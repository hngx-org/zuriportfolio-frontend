import Image from 'next/image';
import Link from 'next/link';

interface BadgeComponentProps {
  locked: boolean;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  earnedDate: string;
  isLocked: boolean;
  // href: string;
  badgelabel: string;
  as: string;
}

const BadgeComponent: React.FC<BadgeComponentProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  earnedDate,
  isLocked,
  badgelabel,
}) => {
  const id = '02cac250-ccbf-409f-9c67-ecbbdb5bc31e';

  return (
    <Link
      href={`/assessments/dashboard/badge/$[id]`}
      as={`/assessments/dashboard/badges/badge/${badgelabel}`}
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

export default BadgeComponent;
