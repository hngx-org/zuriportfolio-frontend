// pages/index.tsx
import SearchAndFilter from './SearchAndFilter';
import axios from 'axios';
import useDebounce from './hooks/deBounce';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { UserInfo } from './@types';
import Pagination from '@ui/Pagination';
import Loader from '@ui/Loader';
import Banner from './components/Banner';
import Card from './components/Card';

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
  });
  console.log(data);
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
          <div className="grid place-items-center min-h-[400px]">
            <p>No Results</p>
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
