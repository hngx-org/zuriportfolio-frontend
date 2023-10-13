// pages/index.tsx
// import { CardData } from '../../@types';
import Card from './components/Card';
import SearchAndFilter from './SearchAndFilter';
import axios from 'axios';
import useDebounce from './hooks/deBounce';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { UserInfo } from './@types';

const HomePage = () => {
  // States
  const searchParam = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [filters1, setFilters1] = useState('ddd');
  const [filters2, setFilters2] = useState('ddd');
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
        page: 1,
        itemsPerPage: 12,
      },
    });
    return data;
  }

  // Data fetching
  const { data, isLoading } = useQuery<UserInfo[]>({
    queryKey: ['profile', deBounce, filters1, filters2],
    queryFn: () => fetchUsers(searchQuery),
  });

  return (
    <>
      <SearchAndFilter setSearchQuery={setSearchQuery} />
      {isLoading && (
        <div className="grid place-items-center min-h-[300px]">
          <p>Loading...</p>{' '}
        </div>
      )}
      {data?.length === 0 && (
        <div className="grid place-items-center min-h-[300px]">
          <p>No Results</p>
        </div>
      )}
      {data && (
        <div className="m-auto p-6">
          <div className="grid justify-center gap-8 sm:grid-cols-2 sm:gap-6 sm:gap-y-8 sm:mx-3 sm:px-0 lg:gap-x-0 xl:max-w-[77.5rem] xl:mx-auto xl:grid-cols-3 xl:gap-11">
            {data?.map((card, key) => <Card key={key} data={card} />)}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
