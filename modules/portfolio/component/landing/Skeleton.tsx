import Image from 'next/image';

type AboutProps = {
  text?: string;
};

export const About = ({ text }: AboutProps) => {
  return <p className="text-sm text-gray-300 font-semibold">{text}</p>;
};

type WorkExperienceProps = {
  startDate?: string;
  endDate?: string;
  company?: string;
  role?: string;
  description?: string;
};

export const WorkExperience = ({ startDate, endDate, company, role, description }: WorkExperienceProps) => {
  return (
    <div className="flex md:flex-row flex-col justify-start items-start gap-x-28 md:gap-y-0 gap-y-2">
      <p className="min-w-max text-gray-300 font-semibold text-base">
        <span>{startDate}</span> - <span>{endDate}</span>
      </p>
      <div className="flex flex-col min-w-max  md:gap-1">
        <h3 className="text-lg font-semibold text-gray-200">{company}</h3>
        <p className="text-base text-brand-green-primary">{role}</p>
      </div>
      <p className="font-semibold text-sm text-gray-400">{description}</p>
    </div>
  );
};

type ProjectProps = {
  title?: string;
  description?: string;
  tags?: Array<{ id: number; name: string }>;
  link?: string;
  img?: any;
};

export const Project = ({ title, description, img, tags, link }: ProjectProps) => {
  return (
    <div className="flex md:flex-row flex-col gap-4 md:gap-10">
      <Image width={0} height={0} src={img} alt="" className="w-[290px] aspect-square rounded-xl order-2 md:order-1" />
      <div className="order-1 md:order-2 flex flex-col gap-2">
        <h3 className="font-semibold text-xl tracking-tight">{title}</h3>
        <p className="font-semibold text-sm text-gray-400">{description}</p>
        <div className="order-2 md:order-1 flex my-2">
          {tags?.map((tag) => (
            <span className="grid place-content-center border-[1px] py-1 p-2 border-gray-300 rounded-3xl" key={tag.id}>
              <p className="text-sm text-gray-400"> {tag.name}</p>
            </span>
          ))}
        </div>
        <a className="text-blue-100 font-semibold" href={link}>
          View project
        </a>
      </div>
    </div>
  );
};

export const Education = ({ startDate, endDate, company, role, description }: WorkExperienceProps) => {
  return (
    <div className="flex md:flex-row flex-col justify-start items-start gap-x-28 md:gap-y-0 gap-y-2">
      <p className="min-w-max text-gray-300 font-semibold text-lg">
        {startDate} - {endDate}
      </p>
      <div className="flex flex-col min-w-max gap-2">
        <h3 className="text-lg font-semibold text-gray-200">{company}</h3>
        <p className="text-base text-gray-300">{role}</p>
      </div>
      <p className="font-semibold text-sm text-gray-400">{description}</p>
    </div>
  );
};

type SkillProps = {
  skills?: Array<{ id: number; name: string }>;
};

export const Skill = ({ skills }: SkillProps) => {
  return (
    <div className="flex md:flex-row flex-col gap-5 justify-start items-start">
      {skills?.map((skill) => (
        <span
          className="grid place-content-center border-[1px] md:py-1 md:p-2 p-4 border-gray-300 md:rounded-3xl rounded-lg border-opacity-50"
          key={skill.id}
        >
          <p className="text-sm text-gray-400 font-semibold opacity-70"> {skill.name}</p>
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

type ContactProps = {
  contacts?: Array<{ id: number; title: string; info: string }>;
};

export const Contact = ({ contacts }: ContactProps) => {
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

type CertificateProps = {
  contacts?: Array<{ id: number; title: string; info: string }>;
};

export const Certificate = ({ contacts }: CertificateProps) => {
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

type InterestProps = {
  contacts?: Array<{ id: number; title: string; info: string }>;
};

export const Interests = ({ contacts }: InterestProps) => {
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

type LanguageProps = {
  contacts?: Array<{ id: number; title: string; info: string }>;
};

export const Language = ({ contacts }: LanguageProps) => {
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
type AwardProps = {
  contacts?: Array<{ id: number; title: string; info: string }>;
};

export const Awards = ({ contacts }: AwardProps) => {
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
type ReferenceProps = {
  contacts?: Array<{ id: number; title: string; info: string }>;
};

export const Reference = ({ contacts }: ReferenceProps) => {
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
