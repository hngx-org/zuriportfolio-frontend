import { ArrowRight2 } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  data: Array<any>;
}

const Features = ({ data }: Props) => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap justify-center items-center pb-10 w-full md:space-x-4 space-y-4">
      {data.map((item: any, index: number) => (
        <div
          key={index}
          className="flex flex-col space-y-4 w-full md:w-[40%] lg:w-[298px] h-[320px] justify-center items-center p-3 bg-[#FBFBFB] m-2"
        >
          <Image src={item.img} alt={item.name} width={48} height={48} />
          <h3 className="text-[#3F3F50] text-center font-manropeEB text-[20px]">{item.name}</h3>
          <p className="text-[#656673] text-center font-manropeL text-[16px]">{item.desc}</p>
          <Link
            href={item.href}
            className="text-[#009254] underline decoration-1 font-manropeEB text-[16px] flex justify-center items-center"
          >
            {item.slug} <ArrowRight2 color="#009254" size={24} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Features;
