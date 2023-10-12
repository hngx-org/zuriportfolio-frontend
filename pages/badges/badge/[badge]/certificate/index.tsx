import { useRef } from 'react';

import Image from 'next/image';
import generatePDF, { Margin } from 'react-to-pdf';
import { useRouter } from 'next/router';
import { toJpeg, toPng } from 'html-to-image';
import Button from '@ui/Button';
import Head from 'next/head';
import MainLayout from '../../../../../components/Layout/MainLayout';

const Page = () => {
  const certificateRef = useRef<HTMLElement>(null);

  const router = useRouter();
  const badgeType = router.query.badge;

  let badgeDescription;

  if (badgeType) {
    if (badgeType === 'beginner') {
      badgeDescription =
        'You just unlocked the Beginner Badge as you have scored 90 points or above by completing this assessment.';
    } else if (badgeType === 'intermediate') {
      badgeDescription =
        'You just unlocked the Intermediate Badge as you have scored 90 points or above by completing this assessment.';
    } else {
      badgeDescription =
        'You just unlocked the Expert Badge as you have scored 90 points or above by completing this assessment.';
    }
  }

  const handleClick = () => {
    switch (router.query.type) {
      case 'pdf':
        generatePDF(certificateRef, {
          filename: 'zuri-badge.pdf',

          page: {
            margin: Margin.SMALL,
            format: 'letter',
            orientation: 'portrait',
          },
        });
        break;
      case 'png':
        toPng(certificateRef.current!, {
          backgroundColor: '#fff',
          width: 600,
          style: { display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBlockEnd: '4rem' },
          cacheBust: true,
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
          cacheBust: true,
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

    router.push(`/badges/badge/${badgeType}`);
  };
  return (
    <MainLayout activePage="marketplace" showDashboardSidebar={false} showFooter={true} showTopbar={true}>
      <section className="pb-8">
        <Head>
          <title>Certificate</title>
        </Head>
        <section
          ref={certificateRef}
          className="w-full bg-white rounded-lg py-8 px-8 text-center flex flex-col gap-4 items-center justify-center"
        >
          <h4 className="text-[#009254] font-[700] text-xl">Congratulations!</h4>

          <h4 className="text-yellow-500 text-4xl font-[700]">Uzumaki Naruto</h4>

          <div className="min-w-[16rem]">
            {badgeType && (
              <Image
                src={`/assets/images/badges/${badgeType}.png`}
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
            <h4 className="font-[600] text-xl capitalize">{badgeType?.toString()} Badge</h4>
            <Image
              src="/assets/images/peace-icon.png"
              alt="Peace icon"
              width={20}
              height={20}
              sizes="100vw"
              className="w-8"
            />
          </div>
          <p className="max-w-[25rem] w-full text-sm">{badgeDescription}</p>
        </section>

        <div className="text-center">
          <Button intent="success" className="mx-auto" onClick={handleClick}>
            Download
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Page;
