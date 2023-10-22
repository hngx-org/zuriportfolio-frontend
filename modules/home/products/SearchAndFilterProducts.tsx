// @ts-expect-error
import { Popover, Transition } from '@headlessui/react';
import React, { Dispatch, Fragment, useEffect, useRef, useState } from 'react';
import {
  Airdrop,
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
  SearchNormal1,
} from 'iconsax-react';
import { Input } from '@ui/Input';
import CustomFilterDropdown from './CustomFilterDropdown';
import axios from 'axios';
import SectionData from './sectionData';
import SectionProductCard from './sectionProductCard';
import { useQuery, useQueryClient } from '@tanstack/react-query';

type Section = {
  key?: string | number;
  icon?: React.ReactElement;
  activeIcon: React.ReactElement;
  text: string;
  filterType: string;
};

const SearchAndFilterProducts = (prop: {
  setSearchQuery?: Dispatch<React.SetStateAction<string>>;
  filters: { SortBy?: number; Price?: string };
  handleFilters: (type: string, value: string | number) => void;
  setFilter: Dispatch<React.SetStateAction<{ SortBy?: number; Country?: string }>>;
  setPageNumber: () => void;
  handleGo: () => void;
}) => {
  const { setPageNumber, handleGo } = prop;
  const [activeSection, setActiveSection] = useState(11);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedOption2, setSelectedOption2] = useState<string>('');
  const [showLeftButton, setShowLeftButton] = useState<boolean>(false);
  const [showFilterComponent, setShowFilterComponent] = useState<boolean>(false);

  const { filters, handleFilters } = prop;
  const sliderRef = useRef<HTMLDivElement>(null);

  const slideLeft = () => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      slider.scrollLeft -= 150;
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      setShowLeftButton(true);
      const slider = sliderRef.current!;
      slider.scrollLeft += 150;
    }
  };

  const handleCustomDropdownChange = (option: string) => {
    setSelectedOption(option);
    if (option === 'Lowest' || option === 'Highest') {
      return handleFilters('Price', option);
    }

    delete filters.Price;
  };
  const handleCustomDropdownChange2 = (option: string) => {
    setSelectedOption2(option);
    let sort = 0;
    if (option === 'Name') {
      sort = 1;

      return handleFilters('SortBy', sort);
    }
    if (option === 'Date created') {
      sort = 2;

      return handleFilters('SortBy', sort);
    }

    delete filters.SortBy;
  };

  const fetchCategoryNames = async (): Promise<Section[]> => {
    try {
      const categoriesResponse = await axios.get('https://staging.zuri.team/api/marketplace/v1/category-name/');
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
        <Airdrop size="24" color="white" key={7} />,
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
        <Airdrop size="24" color="white" key={7} />,
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
      const response = await axios.get(`https://staging.zuri.team/api/marketplace/v1/products/${category}`);
      console.log(response);
      const approvedProducts = response?.data?.data
        ?.filter((product: { is_published: boolean }) => product.is_published === true)
        .slice(0, 4);
      const newProduct = approvedProducts.slice(0, 4);
      return newProduct;
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
    }
  };
  const {
    data: categoryData = [],
    isLoading: isCategoryLoading,
    isError: isCategoryError,
    refetch: refetchCategories,
    isRefetching: isRefetchingCategories,
  } = useQuery(['categories'], fetchCategoryNames, {
    refetchOnWindowFocus: false,
  });

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useQuery(
    ['products', activeSection, filters],
    () => {
      if (activeSection < 11) {
        return fetchProducts(categoryData[activeSection]?.text);
      } else {
        return fetchAllProducts();
      }
    },
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        let filteredProducts = data;

        if (filters.Price) {
          if (filters.Price === 'Lowest') {
            filteredProducts.sort((a: { price: number }, b: { price: number }) => a.price - b.price);
          } else {
            filteredProducts.sort((a: { price: number }, b: { price: number }) => b.price - a.price);
          }
        }

        if (filters.SortBy) {
          if (filters.SortBy === 1) {
            filteredProducts.sort((a: { name: string }, b: { name: any }) => a.name.localeCompare(b.name));
          } else if (filters.SortBy === 2) {
            filteredProducts.sort(
              (a: { createdAt: string | number | Date }, b: { createdAt: string | number | Date }) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
            );
          }
        }

        return filteredProducts;
      },
    },
  );

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(`https://staging.zuri.team/api/marketplace/v1/product-list`);
      const approvedProducts = response?.data?.data
        ?.filter((product: { is_published: boolean }) => product.is_published === true)
        .slice(0, 4);
      const newProduct = approvedProducts.slice(0, 4);
      return newProduct;
    } catch (error) {
      console.error(`Error fetching products for category data`, error);
    }
  };

  if (isCategoryLoading || isRefetchingCategories) {
    return (
      <div className="text-center flex justify-center items-center">
        <div
          className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-green-600 rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (isCategoryError || isProductsError) {
    return (
      <div className="flex justify-center items-center flex-col space-y-4">
        <div>Sorry, we couldn&apos;t load the products.</div>
        <button onClick={() => refetchCategories()} className="text-green-600">
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="p-4 xl:px-0">
      <div className="relative -mt-[7rem] mx-auto mb-5 border border-white-110 py-8 px-6 rounded-lg bg-white-100 font-manropeL xl:max-w-[77.5rem] z-[1]">
        <div className="md:justify-between justify-center items-center md:items-start flex flex-col md:flex-row gap-8">
          <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-[1fr_1fr_1fr_1fr_1fr]">
            <div className="col-span-full flex gap-3 md:col-span-3">
              <Input
                onChange={(e) => {
                  prop.setSearchQuery && prop.setSearchQuery(e.target.value);
                  setPageNumber();
                }}
                leftIcon={<SearchNormal1 className="text-white-400" />}
                type="text"
                name="search input"
                intent={'default'}
                placeHolder="Search product"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleGo();
                  }
                }}
                className="w-full placeholder-white-500 text-gray-500  border-[1px] border-[#F0F1F0] rounded-lg"
              />

              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button className={'sm:hidden'}>
                      <Filter
                        size={48}
                        color={open ? '#fff' : '#5B5F5E'}
                        className={` ${
                          open ? 'bg-brand-green-primary' : 'bg-white-100'
                        } border-2 border-brand-disabled2 text-[#5B5F5E] rounded-xl p-2 `}
                      />
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 mt-0 -right-10">
                        <div className="w-[100vw] bg-white-100 p-3 rounded-md">
                          <div className="border-2 p-3 border-[#F0F1F0]">
                            <div>
                              <CustomFilterDropdown
                                options={['Lowest', 'Highest']}
                                selectedValue={selectedOption}
                                placeholder="Price"
                                onChange={handleCustomDropdownChange}
                                className="border-[#F0F1F0]"
                              />
                            </div>

                            <div className="mt-4">
                              <CustomFilterDropdown
                                options={['Name', 'Date created']}
                                selectedValue={selectedOption2}
                                placeholder="Sort By"
                                onChange={handleCustomDropdownChange2}
                                className="border-[#F0F1F0]"
                              />
                            </div>

                            <div className="block">
                              <div
                                className="h-full overflow-x-scroll mt-4 mr-[6.5rem] scroll whitespace-nowrap scroll-smooth scrollbar-none"
                                ref={sliderRef}
                              >
                                <SectionData
                                  sectionsData={categoryData}
                                  fetchProducts={fetchProducts}
                                  activeSection={activeSection}
                                  setActiveSection={setActiveSection}
                                  handleFilters={handleFilters}
                                  fetchAllData={fetchAllProducts}
                                  setShowFilterComponent={setShowFilterComponent}
                                  searchFilter={() => prop.setFilter({})}
                                  selectedOption={selectedOption}
                                  setSelectedOption={setSelectedOption}
                                  selectedOption1={selectedOption2}
                                  setSelectedOption1={setSelectedOption2}
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
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </div>

            <div className="hidden sm:grid sm:gap-3">
              <CustomFilterDropdown
                options={['Lowest', 'Highest']}
                selectedValue={selectedOption}
                placeholder="Price"
                onChange={handleCustomDropdownChange}
                className="border-[#F0F1F0]"
              />
            </div>

            <div className="hidden sm:grid sm:gap-3">
              <CustomFilterDropdown
                options={['Name', 'Date created']}
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
          >
            <SectionData
              sectionsData={categoryData}
              fetchProducts={fetchProducts}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              handleFilters={handleFilters}
              fetchAllData={fetchAllProducts}
              setShowFilterComponent={setShowFilterComponent}
              searchFilter={() => prop.setFilter({})}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              selectedOption1={selectedOption2}
              setSelectedOption1={setSelectedOption2}
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

      <div className="px-3 py-4 mx-auto">
        <div className="flex flex-wrap -m-4 ">
          {!isProductsLoading &&
            productsData?.length > 0 &&
            productsData?.map(
              (product: {
                id: string | undefined;
                currency: string | undefined;
                shop: any;
                rating: number | undefined;
                price: string;
                images: Array<{ url: string }>;
                name: string;
              }) => (
                <SectionProductCard
                  key={product?.id}
                  title={product?.name}
                  currency={product?.currency}
                  price={product?.price}
                  rating={product?.rating}
                  shop={product?.shop?.name}
                  image={product?.images[0]?.url}
                  id={product?.id}
                />
              ),
            )}

          {isProductsLoading && (
            <div className="flex flex-wrap justify-center items-center w-full">
              <div className="animate-pulse flex flex-col space-y-4 w-full md:w-1/3 min-h-[340px] justify-center items-center p-3 border-2 border-[#FBFBFB]">
                <div className="h-52 w-full bg-white-300 mb-4"></div>
                <div className="w-full">
                  <div className="h-4 bg-white-300 mb-2"></div>
                  <div className="h-4 bg-white-300 mb-2"></div>
                  <div className="h-4 bg-white-300 mb-2"></div>
                  <div className="h-4 bg-white-300 mb-2"></div>
                </div>
              </div>

              <div className="animate-pulse flex flex-col space-y-4 w-full md:w-1/3 min-h-[340px] justify-center items-center p-3 border-2 border-[#FBFBFB]">
                <div className="h-52 w-full bg-white-300 mb-4"></div>
                <div className="w-full">
                  <div className="h-4 bg-white-300 mb-2"></div>
                  <div className="h-4 bg-white-300 mb-2"></div>
                  <div className="h-4 bg-white-300 mb-2"></div>
                  <div className="h-4 bg-white-300 mb-2"></div>
                </div>
              </div>

              <div className="animate-pulse flex flex-col space-y-4 w-full md:w-1/3 min-h-[340px] justify-center items-center p-3 border-2 border-[#FBFBFB]">
                <div className="h-52 w-full bg-white-300 mb-4"></div>
                <div className="w-full">
                  <div className="h-4 bg-white-300 mb-2"></div>
                  <div className="h-4 bg-white-300 mb-2"></div>
                  <div className="h-4 bg-white-300 mb-2"></div>
                  <div className="h-4 bg-white-300 mb-2"></div>
                </div>
              </div>
            </div>
          )}

          {!isProductsLoading && productsData?.length === 0 && (
            <div className="flex flex-wrap justify-center items-center w-full pb-10">
              <h3>No products found in this Category</h3>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchAndFilterProducts;
