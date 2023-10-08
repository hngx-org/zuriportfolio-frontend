import { useRef } from 'react';

import Image from 'next/image';
import generatePDF, { Margin } from 'react-to-pdf';
import { useRouter } from 'next/router';
import { toJpeg, toPng } from 'html-to-image';
import Button from '@ui/Button';

const Page = () => {
  const certificateRef = useRef<HTMLElement>(null);

  const router = useRouter();
  const badgelabel = router.query.badge;

  const handleClick = () => {
    switch (router.query.type) {
      case 'pdf':
        generatePDF(certificateRef, {
          filename: 'zuri-badge.pdf',

          page: {
            margin: Margin.SMALL,
            format: 'letter',
            orientation: 'landscape',
          },
        });
        break;
      case 'png':
        toPng(certificateRef.current!, {
          cacheBust: true,
          backgroundColor: '#fff',
          width: 600,
          height: 600,
        })
          .then((dataUrl) => {
            const link = document.createElement('a');
            link.download = 'zuri-badge.png';
            link.href = dataUrl;
            link.click();
          })
          .catch((err) => {
            console.log(err);
          });
        break;

      default:
        toJpeg(certificateRef.current!, {
          quality: 0.95,
          backgroundColor: '#fff',
          width: 600,
          style: { display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBlockEnd: '4rem' },
        })
          .then((dataUrl) => {
            const link = document.createElement('a');
            link.download = 'zuri-badge.png';
            link.href = dataUrl;
            link.click();
          })
          .catch((err) => {
            console.log(err);
          });
        break;
    }

    router.push(`/badges/badge/${badgelabel}`);
  };
  return (
    <section>
      <section
        ref={certificateRef}
        className="min-h-[calc(100vh-80px)] w-full bg-white rounded-lg py-8 px-8 text-center flex flex-col gap-4 items-center justify-center"
      >
        <h4 className="text-[#009254] font-[700] text-xl">Congratulations!</h4>

        <h4 className="text-yellow-500 text-4xl font-[700]">Uzumaki Naruto</h4>

        <div className="min-w-[16rem]">
          {badgelabel && (
            <Image
              src={`/assets/images/badges/${badgelabel}.png`}
              width={200}
              height={200}
              alt="user badge"
              sizes="100vw"
              className="w-full"
              priority
            />
          )}
        </div>
        <div className="flex gap-2 my-1">
          <h4 className="font-[600] text-xl capitalize">{badgelabel?.toString()} Badge</h4>
          <Image
            src="/assets/images/peace-icon.png"
            alt="Peace icon"
            width={20}
            height={20}
            sizes="100vw"
            className="w-8"
          />
        </div>
        <p className="max-w-[25rem] w-full text-sm">
          You just unlocked the Expert Badge as you have scored 90 points or above by completing this assessment.
        </p>
      </section>

      <div className="text-center">
        <Button intent="success" className="mx-auto" onClick={handleClick}>
          Download
        </Button>
      </div>
    </section>
  );
};

export default Page;
