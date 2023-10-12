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
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { UserInfo } from '../../@types/exploreTyples';

// Interface

// id: number;
// bgImage: string;
// photoImage: string;
// name: string;
// role: string;
// skills:string[]
// totalProjects: number;
// badge: string;
// location: string;

const cardData: CardData[] = [
  {
    id: 1,
    bgImage: bg1,
    photoImage: photoImage1,
    name: 'Theresa Webb',
    role: 'Product Designer',
    skills: ['UI Design', 'User Research', 'Prototyping', 'Figma', 'Interaction Design', '+5'],
    totalProjects: 11,
    badge: 'Beginner',
    location: 'Lagos, Nigeria',
  },
  {
    id: 2,
    bgImage: bg1,
    photoImage: photo2,
    name: 'Jacob Jones',
    role: 'Frontend Developer',
    skills: ['Node JS', 'JavaScript', 'React', 'Vue JS', 'Figma', '+3'],
    totalProjects: 8,
    badge: 'Expert',
    location: 'Port Harcourt, Nigeria',
  },
  {
    id: 3,
    bgImage: bg3,
    photoImage: photo3,
    name: 'Bessie Cooper',
    role: 'Full Stack Engineer',
    skills: ['Node JS', 'JavaScript', 'React', 'Python', 'Figma', '+3'],
    totalProjects: 5,
    badge: 'Intermediate',
    location: 'Lagos, Nigeria',
  },
  {
    id: 4,
    bgImage: bg4,
    photoImage: photo4,
    name: 'Jenny Wilson',
    role: 'Cyber Security',
    skills: ['Node JS', 'JavaScript', 'React', 'Python', 'Figma', '+3'],
    totalProjects: 8,
    badge: 'Expert',
    location: 'Port Harcourt, Nigeria',
  },
  {
    id: 5,
    bgImage: bg5,
    photoImage: photo5,
    name: 'Annette Black',
    role: 'Data Science',
    skills: ['Node JS', 'JavaScript', 'React', 'Python', 'Figma', '+3'],
    totalProjects: 5,
    badge: 'Intermediate',
    location: 'Lagos, Nigeria',
  },
  {
    id: 6,
    bgImage: bg6,
    photoImage: photo6,
    name: 'Guy Hawkins',
    role: 'Graphic Designer',
    skills: ['Photoshop', 'Illustrator', 'Adobe CC', 'Motion', 'Figma', '+5'],
    totalProjects: 11,
    badge: 'Beginner',
    location: 'Lagos, Nigeria',
  },
  {
    id: 7,
    bgImage: bg7,
    photoImage: photo7,
    name: 'Robert Fox',
    role: 'Video Marketer',
    skills: ['UI Design', 'User Research', 'Prototyping', 'Figma', 'Interaction Design', '+5'],
    totalProjects: 8,
    badge: 'Intermediate',
    location: 'Lagos, Nigeria',
  },
  {
    id: 8,
    bgImage: bg8,
    photoImage: photo8,
    name: 'Darlene Robertson',
    role: 'Product Designer',
    skills: ['UI Design', 'User Research', 'Prototyping', 'Figma', 'Interaction Design', '+5'],
    totalProjects: 8,
    badge: 'Beginner',
    location: 'Lagos, Nigeria',
  },
  {
    id: 9,
    bgImage: bg9,
    photoImage: photo9,
    name: 'Jerome Bell',
    role: 'Mobile Developer',
    skills: ['Node JS', 'JavaScript', 'React', 'Python', 'Figma', '+3'],
    totalProjects: 8,
    badge: 'Expert',
    location: 'Port Harcourt, Nigeria',
  },
  {
    id: 10,
    bgImage: bg10,
    photoImage: photo10,
    name: 'Leslie Alexander',
    role: 'Cloud Computing',
    skills: ['Node JS', 'JavaScript', 'React', 'Python', 'Figma', '+3'],
    totalProjects: 8,
    badge: 'Beginner',
    location: 'Lagos, Nigeria',
  },
  {
    id: 11,
    bgImage: bg11,
    photoImage: photo11,
    name: 'Kathryn Murphy',
    role: 'Full Stack Engineer',
    skills: ['Node JS', 'JavaScript', 'React', 'Python', 'Figma', '+3'],
    totalProjects: 5,
    badge: 'Intermediate',
    location: 'Lagos, Nigeria',
  },
  {
    id: 12,
    bgImage: bg12,
    photoImage: photo12,
    name: 'Albert Flores',
    role: 'Frontend Developer',
    skills: ['Node JS', 'JavaScript', 'React', 'Python', 'Vue JS', '+3'],
    totalProjects: 8,
    badge: 'Expert',
    location: 'Port Harcourt, Nigeria',
  },
];

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
