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
  Element3,
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
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { alltracksType } from './@types';
// import Breadcrumbs from '../../components/Breadcrumbs';

const SearchAndFilter = (prop: {
  setSearchQuery?: Dispatch<React.SetStateAction<string>>;
  filters: { SortBy?: number; Country?: string };
  handleFilters: (type: string, value: string | number) => void;
  setFilter: Dispatch<React.SetStateAction<{ SortBy?: number; Country?: string }>>;
  setPageNumber: () => void;
  handleGo: () => void;
}) => {
  const { setPageNumber, handleGo } = prop;
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

  const closeFilterComponent = (option?: 'close' | 'clear') => {
    if (option === 'clear') {
      prop.setFilter({});
    } else {
      setShowFilterComponent(false);
    }
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
    const [location, country] = option.split(',');
    handleFilters('Location', `${location} ${country}`);
  };

  const handleAllTrack = async () => {
    const { data } = await axios.get('https://hngstage6-eagles.azurewebsites.net/api/track/getAllTracks');
    return data;
  };

  const { data: trackData, isLoading: trackLoading } = useQuery<{ data: alltracksType[] }>({
    queryKey: ['alltrack'],
    queryFn: () => handleAllTrack(),
  });

  const allTrack: alltracksType[] = [{ name: 'All', id: 0 }, ...(trackData?.data ?? [])];

  return (
    <section id="top" className="p-4 xl:px-0">
      <div className="relative -mt-[7rem] mx-auto mb-5 border border-white-110 py-8 px-6 rounded-lg bg-white-100 font-manropeL xl:max-w-[77.5rem] z-[1]">
        <div className="md:justify-between justify-center items-center md:items-start flex flex-col md:flex-row gap-8">
          <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-[1fr_1fr_1fr_1fr_1fr_48px]">
            <div className="col-span-full grid gap-3 md:col-span-3">
              <label className="text-[#5B5F5E]" htmlFor="Search query title">
                Search by name or role
              </label>
              <Input
                onChange={(e) => {
                  prop.setSearchQuery && prop.setSearchQuery(e.target.value);
                  prop.setFilter({});
                  setPageNumber();
                }}
                type="text"
                name="search input"
                intent={'default'}
                placeHolder="Search by name or role"
                className="w-full text-grey-900 border-[1px] border-white-120 rounded-lg placeholder:text-white-400"
              />
            </div>

            <div className="grid gap-3">
              <label className="text-[#5B5F5E]" htmlFor="Badge">
                Badge
              </label>
              <CustomDropdown
                options={['Beginner', 'Intermediate', 'Expert']}
                selectedValue={selectedOption}
                placeholder="Experience"
                onChange={handleCustomDropdownChange}
              />
            </div>

            <div className="grid gap-3">
              <label className="text-[#5B5F5E]" htmlFor="Location">
                Location
              </label>
              <CustomDropdown
                options={['Lagos, Nigeria', 'Accra, Ghana', 'Nairobi, Kenya']}
                selectedValue={selectedOption2}
                placeholder="Location"
                onChange={handleCustomDropdownChange2}
              />
            </div>

            <button className="hidden">
              <Filter
                size={48}
                color="#1a1c1b"
                className="border-2 border-brand-disabled2 text-black rounded-xl p-2 hover:bg-brand-green-primary"
              />
            </button>

            <button
              onClick={handleGo}
              className="col-span-full h-12 self-end bg-brand-green-primary text-white-100 p-2 rounded-lg uppercase md:col-span-1"
            >
              Go
            </button>
          </div>
        </div>

        <div
          className="h-full overflow-x-scroll mt-4 mr-[6.5rem] scroll whitespace-nowrap scroll-smooth scrollbar-none"
          ref={sliderRef}
          onScroll={handleScroll}
        >
          <div className="justify-start items-center inline-flex mt-4 gap-4">
            {/* {sectionsData.map((section, index) => (
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
            ))} */}
            {
              allTrack.map((section, index) => (
                <div
                  key={index}
                  className={`px-4 py-[0.625rem] rounded-lg justify-center items-center gap-2 flex cursor-pointer font-manropeB text-[0.875rem] ${
                    activeSection === index ? 'bg-brand-green-primary text-white-100' : 'bg-white text-[#737373]'
                  } ${section.name === 'All' ? 'hidden sm:flex' : ''}`}
                  onClick={() => {
                    setActiveSection(index);
                    handleFilters('Track', section.name);
                    setShowFilterComponent(section.name === 'All Filter');
                  }}
                >
                  {section.name === 'All' ? (
                    <div className="flex justify-center gap-2 text-center">
                      <Element3 size="24" color={activeSection === index ? '#fff' : '#5B5F5E'} variant="Bold" />
                      {section.name}
                    </div>
                  ) : (
                    <div className="text-center">{section.name}</div>
                  )}
                </div>
              ))
              // ....
            }
          </div>
        </div>
        <div className="relative right-1 flex top-3 md:top-0">
          {showLeftButton && (
            <div
              className="w-12 h-12 p-3 bg-white rounded-2xl border border-stone-300 justify-center items-center gap-2 inline-flex absolute -top-[3.05rem] right-[3.5rem] bg-white-100"
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
      </div>
    </section>
  );
};

export default SearchAndFilter;

// type MyComponentProps = {
//   name: string;
//   state: 'active' | 'inactive';
// };

// const IconsTrack: React.FC<MyComponentProps> = ({ name, state }) => {
//   const sectionsData = [
//     {
//       icon: <Filter size={26} color="white" />,
//       activeIcon: <Filter size={26} color="blac" />,
//       text: 'All',
//       filterType: 'none',
//     },
//     {
//       icon: <PenTool2 size={26} color="white" />,
//       activeIcon: <PenTool2 size={26} color="#737373" />,
//       text: 'Design',
//       filterType: 'Track',
//     },
//     {
//       icon: <Code size="26" color="white" />,
//       activeIcon: <Code size={26} color="#737373" />,
//       text: 'Frontend',
//       filterType: 'Track',
//     },
//     {
//       icon: <CommandSquare size="26" color="white" />,
//       activeIcon: <CommandSquare size={26} color="#737373" />,
//       text: 'Backend',
//       filterType: 'Track',
//     },
//     {
//       icon: <MobileProgramming size="26" color="white" />,
//       activeIcon: <MobileProgramming size={26} color="#737373" />,
//       text: 'Mobile',
//       filterType: 'Track',
//     },
//     {
//       icon: <Cloud size="26" color="white" />,
//       activeIcon: <Cloud size={26} color="#737373" />,
//       text: 'Cloud Computing',
//       filterType: 'Track',
//     },
//     {
//       icon: <Data size="26" color="white" />,
//       activeIcon: <Data size={26} color="#737373" />,
//       text: 'Data Science',
//       filterType: 'Track',
//     },
//     {
//       icon: <Airdrop size="26" color="white" />,
//       activeIcon: <Airdrop size={26} color="#737373" />,
//       text: 'Cybersecurity',
//       filterType: 'Track',
//     },
//     {
//       icon: <Code size="26" color="white" />,
//       activeIcon: <Code size={26} color="#737373" />,
//       text: 'Devops',
//       filterType: 'Track',
//     },
//   ];
//   const checkProp = () => {
//     const word = name.slice(0).toLocaleLowerCase(); // Get the first 6 letters of the prop

//     if (word.includes('web dev')) {
//       return state === 'active' ? <Code size="26" color="white" /> : <Code size="26" color="#737373" />;
//     } else if (word.includes('mobile')) {
//       return state === 'active' ? (
//         <MobileProgramming size="26" color="white" />
//       ) : (
//         <MobileProgramming size="26" color="#737373" />
//       );
//     } else if (word.includes('security')) {
//       return state === 'active' ? <Airdrop size="26" color="white" /> : <Airdrop size="26" color="#737373" />;
//     } else if (word.includes('all')) {
//       return state === 'active' ? <Filter size={26} color="white" /> : <Filter size={26} color="black" />;
//     } else if (word.includes('-end')) {
//       return state === 'active' ? <Code size="26" color="white" /> : <Code size="26" color="#737373" />;
//     } else if (word.includes('cloud')) {
//       return state === 'active' ? <Cloud size="26" color="white" /> : <Cloud size="26" color="#737373" />;
//     } else if (word.includes('data')) {
//       return state === 'active' ? <Data size="26" color="white" /> : <Data size="26" color="#737373" />;
//     } else if (word.includes('design')) {
//       return state === 'active' ? <PenTool2 size={26} color="white" /> : <PenTool2 size={26} color="#737373" />;
//     } else {
//       return state === 'active' ? (
//         <CommandSquare size="26" color="white" />
//       ) : (
//         <CommandSquare size={26} color="#737373" />
//       );
//     }
//   };

//   return <div>{checkProp()}</div>;
// };
