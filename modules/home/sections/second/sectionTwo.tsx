import Features from '@modules/home/features/features';
import FeatureOne from '../../../../public/assets/home/featureOne.png';
import FeatureTwo from '../../../../public/assets/home/featureTwo.png';
import FeatureThree from '../../../../public/assets/home/featureThree.png';
import FeatureFour from '../../../../public/assets/home/featureFour.png';

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

const SectionTwo = () => {
  return (
    <div className="flex justify-center items-center py-12 w-full">
      <Features data={data} />
    </div>
  );
};

export default SectionTwo;
