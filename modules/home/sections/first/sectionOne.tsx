import Jumbotron from '@modules/home/jumbotron/jumbotron';
import PortfolioCarousel from '@modules/home/carousel/portfolios/portfolioCarousel';

const SectionOne = () => {
  return (
    <div className="pb-10 md:border-b-2 border-[#96969611]">
      <div className="flex justify-center items-center pb-10 flex-col">
        <Jumbotron />
      </div>
      <div>
        <PortfolioCarousel />
      </div>
    </div>
  );
};

export default SectionOne;
