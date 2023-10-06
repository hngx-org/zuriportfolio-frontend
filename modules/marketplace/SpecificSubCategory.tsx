import { FC } from 'react';
import { manropeL, manropeB, manropeEB } from '../../config/font';
import MainLayout from '../../components/Layout/MainLayout';
import Button from '@ui/Button';

const SpecificSubCategory: FC = () => {
  return (
    <div>
      <MainLayout showDashboardSidebar={false} showFooter={true} showTopbar={true} activePage="marketplace">
        <div
          className={`${manropeL.className} w-[100%] border-[1px] flex flex-col border-black px-[1rem] mb-[2rem] md:px-[1.5rem] lg:px-[4rem]`}
        >
          {/* nav component */}
          <nav></nav>
          {/* nav component */}

          <header
            className={`flex flex-col items-center space-y-[0.5rem] mt-[2.5rem] text-center md:mt-[3.5rem] md:space-y-[0.75rem] lg:mt-[5rem] lg:space-y-[1rem]`}
          >
            <h1
              className={`${manropeEB.className} border-[1px] text-green-850 text-[1.375rem] leading-[1.75rem] md:text-[2rem] md:leading-[2.5rem] lg:text-[1.75rem] lg:leading-[2.25rem]`}
            >
              Graphics Design Templates
            </h1>
            <p className="border-[1px] text-white-400 text-[0.75rem] leading-[1.2rem] tracking-[0.003rem] max-w-[21.5625rem] md:max-w-[35rem] md:leading-[1.25rem] md:tracking-[0.00219rem] lg:text-[1.5rem] lg:max-w-[70rem] lg:leading-[2rem]">
              Level up your presentations with beautiful templates and designs for PowerPoint, Keynote, and Google
              Slides. Unleash your inner creative and craft stunning decks.
            </p>
          </header>

          <section className="mt-[2.75rem] md:mt-[4.5rem] lg:mt-[6rem] mb-[2rem]">
            <div className="flex items-center">
              <div
                aria-label="number of products available"
                className=" text-[#052011] text-[1rem] font-[600] tracking-[0.005rem] lg:text-[1.5rem] leading-[2.25rem]"
              >
                {57098} Products
              </div>
              <Button className="border-green-300 border-[1px] text-green-300 rounded-[0.5rem] bg-[#fff] w-[6rem] ml-auto px-[1rem] py-[0.75rem] text-center font-[400] text-[0.75rem] tracking-[0.003rem] md:w-[9.25rem] lg:text-[1rem]">
                Filter
              </Button>
            </div>
          </section>
        </div>
      </MainLayout>
    </div>
  );
};
export default SpecificSubCategory;
