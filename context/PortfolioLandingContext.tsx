import { createContext, useState, useEffect } from 'react';
import WorkExperienceSection from '@modules/portfolio/component/work-experience-modal';
import useDisclosure from '../hooks/useDisclosure';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import EducationSection from '@modules/portfolio/component/education-modal';
import LanguageModal from '../components/Modals/language-modal';
import InterestModal from '../components/Modals/interest-modal';
import { sections as s } from '@modules/portfolio/component/landing/data';

type PortfolioContext = {
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
};

const Portfolio = createContext<PortfolioContext>({
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
});

export function PortfolioCtxProvider(props: { children: any }) {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasData, setHasData] = useState<boolean>(false);
  const [modalStates, setModalStates] = useState<{ [key: string]: boolean }>({});
  const [sections, setSections] = useState<Array<any>>(s);
  const [selectedSections, setSelectedSections] = useState<Array<any>>([]);

  const [openDelete, setOpenDelete] = useState<boolean>(false);

  //landing page
  const users = [
    `f8e1d17d-0d9e-4d21-89c5-7a564f8a1e90`,
    `8abf86e2-24f1-4d8e-b7c1-5b13e5f994a1`,
    `6ba7b810-9dad-11d1-80b4-00c04fd430c8`,
    `6ba7b811-9dad-11d1-80b4-00c04fd430c8`,
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
  const [userId, setUserId] = useState<string>(users[3]);
  const [userSections, setUserSections] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://hng6-r5y3.onrender.com/api/users/${userId}`);
        const data = await response.json();
        setUserData({
          firstName: data?.user?.firstName,
          lastName: data?.user?.lastName,
          avatarImage: data?.user?.avatarImage,
          city: data?.portfolio?.city,
          country: data?.portfolio?.country,
          tracks: data?.tracks,
          hasDataFromBE: true,
          coverImage: '',
        });
        setIsLoading(false);
        setHasData(true);
      } catch (error: any) {
        setError({ state: true, error: error.message });
      }
    };
    getUser();

    const getUserSections = async () => {
      try {
        setIsLoading(true);
        const data = await fetch(`https://hng6-r5y3.onrender.com/api/getPortfolioDetails/${userId}`);

        const response = await data.json();
        const { workExperience, education } = response;
        setUserSections([
          { title: 'Work Experience', id: 'workExperience', data: workExperience },
          { title: 'Education', id: 'education', data: education },
        ]);
        setIsLoading(false);
      } catch (error: any) {
        setError({ state: true, error: error });
        console.log(error);
      }
    };

    getUserSections();

    // selectedSections.length === 0 && !userData.hasDataFromBE ? setHasData(false) : setHasData(true);
  }, [userId]);

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
      formData.append('images', coverImage as string | Blob);
      const response = await fetch('https://hng6-r5y3.onrender.com/api/cover/photo', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setUserData((p: any) => ({ ...p, hasDataFromBE: true, coverImage: data.data[0] }));
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
      modal: <LanguageModal isOpen={modalStates['language']} onClose={() => onCloseModal('language')} />,
    },
    {
      id: 'interest',
      modal: <InterestModal isOpen={modalStates['interest']} onClose={() => onCloseModal('interest')} />,
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
  };

  return <Portfolio.Provider value={contextValue}>{props.children}</Portfolio.Provider>;
}

export default Portfolio;
