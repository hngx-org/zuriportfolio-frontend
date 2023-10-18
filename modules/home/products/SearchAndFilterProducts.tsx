import React, { Dispatch, useEffect, useRef, useState } from 'react';
import {
  Airdrop,
  ArrowDown2,
  ArrowLeft2,
  ArrowRight2,
  Cloud,
  Code,
  CommandSquare,
  Data,
  Designtools,
  Filter,
  MobileProgramming,
  PenTool2,
} from 'iconsax-react';
import { Input } from '@ui/Input';
import CustomFilterDropdown from './CustomFilterDropdown';
import axios from 'axios';
import SectionData from './sectionData';

type Section = {
  key?: string | number;
  icon?: React.ReactElement;
  activeIcon: React.ReactElement;
  text: string;
  filterType: string;
};

const SearchAndFilterProducts = (prop: {
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
  const [showLeftButton, setShowLeftButton] = useState<boolean>(false);
  const [showFilterComponent, setShowFilterComponent] = useState<boolean>(false);

  const { filters, handleFilters } = prop;
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const slider = sliderRef.current!;
    // setShowLeftButton(!isStart);
    // setShowRightButton(!isEnd);
  };

  const slideLeft = () => {
    const slider = sliderRef.current!;
    slider.scrollLeft -= 150;
  };

  const slideRight = () => {
    setShowLeftButton(true);
    const slider = sliderRef.current!;
    slider.scrollLeft += 150;
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

  const [sectionsData, setSectionsData] = useState<Section[]>([]);
  const [productsData, setProductsData] = useState<any>([]);

  const fetchCategoryNames = async (): Promise<Section[]> => {
    try {
      const categoriesResponse = await axios.get('https://coral-app-8bk8j.ondigitalocean.app/api/category-name/');
      const categories = categoriesResponse.data.data.slice(0, 9);

      const icons = [
        <Designtools size={24} color="white" key={0} />,
        <PenTool2 size={24} color="white" key={1} />,
        <Code size="24" color="white" key={2} />,
        <CommandSquare size="24" color="white" key={3} />,
        <MobileProgramming size="24" color="white" key={4} />,
        <Cloud size="24" color="white" key={5} />,
        <Data size="24" color="white" key={6} />,
        <Airdrop size="24" color="white" key={7} />,
        <Code size="24" color="white" key={8} />,
      ];

      const activeIcons = [
        <Designtools size={24} color="#737373" key={0} />,
        <PenTool2 size={24} color="#737373" key={1} />,
        <Code size="24" color="#737373" key={2} />,
        <CommandSquare size="24" color="#737373" key={3} />,
        <MobileProgramming size="24" color="#737373" key={4} />,
        <Cloud size="24" color="#737373" key={5} />,
        <Data size="24" color="#737373" key={6} />,
        <Airdrop size="24" color="#737373" key={7} />,
        <Code size="24" color="#737373" key={8} />,
      ];

      const sectionsData: Section[] = categories.map((category: any, index: number) => ({
        key: category.id || index,
        icon: icons[index] || null,
        activeIcon: activeIcons[index] || null, // Return null if index is out of bounds
        text: category.name,
        filterType: 'Track',
      }));

      return sectionsData;
    } catch (error) {
      throw error;
    }
  };

  const fetchProducts = async (category: string) => {
    try {
      const response = await axios.get(`https://coral-app-8bk8j.ondigitalocean.app/api/products/${category}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCategoryNames();
      // const products = await fetchProducts(sectionsData[activeSection]?.text);
      // setProductsData(products);
      setSectionsData(data);
    };

    fetchData();
  }, []);

  return (
    <section className="p-4 xl:px-0">
      <div className="relative -mt-[7rem] mx-auto mb-5 border border-white-110 py-8 px-6 rounded-lg bg-white-100 font-manropeL xl:max-w-[77.5rem] z-[1]">
        <div className="md:justify-between justify-center items-center md:items-start flex flex-col md:flex-row gap-8">
          <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-[1fr_1fr_1fr_1fr_1fr]">
            <div className="col-span-full flex gap-3 md:col-span-3">
              <Input
                onChange={(e) => {
                  prop.setSearchQuery && prop.setSearchQuery(e.target.value);
                  prop.setFilter({});
                  setPageNumber();
                }}
                type="text"
                name="search input"
                intent={'default'}
                placeHolder="Search product"
                className="w-full text-grey-900 border-[1px] border-[#F0F1F0] rounded-lg placeholder:text-white-400"
              />
              <button className="sm:hidden">
                <Filter
                  size={48}
                  color="#5B5F5E"
                  className="border-2 border-brand-disabled2 text-[#5B5F5E] rounded-xl p-2 hover:bg-brand-green-primary"
                />
              </button>
            </div>

            <div className="hidden sm:grid sm:gap-3">
              <CustomFilterDropdown
                options={['Ghana', 'Nigeria', 'Kenya']}
                selectedValue={selectedOption}
                placeholder="Location"
                onChange={handleCustomDropdownChange}
                className="border-[#F0F1F0]"
              />
            </div>

            <div className="hidden sm:grid sm:gap-3">
              <CustomFilterDropdown
                options={['Trending', 'Newest', 'Popular']}
                selectedValue={selectedOption2}
                placeholder="Sort By"
                onChange={handleCustomDropdownChange2}
                className="border-[#F0F1F0]"
              />
            </div>
          </div>
        </div>

        <div className="hidden sm:block">
          <div
            className="h-full overflow-x-scroll mt-4 mr-[6.5rem] scroll whitespace-nowrap scroll-smooth scrollbar-none"
            ref={sliderRef}
            onScroll={handleScroll}
          >
            <SectionData
              sectionsData={sectionsData}
              fetchProducts={fetchProducts}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              handleFilters={handleFilters}
              setShowFilterComponent={setShowFilterComponent}
            />
          </div>
          <div className="relative -right-1 flex">
            {showLeftButton && (
              <div
                className="w-12 h-12 p-3 bg-white rounded-lg border border-stone-300 justify-center items-center gap-2 inline-flex absolute -top-[3.05rem] right-[3.5rem] bg-white-100"
                onClick={slideLeft}
              >
                <div className="w-6 h-6 justify-center items-center flex cursor-pointer">
                  <div className="w-6 h-6 relative">
                    <ArrowLeft2 color="#737373" size={23} />
                  </div>
                </div>
              </div>
            )}
            <div
              className="w-12 h-12 p-3 bg-white rounded-lg border border-stone-300 justify-center items-center gap-2 inline-flex absolute -top-[3.05rem] right-0 bg-white-100"
              onClick={slideRight}
            >
              <div className="w-6 h-6 justify-center items-center flex cursor-pointer">
                <div className="w-6 h-6 relative">
                  <ArrowRight2 color="#737373" size={23} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchAndFilterProducts;
