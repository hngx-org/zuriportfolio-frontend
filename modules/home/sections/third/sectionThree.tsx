import bannerImage from '../../../../public/assets/home/bannerImage.webp';
import LogoCarousel from '@modules/home/carousel/logos/logosCarousel';
import HeroSection from '@modules/home/features/Hero';
import Image from 'next/image';

const SectionThree = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center items-center py-5  w-full mb-14">
        <HeroSection
          title="Simplify your career journey with just one link in your bio - your portfolio."
          subtitle="Showcase your skills, accomplishments, and expertise in vivid detail. Let your potential employers and clients explore your career journey seamlessly, all condensed into one convenient space."
          desc={
            <Image
              src={bannerImage.src}
              alt="banner"
              width={450}
              height={500}
              className="md:-mt-10 md:absolute md:w-[320px] lg:w-[450px]"
            />
          }
          slug="Create Portfolio"
          href="/portfolio"
          badge="Zuri Portfolio-Explore"
          bottom={false}
          button={true}
        />
      </div>
      <div className="w-full md:mt-10">
        <LogoCarousel color={false} />
      </div>
    </div>
  );
};

export default SectionThree;
