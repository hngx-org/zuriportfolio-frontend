import {
  About,
  Contact,
  Education,
  Project,
  Skill,
  WorkExperience,
  Certificate,
  Awards,
  Custom,
  Shop,
  Interests,
  Language,
  Reference,
} from './Skeleton';
import { Award, Briefcase, Global, Teacher } from 'iconsax-react';

export const sections = [
  {
    id: 'workExperience',
    title: 'Work Experience',
    description: 'A place to highlight your work professional experience or internship training',
    icon: <Briefcase />,
    modal: <WorkExperience />,
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Show off your  academic qualification  degrees, and also relevant certification.',
    icon: <Teacher />,
    modal: <Education />,
  },
  {
    id: 'skills',
    title: 'Skill',
    description: 'List your your expertise, technical, managerial or soft skill abilities in this section',
    icon: <Briefcase />,
    modal: <Skill />,
  },
  {
    id: 'interests',
    title: 'Interests',
    description: 'A place to highlight your professional experience A place to highlight your professional ',
    icon: <Briefcase />,
    modal: <Interests />,
  },
  {
    id: 'about',
    title: 'About Me',
    description: 'A place to highlight your professional experience A place to highlight your professional ',
    icon: <Briefcase />,
    modal: <About />,
  },
  {
    id: 'project',
    title: 'Project',
    description: 'A place to highlight your professional experience A place to highlight your professional ',
    icon: <Briefcase />,
    modal: <Project />,
  },
  {
    id: 'certificate',
    title: 'Certification',
    description: 'A place to highlight your professional experience A place to highlight your professional ',
    icon: <Briefcase />,
    modal: <Certificate />,
  },
  {
    id: 'language',
    title: 'Language',
    description: 'A place to highlight your professional experience A place to highlight your professional ',
    icon: <Global />,
    modal: <Language />,
  },
  {
    id: 'awards',
    title: 'Awards',
    description: 'A place to highlight your professional experience A place to highlight your professional ',
    icon: <Award />,
    modal: <Awards />,
  },
  {
    id: 'reference',
    title: 'Reference',
    description: 'A place to highlight your professional experience A place to highlight your professional ',
    icon: <Briefcase />,
    modal: <Reference />,
  },
  {
    id: 'shop',
    title: 'Shop',
    description: 'A place to highlight your professional experience A place to highlight your professional ',
    icon: <Briefcase />,
    modal: <Shop />,
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'A place to highlight your professional experience A place to highlight your professional ',
    icon: <Briefcase />,
    modal: <Contact />,
  },
];

// @Entity()
// export class Certificate {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   title: string;

//   @Column()
//   year: string;

//   @Column()
//   organization: string;

//   @Column({ type: "text", nullable: true })
//   url: string;

//   @Column("text")
//   description: string;

//   @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
//   created_at: Date;

//   @Column({ name: "user_id" })
//   userId: string;

//   @Column({ name: "section_id" })
//   sectionId: number;

//   @ManyToOne(()

export let workexperiences = [
  {
    id: 11,
    role: 'Role',
    company: 'Company',
    description: 'Description',
    startMonth: 'mm',
    startYear: 'yyyy',
    endMonth: 'mm',
    endYear: 'yyyy',
  },
];

export let certificates = [
  {
    id: 11,
    certificate: 'Certificate',
    school: 'School',
    description: 'Description',
    linkTitle: 'Link Title',
    link: 'Link',
    month: 'mm',
    year: 'yyyy',
  },
];

export let awards = [
  {
    id: 11,
    award: 'Award',
    org: 'Organization ',
    description: 'Description',
    linkTitle: 'Link Title',
    link: 'Link',
    month: 'mm',
    year: 'yyyy',
  },
];

export let educations = [
  {
    id: 11,
    degree: 'Degree',
    school: 'School',
    description: 'Description',
    from: 'mm',
    to: 'yyyy',
  },
];

export let projects = [
  {
    id: 11,
    title: 'Project title',
    description: 'Description',
    tags: 'Tag 1,Tag 2',
    linkTitle: 'Link Title',
    link: 'Link',
    img: '',
  },
];

export let about = 'A place to highlight your professional experience A place to highlight your professional.';

export let skills = 'Skill 1,Skill 2,Skill 3,Skill 4,Skill 5,Skill 6';
export let interests = 'Interest 1,Interest 2,Interest 3,Interest 4,Interest 5,Interest 6';
export let languages = 'Language 1,Language 2,Language 3,Language 4,Language 5,Language 6';

export let contacts = [
  {
    id: 11,
    title: 'Contact',
    info: 'Contact info',
    link: 'Link',
  },
  {
    id: 1,
    title: 'Contact title',
    info: 'Contact info',
    link: 'Link',
  },
  {
    id: 121,
    title: 'Contact title',
    info: 'Contact info',
    link: 'Link',
  },
];

export let references = [
  {
    id: 11,
    name: 'Name',
    company: 'Company',
    position: 'Position',
    email: 'Email',
    phone: 'Phone',
  },
];

export const profileData = {
  userId: '11',
  picture: 'picture',
  name: 'Name',
  track: 'Track',
  city: 'City',
  country: 'Country',
};
