import HeroSection from '@modules/home/features/Hero';
import JumboBg from '../../../../public/assets/home/jumbo_background.webp';
import DynamicCategoryCarousel from '@modules/home/products/DynamicCategoryCarousel';
import LogoCarousel from '@modules/home/carousel/logos/logosCarousel';

const SectionFive = () => {
  return (
    <div className="w-full">
      <div className="bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${JumboBg.src})` }}>
        <div className="space-y-2 bg-gradient-to-b from-[#ffffffad] to-white-100 px-2">
          <div className="flex justify-center items-center py-5  w-full mb-14">
            <HeroSection
              title="See shops owned by our Talents!"
              desc={
                <p className="text-[#0D0C22] text-left md:text-justify font-manropeL text-[16px]">
                  Unlock limitless possibilities! Launch your personalized online store effortlessly and reach customers
                  worldwide in just a few clicks. Create your free shop now and start selling your digital products
                  globally. Your journey to success begins here! 🌍🛍️
                </p>
              }
              slug="Start Selliing"
              href="/shop"
              badge="Zuri Shops"
              bottom={true}
            />
          </div>
        </div>
      </div>
      <div className="w-full md:mt-10">
        <DynamicCategoryCarousel />
      </div>

      <div className="w-full mt-16">
        <LogoCarousel color={true} />
      </div>
    </div>
  );
};

export default SectionFive;
