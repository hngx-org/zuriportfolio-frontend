import { createContext, useState, useEffect, use } from 'react';
import WorkExperienceSection from '@modules/portfolio/component/work-experience-modal';
import useDisclosure from '../hooks/useDisclosure';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
// import EducationSection from '@modules/portfolio/component/education-modal';
import LanguageModal from '../components/Modals/language-modal';
import InterestModal from '../components/Modals/interest-modal';
import { sections as s } from '@modules/portfolio/component/landing/data';
import SkillModal from '@modules/portfolio/component/skillModal/SkillsModal';
import ProjectSection from '@modules/portfolio/component/modals/projects';
import PortfolioAbout from '@modules/portfolio/component/about/about';
import PortfolioReference from '@modules/portfolio/component/reference/reference';
import ContactModal from '@modules/portfolio/component/contact-modal';
import Certifications from '@modules/portfolio/component/certification-modal';
import Awards from '@modules/portfolio/component/awards-modal';
import { useAuth } from './AuthContext';
import ProjectSectionModal from '@modules/portfolio/component/modals/project-section-modal';

type PortfolioContext = {
  setGettingSection: React.Dispatch<React.SetStateAction<boolean>>;
  hasPortfolio: boolean;
  setHasPortfolio: React.Dispatch<React.SetStateAction<boolean>>;
  setShowBuildPortfolio: React.Dispatch<React.SetStateAction<boolean>>;
  setShowProfileUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  gettinSection: boolean;
  userId: string;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
  userData: any;
  sections: Array<any>;
  modalStates: { [key: string]: boolean };
  modals: any[];
  isOpen: boolean;
  showProfileUpdate: boolean;
  showBuildPortfolio: boolean;
  showViewtemplates: boolean;
  selectedSections: Array<any>;
  avatarImage: string | StaticImport;
  onOpen: () => void;
  onClose: () => void;
  onCloseModal: (modalToClose: string) => void;
  editSection: (modalToOpen: string) => void;
  setModalStates: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  setSections: React.Dispatch<React.SetStateAction<any[]>>;
  profileUpdate: () => void;
  buildPortfolio: () => void;
  viewPortfolio: () => void;
  onSaveModal: (sectionTitle?: string) => void;
  setAvatarImage: React.Dispatch<React.SetStateAction<File | undefined>>;
  handleUploadCover: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleSection: (sectionTitle: string) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userSections: any[];
  error: any;
  openDelete: boolean;
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
  openShop: boolean;
  setOpenShop: React.Dispatch<React.SetStateAction<boolean>>;
  openCustom: boolean;
  setOpenCustom: React.Dispatch<React.SetStateAction<boolean>>;
  idToDelete: string;
  setIdToDelete: React.Dispatch<React.SetStateAction<string>>;
};

const Portfolio = createContext<PortfolioContext>({
  setGettingSection: () => {},
  hasPortfolio: false,
  setHasPortfolio: () => {},
  setShowBuildPortfolio: () => {},
  setShowProfileUpdate: () => {},
  gettinSection: true,
  userId: '',
  setUserData: () => {},
  userData: {},
  selectedSections: [],
  sections: [],
  modals: [],
  isOpen: false,
  modalStates: {},
  showProfileUpdate: false,
  showBuildPortfolio: false,
  showViewtemplates: false,
  avatarImage: '' as string | StaticImport,
  onOpen: () => {},
  onClose: () => {},
  setModalStates: () => {},
  onCloseModal: () => {},
  editSection: () => {},
  setSections: () => {},
  profileUpdate: () => {},
  buildPortfolio: () => {},
  viewPortfolio: () => {},
  onSaveModal: () => {},
  setAvatarImage: () => {},
  handleUploadCover: () => {},
  toggleSection: () => {},
  isLoading: false,
  setIsLoading: () => {},
  userSections: [],
  error: null,
  openDelete: false,
  setOpenDelete: () => {},
  openShop: true,
  setOpenShop: () => {},
  openCustom: false,
  setOpenCustom: () => {},
  idToDelete: '',
  setIdToDelete: () => {},
});

export function PortfolioCtxProvider(props: { children: any }) {
  const [userId, setUserId] = useState('');
  const { auth } = useAuth();
  const [userSections, setUserSections] = useState<any[]>([]);

  useEffect(() => {
    if (auth?.user?.id) {
      setUserId(auth.user.id);
      getUser(auth.user.id);
      getUserSections(auth.user.id);
    }
  }, [auth?.user?.id]);

  const [isLoading, setIsLoading] = useState(true);
  const [gettinSection, setGettingSection] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalStates, setModalStates] = useState<{ [key: string]: boolean }>({});
  const [sections, setSections] = useState<Array<any>>(s);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<string>('');
  const [openShop, setOpenShop] = useState<boolean>(true);
  const [openCustom, setOpenCustom] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [selectedSections, setSelectedSections] = useState<Array<any>>([]);
  const [avatarImage, setAvatarImage] = useState<File | any>();
  const [showProfileUpdate, setShowProfileUpdate] = useState<boolean>(false);
  const [showBuildPortfolio, setShowBuildPortfolio] = useState<boolean>(false);
  const [showViewtemplates, setShowViewtemplates] = useState<boolean>(false);
  const [hasPortfolio, setHasPortfolio] = useState<boolean>(false);

  const [userData, setUserData] = useState<any>({
    firstName: '',
    lastName: '',
    avatarImage: '',
    coverImage: '',
    city: '',
    country: '',
    tracks: [],
  });

  const getUser = async (userId: string) => {
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
        tracks: data?.userTracks,
        coverImage: data?.user?.profileCoverPhoto,
      });
      setIsLoading(false);
    } catch (error: any) {
      setError({ state: true, error: error.message });
    }
  };

  const getUserSections = async (userId: string) => {
    try {
      setGettingSection(true);
      const response = await fetch(`https://hng6-r5y3.onrender.com/api/getPortfolioDetails/${userId}`);
      const data = await response.json();
      const {
        about,
        projects,
        workExperience,
        education,
        skills,
        contact,
        interestArray,
        awards,
        languages,
        reference,
        certificate,
        shop,
        custom,
      } = data;
      if (
        about ||
        projects ||
        workExperience ||
        education ||
        skills ||
        contact ||
        interestArray ||
        awards ||
        languages ||
        reference ||
        certificate ||
        shop ||
        custom
      ) {
      }
      setUserSections([
        { title: 'About', id: 'about', data: about },
        { title: 'Project', id: 'projects', data: projects },
        { title: 'Work Experience', id: 'workExperience', data: workExperience },
        { title: 'Education', id: 'education', data: education },
        { title: 'Skills', id: 'skills', data: skills },
        { title: 'Interests', id: 'interests', data: interestArray },
        { title: 'Awards', id: 'awards', data: awards },
        { title: 'Certificate', id: 'certificate', data: certificate },
        { title: 'Languages', id: 'languages', data: languages },
        { title: 'Reference', id: 'reference', data: reference },
        { title: 'Shop', id: 'shop', data: shop },
        { title: 'Contact', id: 'contact', data: contact },
        { title: 'Custom', id: 'custom', data: custom },
      ]);
      setGettingSection(false);
    } catch (error: any) {
      setError({ state: true, error: error.message });
    }
  };

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

  const uploadCover = async (coverImage: string | Blob) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('images', coverImage as string | Blob);
      formData.append('userId', userId);

      const response = await fetch('https://hng6-r5y3.onrender.com/api/profile/cover/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setUserData((p: any) => ({ ...p, hasDataFromBE: true, coverImage: data?.data?.profilePic }));
      setIsLoading(false);
    } catch (error: any) {
      setError({ state: true, error: error.message });
    }
  };

  const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const image = URL.createObjectURL(file);
      if (e.target.id === 'coverUpload') {
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

  const onSaveModal = (sectionTitle?: string) => {
    setShowProfileUpdate(false);
    setShowBuildPortfolio(false);
    setShowViewtemplates(false);
    onClose();
    onCloseModal(sectionTitle || '');
    getUser(userId);
    getUser(userId);
    getUserSections(userId);
    getUserSections(userId);
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
        <WorkExperienceSection
          isOpen={modalStates['workExperience']}
          onCloseModal={() => onCloseModal('workExperience')}
          onSaveModal={() => onSaveModal('workExperience')}
        />
      ),
    },
    // {
    //   id: 'education',
    //   modal: (
    //     // <EducationSection
    //     //   isOpen={modalStates['education']}
    //     //   onCloseModal={() => onCloseModal('education')}
    //     //   onSaveModal={() => onSaveModal('education')}
    //     // />
    //   ),
    // },
    {
      id: 'projects',
      modal: (
        <ProjectSectionModal
          isOpen={modalStates['projects']}
          onCloseModal={() => onCloseModal('projects')}
          onSaveModal={() => onSaveModal('projects')}
          userId={userId}
        />
      ),
    },
    {
      id: 'languages',
      modal: (
        <LanguageModal
          isOpen={modalStates['languages']}
          onCloseModal={() => onCloseModal('languages')}
          onSaveModal={() => onSaveModal('languages')}
          userId={userId}
        />
      ),
    },
    {
      id: 'interests',
      modal: (
        <InterestModal
          isOpen={modalStates['interests']}
          onCloseModal={() => onCloseModal('interests')}
          onSaveModal={() => onSaveModal('interests')}
          userId={userId}
        />
      ),
    },
    {
      id: 'skills',
      modal: (
        <SkillModal
          isOpen={modalStates['skills']}
          onCloseModal={() => onCloseModal('skills')}
          onSaveModal={() => onSaveModal('skills')}
          userId={userId}
        />
      ),
    },
    {
      id: 'reference',
      modal: (
        <PortfolioReference
          isOpen={modalStates['reference']}
          onCloseModal={() => onCloseModal('reference')}
          onSaveModal={() => onSaveModal('reference')}
          userId={userId}
        />
      ),
    },
    {
      id: 'certificate',
      modal: (
        <Certifications
          isOpen={modalStates['certificate']}
          onCloseModal={() => onCloseModal('certificate')}
          onSaveModal={() => onSaveModal('certificate')}
        />
      ),
    },
    {
      id: 'contact',
      modal: (
        <ContactModal
          isOpen={modalStates['contact']}
          onCloseModal={() => onCloseModal('contact')}
          onSaveModal={() => onSaveModal('contact')}
          userId={userId}
        />
      ),
    },
    {
      id: 'about',
      modal: (
        <PortfolioAbout
          isOpen={modalStates['about']}
          onCloseModal={() => onCloseModal('about')}
          onSaveModal={() => onSaveModal('about')}
          userId={userId}
        />
      ),
    },
    {
      id: 'awards',
      modal: (
        <Awards
          isOpen={modalStates['awards']}
          onCloseModal={() => onCloseModal('awards')}
          onSaveModal={() => onSaveModal('awards')}
          userId={userId}
        />
      ),
    },
  ];

  const contextValue = {
    isOpen,
    modalStates,
    sections,
    modals,
    avatarImage,
    showProfileUpdate,
    showBuildPortfolio,
    showViewtemplates,
    selectedSections,
    onOpen,
    onClose,
    setModalStates,
    onCloseModal,
    editSection,
    setSections,
    profileUpdate,
    buildPortfolio,
    viewPortfolio,
    onSaveModal,
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
    userId,
    openShop,
    setOpenShop,
    getUser,
    openCustom,
    setOpenCustom,
    gettinSection,
    idToDelete,
    setIdToDelete,
    setShowProfileUpdate,
    setShowBuildPortfolio,
    setGettingSection,
    hasPortfolio,
    setHasPortfolio,
  };

  return <Portfolio.Provider value={contextValue}>{props.children}</Portfolio.Provider>;
}

export default Portfolio;
