import DynamicPortfolioCarousel from '@modules/home/carousel/portfolios/DynamicPortfolioCarousel';
import HeroSection from '@modules/home/features/Hero';

const SectionFour = () => {
  return (
    <div className="flex flex-col w-full border-b-2 border-[#96969611] pb-14">
      <div className="flex justify-center items-center py-5  w-full mb-14">
        <HeroSection
          title="Find the best Talent for your next Project!"
          desc={
            <p className="text-[#0D0C22] text-left md:text-justify font-manropeL text-[16px]">
              Find the best Talent who matches your needs and exceeds your expectations. Let us connect you with top
              talent, ensuring your projects soar to new heights. Your ideal Talelnt is just a click away! 🌟💼
            </p>
          }
          slug="Create Portfolio"
          href="/portfolio"
          badge="Zuri Portfolio-Explore"
          bottom={true}
        />
      </div>
      <div className="w-full md:mt-10">
        <DynamicPortfolioCarousel />
      </div>
    </div>
  );
};

export default SectionFour;
