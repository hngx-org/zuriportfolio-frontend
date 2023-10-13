// pages/index.tsx
// import { CardData } from '../../@types';
import Card from './components/Card';
import SearchAndFilter from './SearchAndFilter';
import axios from 'axios';
import useDebounce from './hooks/deBounce';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { UserInfo } from '../../@types';

const HomePage = () => {
  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [filters1, setFilters1] = useState('ddd');
  const [filters2, setFilters2] = useState('ddd');
  const deBounce = useDebounce(searchQuery, 1200);

  // Data fetching
  const { data, isLoading } = useQuery<UserInfo[]>({
    queryKey: ['profile', deBounce, filters1, filters2],
    queryFn: () => fetchUsers(searchQuery),
  });

  console.log(data);

  return (
    <>
      <SearchAndFilter setSearchQuery={setSearchQuery} />
      {isLoading && (
        <div className="grid place-items-center min-h-[300px]">
          <p>Loading...</p>{' '}
        </div>
      )}
      <div className="m-auto p-6">
        <div className="grid justify-center gap-8 sm:grid-cols-2 sm:gap-6 sm:gap-y-8 sm:mx-3 sm:px-0 lg:gap-x-0 xl:max-w-[77.5rem] xl:mx-auto xl:grid-cols-3 xl:gap-11">
          {data?.map((card, key) => <Card key={key} data={card} />)}
        </div>
      </div>
    </>
  );
};

export default HomePage;

const baseUrl = `https://hngstage6-eagles.azurewebsites.net/api`,
  searchUrl = (query: string) => `${baseUrl}/explore/search/${query}`,
  filterUrl = (query: string) =>
    `${baseUrl}/explore/filter?SortBy=1&Location=nigeria&Country=lagos&Provider=ee&Skill=ee&Track=ee&Ranking=ee&RoleId=1&Tag=a&PageSize=12&PageNumber=1`,
  allUsers = `${baseUrl}/explore/GetAllPortfolio?page=1&itemsPerPage=12`;

async function fetchUsers(query?: string, filters?: string, filter2?: string) {
  let url = allUsers;
  if (query) {
    url = searchUrl(query);
  } else if (filters) {
    url = filterUrl(filters);
  }
  const { data } = await axios.get(url);
  return data;
}
