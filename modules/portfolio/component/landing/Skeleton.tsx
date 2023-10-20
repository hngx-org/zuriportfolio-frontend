import { ArrowUp, ExportSquare } from 'iconsax-react';
import Image from 'next/image';
import AddShopErrorModal from '../addShopErrorModal';
import { useContext, useEffect, useState } from 'react';
import Portfolio from '../../../../context/PortfolioLandingContext';
import axios from 'axios';
import Link from 'next/link';
import CustomSectionModal from '../custom-section-modal';

// types

type AboutProps = {
  bio?: string;
};

type SkeletonProps = {
  data?: any;
};

// styles

const text = `text-gray-500 text-sm font-light leading-6 font-manropeL tracking-wide [word-spacing:3px]`;
const description = `text-sm text-gray-600 leading-5 font-manropeL tracking-wide`;
const main = `text-gray-800 text-xl font-semibold`;
const date = `text-gray-500 text-sm font-semibold`;
const array = 'grid place-content-center p-2 rounded-lg shadow-[0_0px_4px_1px_rgba(0,0,0,0.1)]';
const arrayText = 'text-base text-gray-800 font-semibold opacity-70';

// components
export const About = ({ bio }: AboutProps) => {
  return <p className={text}>{bio}</p>;
};

export const WorkExperience = ({ data }: SkeletonProps) => {
  const endYear = data.isEmployee ? 'Present' : data.endYear;

  function formatDuration(startMonth: string, startYear: string, endMonth: string, endYear: string): string {
    const startDate = new Date(`${startMonth} 1, ${startYear}`);
    const endDate = new Date(`${endMonth} 1, ${endYear}`);

    const durationInMilliseconds = endDate.getTime() - startDate.getTime();
    const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
    const years = Math.floor(durationInMilliseconds / millisecondsInYear);
    const remainingMilliseconds = durationInMilliseconds - years * millisecondsInYear;
    const months = Math.floor(remainingMilliseconds / (1000 * 60 * 60 * 24 * 30.44));

    return `${years} yrs ${months} months`;
  }

  const duration = formatDuration(data.startMonth, data.startYear, data.endMonth, data.endYear);

  return (
    <div className="flex flex-col justify-start md:justify-between  items-start gap-x-10 gap-y-2 mb-5">
      <div className="">
        <h3 className={`${main}`}>{data?.company}</h3>
        <p className={`${date}`}>{duration}</p>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className={`font-bold text-gray-700 text-lg`}>{data?.role}</h3>
        <p className={`${date}`}>
          <span>
            {data?.startMonth} {data?.startYear}
          </span>{' '}
          -{' '}
          <span>
            {data?.endMonth} {data?.endYear}
          </span>
        </p>
        <p className={description}>{data?.description}</p>
      </div>
    </div>
  );
};

export const Skill = ({ data }: SkeletonProps) => {
  return (
    <div className="flex flex-wrap gap-5 justify-start items-start mt-2">
      {data?.map((skill: any, i: number) => (
        <span className={array} key={i}>
          <p className={arrayText}>{skill.skills}</p>
        </span>
      ))}
    </div>
  );
};

export const Interests = ({ data }: SkeletonProps) => {
  return (
    <div className="flex flex-wrap gap-5 justify-start items-start mt-2">
      {data?.length > 0 &&
        data?.map((interest: any, i: number) => {
          return (
            <span className={array} key={i}>
              <p className={arrayText}>{interest}</p>
            </span>
          );
        })}
    </div>
  );
};

export const Language = ({ data }: SkeletonProps) => {
  return (
    <div className="flex flex-wrap gap-5 justify-start items-start">
      {data?.map((language: any, i: number) => (
        <span className={array} key={i}>
          <p className={arrayText}>{language.language}</p>
        </span>
      ))}
    </div>
  );
};

export const Awards = ({ data }: SkeletonProps) => {
  return (
    <div className="flex flex-col justify-start items-start gap-1 mb-6">
      <p className={date}>Award year - {data?.year}</p>
      <h3 className={main}>{data?.title}</h3>
      <a
        className="flex flex-row justify-center items-center text-base font-manropeB text-brand-green-primary break-all"
        target="_blank"
        href={data?.url}
        rel="noreferrer"
      >
        {data?.url}{' '}
        <span>
          <ArrowUp size={20} className="rotate-45 inline ms-1" />
        </span>
      </a>
      <p className={description}>{data?.description}</p>
    </div>
  );
};

export const Reference = ({ data }: SkeletonProps) => {
  return (
    <div className="flex flex-col flex-wrap mb-4">
      <div className="flex flex-col" key={data.id}>
        <span className={main}>{data.referer}</span>
        <span className={text}>{data.position}</span>
        <span className={text}>{data.company}</span>
        <span className={text}>{data.email}</span>
        <span className={text}>{data.phone_number}</span>
      </div>
    </div>
  );
};

export const Certificate = ({ data }: SkeletonProps) => {
  return (
    <div className="flex flex-col justify-center items-start gap-1 mb-6">
      <h3 className={main}>{data?.title}</h3>
      <p className={text}>{data?.organization}</p>
      <p className={date}>Certificate year - {data?.year}</p>
      <a
        className="flex justify-center items-center text-base font-manropeB text-brand-green-primary cursor-pointer"
        target="_blank"
        href={data?.url}
        rel="noreferrer"
      >
        {data?.url}
        <ArrowUp size={20} className="rotate-45 inline ms-1" />
      </a>
      <p className={description}>{data?.description}</p>
    </div>
  );
};

export const Education = ({ data }: SkeletonProps) => {
  return (
    <div className="flex flex-col justify-start md:justify-between  items-start gap-x-10 gap-y-2 mb-5">
      <div className="">
        <h3 className={`${main}`}>{data?.fieldOfStudy}</h3>
        <h3 className={`${date}`}>{data?.degree?.type}</h3>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className={`font-bold text-gray-700 text-lg`}>{data?.role}</h3>
        <p className={`${date}`}>
          <span>
            {data?.from} - {data?.to}
          </span>
        </p>
        <p className={description}>{data?.description}</p>
      </div>
    </div>
  );
};

export const Project = ({ data }: SkeletonProps) => {
  const dataToMap = data?.tags?.split(',');
  const image = data?.thumbnail ? (
    <Image
      unoptimized
      width={0}
      height={0}
      src={data?.thumbnail}
      alt="project image "
      className="w-full object-cover object-center aspect-square rounded-xl border-2 border-gray-300 border-opacity-5 shadow-md"
    />
  ) : (
    'Thumbnail not found'
  );
  return (
    <div className="flex md:flex-row flex-col mb-10 gap-1">
      <div className="min-w-[250px] w-[250px] order-2 md:order-1 rounded-xl md:mr-5">{image}</div>
      <div className="order-1 md:order-2 flex flex-col gap-2">
        <h3 className="font-semibold text-xl tracking-tight">{data?.title}</h3>
        <p className={description}>{data?.description}</p>
        <div className="order-2 md:order-1 flex gap-2 md:mb-0 mb-3">
          {dataToMap.length > 1 &&
            dataToMap?.map((tag: string, i: number) => (
              <span className={array} key={i}>
                <p className={arrayText}>{tag}</p>
              </span>
            ))}
        </div>
        <a className="text-brand-green-primary font-semibold" target="_blank" href={data?.url} rel="noreferrer">
          Link to project <ArrowUp size={20} className="rotate-45 inline ms-1" />
        </a>
      </div>
    </div>
  );
};

export const Shop = () => {
  //demo data
  const shop = [
    {
      id: 1,
      image: '',
    },
  ];

  //state holding the shop items
  const [shopItems, setShopItems] = useState(shop);

  const { openShop, setOpenShop } = useContext(Portfolio);

  async function fetchShopItems() {
    try {
      let shopsData: { id: number; image: string }[];
      shopsData = await axios.get('/shops/id');
      setShopItems(shopsData);
    } catch (error) {
      //console.log(error)
    }
  }

  //Check if the users shop has items
  const showShop = Object.keys(shopItems).length > 3;

  useEffect(() => {
    //fetchShopItems();
    setOpenShop(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return showShop ? (
    <div className="flex flex-col gap-5 min-w-full">
      {/* map through at most 5 shop images */}
      {shopItems.slice(0, 5).map((shop) => (
        <div className="" key={shop.id}>
          <Image width={0} height={0} src={shop?.image} alt="" className="w-[290px] aspect-square rounded-xl" />
        </div>
      ))}
      <Link href={'/portfolio'} className="text-blue-100 font-semibold">
        Go to Shop <ArrowUp size={20} className="rotate-45 inline ms-1" />
      </Link>
    </div>
  ) : (
    <AddShopErrorModal />
  );
};

export const Contact = ({ data }: SkeletonProps) => {
  return (
    <div className="flex flex-col w-full gap-5">
      <div className="flex justify-start items-center gap-10">
        <span className="text-gray-300 font-semibold text-sm min-w-min flex-[1]">{data.url}</span>
        <a
          className="text-brand-green-primary font-semibold text-sm flex-[2] flex items-center text-center gap-3"
          href={data.url}
        >
          {data.url}
          <ArrowUp size={20} className="rotate-45 inline ms-1" />
        </a>
      </div>
    </div>
  );
};

type CustomProps = {
  contacts?: Array<{ id: number; title: string; info: string }>;
};

export const Custom = ({ contacts }: CustomProps) => {
  const { openCustom, setOpenCustom } = useContext(Portfolio);

  useEffect(() => {
    setOpenCustom(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CustomSectionModal />
    // <div className="flex flex-col">
    //   {contacts?.map((contact) => (
    //     <div className="flex flex-col gap-2" key={contact.id}>
    //       <div className="flex justify-start items-center gap-10">
    //         <span className="text-gray-300 font-semibold text-sm min-w-min flex-[1]">{contact.title}</span>
    //         <span className="text-blue-100 font-semibold text-sm flex-[2]">{contact.info}</span>
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
};
