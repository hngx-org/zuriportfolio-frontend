import { ArrowUp, ExportSquare } from 'iconsax-react';
import Image from 'next/image';
import AddShopErrorModal from '../addShopErrorModal';
import { useContext, useEffect, useState } from 'react';
import Portfolio from '../../../../context/PortfolioLandingContext';
import axios from 'axios';
import Link from 'next/link';
import CustomSectionModal from '../custom-section-modal';

type AboutProps = {
  bio?: string;
};

export const About = ({ bio }: AboutProps) => {
  return <p className="text-sm text-gray-300 font-semibold">{bio}</p>;
};

type SkeletonProps = {
  data?: any;
};

export const WorkExperience = ({ data }: SkeletonProps) => {
  const endYear = data.isEmployee ? 'Present' : data.endYear;

  return (
    <div className="flex md:flex-row flex-col justify-start md:justify-between  items-start gap-x-10 md:gap-y-0 gap-y-1 mb-6">
      <p className="text-gray-300 font-semibold text-base flex-[2]">
        <span>
          {data?.startMonth} {data?.startYear}
        </span>{' '}
        -{' '}
        <span>
          {data?.endMonth} {endYear}
        </span>
      </p>
      <div className="flex flex-col mb-2 md:gap-1 flex-[2]">
        <h3 className="text-lg font-semibold text-gray-200">{data?.company}</h3>
        <p className="text-base font-manropeL text-brand-green-primary">{data?.role}</p>
      </div>
      <p className="font-semibold text-sm text-gray-400 break-all flex-[2]">{data?.description}</p>
    </div>
  );
};

export const Education = ({ data }: SkeletonProps) => {
  return (
    <div className="flex md:flex-row flex-col justify-start md:justify-between items-start gap-x-10 md:gap-y-0 gap-y-1 mb-6 ">
      <p className="text-gray-300 font-semibold text-base flex-1">
        <span>{data?.from}</span> - <span>{data?.to}</span>
      </p>
      <div className="flex flex-col mb-1 md:gap-1 flex-1">
        <h3 className="text-lg font-semibold text-gray-200">{data?.fieldOfStudy}</h3>
        <p className="text-sm font-manropeL text-gray-300">{data?.school}</p>
      </div>
      <p className="font-semibold text-sm text-gray-400 break-all flex-1">{data?.description}</p>
    </div>
  );
};

export const Certificate = ({ data }: SkeletonProps) => {
  return (
    <div className="flex md:flex-row flex-col justify-start md:justify-between  items-start gap-x-10 md:gap-y-0 gap-y-1 mb-6 ">
      <p className="text-gray-300 font-semibold text-base flex-1">
        <span>
          {data?.month} {data?.year}
        </span>
      </p>
      <div className="flex flex-col gap-1 mb-4 flex-1 items-start">
        <h3 className="text-lg font-semibold text-gray-200">{data?.certificate}</h3>
        <p className="text-base font-manropeB text-gray-200">{data?.school}</p>
        <a
          className="flex gap-2 justify-center items-center text-base font-manropeB text-brand-green-primary"
          target="_blank"
          href={data?.link}
          rel="noreferrer"
        >
          {data?.linkTitle}
          <ArrowUp size={20} className="rotate-45 inline ms-1" />
        </a>
      </div>
      <p className="font-semibold text-sm text-gray-400 break-all flex-1">{data?.description}</p>
    </div>
  );
};

export const Awards = ({ data }: SkeletonProps) => {
  return (
    <div className="flex md:flex-row flex-col justify-start md:justify-between items-start gap-x-10 md:gap-y-0 gap-y-1 mb-6 ">
      <p className="text-gray-300 font-semibold text-base flex-[2] flex-wrap break-all">{data?.year}</p>
      <div className="flex flex-col items-start gap-1 mb-4 flex-[2] flex-wrap break-all">
        <h3 className="text-lg font-semibold text-gray-200">{data?.title}</h3>
        <p className="text-base font-manropeB text-gray-200">{data?.org}</p>
        <a
          className="flex flex-row gap-1 justify-center items-center text-base font-manropeB text-brand-green-primary flex-[2] break-all"
          target="_blank"
          href={data?.url}
          rel="noreferrer"
        >
          {data?.url}{' '}
          <span>
            <ArrowUp size={20} className="rotate-45 inline ms-1" />
          </span>
        </a>
      </div>
      <p className="font-semibold text-sm text-gray-400 flex-wrap break-all flex-[2]">{data?.description}</p>
    </div>
  );
};

export let projects = [
  {
    id: 11,
    title: 'Project title',
    description: 'Description',
    tags: 'Tag 1,Tag 2',
    url: 'Link',
    thumbnail: '',
  },
];

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
    <div className="flex md:flex-row flex-col mb-10 gap-1 md:gap-5">
      <div className="min-w-[290px] w-[290px] order-2 md:order-1 rounded-xl">{image}</div>
      <div className="order-1 md:order-2 flex flex-col gap-2">
        <h3 className="font-semibold text-xl tracking-tight">{data?.title}</h3>
        <p className="font-semibold text-sm text-gray-400 break-all">{data?.description}</p>
        <div className="order-2 md:order-1 flex gap-2 md:mb-0 mb-3">
          {dataToMap.length > 1 &&
            dataToMap?.map((tag: string, i: number) => (
              <span className="grid place-content-center border-[1px] py-1 p-2 border-gray-300 rounded-3xl" key={i}>
                <p className="text-sm text-gray-400">{tag}</p>
              </span>
            ))}
        </div>
        <a className="text-blue-100 font-semibold" target="_blank" href={data?.url} rel="noreferrer">
          Link to project <ArrowUp size={20} className="rotate-45 inline ms-1" />
        </a>
      </div>
    </div>
  );
};

export const Skill = ({ data }: SkeletonProps) => {
  return (
    <div className="flex flex-wrap gap-5 justify-start items-start">
      {data?.map((skill: any, i: number) => (
        <span
          className="grid place-content-center border-[1px] md:py-1 md:p-2 p-4 border-gray-300 md:rounded-3xl rounded-lg border-opacity-50"
          key={i}
        >
          <p className="text-sm text-gray-400 font-semibold opacity-70">{skill.skills}</p>
        </span>
      ))}
    </div>
  );
};

export const Interests = ({ data }: SkeletonProps) => {
  return (
    <div className="flex flex-wrap gap-5 justify-start items-start">
      {data?.length > 0 &&
        data?.map((interest: any, i: number) => {
          return (
            <span
              className="grid place-content-center border-[1px] md:py-1 md:p-2 p-4 border-gray-300 md:rounded-3xl rounded-lg border-opacity-50"
              key={i}
            >
              <p className="text-sm text-gray-400 font-semibold opacity-70">{interest}</p>
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
        <span
          className="grid place-content-center border-[1px] md:py-1 md:p-2 p-4 border-gray-300 md:rounded-3xl rounded-lg border-opacity-50"
          key={i}
        >
          <p className="text-sm text-gray-400 font-semibold opacity-70">{language.language}</p>
        </span>
      ))}
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
      {data?.map((contact: { title: string; info: string; link: string }, i: string) => (
        <div key={i}>
          <div className="flex justify-start items-center gap-10">
            <span className="text-gray-300 font-semibold text-sm min-w-min flex-[1]">{contact.title}</span>
            <a
              className="text-blue-100 font-semibold text-sm flex-[2] flex items-center text-center gap-3"
              href={contact.link}
            >
              {contact.info}
              <ExportSquare size={14} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export const Reference = ({ data }: SkeletonProps) => {
  return (
    <div className="flex flex-col flex-wrap mb-2">
      <div className="flex flex-col" key={data.id}>
        <span className="text-gray-500 font-semibold text-xl min-w-min">{data.referer}</span>
        <span className="text-gray-300 font-semibold w-6/12">{data.position}</span>
        <span className="text-gray-300 font-semibold w-6/12">{data.company}</span>
        <span className="text-gray-300 font-semibold w-6/12">{data.email}</span>
        <span className="text-gray-300 font-semibold ">{data.phone_number}</span>
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
