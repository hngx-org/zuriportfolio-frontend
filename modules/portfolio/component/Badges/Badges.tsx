import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { BsFillShareFill } from 'react-icons/bs';
import BadgeModal from '../../../../components/Modals/BadgesModal';

const Badges = () => {
  const params = useParams();

  const [scorePercentage, setScorePercentage] = useState<number>(90);
  const [image, setImage] = useState<string>('/assets/images/badges/badge expert.png');
  const [isdownloadOpen, setIsdownloadOpen] = useState(false);
  const onClose = () => {
    setIsdownloadOpen(false);
  };

  useEffect(() => {
    if (params.badge === 'expert') {
      setImage('/assets/images/badges/badge expert.png');
    } else if (params.badge === 'intermediary') {
      setImage('/assets/images/badges/badge intermediary.png');
    } else {
      setImage('/assets/images/badges/badge intermediary.png');
    }
  });

  //staging change

  return (
    <section className="bg-[#F2F4F5]">
      <div className="hidden lg:flex pl-6  sm:pl-[96px] pt-8 flex justify-start align-middle text-2xl cursor-pointer">
        <MdArrowBackIosNew />
      </div>

      <div className="h-full w-full flex flex-col items-center justify-center  ">
        <div className="flex items-center rounded-t-3xl justify-center flex-col w-full p-6  border-0 h-auto md:px-10 lg:w-7/12">
          <div className="flex h-52 justify-center items-center bg-[#F1AE67] w-full rounded-t-3xl">
            <Image
              src="/assets/images/badges/emoji-happy.png"
              width={200}
              height={200}
              alt="smiling emoji"
              className="w-4/12 h-3/5 sm:h-4/5 sm:w-3/12"
            />
          </div>
          <div className="h-auto w-full bg-[#FFFFFF] flex flex-col justify-center align-middle text-center px-2 rounded-b-3xl ">
            <h4 className="font-black py-6 text-[#2E3130] text-sm font-manropeEB pb-2 md:text-xl md:px-12">
              Congratulations! You&apos;ve performed extremely well in this assessment Below is your score.
            </h4>
            <div>
              <button className="text-[#009254] font-bold border-[#dfe3e6] border-2 w-28 h-12 bg-[#F2F4F5] font-manropeEB rounded-2xl text-2xl text-bold">
                {scorePercentage}%
              </button>
            </div>
            <p className=" mt-4 mb-8  font-manropeL">You&apos;ve earned yourself an {params?.badge} badge!</p>
            <div className="flex justify-center align-middle h-30 w-full">
              <Image src={image} width={200} height={200} alt="badge" className="h-52 w-52" />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 font-manropeL relative pb-4 md:gap-4 md:pb-10">
              <div className="w-10/12 flex flex-col gap-6 pt-6 md:flex-row ">
                <button
                  className="bg-[#009254] border-[#009254] border h-12 w-full rounded-2xl text-[#FFFFFF] cursor-pointer "
                  onClick={() => setIsdownloadOpen(true)}
                >
                  Download
                </button>
                <button className="bg-white border-[#009254] border h-12 w-full rounded-2xl text-[#009254]">
                  View
                </button>
              </div>
              <div className=" h-10  flex items-center justify-end w-10/12 pb-2 md:w-auto md:justify-center md:h-12 md:pt-6 text-2xl text-[#009254]">
                <BsFillShareFill />
              </div>
            </div>
          </div>
          <div className="flex justify-end w-full">
            <Link href={'#'}>
              <p className=" underline mt-[30px] flex right-6 pr-4 sm:pr-10 ">Retake Test</p>
            </Link>
          </div>
          <BadgeModal isOpen={isdownloadOpen} onClose={onClose} />
        </div>
      </div>
    </section>
  );
};

export default Badges;
