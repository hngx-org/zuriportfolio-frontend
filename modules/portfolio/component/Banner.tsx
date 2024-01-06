import Breadcrumbs from './Breadcrumbs';

const Banner = () => {
  return (
    <section className="-mt-5 bg-[95%_25%] bg-no-repeat lg:pt-[4rem] 2xl:bg-[45%_25%]">
      <div className="relative -mt-5 py-12 pb-[8rem] px-6 grid gap-4 font-manropeL text-base xl:w-[77.5rem] xl:mx-auto xl:px-0">
        <Breadcrumbs />
        <span className="py-3 font-manropeB font-regular text-5xl ">Explore</span>

        <h1 className="max-w-[24rem] relative xl:max-w-[36rem] pr-3 font-regular text-xl leading-[2] text-[#536066]">
          Find your perfect creactive match
        </h1>
      </div>
    </section>
  );
};

export default Banner;
