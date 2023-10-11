import { createContext, useState, useEffect } from 'react';
import WorkExperienceSection from '@modules/portfolio/component/work-experience-modal';
import { editModals } from '@modules/portfolio/component/landing/data';
import useDisclosure from '../hooks/useDisclosure';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import EducationSection from '@modules/portfolio/component/education-modal';

type PortfolioContext = {
  hasData: boolean;
  sections: Array<any>;
  modalStates: { [key: string]: boolean };
  modals: any[];
  isOpen: boolean;
  coverImage: string | StaticImport;
  avatarImage: string | StaticImport;
  showProfileUpdate: boolean;
  showBuildPortfolio: boolean;
  showViewtemplates: boolean;
  selectedSections: Array<any>;
  onOpen: () => void;
  onClose: () => void;
  onCloseModal: (modalToClose: string) => void;
  addSection: (clickedButtonTitle: string) => void;
  editSection: (modalToOpen: string) => void;
  setHasData: React.Dispatch<React.SetStateAction<boolean>>;
  setModalStates: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  deleteSection: (titleToDelete: string) => void;
  setSections: React.Dispatch<React.SetStateAction<any[]>>;
  profileUpdate: () => void;
  buildPortfolio: () => void;
  viewPortfolio: () => void;
  modal: () => void;
  setCoverImage: React.Dispatch<React.SetStateAction<File | undefined>>;
  setAvatarImage: React.Dispatch<React.SetStateAction<File | undefined>>;
  handleUploadCover: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Portfolio = createContext<PortfolioContext>({
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
  addSection: () => {},
  deleteSection: () => {},
  editSection: () => {},
  setSections: () => {},
  profileUpdate: () => {},
  buildPortfolio: () => {},
  viewPortfolio: () => {},
  modal: () => {},
  setCoverImage: () => {},
  setAvatarImage: () => {},
  handleUploadCover: () => {},
});

export function PortfolioCtxProvider(props: { children: any }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasData, setHasData] = useState<boolean>(false);
  const [modalStates, setModalStates] = useState<{ [key: string]: boolean }>({});
  const [sections, setSections] = useState<Array<any>>([]);
  const [selectedSections, setSelectedSections] = useState<Array<any>>([]);

  useEffect(() => {
    sections.length === 0 ? setHasData(false) : setHasData(true);
  }, [sections.length]);

  //landing page
  const [coverImage, setCoverImage] = useState<File | any>();
  const [avatarImage, setAvatarImage] = useState<File | any>();
  const [showProfileUpdate, setShowProfileUpdate] = useState<boolean>(false);
  const [showBuildPortfolio, setShowBuildPortfolio] = useState<boolean>(false);
  const [showViewtemplates, setShowViewtemplates] = useState<boolean>(false);

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

  const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const image = URL.createObjectURL(file);
      if (e.target.id === 'coverUpload') {
        setCoverImage(image);
        setHasData(true);
      }
    }
  };

  //Sections modals
  const addSection = (clickedButtonTitle: string) => {
    const matchingPlaceHolder = editModals.find((placeHolder) => {
      return placeHolder.title === clickedButtonTitle;
    });

    if (matchingPlaceHolder) {
      if (!sections.some((section) => section.title === clickedButtonTitle)) {
        setSections([...sections, matchingPlaceHolder]);
      }
    }

    setSelectedSections([...selectedSections, matchingPlaceHolder]);
    setHasData(true);
    onClose();
  };

  const deleteSection = (titleToDelete: string) => {
    const updatedSections = sections.filter((section) => section.id !== titleToDelete);
    setSections(updatedSections);
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
  ];

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
    deleteSection,
    editSection,
    setSections,
    addSection,
    profileUpdate,
    buildPortfolio,
    viewPortfolio,
    modal,
    setCoverImage,
    setAvatarImage,
    handleUploadCover,
  };

  return <Portfolio.Provider value={contextValue}>{props.children}</Portfolio.Provider>;
}

export default Portfolio;
