// pages/index.tsx
import { CardData } from '../../@types';
import Card from './components/Card';
import photoImage1 from '../../public/assets/images/explore_img/photo1.svg';
import bg1 from '../../public/assets/images/explore_img/bg1.svg';
import bg2 from '../../public/assets/images/explore_img/bg2.png';
import bg3 from '../../public/assets/images/explore_img/bg3.png';
import bg4 from '../../public/assets/images/explore_img/bg4.png';
import bg5 from '../../public/assets/images/explore_img/bg5.png';
import bg6 from '../../public/assets/images/explore_img/bg6.png';
import bg7 from '../../public/assets/images/explore_img/bg7.png';
import bg8 from '../../public/assets/images/explore_img/bg8.png';
import bg9 from '../../public/assets/images/explore_img/bg9.png';
import bg10 from '../../public/assets/images/explore_img/bg10.png';
import bg11 from '../../public/assets/images/explore_img/bg11.png';
import bg12 from '../../public/assets/images/explore_img/bg12.png';
import photo2 from '../../public/assets/images/explore_img/photo2.png';
import photo3 from '../../public/assets/images/explore_img/photo3.png';
import photo4 from '../../public/assets/images/explore_img/photo4.png';
import photo5 from '../../public/assets/images/explore_img/photo5.png';
import photo6 from '../../public/assets/images/explore_img/photo6.png';
import photo7 from '../../public/assets/images/explore_img/photo7.png';
import photo8 from '../../public/assets/images/explore_img/photo8.png';
import photo9 from '../../public/assets/images/explore_img/photo9.png';
import photo10 from '../../public/assets/images/explore_img/photo10.png';
import photo11 from '../../public/assets/images/explore_img/photo11.png';
import photo12 from '../../public/assets/images/explore_img/photo12.png';
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
  const [filters, setFilters] = useState<{ SortBy?: number; Country?: string }>({});

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
        page: 1,
        itemsPerPage: 12,
        ...filters,
      },
    });
    return data;
  }

  console.log(filters);

  // Data fetching
  const { data, isLoading } = useQuery<UserInfo>({
    queryKey: ['profile', deBounce, filters],
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
    </>
  );
};

export default HomePage;
