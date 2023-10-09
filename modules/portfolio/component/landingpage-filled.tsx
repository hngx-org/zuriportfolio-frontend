import { useState } from 'react';
import Image from 'next/image';
import SkillsModal from './skillModal/SkillsModal';

const LandingPageFilled: React.FC = () => {
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);

  const handleOpenSkillModal = () => {
    setIsSkillModalOpen(true);
  };
  const handleCloseSkillModal = () => {
    setIsSkillModalOpen(false);
  };
  return (
    <div className="flex flex-col text-Manrope gap-20 w-[100%] overflow-hidden">
      <div className="flex flex-col text-Manrope">
        <div className="relative flex flex-col justify-end items-start pt-40 px-24">
          <Image
            src="/assets/images/landingPageFilled/cover.svg"
            width={0}
            height={0}
            alt="cover"
            className="w-[1440px] h-[292px] absolute top-0 left-0 "
          />
        </div>
        <div className="flex flex-col w-[1240px] flex-col items-start gap-6 ml-14 mr-10">
          <div className="border-solid border-[#009254] overflow-hidden bg-opacity-50 bg-gray-50 relative flex flex-col justify-end pt-4 items-start border-2 rounded-[180px]">
            <Image
              src="/assets/images/landingPageFilled/profile.png"
              id="Image1"
              width={150}
              height={150}
              alt="cover"
              className="mx-0"
            />
          </div>
        
          <div className="flex h-88 justify-between items-center self-stretch text-Manrope">
            <div className="flex flex-col gap-2 items-start">
              <div className="flex flex-col gap-1">
                <div className="font-Manrope text-2xl font-bold leading-8 text-[#2e3130] self-stretch">
                  BABATUNDE WALTERS
                </div>
                <div className="flex flex-row mr-5 gap-1 items-start">
                  <div className="font-Manrope text-base font-semibold leading-6 text-[#444846]">
                    Product Design (Beginner)
                  </div>
                  <Image
                    src="/assets/images/landingPageFilled/icon.svg"
                    id="BADGE"
                    width={0}
                    height={0}
                    alt="cover"
                    className="w-6 shrink-0"
                  />
                </div>
              </div>
              <div className="text-gray-600 font-manrope font-small text-sm leading-5 text-[#8d9290]">
                Lagos, Nigeria
              </div>
              
            </div>
            <div className="text-[#5B8DEF] font-Manrope font-semibold text-base leading-6 mr-10">
              <a href="#">Edit</a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-1440 p-0 md:p-100 flex-col items-start ml-14 mr-10">
        <div className="flex justify-between items-center self-stretch text-Manrope">
          <div className="flex flex-row gap-3 items-start text-Manrope">
            <Image
              src="/assets/images/landingPageFilled/menu.svg"
              id="Vuesaxboldmenu"
              width={0}
              height={0}
              alt="cover"
              className="w-6 shrink-0"
            />
            <div
              id="Experience"
              className="border-solid border-[#009254] flex flex-col justify-center w-17 shrink-0 h-9 items-start border-t-0 border-b-4 border-x-0"
            >
              <div className="text-Manrope text-2xl font-semibold leading-8 mb-2">About</div>
            </div>
          </div>
          <div className="flex h-26 items-center gap-6">
            <div className="text-[#5B8DEF] font-Manrope font-semibold text-base leading-6">
              <a href="#">Edit</a>
            </div>
            <div className="font-Manrope font-semibold text-base leading-6 text-[#ff5c5c]">
              <a href="#">Delete</a>
            </div>
          </div>
        </div>
        <div className="text-[#737876]  font-Manrope font-normal leading-6 tracking-tight flex-1 m-3 ml-8">
          Im Babatundende, a digital product designer based in Lagos, Nigeria. My
          design journey has taken me across various companies, startups, and
          agencies in both Africa and Europe. With a unique blend of design and
          engineering expertise, Ive applied design methodologies to tackle
          diverse problem domains, taking charge of the entire design process,
          from research to implementation.Beyond my product design journey,
          youll often find me on the tennis court. I also nurture my creativity
          through music, language learning, and exploration of new destinations.
        </div>
        <div
          id="Divider"
          className="border-solid border-[#e1e3e2] mb-4 h-px shrink-0 border-t border-b-0 border-x-0 w-[100%]"
        />
        <div className='flex flex-col w-1238 items-start gap-4 rounded-sm'>
          <div className="flex justify-between items-center self-stretch">
            <div className="flex flex-row gap-3 items-start">
              <Image
                src="/assets/images/landingPageFilled/menu.svg"
                id="Vuesaxboldmenu2"
                width={0}
                height={0}
                alt="cover"
                className="flex w-7 h-7 justify-center items-center"
              />
              <div
                id="Experience4"
                className="border-solid border-[#009254] flex py-1 items-center gap-6 border-b-4"
              >
                <div className="text-tertiary-20 font-Manrope font-semibold text-2xl leading-[32px]">
                  Work Experience
                </div>
              </div>
            </div>
            <div className="flex h-26 items-center gap-6">
              <div className="text-[#5B8DEF] font-Manrope font-semibold text-base leading-6">
                <a href='#'>Edit</a>
              </div>
              <div className="font-Manrope font-semibold text-base leading-6 text-[#ff5c5c]">
                <a href='#'>Delete</a>
              </div>
            </div>
          </div>
          <div className="ml-10">
            <div className="flex flex-col sm:flex-row items-start gap-[110px] self-stretch pl-0">
              <div className="flex items-start gap-20 flex-1 opacity-88">
                <div className="font-manrope font-semibold text-lg leading-6 tracking-tighter opacity-90 text-[#8d9290] w-[200px] sm:w-[200px]">
                  May 2021 - Present
                </div>
                <div className='flex flex-col gap-2'>
                  <div className="text-tertiary-tertiary-20 font-Manrope font-semibold text-xl leading-7 text-[#2e3130] w-[200px] sm:w-[200px]">
                    Pepsi, Nigeria
                  </div>
                  <div className="text-primary-color-primary-base-color font-Manrope text-sm font-normal leading-5 text-[#009254]">
                    Senior product designer
                  </div>
                </div>
              </div>
              <div className="font-Manrope text-lg font-semibold leading-6 text-[#737876]">
                Implemented A/B testing for website redesign, leading to a 40%
                improvement in user retention and a 25% increase in conversion rates,
                ultimately resulting in a 20% boost in overall revenue.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-[110px] self-stretch pl-0 mt-5">
              <div className="flex items-start gap-20 flex-1 opacity-88">
                <div className="font-manrope font-semibold text-lg leading-6 tracking-tighter opacity-90 text-[#8d9290] w-[200px] sm:w-[200px]">
                  May 2021 - Present
                </div>
                <div className='flex flex-col gap-2 w-[200px] sm:w-[200px]'>
                  <div className="font-Manrope font-semibold text-xl leading-7 text-[#2e3130]">
                    Pepsi, Nigeria
                  </div>
                  <div className="text-primary-color-primary-base-color font-Manrope text-sm font-normal leading-5 text-[#009254]">
                    Senior product designer
                  </div>
                </div>
              </div>
              <div className="font-Manrope text-lg font-semibold leading-6 text-[#737876]">
                Implemented A/B testing for website redesign, leading to a 40%
                improvement in user retention and a 25% increase in conversion rates,
                ultimately resulting in a 20% boost in overall revenue.
              </div>
            </div>
          </div>
        </div>
        <div
          id="Divider1"
          className="border-solid border-[#e1e3e2] mb-6 mt-6 h-px shrink-0 border-t border-b-0 border-x-0 w-[100%]"
        />
        <div className='flex flex-col self-stretch gap-8'>
          <div className="flex self-stretch justify-between items-center">
            <div className="flex items-center gap-4">
              <Image
                src="/assets/images/landingPageFilled/menu.svg"
                id="Vuesaxboldmenu2"
                width={0}
                height={0}
                alt="cover"
                className="w-6 shrink-0"
              />
              <div
                id="Experience4"
                className="border-solid border-[#009254] flex py-1 items-center gap-6 border-b-4"
              >
                <div className="text-tertiary-tertiary-20 font-Manrope font-bold text-xl leading-[32px] text-[#2e3130]">Project</div>
              </div>
            </div>
            <div className="flex h-26 items-center gap-6">
              <div className="text-[#5B8DEF] font-Manrope font-semibold text-base leading-6">
                <a href="#">Edit</a>
              </div>
              <div className="font-Manrope font-semibold text-base leading-6 text-[#ff5c5c]">
                <a href="#">Delete</a>
              </div>
            </div>
          </div>
          <div className="flex p-0 32px items-start gap-24 self-stretch ml-8">
            <Image
              src="/assets/images/landingPageFilled/imageplace.png"
              id="ImagePlaceholder"
              width={296}
              height={308}
              alt="cover"
              className=""
            />
            <div className="flex flex-col justify-between gap-6 w-[70%] items-start">
              <div className='flex flex-col justify-center items-start gap-12 self-stretch'>
                <div className="flex flex-col gap-3 items-start">
                  <div className="text-Manrope font-semibold text-lg leading-7 flex-1 text-[#2e3130]">
                    Byte financiap App
                  </div>
                  <div className="font-Manrope font-semibold leading-6 text-[#737876] self-stretch">
                    Implemented A/B testing for website redesign, leading to a 40%
                    improvement in user retention and a 25% increase in conversion
                    rates, ultimately resulting in a 20% boost in overall revenue.
                  </div>
                </div>
                <div className="flex flex-wrap items-start content-start gap-3 self-stretch">
                  <div className="flex p-2 border rounded-3xl justify-center items-center px-3 text-manrope text-[#444846]">
                    UI/UX
                  </div>
                  <div className="flex p-2 border rounded-3xl justify-center items-center px-3 text-manrope text-[#444846]">
                    Figma
                  </div>
                  <div className="flex p-2 border rounded-3xl justify-center items-center px-3 text-manrope text-[#444846]">
                    Sketch
                  </div>
                  <div className="flex p-2 border rounded-3xl justify-center items-center px-3 text-manrope text-[#444846]">
                    Miro
                  </div>
                  <div className="flex p-2 border rounded-3xl justify-center items-center px-3 text-manrope text-[#444846]">
                    Adobe XD
                  </div>
                  <div className="flex p-2 border rounded-3xl justify-center items-center px-3 text-manrope text-[#444846]">
                    Adobe XD
                  </div>
                  <div className="flex p-2 border rounded-3xl justify-center items-center px-3 text-manrope text-[#444846]">
                    Miro
                  </div>
                </div>
              </div>
              <div className="flex h-8.4855 items-center self-stretch">
                <div className="text-info-state-info-light text-right font-Manrope font-semibold text-lg leading-6 tracking-tight text-[#5b8def]">
                  <a href="#">Link to project</a>
                </div>
                <Image
                  src="/assets/images/landingPageFilled/arrow.svg"
                  id="Vuesaxlineararrowup"
                  width={24}
                  height={24}
                  alt="cover"
                  className="w-8 shrink-0"
                />
              </div>
            </div>
          </div>

          <div className="flex p-0 32px items-start gap-24 self-stretch ml-8">
            <Image
              src="/assets/images/landingPageFilled/imageplace.png"
              id="ImagePlaceholder"
              width={296}
              height={308}
              alt="cover"
              className=""
            />
            <div className="flex flex-col justify-between gap-6 w-[70%] items-start">
              <div className='flex flex-col justify-center items-start gap-12 self-stretch'>
                <div className="flex flex-col gap-3 items-start">
                  <div className="text-Manrope font-semibold text-lg leading-7 flex-1 text-[#2e3130]">
                    Byte financiap App
                  </div>
                  <div className="font-Manrope font-semibold leading-6 text-[#737876] self-stretch">
                    Implemented A/B testing for website redesign, leading to a 40%
                    improvement in user retention and a 25% increase in conversion
                    rates, ultimately resulting in a 20% boost in overall revenue.
                  </div>
                </div>
                <div className="flex flex-wrap items-start content-start gap-3 self-stretch">
                  <div className="flex p-2 border rounded-3xl justify-center items-center px-3 text-manrope text-[#444846]">
                    UI/UX
                  </div>
                  <div className="flex p-2 border rounded-3xl justify-center items-center px-3 text-manrope text-[#444846]">
                    Figma
                  </div>
                  <div className="flex p-2 border rounded-3xl justify-center items-center px-3 text-manrope text-[#444846]">
                    Sketch
                  </div>
                  <div className="flex p-2 border rounded-3xl justify-center items-center px-3 text-manrope text-[#444846]">
                    Miro
                  </div>
                  <div className="flex p-2 border rounded-3xl justify-center items-center px-3 text-manrope text-[#444846]">
                    Adobe XD
                  </div>
                  <div className="flex p-2 border rounded-3xl justify-center items-center px-3 text-manrope text-[#444846]">
                    Adobe XD
                  </div>
                  <div className="flex p-2 border rounded-3xl justify-center items-center px-3 text-manrope text-[#444846]">
                    Miro
                  </div>
                </div>
              </div>
              <div className="flex h-8.4855 items-center self-stretch">
                <div className="text-info-state-info-light text-right font-Manrope font-semibold text-lg leading-6 tracking-tight text-[#5b8def]">
                  <a href="#">Link to project</a>
                </div>
                <Image
                  src="/assets/images/landingPageFilled/arrow.svg"
                  id="Vuesaxlineararrowup"
                  width={24}
                  height={24}
                  alt="cover"
                  className="w-8 shrink-0"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          id="Divider2"
          className="border-solid border-[#e1e3e2] mb-8 mt-8 h-px shrink-0 border-t border-b-0 border-x-0 w-[100%]"
        />

        <div className="flex flex-col items-start gap-6 rounded-sm bg-primary-color-primary-100">
          <div className="flex justify-between items-center self-stretch">
            <div className="flex flex-row gap-3 items-start">
              <Image
                src="/assets/images/landingPageFilled/menu.svg"
                id="Vuesaxboldmenu2"
                width={0}
                height={0}
                alt="cover"
                className="flex w-7 h-7 justify-center items-center"
              />
              <div
                id="Experience4"
                className="border-solid border-[#009254] flex py-1 items-center gap-6 border-b-4"
              >
                <div className="text-tertiary-20 font-Manrope font-semibold text-2xl leading-[32px]">
                  Education
                </div>
              </div>
            </div>
            <div className="flex h-26 items-center gap-6">
              <div className="text-[#5B8DEF] font-Manrope font-semibold text-base leading-6">
                <a href='#'>Edit</a>
              </div>
              <div className="font-Manrope font-semibold text-base leading-6 text-[#ff5c5c]">
                <a href='#'>Delete</a>
              </div>
            </div>
          </div>
          <div className="ml-10">
            <div className="flex flex-col sm:flex-row items-start gap-[110px] self-stretch pl-0">
              <div className="flex items-start gap-20 flex-1 opacity-88">
                <div className="font-manrope font-semibold text-lg leading-6 tracking-tighter opacity-90 text-[#8d9290] w-[200px] sm:w-[200px]">
                  May 2021 - Present
                </div>
                <div className='flex flex-col gap-2'>
                  <div className="text-tertiary-tertiary-20 font-Manrope font-semibold text-xl leading-7 text-[#2e3130] w-[230px] sm:w-[230px]">
                    M.Sc Interaction design
                  </div>
                  <div className="text-primary-color-primary-base-color font-Manrope text-sm font-normal leading-5 text-[#8d9290]">
                    University of Ghana
                  </div>
                </div>
              </div>
              <div className="font-Manrope font-semibold leading-6 text-[#737876]">
                Implemented A/B testing for website redesign, leading to a 40%
                improvement in user retention and a 25% increase in conversion rates,
                ultimately resulting in a 20% boost in overall revenue.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-[110px] self-stretch pl-0 mt-5">
              <div className="flex items-start gap-20 flex-1 opacity-88">
                <div className="font-manrope font-semibold text-lg leading-6 tracking-tighter opacity-90 text-[#8d9290] w-[200px] sm:w-[200px]">
                  May 2021 - Present
                </div>
                <div className='flex flex-col gap-2 w-[230px] sm:w-[230px]'>
                  <div className="font-Manrope font-semibold text-xl leading-7 text-[#2e3130]">
                    M.Sc Interaction design
                  </div>
                  <div className="font-Manrope text-sm font-normal leading-5 text-[#8d9290]">
                    University of Ghana
                  </div>
                </div>
              </div>
              <div className="font-Manrope font-semibold leading-6 text-[#737876]">
                Implemented A/B testing for website redesign, leading to a 40%
                improvement in user retention and a 25% increase in conversion rates,
                ultimately resulting in a 20% boost in overall revenue.
              </div>
            </div>
          </div>
        </div>
        <div
          id="Divider3"
          className="border-solid border-[#e1e3e2] mb-8 mt-8 h-px shrink-0 border-t border-b-0 border-x-0 w-[100%]"
        />

        <div className="flex flex-col items-start gap-6 rounded-sm bg-primary-color-primary-100">
          <div className="flex justify-between items-center self-stretch w-[220%]">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/images/landingPageFilled/menu.svg"
                id="Vuesaxboldmenu4"
                width={0}
                height={0}
                alt="cover"
                className="w-6 shrink-0"
              />
              <div
                id="Experience4"
                className="border-solid border-[#009254] flex py-1 items-center gap-6 border-b-4"
              >
                <div className="text-tertiary-20 font-Manrope font-semibold text-2xl leading-[32px]">
                  Skill
                </div>
              </div>
            </div>
            <div className="flex h-26 items-end float-right gap-6">
              <div className="text-[#5B8DEF] font-Manrope font-semibold text-base leading-6">
                {/* <a href="#">Edit</a> */}
                <button
                  className="hover:text-brand-green-hover outline-none border-none bg-transparent"
                  onClick={handleOpenSkillModal}
                  type="button"
                >
                  Edit
                </button>
              </div>
              <div className="font-Manrope font-semibold text-base leading-6 text-[#ff5c5c]">
                <a href="#">Delete</a>
              </div>
            </div>
          </div>
          <div className="flex p-0 items-start gap-4">
            <div
              id="Text1"
              className="flex p-2 border rounded-3xl justify-center items-center px-3 text-manrope text-[#444846]"
            >
              Graphic Design
            </div>

            <div
              id="Text2"
              className="flex p-2 border rounded-3xl justify-center items-center px-3 text-manrope text-[#444846]"
            >
              UI/UX Design
            </div>

            <div
              id="Text3"
              className="flex p-2 border rounded-3xl justify-center items-center px-3 text-manrope text-[#444846]"
            >
              Visual Branding
            </div>

            <div
              id="Text4"
              className="flex p-2 border rounded-3xl justify-center items-center px-3 text-manrope text-[#444846]"
            >
              Illustrations
            </div>
          </div>
        </div>
        <div
          id="Divider4"
          className="border-solid border-[#e1e3e2] mb-8 mt-8 h-px shrink-0 border-t border-b-0 border-x-0 w-[100%]"
        />

        <div className="flex flex-col items-start gap-6">
          <div className="flex justify-between items-center self-stretch w-[380%]">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/images/landingPageFilled/menu.svg"
                id="Vuesaxboldmenu5"
                width={0}
                height={0}
                alt="cover"
                className="w-6 shrink-0"
              />
              <div
                id="Experience4"
                className="border-solid border-[#009254] flex py-1 items-center gap-6 border-b-4"
              >
                <div className="text-tertiary-20 font-Manrope font-semibold text-2xl leading-[32px]">
                  Shop
                </div>
              </div>
            </div>
            <div className="font-Manrope font-semibold text-base leading-6 text-[#ff5c5c]">
              <a href='#'>Delete</a>
            </div>
          </div>
          <div className="flex flex-col items-start gap-6 p-0 32px ml-5">
            <Image
              src="/assets/images/landingPageFilled/book.jpg"
              id="ImagePlaceholder2"
              width={296}
              height={308}
              alt="cover"
              className=""
            />
            <div className="flex flex-row items-start">
              <div className="font-Manrope text-lg font-semibold leading-6 text-[#5b8def]">
                <a href="#">Go to shop</a>
              </div>
              <Image
                src="/assets/images/landingPageFilled/arrow.svg"
                id="Vuesaxlineararrowup2"
                width={24}
                height={24}
                alt="cover"
                className="transform rotate-450 justify-center items-center shrink-0"
              />
            </div>
          </div>
        </div>

        <div
          id="Divider5"
          className="border-solid border-[#e1e3e2] mb-8 mt-8 h-px shrink-0 border-t border-b-0 border-x-0 w-[100%]"
        />

        <div className="flex flex-col items-start gap-8">
          <div className="flex justify-between items-center self-stretch w-[205%]">
            <div className="flex align-items-center gap-2">
              <Image
                src="/assets/images/landingPageFilled/menu.svg"
                id="Vuesaxboldmenu6"
                width={0}
                height={0}
                alt="cover"
                className="w-6 shrink-0"
              />
              <div
                id="Experience4"
                className="border-solid border-[#009254] flex py-1 items-center gap-6 border-b-4"
              >
                <div className="text-tertiary-20 font-Manrope font-semibold text-2xl leading-[32px]">
                  Interest
                </div>
              </div>
            </div>
            <div className="flex h-26 items-center gap-6">
              <div className="text-[#5B8DEF] font-Manrope font-semibold text-base leading-6">
                <a href="#">Edit</a>
              </div>
              <div className="font-Manrope font-semibold text-base leading-6 text-[#ff5c5c]">
                <a>Delete</a>
              </div>
            </div>
          </div>
          <div className="flex p-0 32px items-start gap-4 ml-8">
            <div
              id="Text1"
              className="flex p-2 border rounded-3xl justify-center items-center px-3 text-manrope text-[#444846]"
            >
              Graphic Design
            </div>

            <div
              id="Text2"
              className="flex p-2 border rounded-3xl justify-center items-center px-3 text-manrope text-[#444846]"
            >
              UI/UX Design
            </div>

            <div
              id="Text3"
              className="flex p-2 border rounded-3xl justify-center items-center px-3 text-manrope text-[#444846]"
            >
              Visual Branding
            </div>

            <div
              id="Text4"
              className="flex p-2 border rounded-3xl justify-center items-center px-3 text-manrope text-[#444846]"
            >
              Illustrations
            </div>
          </div>
        </div>
        <div
          id="Divider6"
          className="border-solid border-[#e1e3e2] mb-8 mt-8 h-px shrink-0 border-t border-b-0 border-x-0 w-[100%]"
        />
        
        <div className="flex flex-col w-1240px items-start gap-24">
          <div className="flex justify-between items-center self-stretch w-[290%]">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/images/landingPageFilled/menu.svg"
                id="Vuesaxboldmenu7"
                width={0}
                height={0}
                alt="cover"
                className="w-6 shrink-0"
              />
              <div
                id="Experience14"
                className="border-solid border-[#009254] flex flex-col justify-center w-24 shrink-0 h-16 items-start border-t-0 border-b-4 border-x-0"
              >
                <div className="text-2xl font-['Manrope'] font-bold leading-[32px] text-[#2e3130]">Contact</div>
              </div>
            </div>
            <div className="flex h-26 items-center gap-6">
              <div className="text-[#5B8DEF] font-Manrope font-semibold text-base leading-6">
                <a href="#">Edit</a>
              </div>
              <div className="font-Manrope font-semibold text-base leading-6 text-[#ff5c5c]">
                <a>Delete</a>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-6 ml-8">
            <div className="flex flex-row justify-between gap-[105px] items-start">
              <div className="font-Manrope font-semibold text-lg leading-6 tracking-tighter text-[#737876]">Email</div>
              <div className="flex flex-row shrink-0 items-start">
                <div className="font-Manrope font-semibold text-lg leading-6 tracking-tighter text-[#5b8def]">
                  <a href="#">Babatundende@gmailcom</a>
                </div>
                <Image
                  src="/assets/images/landingPageFilled/arrow.svg"
                  id="Vuesaxlineararrowup3"
                  width={0}
                  height={0}
                  alt="cover"
                  className="w-8 shrink-0"
                />
              </div>
            </div>
            <div className="flex flex-row gap-24 items-start">
              <div className="font-Manrope font-semibold text-lg leading-6 tracking-tighter text-[#737876]">Twitter</div>
              <div className="flex flex-row shrink-0 items-start">
                <div className="font-Manrope font-semibold text-lg leading-6 tracking-tighter text-[#5b8def]">
                  <a href="#">Babatundew</a>
                </div>
                <Image
                  src="/assets/images/landingPageFilled/arrow.svg"
                  id="Vuesaxlineararrowup4"
                  width={0}
                  height={0}
                  alt="cover"
                  className="w-8 shrink-0"
                />
              </div>
            </div>
            <div className="flex flex-row gap-24 items-start">
              <div className="font-Manrope font-semibold text-lg leading-6 tracking-tighter text-[#737876]">Github</div>
              <div className="flex flex-row shrink-0 items-start">
                <div className="font-Manrope font-semibold text-lg leading-6 tracking-tighter text-[#5b8def]">
                  <a href="#">Babatundew</a>
                </div>
                <Image
                  src="/assets/images/landingPageFilled/arrow.svg"
                  id="Vuesaxlineararrowup5"
                  width={0}
                  height={0}
                  alt="cover"
                  className="w-8 shrink-0"
                />
              </div>
            </div>
            <div className="flex flex-row gap-20 items-start mb-4">
              <div className="font-Manrope font-semibold text-lg leading-6 tracking-tighter text-[#737876]">Linkedin</div>
              <div className="flex flex-row shrink-0 items-start">
                <div className="font-Manrope font-semibold text-lg leading-6 tracking-tighter text-[#5b8def]">
                  <a href="#">Babatundew</a>
                </div>
                <Image
                  src="/assets/images/landingPageFilled/arrow.svg"
                  id="Vuesaxlineararrowup6"
                  width={0}
                  height={0}
                  alt="cover"
                  className="w-8 shrink-0"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          id="Divider7"
          className="border-solid border-[#e1e3e2] mb-8 mt-8 h-px shrink-0 border-t border-b-0 border-x-0"
        />
        <button
          id="Buttons"
          className="border-solid border-[#009254] bg-white flex flex-row justify-center gap-3 h-12 shrink-0 items-center px-8 py-3 border rounded-lg mb-3 ml-8"
        >
          <Image
            src="/assets/images/landingPageFilled/add.svg"
            id="Vuesaxlinearadd"
            width={0}
            height={0}
            alt="cover"
            className="w-6 shrink-0"
          />
          <button
            id="Button1"
            className="text-center font-Manrope font-semibold text-lg leading-6 tracking-tighter text-[#009254]"
          >
            Add
            {'  '}
            section{' '}
          </button>
        </button>
      </div>
      {isSkillModalOpen && (
        <SkillsModal handleCloseSkillModal={handleCloseSkillModal} isSkillModalOpen={isSkillModalOpen} />
      )}
    </div>
  );
};

export default LandingPageFilled;