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
import { useSearchParams } from 'next/navigation';

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
  const [openMenu, setOpenMenu] = useState(false);
  const [revealFilters, setRevealFilters] = useState(false);
  const searchParam = useSearchParams();
  const query = searchParam.get('searchQuery');

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

  const deBounce = useDebounce(`${query}`, 1200);

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
    queryKey: ['profile', query, filters, pageNumber],
    queryFn: () => fetchUsers(`${query}`),
  });

  const handleMenu = () => {
    setOpenMenu(false);
  };

  const filterUI = ['HTML', 'REACT', 'C+', 'Figma', 'Css', 'Typography'];
  const filterTop3 = filterUI.slice(0, 3);
  const filterRemainder = filterUI.slice(3);
  const experienceUI = ['Beginner', 'Intermediate', 'Expert'];

  return (
    <>
      {openMenu && <FilterMobileMenu openHandler={handleMenu} />}

      <div className="ss min-h-screen m-auto max-w-[1264px] px-2">
        <div className="flex justify-between items-end sm:items-center">
          <h2 className="text-zinc-900 lg:text-4xl sm:text-3xl font-bold  leading-[44px]">
            Search Results for “{query}”
          </h2>
          <div className="text-zinc-700 lg:text-[22px] font-normal  leading-7 sm:text-[18px]">
            {data?.data?.length} Results
          </div>
        </div>
        <div className="lg:hidden mt-3">
          <span className="flex items-center gap-2" onClick={() => setOpenMenu(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 25 25">
              <mask
                id="mask0_8007_2963"
                style={{ maskType: 'alpha' }}
                width="25"
                height="25"
                x="0"
                y="0"
                maskUnits="userSpaceOnUse"
              >
                <path fill="#D9D9D9" d="M0.545 0.307H24.545V24.307H0.545z"></path>
              </mask>
              <g mask="url(#mask0_8007_2963)">
                <path
                  fill="#1C1B1F"
                  d="M5.545 20.307v-7h-2v-2h6v2h-2v7h-2zm0-11v-5h2v5h-2zm4 0v-2h2v-3h2v3h2v2h-6zm2 11v-9h2v9h-2zm6 0v-3h-2v-2h6v2h-2v3h-2zm0-7v-9h2v9h-2z"
                ></path>
              </g>
            </svg>
            <span>Filters</span>
          </span>
        </div>
        {/* .... */}
        <div className="mt-10  flex gap-3">
          <div className="min-h-screen gap-8 w-[100%]  lg:flex max-w-[320px] hidden px-10 pt-12 pb-12 mb-5 bg-white rounded-2xl  border-[#F2F2F2] border-2 flex-col justify-start items-center ">
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

          <div className="w-[100%]">
            {/* Cards ------ */}
            {isLoading && (
              <div className="grid  w-[100%]  py-14 min-h-[300px]">
                <Loader />
              </div>
            )}
            {data && data?.data.length > 0 && (
              <div className="grid md:grid-cols-3 gap-3 pb-4 sm:grid-cols-2">
                {data.data.map((item, key) => (
                  <Card key={key} data={item} />
                ))}
              </div>
            )}
            {!isLoading && data?.data?.length === 0 && (
              <div className="grid   w-[100%] justify-center pt-1 py-14 min-h-[300px] ">
                <Image src={erroEmpty} alt="No Result" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function FilterMobileMenu(prop: { openHandler?: () => void; toggle?: boolean }) {
  const { toggle, openHandler } = prop;

  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{
    SortBy?: number;
    Country?: string;
    [key: string]: number | string | undefined;
  }>({});
  const [openMenu, setOpenMenu] = useState(false);
  const [revealFilters, setRevealFilters] = useState(false);
  const searchParam = useSearchParams();

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

  const filterUI = ['HTML', 'REACT', 'C+', 'Figma', 'Css', 'Typography'];
  const filterTop3 = filterUI.slice(0, 3);
  const filterRemainder = filterUI.slice(3);
  const experienceUI = ['Beginner', 'Intermediate', 'Expert'];
  // .....................

  return (
    <div className="fixed min-h-screen z-30 bg-white-100 w-screen  lg:hidden overflow-auto pb-6 px-4">
      <div className="flex ">
        <div className="flex gap-1" onClick={openHandler}>
          <span>
            {' '}
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 25 25">
              <mask
                id="mask0_8008_2971"
                style={{ maskType: 'alpha' }}
                width="25"
                height="25"
                x="0"
                y="0"
                maskUnits="userSpaceOnUse"
              >
                <path fill="#D9D9D9" d="M0.168 0.786H24.168V24.786H0.168z"></path>
              </mask>
              <g mask="url(#mask0_8008_2971)">
                <path
                  fill="#1C1B1F"
                  d="M10.168 22.786l-10-10 10-10 1.775 1.775-8.225 8.225 8.225 8.225-1.775 1.775z"
                ></path>
              </g>
            </svg>
          </span>
          <span>Close</span>
        </div>
      </div>
      {/* Filters */}
      <div className=" gap-3 w-[100%]  flex   pt-6  flex-col justify-start items-center ">
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
          className="border-[#E1E3E2] border-[1px] self-start "
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
    </div>
  );
}
