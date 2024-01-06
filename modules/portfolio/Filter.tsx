import React, { Dispatch, useRef, useState, useEffect } from 'react';
import { ArrowLeft2, ArrowRight2, Element3, Filter } from 'iconsax-react';
import CustomDropdown from '../explore/components/CustomDropdown';
import { Input } from '@ui/Input';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { alltracksType } from '../explore/@types';

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

  const [searchQuery, setSearchQuery] = useState(''); // Separate state for the search query

  // Add a state variable to track the button's disabled state
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // an effect that handles enable or disable the button based on input values
  useEffect(() => {
    const isInputValid = prop.filters.Country || prop.filters.SortBy !== undefined;
    const isSearchValid = searchQuery.trim() !== ''; // Validate the search query

    // Enable the button if both input and search are valid, otherwise disable it
    setIsButtonDisabled(!(isInputValid && isSearchValid));
  }, [searchQuery, prop.filters]);

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
    const { data } = await axios.get('https://explore-90v6.onrender.com/api/track/getAllTracks');
    return data;
  };

  const { data: trackData, isLoading: trackLoading } = useQuery<{ data: alltracksType[] }>({
    queryKey: ['alltrack'],
    queryFn: () => handleAllTrack(),
  });

  const allTrack: alltracksType[] = [{ name: 'All', id: 0 }, ...(trackData?.data ?? [])];

  return (
    <section id="top" className="p-4 xl:px-0">
      <div className="relative -mt-[7rem] mx-auto mb-5  py-8 px-6  bg-white-100 font-manropeL xl:max-w-[77.5rem] z-[1]">
        <div className="md:justify-between justify-btween items-center md:items-start flex flex-col md:flex-row gap-8">
          <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-5">
            <form className="col-span-full grid grid-cols-[1fr_auto] gap-3 md:col-span-3">
              <label className="col-span-full text-[#5B5F5E]" htmlFor="Search query title">
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
                required
                className="w-full text-grey-900 border-[1px] border-white-120 rounded-lg placeholder:text-white-400"
              />
              <button
                onClick={handleGo}
                className="h-12 self-end bg-brand-green-primary text-lg tracking-wide text-white-100 p-2 px-4 rounded-lg uppercase sm:px-6"
                disabled={isButtonDisabled}
              >
                Go
              </button>
            </form>

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
          </div>
        </div>

        <div
          className="h-full overflow-x-scroll mt-4 mr-[6.5rem] scroll whitespace-nowrap scroll-smooth scrollbar-none"
          ref={sliderRef}
          onScroll={handleScroll}
        >
          <div className="justify-start items-center inline-flex mt-4 gap-4">
            {
              allTrack.map((section, index) => (
                <div
                  key={index}
                  className={`px-4 py-[0.625rem] rounded-lg justify-center items-center gap-2 flex cursor-pointer font-manropeB text-[0.875rem] ${
                    activeSection === index ? 'bg-brand-green-primary text-white-100' : 'bg-white text-[#737373]'
                  }`}
                  onClick={() => {
                    setActiveSection(index);
                    handleFilters('Track', section.name);
                    setShowFilterComponent(section.name === 'All Filter');
                  }}
                >
                  {section.name === 'All' ? (
                    <div className="flex justify-center items-center gap-2 text-center">
                      <Element3 size="24" color={activeSection === index ? '#fff' : '#5B5F5E'} variant="Bold" />
                      {section.name}
                    </div>
                  ) : (
                    <div className="flex justify-center items-center gap-2 text-center">{section.name}</div>
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
              className="w-12 h-12 p-3 bg-white rounded-2xl border border-stone-300 justify-center items-center gap-2 inline-flex absolute -top-[2.95rem] right-[3.5rem] bg-white-100"
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
              className="w-12 h-12 p-3 bg-white rounded-2xl border border-stone-300 justify-center items-center gap-2 inline-flex absolute -top-[2.95rem] right-0 bg-white-100"
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
