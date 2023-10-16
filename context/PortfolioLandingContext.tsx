import { createContext, useState, useEffect, use } from 'react';
import WorkExperienceSection from '@modules/portfolio/component/work-experience-modal';
import useDisclosure from '../hooks/useDisclosure';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import EducationSection from '@modules/portfolio/component/education-modal';
import LanguageModal from '../components/Modals/language-modal';
import InterestModal from '../components/Modals/interest-modal';
import { sections as s } from '@modules/portfolio/component/landing/data';
import SkillModal from '@modules/portfolio/component/skillModal/SkillsModal';
import { useRouter } from 'next/router';
import ProjectSection from '@modules/portfolio/component/modals/projects';
import PortfolioAbout from '@modules/portfolio/component/about/about';
import PortfolioReference from '@modules/portfolio/component/reference/reference';
import ContactModal from '@modules/portfolio/component/contact-modal';
import Certifications from '@modules/portfolio/component/certification-modal';
import Awards from '@modules/portfolio/component/awards-modal';

type PortfolioContext = {
  userId: string;
  hasPortfolio: boolean;
  setHasPortfolio: React.Dispatch<React.SetStateAction<boolean>>;
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
};

const Portfolio = createContext<PortfolioContext>({
  userId: '',
  hasPortfolio: false,
  setHasPortfolio: () => {},
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
});

export function PortfolioCtxProvider(props: { children: any }) {
  const router = useRouter();
  const [userId, setUserId] = useState<string>('' as string);
  const [token, setToken] = useState<string>('' as string);

  const getUserId = async () => {
    const token = localStorage.getItem('zpt');
    const response = await fetch(`https://staging.zuri.team/api/auth/api/authorize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA1NDkzNDVhLTQ2MWMtNGM2Yy1iZTNjLWU3YWZlMzg4ZWIyOSIsImlhdCI6MTY5NzQxNzU4Nn0.Lm7HAisj-TWpmP2TivhqMhYGqPpnw_c8G62p3Tdf-F8',
        permission: 'product.read',
      }),
    });
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const authUser = async () => {
      try {
        const data = await getUserId();
        setUserId(data?.user?.id);
        await getUser(userId);
      } catch (error) {
        setError({ state: true, error: error });
      }
    };
    authUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, router.isReady, router.query.id, userId]);

  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasData, setHasData] = useState<boolean>(false);
  const [modalStates, setModalStates] = useState<{ [key: string]: boolean }>({});
  const [sections, setSections] = useState<Array<any>>(s);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openShop, setOpenShop] = useState<boolean>(true);
  const [hasPortfolio, setHasPortfolio] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [userSections, setUserSections] = useState<any[]>([]);
  const [selectedSections, setSelectedSections] = useState<Array<any>>([]);
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
  });

  const getUser = async (userId: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://hng6-r5y3.onrender.com/api/getPortfolioDetails/${userId}`);
      const data = await response.json();
      setUserData({
        firstName: data?.user?.firstName,
        lastName: data?.user?.lastName,
        avatarImage: data?.user?.profilePic,
        city: data?.portfolio?.city,
        country: data?.portfolio?.country,
        tracks: data?.tracks,
        coverImage: data?.user?.profileCoverPhoto,
      });
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
      } = data;
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
    setHasData(true);
    setHasPortfolio(true);
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
    } catch (error) {
      console.log(error);
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

  const modal = (sectionTitle?: string) => {
    setShowProfileUpdate(false);
    setShowBuildPortfolio(false);
    setShowViewtemplates(false);
    onClose();
    onCloseModal(sectionTitle || '');
    getUser(userId);
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
      modal: <WorkExperienceSection isOpen={modalStates['workExperience']} onClose={() => modal('workExperience')} />,
    },
    {
      id: 'education',
      modal: <EducationSection isOpen={modalStates['education']} onClose={() => modal('education')} />,
    },
    {
      id: 'projects',
      modal: <ProjectSection isOpen={modalStates['projects']} onClose={() => modal('projects')} userId={userId} />,
    },
    {
      id: 'language',
      modal: <LanguageModal isOpen={modalStates['language']} onClose={() => modal('language')} userId={userId} />,
    },
    {
      id: 'interests',
      modal: <InterestModal isOpen={modalStates['interests']} onClose={() => modal('interests')} userId={userId} />,
    },
    {
      id: 'skills',
      modal: <SkillModal isOpen={modalStates['skills']} onClose={() => modal('skills')} userId={userId} />,
    },
    {
      id: 'reference',
      modal: (
        <PortfolioReference
          isOpen={modalStates['reference']}
          onClose={() => onCloseModal('reference')}
          userId={userId}
        />
      ),
    },
    {
      id: 'certificate',
      modal: (
        <Certifications
          isOpen={modalStates['certificate']}
          onClose={() => onCloseModal('certificate')}
          userId={userId}
        />
      ),
    },
    {
      id: 'contact',
      modal: <ContactModal isOpen={modalStates['contact']} onClose={() => onCloseModal('contact')} userId={userId} />,
    },
    {
      id: 'about',
      modal: <PortfolioAbout isOpen={modalStates['about']} onClose={() => onCloseModal('about')} userId={userId} />,
    },
    {
      id: 'awards',
      modal: <Awards isOpen={modalStates['awards']} onClose={() => onCloseModal('awards')} userId={userId} />,
    },
  ];

  const contextValue = {
    isOpen,
    modalStates,
    hasData,
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
    setHasData,
    onCloseModal,
    editSection,
    setSections,
    profileUpdate,
    buildPortfolio,
    viewPortfolio,
    modal,
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
    hasPortfolio,
    setHasPortfolio,
    openShop,
    setOpenShop,
  };

  return <Portfolio.Provider value={contextValue}>{props.children}</Portfolio.Provider>;
}

export default Portfolio;
