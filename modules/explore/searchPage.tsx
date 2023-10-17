import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import { UserInfo } from './@types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useDebounce from './hooks/deBounce';
import Loader from '@ui/Loader';

// You can now access the data array with the specified objects as needed in your application.

// You can now access the expanded data array as needed in your application.

export default function SearchModule() {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{ SortBy?: number; Country?: string }>({});

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
      if (type === 'none') {
        return {};
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

  const filterUI = ['HTML', 'REACT', 'C+', 'Figma'];

  return (
    <div className="ss min-h-screen m-auto max-w-[1240px]">
      <div className="flex justify-between items-end">
        <h2 className="text-zinc-900 text-4xl font-bold  leading-[44px]">Search Results for “Mary Doe”</h2>
        <div className="text-zinc-700 text-[22px] font-normal  leading-7">{data?.data?.length} Results</div>
      </div>
      <div className="mt-10 grid grid-cols-[minmax(240px,_300px)_1fr] gap-3">
        <div className="min-h-screen gap-8  px-10 pt-12 pb-[744px] bg-white rounded-2xl border border-zinc-100 flex-col justify-start items-center flex">
          <div className="border-b  border-zinc-100 flex  flex-col pb-5 justify-between items-center w-full">
            <div className="flex justify-between items-center w-full">
              <div className="text-zinc-800 text-2xl font-semibold  leading-loose">Filters</div>
              <div className=" text-right text-emerald-600 text-base font-normal  leading-normal">Applied</div>
            </div>
          </div>
          <div className="border-b  border-zinc-100 flex  flex-col pb-5 justify-between items-center w-full">
            <div className="flex justify-between items-center w-full">
              <div className="text-center text-zinc-900 text-lg font-medium  uppercase leading-normal">SKILLS</div>
            </div>
          </div>
          <div className="flex flex-col w-full gap-2">
            {filterUI.map((item, key) => (
              <div key={key} className="flex gap-2 items-center">
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
        {/* Cards ------ */}
        {isLoading && (
          <div className="grid place-items-center min-h-[300px]">
            <Loader />
          </div>
        )}
        {data && (
          <div className="flex flex-wrap justify-end items-center gap-4">
            {data.data.map((item, key) => (
              <Card key={key} data={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
