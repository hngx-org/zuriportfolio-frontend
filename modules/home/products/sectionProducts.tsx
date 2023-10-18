import HeroSection from '@modules/home/features/Hero';

const SectionProducts = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center items-center py-5  w-full">
        <HeroSection
          title="Find Digital Products you’ll Love!"
          desc={<p></p>}
          bottom={false}
          button={false}
          badge="Zuri Marketplace"
        />
      </div>
      <div className="flex justify-center items-center py-12 w-full"></div>
    </div>
  );
};

export default SectionProducts;
