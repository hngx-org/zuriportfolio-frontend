import LogoSlider from '../../../../public/assets/home/logoSlider.png';
import LogoCarousel from '@modules/home/carousel/logos/logosCarousel';
import HeroSection from '@modules/home/features/Hero';

const slides = [
  {
    src: LogoSlider.src,
    alt: '* Zuri Potfolio Explore*',
  },
  {
    src: LogoSlider.src,
    alt: '* Zuri Shop*',
  },
  {
    src: LogoSlider.src,
    alt: '* Zuri Marketplace*',
  },
  {
    src: LogoSlider.src,
    alt: '* Zuri Portfolio*',
  },
  {
    src: LogoSlider.src,
    alt: '* Zuri Potfolio Explore*',
  },
];

const SectionThree = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center items-center py-5  w-full">
        <HeroSection
          title="Simplify your career journey with just one link in your bio - your portfolio."
          desc={
            <p className="text-[#0D0C22] text-left md:text-justify font-manropeL text-[16px]">
              Explore a world of talents, create your personalized portfolio, and sell your digital products in your
              very own shop. Your dreams, your creations, your success – all in one place. Start your journey today.
            </p>
          }
          slug="Create Portfolio"
          href="/portfolio"
        />
      </div>
      <div className="w-full">
        <LogoCarousel logos={slides} />
      </div>
    </div>
  );
};

export default SectionThree;
