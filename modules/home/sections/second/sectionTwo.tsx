import Features from '@modules/home/features/features';
import FeatureOne from '../../../../public/assets/home/featureOne.png';
import FeatureTwo from '../../../../public/assets/home/featureTwo.png';
import FeatureThree from '../../../../public/assets/home/featureThree.png';
import FeatureFour from '../../../../public/assets/home/featureFour.png';
import LogoSlider from '../../../../public/assets/home/logoSlider.png';
import LogoCarousel from '@modules/home/carousel/logos/logosCarousel';
import HeroSection from '@modules/home/features/Hero';

const data = [
  {
    name: 'Personalized Portfolio',
    img: FeatureOne.src,
    href: '/portfolio',
    slug: 'Create Portfolio',
    desc: 'Highlight your skills, projects, and achievements in a way that captivates potential clients and employers alike.',
  },
  {
    name: 'Audience',
    img: FeatureTwo.src,
    href: '/explore',
    slug: 'Explore Portfolio',
    desc: ' Elevate your online presence, attract the perfect opportunities, and let your talents reach the audience they deserve.',
  },
  {
    name: 'Access to Digital Markets',
    img: FeatureThree.src,
    href: '/marketplace',
    slug: 'Zuri Marketplace',
    desc: 'Explore an extensive collection of products crafted by skilled individuals. From innovative tech solutions to captivating art!',
  },
  {
    name: 'Personalized shop',
    img: FeatureFour.src,
    href: '/shop',
    slug: 'Create Shop',
    desc: "Establish your digital storefront effortlessly. Whether it's artwork or digital products, craft your space seamlessly!",
  },
];

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

const SectionTwo = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center items-center py-5  w-full">
        <HeroSection
          title="How exactly does Zuri Portfolio help Talents?"
          bottom={true}
          desc={
            <p className="text-[#0D0C22] text-left md:text-justify font-manropeL text-[16px]">
              Explore a world of talents, create your personalized portfolio, and sell your digital products in your
              very own shop. Your dreams, your creations, your success – all in one place. Start your journey today.
            </p>
          }
          slug="Get Started"
          href="/dashboard"
        />
      </div>
      <div className="flex justify-center items-center py-12 w-full">
        <Features data={data} />
      </div>
      <div className="w-full">
        <LogoCarousel logos={slides} />
      </div>
    </div>
  );
};

export default SectionTwo;
