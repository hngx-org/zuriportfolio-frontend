import { ExportSquare } from 'iconsax-react';
import Image from 'next/image';

type AboutProps = {
  data?: string;
};

export const About = ({ data }: AboutProps) => {
  return <p className="text-sm text-gray-300 font-semibold">{data}</p>;
};

type SkeletonProps = {
  data?: any;
};

export const WorkExperience = ({ data }: SkeletonProps) => {
  return (
    <div className="flex md:flex-row flex-col justify-start md:justify-between  items-start gap-x-10 md:gap-y-0 gap-y-2 mb-6 ">
      <p className="text-gray-300 font-semibold text-base flex-[2]">
        <span>
          {data?.startMonth} {data?.startYear}
        </span>{' '}
        -{' '}
        <span>
          {data?.endMonth} {data?.endYear}
        </span>
      </p>
      <div className="flex flex-col mb-4 md:gap-1 flex-[2]">
        <h3 className="text-lg font-semibold text-gray-200">{data?.company}</h3>
        <p className="text-base font-manropeL text-brand-green-primary">{data?.role}</p>
      </div>
      <p className="font-semibold text-sm text-gray-400 flex-[2]">{data?.description}</p>
    </div>
  );
};

export const Education = ({ data }: SkeletonProps) => {
  return (
    <div className="flex md:flex-row flex-col justify-start md:justify-between items-start gap-x-10 md:gap-y-0 gap-y-2 mb-6 ">
      <p className="text-gray-300 font-semibold text-base flex-1">
        <span>{data?.from}</span> - <span>{data?.to}</span>
      </p>
      <div className="flex flex-col mb-4 md:gap-1 flex-1">
        <h3 className="text-lg font-semibold text-gray-200">{data?.degree}</h3>
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

export const Project = ({ data }: SkeletonProps) => {
  return (
    <div className="flex md:flex-row flex-col gap-4 md:gap-10">
      <Image
        width={0}
        height={0}
        src={data?.img}
        alt="project image "
        className="w-[290px] aspect-square rounded-xl order-2 md:order-1 border-[1px] border-gray-300 border-opacity-50"
      />
      <div className="order-1 md:order-2 flex flex-col gap-2">
        <h3 className="font-semibold text-xl tracking-tight">{data?.title}</h3>
        <p className="font-semibold text-sm text-gray-400">{data?.description}</p>
        <div className="order-2 md:order-1 flex gap-3 my-2">
          {data?.tags?.map((tag: string, i: number) => (
            <span className="grid place-content-center border-[1px] py-1 p-2 border-gray-300 rounded-3xl" key={i}>
              <p className="text-sm text-gray-400">{tag}</p>
            </span>
          ))}
        </div>
        <a className="text-blue-100 font-semibold" href={data?.link}>
          View project
        </a>
      </div>
    </div>
  );
};

export const Skill = ({ data }: SkeletonProps) => {
  return (
    <div className="flex flex-wrap gap-5 justify-start items-start">
      {data?.map((skill: string, i: number) => (
        <span
          className="grid place-content-center border-[1px] md:py-1 md:p-2 p-4 border-gray-300 md:rounded-3xl rounded-lg border-opacity-50"
          key={i}
        >
          <p className="text-sm text-gray-400 font-semibold opacity-70"> {skill}</p>
        </span>
      ))}
    </div>
  );
};

export const Interests = ({ data }: SkeletonProps) => {
  return (
    <div className="flex flex-wrap gap-5 justify-start items-start">
      {data?.map((interest: string, i: number) => (
        <span
          className="grid place-content-center border-[1px] md:py-1 md:p-2 p-4 border-gray-300 md:rounded-3xl rounded-lg border-opacity-50"
          key={i}
        >
          <p className="text-sm text-gray-400 font-semibold opacity-70"> {interest}</p>
        </span>
      ))}
    </div>
  );
};

export const Language = ({ data }: SkeletonProps) => {
  return (
    <div className="flex flex-wrap gap-5 justify-start items-start">
      {data?.map((language: string, i: number) => (
        <span
          className="grid place-content-center border-[1px] md:py-1 md:p-2 p-4 border-gray-300 md:rounded-3xl rounded-lg border-opacity-50"
          key={i}
        >
          <p className="text-sm text-gray-400 font-semibold opacity-70"> {language}</p>
        </span>
      ))}
    </div>
  );
};

export const Shop = () => {
  const shops = [
    {
      id: 1,
      image: '',
    },
  ];
  return (
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
