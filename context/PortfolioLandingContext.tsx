import { createContext, useState, useEffect, use } from 'react';
import WorkExperienceSection from '@modules/portfolio/component/work-experience-modal';
import useDisclosure from '../hooks/useDisclosure';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import EducationSection from '@modules/portfolio/component/education-modal';
import LanguageModal from '../components/Modals/language-modal';
import InterestModal from '../components/Modals/interest-modal';
import { interests, sections as s } from '@modules/portfolio/component/landing/data';
import SkillModal from '@modules/portfolio/component/skillModal/SkillsModal';
type PortfolioContext = {
  setUserData: React.Dispatch<React.SetStateAction<any>>;
  userData: any;
  hasData: boolean;
  sections: Array<any>;
  modalStates: { [key: string]: boolean };
  modals: any[];
  isOpen: boolean;
  showProfileUpdate: boolean;
  showBuildPortfolio: boolean;
  showViewtemplates: boolean;
  selectedSections: Array<any>;
  coverImage: string | StaticImport;
  avatarImage: string | StaticImport;
  onOpen: () => void;
  onClose: () => void;
  onCloseModal: (modalToClose: string) => void;
  editSection: (modalToOpen: string) => void;
  setHasData: React.Dispatch<React.SetStateAction<boolean>>;
  setModalStates: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  setSections: React.Dispatch<React.SetStateAction<any[]>>;
  profileUpdate: () => void;
  buildPortfolio: () => void;
  viewPortfolio: () => void;
  modal: () => void;
  setCoverImage: React.Dispatch<React.SetStateAction<File | undefined>>;
  setAvatarImage: React.Dispatch<React.SetStateAction<File | undefined>>;
  handleUploadCover: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleSection: (sectionTitle: string) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userSections: any[];
  error: any;
  openDelete: boolean;
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
};
const Portfolio = createContext<PortfolioContext>({
  setUserData: () => {},
  userData: {},
  selectedSections: [],
  hasData: false,
  sections: [],
  modals: [],
  isOpen: false,
  modalStates: {},
  showProfileUpdate: false,
  showBuildPortfolio: false,
  showViewtemplates: false,
  coverImage: '' as string | StaticImport,
  avatarImage: '' as string | StaticImport,
  setHasData: () => {},
  onOpen: () => {},
  onClose: () => {},
  setModalStates: () => {},
  onCloseModal: () => {},
  editSection: () => {},
  setSections: () => {},
  profileUpdate: () => {},
  buildPortfolio: () => {},
  viewPortfolio: () => {},
  modal: () => {},
  setCoverImage: () => {},
  setAvatarImage: () => {},
  handleUploadCover: () => {},
  toggleSection: () => {},
  isLoading: false,
  setIsLoading: () => {},
  userSections: [],
  error: null,
  openDelete: false,
  setOpenDelete: () => {},
});
export function PortfolioCtxProvider(props: { children: any }) {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasData, setHasData] = useState<boolean>(false);
  const [modalStates, setModalStates] = useState<{ [key: string]: boolean }>({});
  const [sections, setSections] = useState<Array<any>>(s);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  //landing page
  const users = [
    `f8e1d17d-0d9e-4d21-89c5-7a564f8a1e90`,
    `6ba7b810-9dad-11d1-80b4-00c04fd430c8`,
    `8abf86e2-24f1-4d8e-b7c1-5b13e5f994a1`,
  ];
  const [coverImage, setCoverImage] = useState<File | any>();
  const [avatarImage, setAvatarImage] = useState<File | any>();
  const [showProfileUpdate, setShowProfileUpdate] = useState<boolean>(false);
  const [showBuildPortfolio, setShowBuildPortfolio] = useState<boolean>(false);
  const [showViewtemplates, setShowViewtemplates] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>({
    firstName: '',
    lastName: '',
    avatarImage: '',
    coverImage: '',
    city: '',
    country: '',
    tracks: [],
    hasDataFromBE: false,
  });
  const [error, setError] = useState<any>(null);
  const [userId, setUserId] = useState<string>(users[0]);
  const [userSections, setUserSections] = useState<any[]>([]);
  const [selectedSections, setSelectedSections] = useState<Array<any>>([]);
  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://hng6-r5y3.onrender.com/api/users/${userId}`);
        const data = await response.json();
        setUserData({
          firstName: data?.user?.firstName,
          lastName: data?.user?.lastName,
          avatarImage: data?.user?.profilePic,
          city: data?.portfolio?.city,
          country: data?.portfolio?.country,
          tracks: data?.tracks,
          hasDataFromBE: true,
          coverImage: data?.user?.profileCoverPhoto,
        });
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        setError({ state: true, error: error.message });
      }
    };
    getUser();
    const getUserSections = async () => {
      try {
        setIsLoading(true);
        const data = await fetch(`https://hng6-r5y3.onrender.com/api/getPortfolioDetails/${userId}`);
        const response = await data.json();
        const {
          about,
          projects,
          workExperience,
          education,
          skills,
          contact,
          interests,
          awards,
          language,
          reference,
          certificate,
          shop,
          custom,
        } = response;
        setUserSections([
          { title: 'About', id: 'about', data: about },
          { title: 'Project', id: 'projects', data: projects },
          { title: 'Work Experience', id: 'workExperience', data: workExperience },
          { title: 'Education', id: 'education', data: education },
          { title: 'Skills', id: 'skills', data: skills },
          { title: 'Interests', id: 'interests', data: interests },
          { title: 'Awards', id: 'awards', data: awards },
          { title: 'Certificate', id: 'certificate', data: certificate },
          { title: 'Language', id: 'language', data: language },
          { title: 'Reference', id: 'reference', data: reference },
          { title: 'Shop', id: 'shop', data: shop },
          { title: 'Contact', id: 'contact', data: contact },
          { title: 'Custom', id: 'custom', data: custom },
        ]);
        setIsLoading(false);
      } catch (error: any) {
        setError({ state: true, error: error });
      }
    };
    getUserSections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const profileUpdate = () => {
    setShowProfileUpdate(true);
    setShowBuildPortfolio(false);
    setShowViewtemplates(false);
    onOpen();
  };
  const buildPortfolio = () => {
    setShowBuildPortfolio(true);
    setShowProfileUpdate(false);
    setShowViewtemplates(false);
    onOpen();
  };
  const viewPortfolio = () => {
    setShowViewtemplates(true);
    setShowProfileUpdate(false);
    setShowBuildPortfolio(false);
    onOpen();
  };
  const modal = () => {
    setShowProfileUpdate(false);
    setShowBuildPortfolio(false);
    setShowViewtemplates(false);
    onClose();
  };
  const uploadCover = async (coverImage: string | Blob) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      const userId = 'f8e1d17d-0d9e-4d21-89c5-7a564f8a1e90';
      formData.append('images', coverImage as string | Blob);
      formData.append('userId', userId);
      const response = await fetch('https://hng6-r5y3.onrender.com/api/profile/cover/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setUserData((p: any) => ({ ...p, hasDataFromBE: true, coverImage: data.data.profilePic }));
      setHasData(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const image = URL.createObjectURL(file);
      if (e.target.id === 'coverUpload') {
        setCoverImage(image);
        await uploadCover(file);
      }
    }
  };
  //Sections modals
  const toggleSection = (sectionTitle: string) => {
    if (sectionTitle === 'custom') {
      onOpen();
      return;
    }
    const indexInSelected = selectedSections.findIndex((section) => section.title === sectionTitle);
    const indexInSection = sections.findIndex((section) => section.title === sectionTitle);
    if (indexInSelected !== -1) {
      const removedSection = selectedSections.splice(indexInSelected, 1)[0];
      setSections([...sections, removedSection]);
      setSelectedSections([...selectedSections]);
      onClose();
    } else if (indexInSection !== -1) {
      const removedSection = sections.splice(indexInSection, 1)[0];
      setSelectedSections([...selectedSections, removedSection]);
      setSections([...sections]);
      onClose();
    }
  };
  const editSection = (modalToOpen: string) => {
    const updatedModalStates = { ...modalStates };
    updatedModalStates[modalToOpen] = true;
    setModalStates(updatedModalStates);
  };
  const onCloseModal = (modalToClose: string) => {
    setModalStates((prevModalStates) => ({
      ...prevModalStates,
      [modalToClose]: false,
    }));
  };
  const modals: any[] = [
    {
      id: 'workExperience',
      modal: (
        <WorkExperienceSection isOpen={modalStates['workExperience']} onClose={() => onCloseModal('workExperience')} />
      ),
    },
    {
      id: 'education',
      modal: <EducationSection isOpen={modalStates['education']} onClose={() => onCloseModal('education')} />,
    },
    {
      id: 'language',
      modal: (
        <LanguageModal isOpen={modalStates['language']} onClose={() => onCloseModal('language')} userId={userId} />
      ),
    },
    {
      id: 'interests',
      modal: (
        <InterestModal isOpen={modalStates['interests']} onClose={() => onCloseModal('interests')} userId={userId} />
      ),
    },
    {
      id: 'skills',
      modal: <SkillModal isOpen={modalStates['skills']} onClose={() => onCloseModal('skills')} userId={userId} />,
    },
  ];
  const contextValue = {
    isOpen,
    modalStates,
    hasData,
    sections,
    modals,
    coverImage,
    avatarImage,
    showProfileUpdate,
    showBuildPortfolio,
    showViewtemplates,
    selectedSections,
    onOpen,
    onClose,
    setModalStates,
    setHasData,
    onCloseModal,
    editSection,
    setSections,
    profileUpdate,
    buildPortfolio,
    viewPortfolio,
    modal,
    setCoverImage,
    setAvatarImage,
    handleUploadCover,
    userData,
    toggleSection,
    isLoading,
    setIsLoading,
    userSections,
    error,
    openDelete,
    setOpenDelete,
    setUserData,
  };
  return <Portfolio.Provider value={contextValue}>{props.children}</Portfolio.Provider>;
}
export default Portfolio;