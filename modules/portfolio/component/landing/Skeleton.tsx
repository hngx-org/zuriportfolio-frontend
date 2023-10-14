import { ExportSquare } from 'iconsax-react';
import Image from 'next/image';
import AddShopErrorModal from '../addShopErrorModal';
import { useContext, useEffect, useState } from 'react';
import Portfolio from '../../../../context/PortfolioLandingContext';
import axios from 'axios';

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
  return (
    <div className="flex md:flex-row flex-col justify-start md:justify-between  items-start gap-x-10 md:gap-y-0 gap-y-1 mb-6">
      <p className="text-gray-300 font-semibold text-base flex-[2]">
        <span>
          {data?.startMonth} {data?.startYear}
        </span>{' '}
        -{' '}
        <span>
          {data?.endMonth} {data?.endYear}
        </span>
      </p>
      <div className="flex flex-col mb-2 md:gap-1 flex-[2]">
        <h3 className="text-lg font-semibold text-gray-200">{data?.company}</h3>
        <p className="text-base font-manropeL text-brand-green-primary">{data?.role}</p>
      </div>
      <p className="font-semibold text-sm text-gray-400 flex-[2]">{data?.description}</p>
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
      <p className="font-semibold text-sm text-gray-400 flex-1">{data?.description}</p>
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
          <ExportSquare size="17" color="#009254" />
        </a>
      </div>
      <p className="font-semibold text-sm text-gray-400 flex-1">{data?.description}</p>
    </div>
  );
};

export const Awards = ({ data }: SkeletonProps) => {
  return (
    <div className="flex md:flex-row flex-col justify-start md:justify-between items-start gap-x-10 md:gap-y-0 gap-y-1 mb-6 ">
      <p className="text-gray-300 font-semibold text-base flex-1">
        <span>
          {data?.month} {data?.year}
        </span>
      </p>
      <div className="flex flex-col items-start gap-1 mb-4 flex-1">
        <h3 className="text-lg font-semibold text-gray-200">{data?.award}</h3>
        <p className="text-base font-manropeB text-gray-200">{data?.org}</p>
        <a
          className="flex gap-2 justify-center items-center text-base font-manropeB text-brand-green-primary"
          target="_blank"
          href={data?.link}
          rel="noreferrer"
        >
          {data?.linkTitle}
          <ExportSquare size="17" color="#009254" />
        </a>
      </div>
      <p className="font-semibold text-sm text-gray-400 flex-1">{data?.description}</p>
    </div>
  );
};

export let projects = [
  {
    id: 11,
    title: 'Project title',
    description: 'Description',
    tags: 'Tag 1#Tag 2',
    linkTitle: 'Link Title',
    link: 'Link',
    img: '',
  },
];

export const Project = ({ data }: SkeletonProps) => {
  console.log(data);
  const dataToMap = data?.tags?.split('#');
  const image = data?.img ? (
    <Image
      width={0}
      height={0}
      src={data?.img}
      alt="project image "
      className="w-[290px] aspect-square rounded-xl order-2 md:order-1 border-[1px] border-gray-300 border-opacity-50"
    />
  ) : (
    ''
  );
  return (
    <div className="flex md:flex-row flex-col gap-4 md:gap-10">
      {image}
      <div className="order-1 md:order-2 flex flex-col gap-2">
        <h3 className="font-semibold text-xl tracking-tight">{data?.title}</h3>
        <p className="font-semibold text-sm text-gray-400">{data?.description}</p>
        <div className="order-2 md:order-1 flex gap-3 my-2">
          {dataToMap?.map((tag: string, i: number) => (
            <span className="grid place-content-center border-[1px] py-1 p-2 border-gray-300 rounded-3xl" key={i}>
              <p className="text-sm text-gray-400">{tag}</p>
            </span>
          ))}
        </div>
        <a className="text-blue-100 font-semibold" href={data?.url}>
          Link to project
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
  const dataToMap = data?.interest?.split(',');
  return (
    <div className="flex flex-wrap gap-5 justify-start items-start">
      {dataToMap?.map((interest: string, i: number) => (
        <span
          className="grid place-content-center border-[1px] md:py-1 md:p-2 p-4 border-gray-300 md:rounded-3xl rounded-lg border-opacity-50"
          key={i}
        >
          <p className="text-sm text-gray-400 font-semibold opacity-70">{interest}</p>
        </span>
      ))}
    </div>
  );
};

export const Language = ({ data }: SkeletonProps) => {
  const dataToMap = data.split(',');
  return (
    <div className="flex flex-wrap gap-5 justify-start items-start">
      {dataToMap?.map((interest: string, i: number) => (
        <span
          className="grid place-content-center border-[1px] md:py-1 md:p-2 p-4 border-gray-300 md:rounded-3xl rounded-lg border-opacity-50"
          key={i}
        >
          <p className="text-sm text-gray-400 font-semibold opacity-70">{interest}</p>
        </span>
      ))}
    </div>
  );
};

export const Shop = () => {
  const shop = [
    {
      id: 1,
      image: '',
    },
  ];

  const [shops, setShops] = useState(shop);

  const { openShop, setOpenShop } = useContext(Portfolio);

  async function fetchShops() {
    try {
      let shopsData: { id: number; image: string }[];
      shopsData = await axios.get('/shops/id');
      setShops(shopsData);
    } catch (error) {
      //console.log(error)
    }
  }

  const showShop = Object.keys(shops).length > 3;

  useEffect(() => {
    //fetchShops();
  }, []);

  return showShop ? (
    <div className="flex flex-col gap-5 min-w-full">
      {shops.map((shop) => (
        <div className="" key={shop.id}>
          <Image width={0} height={0} src={shop?.image} alt="" className="w-[290px] aspect-square rounded-xl" />
        </div>
      ))}
      <a className="text-blue-100 font-semibold" href="">
        Go to shop
      </a>
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
    <div className="flex flex-col flex-wrap">
      <div className="flex flex-col gap-2" key={data.id}>
        <div className="flex justify-start items-center gap-20">
          <span className="text-gray-400 font-semibold text-lg min-w-min">{data.name}</span>
          <span className="text-gray-300 font-semibold text-sm">{data.position}</span>
        </div>
        <div className="flex justify-start items-center gap-20">
          <span className="text-gray-300 font-semibold text-sm">{data.company}</span>
          <span className="text-gray-300 font-semibold text-sm">{data.email}</span>
        </div>
        <div className="flex justify-start items-center gap-20">
          <span className="text-gray-300 font-semibold text-sm">{data.phone}</span>
        </div>
      </div>
    </div>
  );
};

type CustomProps = {
  contacts?: Array<{ id: number; title: string; info: string }>;
};

export const Custom = ({ contacts }: CustomProps) => {
  return (
    <div className="flex flex-col">
      {contacts?.map((contact) => (
        <div className="flex flex-col gap-2" key={contact.id}>
          <div className="flex justify-start items-center gap-10">
            <span className="text-gray-300 font-semibold text-sm min-w-min flex-[1]">{contact.title}</span>
            <span className="text-blue-100 font-semibold text-sm flex-[2]">{contact.info}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
