// import React from 'react';
// import Card from './components/Card';
// import { useState,useEffect } from 'react';
// import { UserInfo } from '../../@types';

// // pages/index.tsx

// const apiUrl = 'https://hngstage6-eagles.azurewebsites.net/api/explore/GetAllPortfolio';

// const MyPage = ({ initialData }) => {
//   const [page, setPage] = useState(1);
//   const [cards, setCards] = useState(initialData);

//   useEffect(() => {
//     async function fetchCards() {
//       const response = await fetch(`${apiUrl}?page=${page}&itemsPerPage=12`);
//       const data = await response.json();
//       setCards(data);
//     }
//     fetchCards();
//   }, [page]);

//   return (
//     <div>
//       {cards.map((card) => (
//         <div key={card.id}>
//             <Card data={card} />
//         </div>
//       ))}
//       <button onClick={() => setPage(page + 1)}>Next Page</button>
//     </div>
//   );
// };

// export async function getServerSideProps() {
//   // Fetch the initial data for the first page
//   const response = await fetch(`${apiUrl}?page=1&itemsPerPage=12`);
//   const initialData = await response.json();

//   return {
//     props: { initialData },
//   };
// }

// export default MyPage;

// pages/index.tsx
import React, { useEffect, useState } from 'react';
import Card from '../explore/components/Card';
import { UserInfo } from '../../@types';
import { Key } from 'iconsax-react';
import SearchAndFilter from './SearchAndFilter';
import axios from 'axios';
import useDebounce from './hooks/deBounce';
import { useQuery } from '@tanstack/react-query';

const apiUrl = 'https://hngstage6-eagles.azurewebsites.net/api/explore/GetAllPortfolio';

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [cards, setCards] = useState<UserInfo[]>([]); // Define YourCardDataType
  const [searchQuery, setSearchQuery] = useState('');
  const [filters1, setFilters1] = useState('ddd');
  const [filters2, setFilters2] = useState('ddd');
  const deBounce = useDebounce(searchQuery, 1200);

  const { data, isLoading } = useQuery<UserInfo[]>({
    queryKey: ['profile', deBounce, filters1, filters2],
    queryFn: () => fetchUsers(searchQuery),
  });
  console.log(data);

  useEffect(() => {
    // Function to fetch data for the current page
    async function fetchCards() {
      const response = await fetch(`${apiUrl}?page=${page}&itemsPerPage=6`);
      const data = await response.json();
      setCards(data);
    }
    fetchCards();
  }, [page]);

  return (
    <>
      {/* <SearchAndFilter setSearchQuery={setSearchQuery} /> */}
      {isLoading && (
        <div className="grid place-items-center min-h-[300px]">
          <p>Loading...</p>{' '}
        </div>
      )}
      <div className="mx-auto p-6">
        <div className="grid justify-center gap-8 sm:grid-cols-2 sm:gap-6 sm:gap-y-8 sm:mx-3 sm:px-0 lg:gap-x-0 xl:max-w-[77.5rem] xl:mx-auto xl:grid-cols-3 xl:gap-11">
          {cards.map((card, key) => (
            <Card key={key} data={card} />
          ))}
        </div>
        <div className="flex mt-4 justify-center items-center">
          <button
            className="mx-auto my-auto bg-black text-white-100 px-4 py-2 rounded-lg "
            onClick={() => setPage(page - 1)}
          >
            Previous Page
          </button>
          <button
            className="mx-auto my-auto bg-black text-white-100 px-4 py-2 rounded-lg "
            onClick={() => setPage(page + 1)}
          >
            Next Page
          </button>
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
