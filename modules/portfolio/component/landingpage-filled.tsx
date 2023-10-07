import React from 'react';
import Image from 'next/image';


const LandingPageFilled: React.FC = () => {
  return (
    <div className="flex flex-col gap-20 w-full">
      <div className="flex flex-col gap-6">
        <div className="relative flex flex-col justify-end items-start pt-40 px-24">
          <Image
            src="/assets/images/landingPageFilled/cover.svg"
            width={0}
            height={0}
            alt="cover"
            className="w-[1440px] h-[292px] absolute top-0 left-0"
          />
          <div className="border-solid border-[#009254] overflow-hidden bg-white/50 relative flex flex-col justify-end pt-4 items-start border-2 rounded-[180px]">
            <Image
              src="/assets/images/landingPageFilled/profile.png"
              id="Image1"
              width={150}
              height={150}
              alt="cover"
              className="mx-0"
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-start mx-24">
          <div className="flex flex-col gap-2 items-start">
            <div className="flex flex-col gap-1 w-64">
              <div className="text-2xl font-['Manrope'] font-bold leading-[32px] text-[#2e3130]">
                BabatundeNDE WALTERS
              </div>
              <div className="flex flex-row mr-5 gap-1 items-start">
                <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#444846]">
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
            <button className="flex flex-col w-[310px] items-start">
              <div className="text-sm font-['Manrope'] font-semibold tracking-[0.04] leading-[20px] text-[#8d9290]">
                Lagos, Nigeria
              </div>
            </button>
          </div>
          <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#5b8def]">
            <a href='#'>Edit</a>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-start mx-24">
        <div className="flex flex-row justify-between mb-2 items-center relative">
          <div className="flex flex-row gap-3 items-start">
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
              className="border-solid border-[#009254] flex flex-col justify-center w-16 shrink-0 h-16 items-start border-t-0 border-b-4 border-x-0"
            >
              <div className="text-2xl font-['Manrope'] font-bold leading-[32px] text-[#2e3130]">
                About
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-6 items-center ml-[920px]">
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#5b8def]">
            <a href="#">Edit</a>
            </div>
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#ff5c5c]">
              <a href='#'>Delete</a>
            </div>
          </div>
        </div>
        <div className="font-['Manrope'] tracking-[0.08] leading-[24px] text-[#737876] self-end mb-4 w-full">
          I'm Babatundende, a digital product designer based in Lagos, Nigeria. My
          design journey has taken me across various companies, startups, and
          agencies in both Africa and Europe. With a unique blend of design and
          engineering expertise, I've applied design methodologies to tackle
          diverse problem domains, taking charge of the entire design process,
          from research to implementation.Beyond my product design journey,
          you'll often find me on the tennis court. I also nurture my creativity
          through music, language learning, and exploration of new destinations.
        </div>
        <div
          id="Divider"
          className="border-solid border-[#e1e3e2] mb-4 h-px shrink-0 border-t border-b-0 border-x-0"
        />
        <div className="bg-white flex flex-row justify-between items-end mb-4 mr-px rounded-lg">
          <div className="flex flex-col mb-4 gap-2 h-[240px] items-start">
            <div className="flex flex-row mb-4 gap-3 w-56 items-start">
              <Image
                src="/assets/images/landingPageFilled/menu.svg"
                id="Vuesaxboldmenu1"
                width={0}
                height={0}
                alt="cover"
                className="w-6 shrink-0"
              />
              <div
                id="Experience2"
                className="border-solid border-[#009254] flex flex-col justify-center w-48 h-16 items-start border-t-0 border-b-4 border-x-0"
              >
                <div className="text-2xl font-['Manrope'] font-bold leading-[32px] text-[#2e3130]">
                  Work Experience
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between w-[409px] items-start ml-8 mr-2">
              <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#8d9290]">
                May 2021 - Present
              </div>
              <div className="text-xl font-['Manrope'] font-semibold leading-[28px] text-[#2e3130]">
                Pepsi, Nigeria
              </div>
            </div>
            <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#009254] mb-8">
              Senior product designer
            </div>
            <div className="flex flex-row justify-between mr-2 w-[409px] items-start">
              <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#8d9290]">
                May 2021 - Present
              </div>
              <div className="text-xl font-['Manrope'] font-semibold leading-[28px] text-[#2e3130]">
                Pepsi, Nigeria
              </div>
            </div>
            <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#009254]">
              Senior product designer
            </div>
          </div>
          <div className="flex flex-col gap-6 w-1/2 items-end">
            <div className="flex flex-row mb-5 gap-6 items-start">
              <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#5b8def]">
                <a href='#'>Edit</a>
              </div>
              <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#ff5c5c]">
                <a href="#">Delete</a>
              </div>
            </div>
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] w-full">
              Implemented A/B testing for website redesign, leading to a 40%
              improvement in user retention and a 25% increase in conversion
              rates, ultimately resulting in a 20% boost in overall revenue.
            </div>
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] w-full">
              Implemented A/B testing for website redesign, leading to a 40%
              improvement in user retention and a 25% increase in conversion
              rates, ultimately resulting in a 20% boost in overall revenue.
            </div>
          </div>
        </div>
        <div
          id="Divider1"
          className="border-solid border-[#e1e3e2] mb-4 h-px shrink-0 border-t border-b-0 border-x-0"
        />
        <div className="flex flex-row justify-between mb-2 items-start">
          <div className="flex flex-row gap-3 items-start">
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
              className="border-solid border-[#009254] flex flex-col justify-center w-20 shrink-0 h-16 items-start border-t-0 border-b-4 border-x-0"
            >
              <div className="text-2xl font-['Manrope'] font-bold leading-[32px] text-[#2e3130]">
                Project
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-6 items-start ml-[920px]">
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#5b8def]">
              <a href='#'>Edit</a>
            </div>
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#ff5c5c]">
              <a href='#'>Delete</a>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-16 items-start mb-2 ml-8">
          <Image
            src="/assets/images/landingPageFilled/imageplace.png"
            id="ImagePlaceholder"
            width={200}
            height={250}
            alt="cover"
            className=""
          />
          <div className="flex flex-col justify-between gap-6 w-[848px] items-start">
            <div className="flex flex-col gap-3 items-start">
              <div className="text-xl font-['Manrope'] font-semibold leading-[28px] text-[#2e3130]">
                Byte financiap LandingPageFilled
              </div>
              <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] w-full">
                Implemented A/B testing for website redesign, leading to a 40%
                improvement in user retention and a 25% increase in conversion
                rates, ultimately resulting in a 20% boost in overall revenue.
              </div>
            </div>
            <div className="flex flex-row justify-between mr-64 items-start">
              <div className="border-solid border-[#8d9290] flex flex-col w-16 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">
                  UI/UX
                </div>
              </div>
              <div className="border-solid border-[#8d9290] flex flex-col w-16 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">
                  Figma
                </div>
              </div>
              <div className="border-solid border-[#8d9290] flex flex-col w-20 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">
                  Sketch
                </div>
              </div>
              <div className="border-solid border-[#8d9290] flex flex-col w-16 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">
                  Miro
                </div>
              </div>
              <div className="border-solid border-[#8d9290] flex flex-col w-24 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">
                  Adobe XD
                </div>
              </div>
              <div className="border-solid border-[#8d9290] flex flex-col w-24 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">
                  Adobe XD
                </div>
              </div>
              <div className="border-solid border-[#8d9290] flex flex-col w-16 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">
                  Miro
                </div>
              </div>
            </div>
            <div className="flex flex-row items-start">
              <div className="text-right font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#5b8def]">
                <a href='#'>Link to project</a>
              </div>
              <Image
                src="/assets/images/landingPageFilled/arrow.svg"
                id="Vuesaxlineararrowup"
                width={0}
                height={0}
                alt="cover"
                className="w-8 shrink-0"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-16 items-start mb-4 mx-8">
          <Image
            src="/assets/images/landingPageFilled/imageplace.png"
            id="ImagePlaceholder1"
            width={200}
            height={250}
            alt="cover"
            className=""
          />
          <div className="flex flex-col justify-between gap-6 w-[816px] items-start">
            <div className="flex flex-col gap-3 items-start">
              <div className="text-xl font-['Manrope'] font-semibold leading-[28px] text-[#2e3130]">
                Byte financiap LandingPageFilled
              </div>
              <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] w-full">
                Implemented A/B testing for website redesign, leading to a 40%
                improvement in user retention and a 25% increase in conversion
                rates, ultimately resulting in a 20% boost in overall revenue.
              </div>
            </div>
            <div className="flex flex-row justify-between mr-56 items-start">
              <div className="border-solid border-[#8d9290] flex flex-col w-16 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">
                  UI/UX
                </div>
              </div>
              <div className="border-solid border-[#8d9290] flex flex-col w-16 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">
                  Figma
                </div>
              </div>
              <div className="border-solid border-[#8d9290] flex flex-col w-20 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">
                  Sketch
                </div>
              </div>
              <div className="border-solid border-[#8d9290] flex flex-col w-16 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">
                  Miro
                </div>
              </div>
              <div className="border-solid border-[#8d9290] flex flex-col w-24 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">
                  Adobe XD
                </div>
              </div>
              <div className="border-solid border-[#8d9290] flex flex-col w-24 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">
                  Adobe XD
                </div>
              </div>
              <div className="border-solid border-[#8d9290] flex flex-col w-16 shrink-0 items-center px-4 py-1 border rounded-[24px]">
                <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#444846]">
                  Miro
                </div>
              </div>
            </div>
            <div className="flex flex-row items-start">
              <div className="text-right font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#5b8def]">
                <a href='#'>Link to project</a>
              </div>
              <Image
                src="/assets/images/landingPageFilled/arrow.svg"
                id="Vuesaxlineararrowup1"
                width={0}
                height={0}
                alt="cover"
                className="w-8 shrink-0"
              />
            </div>
          </div>
        </div>
        <div
          id="Divider2"
          className="border-solid border-[#e1e3e2] mb-4 h-px shrink-0 border-t border-b-0 border-x-0"
        />
        <div className="bg-white flex flex-row gap-2 items-end mb-4 mr-px rounded-lg">
          <Image
            src="/assets/images/landingPageFilled/menu.svg"
            id="Vuesaxboldmenu3"
            width={0}
            height={0}
            alt="cover"
            className="mt-5 w-6 shrink-0"
          />
          <div className="flex flex-col mr-[112px] gap-16 h-[208px] items-start">
            <div className="flex flex-col gap-6 w-[145px]">
              <div
                id="Experience6"
                className="border-solid border-[#009254] flex flex-col justify-center h-16 shrink-0 items-start ml-1 mr-5 border-t-0 border-b-4 border-x-0"
              >
                <div className="text-2xl font-['Manrope'] font-bold leading-[32px] text-[#2e3130]">
                  Education
                </div>
              </div>
              <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#8d9290]">
                May 2021 - Present
              </div>
            </div>
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#8d9290]">
              May 2021 - Present
            </div>
          </div>
          <div className="flex flex-col gap-10 items-start mb-4 mr-20">
            <div className="flex flex-col gap-2 w-64 items-start">
              <div className="text-xl font-['Manrope'] font-semibold leading-[28px] text-[#2e3130]">
                M.Sc Interaction design
              </div>
              <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#737876]">
                University of Ghana
              </div>
            </div>
            <div className="flex flex-col gap-2 w-64 items-start">
              <div className="text-xl font-['Manrope'] font-semibold leading-[28px] text-[#2e3130]">
                M.Sc Interaction design
              </div>
              <div className="text-sm font-['Manrope'] tracking-[0.04] leading-[20px] text-[#737876]">
                University of Ghana
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-5 gap-6 w-1/2 items-end">
            <div className="flex flex-row mb-5 gap-6 items-start">
              <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#5b8def]">
                <a href='#'>Edit</a>
              </div>
              <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#ff5c5c]">
                <a href='#'>Delete</a>
              </div>
            </div>
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] w-full">
              Implemented A/B testing for website redesign, leading to a 40%
              improvement in user retention and a 25% increase in conversion
              rates, ultimately resulting in a 20% boost in overall revenue.
            </div>
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] w-full">
              Implemented A/B testing for website redesign, leading to a 40%
              improvement in user retention and a 25% increase in conversion
              rates, ultimately resulting in a 20% boost in overall revenue.
            </div>
          </div>
        </div>
        <div
          id="Divider3"
          className="border-solid border-[#e1e3e2] mb-4 h-px shrink-0 border-t border-b-0 border-x-0"
        />
        <div className="flex flex-row justify-between mb-2 items-start">
          <div className="flex flex-row gap-3 w-20 shrink-0 items-start">
            <Image
              src="/assets/images/landingPageFilled/menu.svg"
              id="Vuesaxboldmenu4"
              width={0}
              height={0}
              alt="cover"
              className="w-6 shrink-0"
            />
            <div
              id="Experience8"
              className="border-solid border-[#009254] flex flex-col justify-center w-12 shrink-0 h-16 items-start border-t-0 border-b-4 border-x-0"
            >
              <div className="text-2xl font-['Manrope'] font-bold leading-[32px] text-[#2e3130]">
                Skill
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-6 items-start ml-[920px]">
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#5b8def]">
              <a href='#'>Edit</a>
            </div>
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#ff5c5c]">
              <a href='#'>Delete</a>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between w-1/2 items-start mb-3 ml-8">
          <div
            id="Tag"
            className="border-solid border-[#e1e3e2] bg-white flex flex-col justify-center h-12 items-center border rounded-[24px]"
          >
            <div
              id="Text1"
              className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] mx-4"
            >
              Graphic Design
            </div>
          </div>
          <div
            id="Tag1"
            className="border-solid border-[#e1e3e2] bg-white flex flex-col justify-center h-12 items-center border rounded-[24px]"
          >
            <div
              id="Text2"
              className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] mx-4"
            >
              UI/UX Design
            </div>
          </div>
          <div
            id="Tag2"
            className="border-solid border-[#e1e3e2] bg-white flex flex-col justify-center h-12 items-center border rounded-[24px]"
          >
            <div
              id="Text3"
              className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] mx-4"
            >
              Visual Branding
            </div>
          </div>
          <div
            id="Tag3"
            className="border-solid border-[#e1e3e2] bg-white flex flex-col justify-center h-12 items-center border rounded-[24px]"
          >
            <div
              id="Text4"
              className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] mx-4"
            >
              Illustrations
            </div>
          </div>
        </div>
        <div
          id="Divider4"
          className="border-solid border-[#e1e3e2] mb-4 h-px shrink-0 border-t border-b-0 border-x-0"
        />
        <div className="flex flex-row justify-between mb-2 items-start">
          <div className="flex flex-row gap-3 w-24 shrink-0 items-start">
            <Image
              src="/assets/images/landingPageFilled/menu.svg"
              id="Vuesaxboldmenu5"
              width={0}
              height={0}
              alt="cover"
              className="w-6 shrink-0"
            />
            <div
              id="Experience10"
              className="border-solid border-[#009254] flex flex-col justify-center w-16 shrink-0 h-16 items-start border-t-0 border-b-4 border-x-0"
            >
              <div className="text-2xl font-['Manrope'] font-bold leading-[32px] text-[#2e3130]">
                Shop
              </div>
            </div>
          </div>
          <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#ff5c5c] ml-[960px]">
            <a href='#'>Delete</a>
          </div>
        </div>
        <Image
          src="/assets/images/landingPageFilled/book.jpg"
          id="ImagePlaceholder2"
          width={200}
          height={250}
          alt="cover"
          className="mb-2 ml-8"
        />
        <div className="flex flex-row gap-px items-start mb-4 ml-8">
          <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#5b8def]">
            <a href='#'>Go to shop</a>
          </div>
          <Image
            src="/assets/images/landingPageFilled/arrow.svg"
            id="Vuesaxlineararrowup2"
            width={0}
            height={0}
            alt="cover"
            className="w-8 shrink-0"
          />
        </div>
        <div
          id="Divider5"
          className="border-solid border-[#e1e3e2] mb-4 h-px shrink-0 border-t border-b-0 border-x-0"
        />
        <div className="flex flex-row justify-between mb-2 items-start">
          <div className="flex flex-row gap-3 items-start">
            <Image
              src="/assets/images/landingPageFilled/menu.svg"
              id="Vuesaxboldmenu6"
              width={0}
              height={0}
              alt="cover"
              className="w-6 shrink-0"
            />
            <div
              id="Experience12"
              className="border-solid border-[#009254] flex flex-col justify-center w-24 shrink-0 h-16 items-start border-t-0 border-b-4 border-x-0"
            >
              <div className="text-2xl font-['Manrope'] font-bold leading-[32px] text-[#2e3130]">
                Interest
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-6 items-start ml-[920px]">
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#5b8def]">
              <a href='#'>Edit</a>
            </div>
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#ff5c5c]">
              <a>Delete</a>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-start mb-3 ml-8 mr-[366px]">
          <div
            id="Tag4"
            className="border-solid border-[#e1e3e2] bg-white flex flex-col justify-center h-12 items-center border rounded-[24px]"
          >
            <div
              id="Text5"
              className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] mx-10"
            >
              Dancing
            </div>
          </div>
          <div
            id="Tag5"
            className="border-solid border-[#e1e3e2] bg-white flex flex-col justify-center h-12 items-center border rounded-[24px]"
          >
            <div
              id="Text6"
              className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] mx-12"
            >
              Singing
            </div>
          </div>
          <div
            id="Tag6"
            className="border-solid border-[#e1e3e2] bg-white flex flex-col justify-center h-12 items-center border rounded-[24px]"
          >
            <div
              id="Text7"
              className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] mx-10"
            >
              Bowling
            </div>
          </div>
          <div
            id="Tag7"
            className="border-solid border-[#e1e3e2] bg-white flex flex-col justify-center h-12 items-center border rounded-[24px]"
          >
            <div
              id="Text8"
              className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] mx-12"
            >
              Hiking
            </div>
          </div>
          <div
            id="Tag8"
            className="border-solid border-[#e1e3e2] bg-white flex flex-col justify-center h-12 items-center border rounded-[24px]"
          >
            <div
              id="Text9"
              className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876] mx-8"
            >
              Go carting
            </div>
          </div>
        </div>
        <div
          id="Divider6"
          className="border-solid border-[#e1e3e2] mb-4 h-px shrink-0 border-t border-b-0 border-x-0"
        />
        <div className="flex flex-row justify-between mb-2 items-start">
          <div className="flex flex-row gap-3 items-start">
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
              <div className="text-2xl font-['Manrope'] font-bold leading-[32px] text-[#2e3130]">
                Contact
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-6 items-start ml-[920px]">
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#5b8def]">
              <a href='#'>Edit</a>
            </div>
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#ff5c5c]">
              <a>Delete</a>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between ml-8 gap-24 items-start">
          <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876]">
            Email
          </div>
          <div className="flex flex-row w-[208px] shrink-0 items-start">
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#5b8def]">
              <a href='#'>Babatundende@gmailcom</a>
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
        <div className="flex flex-row ml-8 gap-20 items-start">
          <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876]">
            Twitter
          </div>
          <div className="flex flex-row w-32 shrink-0 items-start">
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#5b8def]">
              <a href='#'>Babatunde</a>
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
        <div className="flex flex-row ml-8 gap-24 items-start">
          <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876]">
            Github
          </div>
          <div className="flex flex-row w-32 shrink-0 items-start">
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#5b8def]">
              <a href='#'>Babatunde</a>
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
        <div className="flex flex-row gap-20 items-start mb-4 ml-8">
          <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#737876]">
            Linkedin
          </div>
          <div className="flex flex-row w-32 shrink-0 items-start">
            <div className="font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#5b8def]">
              <a href='#'>Babatunde</a>
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
        <div
          id="Divider7"
          className="border-solid border-[#e1e3e2] mb-4 h-px shrink-0 border-t border-b-0 border-x-0"
        />
        <button
          id="Buttons"
          className="border-solid border-[#009254] bg-white flex flex-row justify-center gap-2 h-12 shrink-0 items-center px-8 py-3 border rounded-lg mb-3"
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
            className="text-center font-['Manrope'] font-semibold tracking-[0.08] leading-[24px] text-[#009254]"
          >
            Add
            {"  "}
            section{" "}
          </button>
        </button>
      </div>
    </div>
  );
};

export default LandingPageFilled;
