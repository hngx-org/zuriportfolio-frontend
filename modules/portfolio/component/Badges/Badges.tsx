import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Badges = () => {
  const params = useParams();

  const [scorePercentage, setScorePercentage] = useState<number>(90);
  const [image, setImage] = useState<string>('/assets/images/badges/badge expert.png');

  useEffect(() => {
    if (params.badge === 'expert') {
      setImage('/assets/images/badges/badge expert.png');
    } else if (params.badge === 'intermediary') {
      setImage('/assets/images/badges/badge intermediary.png');
    } else {
      setImage('/assets/images/badges/badge intermediary.png');
    }
  });

  return (
    <section>
      <nav className="h-20">Navbar</nav>
      <div className="h-24 bg-[#009254] flex flex-col h-full ">
        <div className="flex flex-col gap-2 relative h-full ">
          <div className="flex flex-col justify-center h-full">
            <h3 className="text-[#FFFFFF] text-2xl whitespace-nowrap font-manropeEL px-4">Wireframe Challenge</h3>
            <p className="text-[#FFFFFF] px-4">Design Assessment</p>
            <Image
              className="h-12 w-10 absolute right-0 p flex items-center justify-center "
              alt=""
              height={200}
              width={200}
              src="/assets/images/badges/wireframeIcon2.png"
            />
          </div>

          <Image
            className="absolute flex right-8 bottom-0 h-16 md:h-24 md:w-56 self-end lg:right-"
            alt=""
            height={200}
            width={200}
            src="/assets/images/badges/wireframe challenge Base.png"
          />
        </div>
      </div>

      <div className="h-full w-full flex items-center justify-center  bg-[#F2F4F5] ">
        <div className="flex items-center rounded-t-3xl justify-center flex-col w-full p-6  border-0 h-auto md:px-10 lg:w-7/12">
          <div className="flex h-48 justify-center items-center bg-[#F1AE67] w-full rounded-t-3xl">
            <Image
              src="/assets/images/badges/emoji-happy.png"
              width={200}
              height={200}
              alt="smiling emoji"
              className="w-4/12 h-3/5 sm:h-4/5 sm:w-3/12"
            />
          </div>
          <div className="h-auto w-full bg-[#FFFFFF] flex flex-col justify-center align-middle text-center px-2 rounded-b-3xl ">
            <h4 className="font-black py-2 text-[#2E3130] text-sm font-manropeEB pb-2 md:text-xl md:px-12">
              Congratulations! You&apos;ve performed extremely well in this assessment Below is your score.
            </h4>
            <div>
              <button className="text-[#009254] font-bold border-[#dfe3e6] border-2 w-28 h-12 bg-[#F2F4F5] font-manropeEB rounded-2xl text-2xl text-bold">
                {scorePercentage}%
              </button>
            </div>
            <p className=" mt-4 mb-8  font-manropeL">You’ve earned yourself an {params.badge} badge!</p>
            <div className="flex justify-center align-middle h-30 w-full">
              <Image src={image} width={200} height={200} alt="badge" className="h-52 w-52" />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 font-manropeL relative pb-4 md:gap-4 md:pb-10">
              <div className="w-10/12 flex flex-col gap-6 pt-6 md:flex-row ">
                <button className="bg-[#009254] border-[#009254] border h-12 w-full rounded-2xl text-[#FFFFFF] cursor-pointer ">
                  Download
                </button>
                <button className="bg-white border-[#009254] border h-12 w-full rounded-2xl text-[#009254]">
                  View
                </button>
              </div>
              <div className=" h-10  flex items-center justify-end w-10/12 pb-2 md:w-auto md:justify-center md:h-12 md:pt-6">
                <Image
                  height={200}
                  width={100}
                  alt="share Icon"
                  src="/assets/images/badges/share.png"
                  className=" h-6 w-6 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="h-96 bg-[#009254]"></footer>
    </section>
  );
};

export default Badges;
