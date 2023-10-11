import { CardData } from '../../@types';
import Card from './components/Card';
import photoImage1 from '../../public/photo1.svg';
import bg1 from '../../public/bg1.svg';
import bg2 from '../../public/bg2.png';
import bg3 from '../../public/bg3.png';
import bg4 from '../../public/bg4.png';
import bg5 from '../../public/bg5.png';
import bg6 from '../../public/bg6.png';
import bg7 from '../../public/bg7.png';
import bg8 from '../../public/bg8.png';
import bg9 from '../../public/bg9.png';
import bg10 from '../../public/bg10.png';
import bg11 from '../../public/bg11.png';
import bg12 from '../../public/bg12.png';
import photo2 from '../../public/photo2.png';
import photo3 from '../../public/photo3.png';
import photo4 from '../../public/photo4.png';
import photo5 from '../../public/photo5.png';
import photo6 from '../../public/photo6.png';
import photo7 from '../../public/photo7.png';
import photo8 from '../../public/photo8.png';
import photo9 from '../../public/photo9.png';
import photo10 from '../../public/photo10.png';
import photo11 from '../../public/photo11.png';
import photo12 from '../../public/photo12.png';

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

const HomePage: React.FC = () => {
  const customStyles = {
    maxWidth: '1240px',
  };
  return (
    <div style={customStyles} className="container  m-auto w-1240px">
      <div className="sm:grid  sm:grid-cols-2 h-full sm:gap-6 lg:grid-cols-3 sm:mx-3 sm:px-0 2xl:grid-cols-4 gap-12 lg:gap-6 m-auto justify-between  ">
        {cardData.map((card) => (
          <Card key={card.id} data={card} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
