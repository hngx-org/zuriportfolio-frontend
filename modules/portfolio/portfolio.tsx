// pages/index.tsx
import SearchAndFilter from './Filter';
import axios from 'axios';
import useDebounce from '../explore/hooks/deBounce';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { UserInfo } from '../explore/@types';
import Pagination from '@ui/Pagination';
import Loader from '@ui/Loader';
import Banner from './component/Banner';
import Card from '../explore/components/Card';
import Image from 'next/image';

const HomePage = () => {
  // States
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{ SortBy?: number; Country?: string }>({});
  const searchTerm = useRouter();
  const [errorMsg, setErrorMsg] = useState<Error | any>({});

  const handleClearFilters = () => {
    setFilters({});
  };

  const handleNumberReset = () => {
    setPageNumber(1);
  };
  const handleFilters = (type: string, value: string | number) => {
    setFilters((prev) => {
      if (type === 'All' || value === 'All') {
        return {};
      }
      if (type === 'none') {
        return {};
      }

      return { ...prev, [type]: value };
    });
  };

  const handleGo = () => {
    searchTerm.push(`/explore/search?searchQuery=${searchQuery}`);
  };

  const deBounce = useDebounce(searchQuery, 1200);

  const baseUrl = `https://explore-90v6.onrender.com/api`,
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

    try {
      const { data } = await axios.get(url, {
        params: {
          PageNumber: pageNumber,
          PageSize: 9,
          ...filters,
        },
      });
      setErrorMsg({});
      return data;
    } catch (error: Error | any) {
      console.log(error, 'error');
      setErrorMsg(error);
    }
  }

  // Data fetching
  const { data, isLoading } = useQuery<UserInfo>({
    queryKey: ['profile', deBounce, filters, pageNumber],
    queryFn: () => fetchUsers(searchQuery),
    // staleTime: 60000,
  });

  return (
    <main>
      <Banner />
      <SearchAndFilter
        handleGo={handleGo}
        setPageNumber={handleNumberReset}
        setFilter={handleClearFilters}
        handleFilters={handleFilters}
        filters={filters}
        setSearchQuery={setSearchQuery}
      />

      <section>
        {isLoading && (
          <div className="grid place-items-center min-h-[400px]">
            <Loader />
          </div>
        )}
        {data?.data?.length === 0 && (
          <div className="grid place-items-center min-h-[400px] justify-center">
            <p className="font-tommy text-3xl font-medium mb-5">Our Database is Currently empty </p>
            <div className="flex w-full justify-center lg:flex-col items-center perspective">
              <div className=" relative font-tommy  font-bold text-primary-light max-w-[300px] w-full  h-[120px] max-[500px]:max-w-[250px] max-[400px]:max-w-[200px] lg:-left-[5rem]  max-lg:bottom-10">
                <div className="flex absolute justify-center w-full h-[100px] bottom-0 perspective">
                  <span className="font-tommy absolute left-0 text-5xl -bottom-6 scale-y-125">?</span>
                  <span className="font-tommy absolute -top-12 text-[128px] scale-y-125 text-primary animate-rotate3d">
                    ?
                  </span>
                  <span className="font-tommy absolute right-0  text-5xl -bottom-8 scale-y-125">?</span>
                </div>
              </div>
              <div className="hidden lg:flex w-full  p-6 relative items-center justify-center  flex-col  perspective ">
                <Image
                  src={'/faq-image.png'}
                  alt="judging"
                  width={800}
                  height={800}
                  className="image-bounce relative z-10"
                />
                <div className="absolute -bottom-20 left-0 transform-3d">
                  <div className="absolute bottom-0 xl:w-[600px]  w-[400px] h-[150px] rounded-full shadow-bounce" />
                </div>
              </div>
            </div>
          </div>
        )}
        {data && (
          <div className="m-auto p-6">
            <div className="grid justify-center gap-8 sm:grid-cols-2 sm:gap-6 sm:gap-y-8 sm:mx-3 sm:px-0 lg:gap-x-0 xl:max-w-[77.5rem] xl:mx-auto xl:grid-cols-3 xl:gap-11">
              {data.data.map((card, key) => (
                <Card key={key} data={card} />
              ))}
            </div>
          </div>
        )}
        {data?.data?.length === 0 || isLoading || data?.totalPages === 1 || Object.keys(errorMsg).length > 0 ? null : (
          <a href="#top" className="w-fit mx-auto my-4 mb-12 flex justify-center">
            <Pagination
              visiblePaginatedBtn={3}
              activePage={pageNumber}
              pages={10}
              page={pageNumber}
              setPage={setPageNumber}
            />
          </a>
        )}
        {Object.keys(errorMsg).length > 0 && (
          <div className="grid place-items-center min-h-[400px]">
            <div className="text-center ">
              <h3 className="text-2xl">{errorMsg.message}</h3>
              <p>⚒️ We are currently working on this ⚒️</p>
            </div>
          </div>
        )}
        {/* Say Hello */}
      </section>
    </main>
  );
};

export default HomePage;
