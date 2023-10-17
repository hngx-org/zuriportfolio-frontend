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
          title="How exactly does Zuri Portfolio help Talents?"
          desc="Explore a world of talents, create your personalized portfolio, and sell your digital products in your very own shop. Your dreams, your creations, your success – all in one place. Start your journey today."
          slug="Get Started"
          href="/dashboard"
        />
      </div>
      <div className="w-full">
        <LogoCarousel logos={slides} />
      </div>
    </div>
  );
};

export default SectionThree;
