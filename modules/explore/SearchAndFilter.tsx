import React, { Dispatch, useRef, useState } from 'react';
import {
  Airdrop,
  ArrowDown2,
  ArrowLeft2,
  ArrowRight2,
  Category,
  Cloud,
  Code,
  CommandSquare,
  Data,
  Filter,
  FilterSquare,
  MobileProgramming,
  PenTool2,
  Radar,
  SearchNormal,
  SearchNormal1,
} from 'iconsax-react';
import FilterComponent from './components/FilterComponent';
import CustomDropdown from './components/CustomDropdown';
import { Input, SelectInput } from '@ui/Input';
import { useExploreParams } from './hooks/exploreParam';
// import Breadcrumbs from '../../components/Breadcrumbs';

const SearchAndFilter = (prop: {
  setSearchQuery?: Dispatch<React.SetStateAction<string>>;
  filters: { SortBy?: number; Country?: string };
  handleFilters: (type: string, value: string | number) => void;
}) => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedOption2, setSelectedOption2] = useState<string>('');
  const [showLeftButton, setShowLeftButton] = useState<boolean>(true);
  const [showRightButton, setShowRightButton] = useState<boolean>(true);
  const [showFilterComponent, setShowFilterComponent] = useState<boolean>(false);

  const { filters, handleFilters } = prop;
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const slider = sliderRef.current!; // Non-null assertion

    // setShowLeftButton(!isStart);
    // setShowRightButton(!isEnd);
  };

  const slideLeft = () => {
    const slider = sliderRef.current!; // Non-null assertion
    slider.scrollLeft -= 150; // Adjust the scroll distance as needed
  };

  const slideRight = () => {
    const slider = sliderRef.current!; // Non-null assertion
    slider.scrollLeft += 150; // Adjust the scroll distance as needed
  };

  const handleCustomDropdownChange = (option: string) => {
    setSelectedOption(option);

    if (option === 'Nigeria' || option === 'Ghana' || option === 'Cameroon') {
      return handleFilters('Country', option);
    }

    delete filters.Country;
  };
  const handleCustomDropdownChange2 = (option: string) => {
    setSelectedOption2(option);
    let sort = 0;
    if (option === 'Featured') {
      sort = 1;

      return handleFilters('SortBy', sort);
    }
    if (option === 'New Arrival') {
      sort = 2;

      return handleFilters('SortBy', sort);
    }

    delete filters.SortBy;
  };

  const sectionsData = [
    {
      icon: <Filter size={26} color="white" />,
      activeIcon: <Filter size={26} color="black" />,
      text: 'All Filter',
      id: 1,
      filterType: 'none',
    },
    {
      icon: <Category size={26} color="white" />,
      activeIcon: <Category size={26} color="#737373" />,
      text: 'All',
      filterType: 'none',
    },
    {
      icon: <PenTool2 size={26} color="white" />,
      activeIcon: <PenTool2 size={26} color="#737373" />,
      text: 'Design',
      filterType: 'Track',
    },
    {
      icon: <Code size="26" color="white" />,
      activeIcon: <Code size={26} color="#737373" />,
      text: 'Frontend',
      filterType: 'Track',
    },
    {
      icon: <CommandSquare size="26" color="white" />,
      activeIcon: <CommandSquare size={26} color="#737373" />,
      text: 'Backend',
      filterType: 'Track',
    },
    {
      icon: <MobileProgramming size="26" color="white" />,
      activeIcon: <MobileProgramming size={26} color="#737373" />,
      text: 'Mobile',
      filterType: 'Track',
    },
    {
      icon: <Cloud size="26" color="white" />,
      activeIcon: <Cloud size={26} color="#737373" />,
      text: 'Cloud Computing',
      filterType: 'Track',
    },
    {
      icon: <Data size="26" color="white" />,
      activeIcon: <Data size={26} color="#737373" />,
      text: 'Data Science',
      filterType: 'Track',
    },
    {
      icon: <Airdrop size="26" color="white" />,
      activeIcon: <Airdrop size={26} color="#737373" />,
      text: 'Cybersecurity',
      filterType: 'Track',
    },
    {
      icon: <Code size="26" color="white" />,
      activeIcon: <Code size={26} color="#737373" />,
      text: 'Devops',
      filterType: 'Track',
    },
  ];

  return (
    <div className="mx-auto mb-2 py-8 px-6 font-manropeL xl:max-w-[77.5rem] xl:px-0">
      {/* <Breadcrumbs /> */}
      <section className="mb-4">
        <div>
          <h1 className=" font-manropeEB text-[2.25rem] text-custom-color11 md:text-[2.815rem] xl:text-[3.5rem]">
            Explore
          </h1>
          <p className="text-base text-custom-color43 xl:text-[1.375rem]">Find your perfect creative match</p>
        </div>

        <div className="hidden flex-col justify-start items-start gap-3 mb-10">
          <h1 className="text-zinc-900 text-[32px] md:text-[57px] font-bold font-manropeL leading-[40px] md:leading-[64px]">
            Filter
          </h1>
          <div className="text-neutral-500 text-[14px] md:text-[22px] font-normal font-manropeBL leading-5 md:leading-7">
            Customize and refine your search results to suit your specific preferences
          </div>
        </div>
      </section>

      <div className="md:justify-between justify-center items-center md:items-start flex flex-col md:flex-row gap-8">
        <div className="w-full grid grid-cols-[1fr_auto] gap-4 md:w-[22rem] xl:w-[37.5rem]">
          <Input
            onChange={(e) => {
              prop.setSearchQuery && prop.setSearchQuery(e.target.value);
            }}
            type="text"
            name="search input"
            intent={'default'}
            placeHolder="Search by name or role"
            leftIcon={<SearchNormal />}
            className="w-full border-brand-disabled2 rounded-2xl"
          />

          <button className="md:hidden">
            <Filter
              size={48}
              color="#1a1c1b"
              className="border-2 border-brand-disabled2 rounded-xl p-2 hover:bg-brand-green-primary"
            />
          </button>
        </div>

        <div className="w-full grid grid-cols-2 gap-2 text-[0.875rem] md:w-[20rem] xl:w-[21.5rem] xl:gap-6">
          <CustomDropdown
            options={[`None`, 'Nigeria', 'Ghana', 'Cameroon']}
            selectedValue={selectedOption}
            onChange={handleCustomDropdownChange}
            setFilters={handleFilters}
          />
          <CustomDropdown
            options={['Trending', 'Featured', 'New Arrival']}
            selectedValue={selectedOption2}
            onChange={handleCustomDropdownChange2}
            setFilters={handleFilters}
          />
        </div>
      </div>

      <div
        className="h-full overflow-x-scroll mt-4 mr-[6.5rem] scroll whitespace-nowrap scroll-smooth scrollbar-none"
        ref={sliderRef}
        onScroll={handleScroll}
      >
        <div className="justify-start items-center inline-flex mt-4 gap-6">
          {sectionsData.map((section, index) => (
            <div
              key={index}
              className={`px-4 py-[0.625rem] rounded-2xl justify-center items-center gap-4 flex cursor-pointer font-manropeB text-[0.875rem] ${
                activeSection === index ? 'bg-brand-green-primary text-white-100' : 'bg-white text-[#737373]'
              } ${section.text === 'All' ? 'hidden sm:flex' : ''}`}
              onClick={() => {
                setActiveSection(index);
                handleFilters(section.filterType, section.text);
                setShowFilterComponent(section.text === 'All Filter');
              }}
            >
              <div className="w-6 h-6 relative">{activeSection === index ? section.icon : section.activeIcon}</div>
              <div className="text-center">{section.text}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative -right-1">
        {showLeftButton && (
          <div
            className="w-12 h-12 p-3 bg-white rounded-2xl border border-stone-300 justify-center items-center gap-2 inline-flex absolute -top-[3.05rem] right-12 bg-white-100"
            onClick={slideLeft}
          >
            <div className="w-6 h-6 justify-center items-center flex cursor-pointer">
              <div className="w-6 h-6 relative">
                <ArrowLeft2 color="#737373" />
              </div>
            </div>
          </div>
        )}

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
