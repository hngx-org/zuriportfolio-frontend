import React, { useRef, useState } from 'react';
import {
  Airdrop,
  ArrowDown2,
  ArrowRight2,
  Category,
  Cloud,
  Code,
  CommandSquare,
  Data,
  Filter,
  MobileProgramming,
  PenTool2,
  Radar,
  SearchNormal1,
} from 'iconsax-react';
import FilterComponent from './FilterComponent';
import CustomDropdown from './CustomDropdown';

const SearchAndFilter: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedOption2, setSelectedOption2] = useState<string>('');
  const [showRightButton, setShowRightButton] = useState<boolean>(true);
  const [showFilterComponent, setShowFilterComponent] = useState<boolean>(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const slider = sliderRef.current!; // Non-null assertion

    const isEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth;

    setShowRightButton(!isEnd);
  };

  const slideRight = () => {
    const slider = sliderRef.current!; // Non-null assertion
    slider.scrollLeft += 150; // Adjust the scroll distance as needed
  };

  const handleCustomDropdownChange = (option: string) => {
    setSelectedOption(option);
  };
  const handleCustomDropdownChange2 = (option: string) => {
    setSelectedOption2(option);
  };
  const scrollToSection = (index: any) => {
    const section = document.getElementById(`section-${index}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const sectionsData = [
    {
      icon: <Filter size={26} color="white" />,
      activeIcon: <Filter size={26} color="black" />,
      text: 'All_Filter',
    },
    {
      icon: <Category size={26} color="white" />,
      activeIcon: <Category size={26} color="#737373" />,
      text: 'All',
    },
    {
      icon: <PenTool2 size={26} color="white" />,
      activeIcon: <PenTool2 size={26} color="#737373" />,
      text: 'Design',
    },
    {
      icon: <Code size="26" color="white" />,
      activeIcon: <Code size={26} color="#737373" />,
      text: 'Frontend',
    },
    {
      icon: <CommandSquare size="26" color="white" />,
      activeIcon: <CommandSquare size={26} color="#737373" />,
      text: 'Backend',
    },
    {
      icon: <MobileProgramming size="26" color="white" />,
      activeIcon: <MobileProgramming size={26} color="#737373" />,
      text: 'Mobile',
    },
    {
      icon: <Cloud size="26" color="white" />,
      activeIcon: <Cloud size={26} color="#737373" />,
      text: 'Cloud_Computing',
    },
    {
      icon: <Data size="26" color="white" />,
      activeIcon: <Data size={26} color="#737373" />,
      text: 'Data_Science',
    },
    {
      icon: <Airdrop size="26" color="white" />,
      activeIcon: <Airdrop size={26} color="#737373" />,
      text: 'Cybersecurity',
    },
    {
      icon: <Code size="26" color="white" />,
      activeIcon: <Code size={26} color="#737373" />,
      text: 'Devops',
    },
  ];

  return (
    <div className="md:container margin-auto mt-10 md:px-10 mb-10 px-3 py-8">
      <div className="flex-col justify-start items-start gap-3 flex mb-10 w-[90vw] px-3 sm:px-6">
        <div className="text-zinc-900 text-[32px] md:text-[57px] font-bold font-manropeL leading-[40px] md:leading-[64px]">
          Filter
        </div>
        <div className="text-neutral-500 text-[14px] md:text-[22px] font-normal font-manropeBL leading-5 md:leading-7">
          Customize and refine your search results to suit your specific preferences
        </div>
      </div>
      <div className="md:justify-between w-[90vw] justify-center items-center md:items-start gap-3 md:gap-[24px] flex flex-col md:flex-row mb-8">
     <div className="flex justify-start items-center gap-3 flex-grow w-[100vw] h-12 md:h-14 pl-3">
            <div className="h-6 absolute md:left-10 sm:left-7 mx-3 md:mx-0 bottom-5 md:bottom-7">
              <SearchNormal1 color="#737373" />
            </div>
            <input
              type="text"
              className="flex-grow h-[60px] sm:w-full ml-1 md:mx-3 mb-6 pl-9 md:pl-12 sm:pl-14 rounded-2xl border border-stone-300 focus:outline-none w-[95vw] md:w-[200px] mt-4"
              placeholder="Search by name or role"
            />
          </div>
        </div>
        <div className="flex gap-6 flex-col md:flex-row">
          <CustomDropdown
            options={['Nigeria', 'Ghana', 'Cameroon']}
            selectedValue={selectedOption}
            onChange={handleCustomDropdownChange}
          />
          <CustomDropdown
            options={['Trending', 'Music', 'Drama']}
            selectedValue={selectedOption2}
            onChange={handleCustomDropdownChange2}
          />
        </div>
      </div>

      <div
        className=" w-[90vw] h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-none px-1 sm:px-2"
        ref={sliderRef}
        onScroll={handleScroll}
      >
        <div className="justify-start items-center gap-2 inline-flex mt-8">
          {sectionsData.map((section, index) => (
            <div
              key={index}
              className={`px-4 py-3 mx-4 rounded-2xl justify-center items-center gap-4 flex cursor-pointer ${
                activeSection === index ? 'bg-brand-green-primary text-white-100' : 'bg-white text-[#737373]'
              } ${section.text === 'All_Filter'? 'border':""}`}
              onClick={() => {
                setActiveSection(index);
                setShowFilterComponent(section.text === 'All_Filter');
              }}
            >
              <div className="w-6 h-6 relative">{activeSection === index ? section.icon : section.activeIcon}</div>
              <div className="text-center text-xs font-manropeEB leading-none tracking-tight">{section.text}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative -right-1 w-[91vw]">
        {showRightButton && (
          <div
            className="w-12 h-12 p-3 bg-white rounded-2xl border border-stone-300 justify-center items-center gap-2 inline-flex absolute -top-[3.05rem] right-0 bg-white-100"
            onClick={slideRight}
          >
            <div className="w-6 h-6 justify-center items-center flex cursor-pointer">
              <div className="w-6 h-6 relative">
                <ArrowRight2 color="#737373" />
              </div>
            </div>
          </div>
        )}
      </div>
      {showFilterComponent && <FilterComponent />}
    </div>
  );
};

export default SearchAndFilter;
