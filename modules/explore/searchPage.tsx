import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import { UserInfo } from './@types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useDebounce from './hooks/deBounce';
import Loader from '@ui/Loader';
import { Input } from '@ui/Input';
import Image from 'next/image';
import erroEmpty from './assets/Error.svg';

// You can now access the data array with the specified objects as needed in your application.

// You can now access the expanded data array as needed in your application.

export default function SearchModule() {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{
    SortBy?: number;
    Country?: string;
    [key: string]: number | string | undefined;
  }>({});
  const [revealFilters, setRevealFilters] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNumber]);

  const handleClearFilters = () => {
    setFilters({});
  };

  const handleNumberReset = () => {
    setPageNumber(1);
  };
  const handleFilters = (type: string, value: string | number) => {
    setFilters((prev) => {
      if (value === '') {
        delete prev[type];
        return { ...prev };
      }
      return { ...prev, [type]: value };
    });
  };

  const deBounce = useDebounce(searchQuery, 1200);

  const baseUrl = `https://hngstage6-eagles.azurewebsites.net/api`,
    searchUrl = (query: string) => `${baseUrl}/explore/search/${query}`,
    filterUrl = `${baseUrl}/explore/filter`,
    allUsers = `${baseUrl}/explore/GetAllPortfolio`;

  const pa = `?SortBy=1&Location=nigeria&Country=lagos&Provider=ee&Skill=ee&Track=ee&Ranking=ee&RoleId=1&Tag=a&PageSize=12&PageNumber=1`;
  async function fetchUsers(query?: string) {
    let url = allUsers;
    if (query) {
      url = searchUrl(query);
    }
    if (Object.keys(filters).length > 0) {
      url = filterUrl;
    }
    const { data } = await axios.get(url, {
      params: {
        PageNumber: pageNumber,
        PageSize: 9,
        ...filters,
      },
    });
    return data;
  }

  // Data fetching
  const { data, isLoading } = useQuery<UserInfo>({
    queryKey: ['profile', deBounce, filters, pageNumber],
    queryFn: () => fetchUsers(searchQuery),
  });

  const filterUI = ['HTML', 'REACT', 'C+', 'Figma', 'Css', 'Typography'];
  const filterTop3 = filterUI.slice(0, 3);
  const filterRemainder = filterUI.slice(3);
  const experienceUI = ['Beginner', 'Intermediate', 'Expert'];

  return (
    <div className="ss min-h-screen m-auto max-w-[1240px]">
      <div className="flex justify-between items-end">
        <h2 className="text-zinc-900 text-4xl font-bold  leading-[44px]">Search Results for “Mary Doe”</h2>
        <div className="text-zinc-700 text-[22px] font-normal  leading-7">{data?.data?.length} Results</div>
      </div>
      <div className="mt-10  flex gap-3">
        <div className="min-h-screen gap-8 w-[100%] max-w-[320px] px-10 pt-12 pb-[744px] bg-white rounded-2xl  border-[#F2F2F2] border-2 flex-col justify-start items-center flex">
          <div className="border-b-2  border-zinc-100 flex  flex-col pb-5 justify-between items-center w-full">
            <div className="flex justify-start items-center w-full">
              <div className="text-zinc-800 text-2xl font-semibold  leading-loose">Filters</div>
              {/* <div className=" text-right text-emerald-600 text-base font-normal  leading-normal">Applied</div> */}
            </div>
          </div>
          <div className="border-b-2  border-zinc-100 flex  flex-col pb-5 justify-between items-center w-full">
            <div className="flex justify-between items-center w-full">
              <div className="text-center text-zinc-900 text-lg   uppercase leading-normal">SKILLS</div>
            </div>
          </div>
          <div className="flex flex-col w-full gap-2">
            {filterTop3.map((item, key) => (
              <div
                key={key}
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => handleFilters('Skill', item)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <path
                    stroke="#8592A3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.333"
                    d="M2 8a6 6 0 1112 0A6 6 0 012 8z"
                  ></path>
                </svg>{' '}
                {item}
              </div>
            ))}
            {!revealFilters ? (
              <div className="flex gap-2 items-center cursor-pointer" onClick={() => setRevealFilters(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <path fill="#8592A3" d="M12.666 8.665h-4v4H7.333v-4h-4V7.332h4v-4h1.333v4h4v1.333z"></path>
                </svg>
                <span>View More</span>
              </div>
            ) : (
              filterRemainder.map((item, key) => (
                <div
                  key={key}
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={() => handleFilters('Skill', item)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <path
                      stroke="#8592A3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.333"
                      d="M2 8a6 6 0 1112 0A6 6 0 012 8z"
                    ></path>
                  </svg>{' '}
                  {item}
                </div>
              ))
            )}
          </div>
          <div className="border-b  border-zinc-100 flex  flex-col pb-5 justify-between items-center w-full">
            <div className="flex justify-between items-center w-full">
              <div className="text-center text-zinc-900 text-lg   uppercase leading-normal">LOCATION</div>
            </div>
          </div>
          <Input
            placeholder="Location"
            className="border-[#E1E3E2] border-[1px] "
            onChange={(e) => handleFilters('Location', e.target.value)}
            rightIcon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="#464646" strokeLinecap="round" strokeWidth="1.5" d="M9.25 11h5.5M12 13.75v-5.5"></path>
                <path
                  stroke="#464646"
                  strokeWidth="1.5"
                  d="M3.62 8.49c1.97-8.66 14.8-8.65 16.76.01 1.15 5.08-2.01 9.38-4.78 12.04a5.193 5.193 0 01-7.21 0c-2.76-2.66-5.92-6.97-4.77-12.05z"
                ></path>
              </svg>
            }
          />

          <div className="border-b-2 border-zinc-100 flex  flex-col pb-5 justify-between items-center w-full">
            <div className="flex justify-between items-center w-full">
              <div className="text-center text-zinc-900 text-lg   uppercase leading-normal">EXPERIENCE</div>
            </div>
          </div>
          <div className="flex flex-col w-full gap-2">
            {experienceUI.map((item, key) => (
              <div key={key} className="flex gap-2 items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <path
                    stroke="#8592A3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.333"
                    d="M2 8a6 6 0 1112 0A6 6 0 012 8z"
                  ></path>
                </svg>{' '}
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="">
          {/* Cards ------ */}
          {isLoading && (
            <div className="grid  w-[100%]  py-14 min-h-[300px]">
              <Loader />
            </div>
          )}
          {data && data?.data.length > 0 && (
            <div className="flex gap-4 flex-wrap justify-end  w-[100%] ">
              {data.data.map((item, key) => (
                <Card key={key} data={item} />
              ))}
            </div>
          )}
          {!isLoading && data?.data?.length === 0 && (
            <div className="grid  max-w-[600px] w-[100%] justify-center py-14 min-h-[300px] ">
              <Image src={erroEmpty} alt="No Result" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
