// pages/index.tsx
import Card from './components/Card';
import SearchAndFilter from './SearchAndFilter';
import axios from 'axios';
import useDebounce from './hooks/deBounce';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { UserInfo } from './@types';
import Pagination from '@ui/Pagination';

const HomePage = () => {
  // States
  const searchParam = useSearchParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{ SortBy?: number; Country?: string }>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNumber]);

  const handleFilters = (type: string, value: string | number) => {
    setFilters((prev) => {
      if (type === 'none') {
        return {};
      }
      return { ...prev, [type]: value };
    });
  };

  const deBounce = useDebounce(searchQuery, 1200);
  const router = useRouter();

  const explorePageParam = {
    page: searchParam.get('page'),
    itemsPerPage: searchParam.get('itemsPerPage'),
  };

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

  console.log(filters);

  // Data fetching
  const { data, isLoading } = useQuery<UserInfo>({
    queryKey: ['profile', deBounce, filters, pageNumber],
    queryFn: () => fetchUsers(searchQuery),
  });

  return (
    <>
      <SearchAndFilter handleFilters={handleFilters} filters={filters} setSearchQuery={setSearchQuery} />
      {isLoading && (
        <div className="grid place-items-center min-h-[300px]">
          <p>Loading...</p>{' '}
        </div>
      )}
      {data?.data?.length === 0 && (
        <div className="grid place-items-center min-h-[300px]">
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
      <div className="w-full mx-auto my-4 mb-12 flex justify-center">
        <Pagination
          visiblePaginatedBtn={5}
          activePage={pageNumber}
          pages={2}
          page={pageNumber}
          setPage={setPageNumber}
        />
      </div>
    </>
  );
};

export default HomePage;
