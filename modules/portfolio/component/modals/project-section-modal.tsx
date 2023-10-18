import Modal from '@ui/Modal';
import { useEffect, useState } from 'react';
import ProjectSection from './projects';
import AllProjectsModal from '../all-projects-modal';
import axios from 'axios';
import Loader from '@ui/Loader';

export type allRouteOptions = 'add-project' | 'view-projects';

export type Data = {
  title: string;
  year: string;
  link: string;
  thumbnail: string;
  tags: string;
  description: string;
  media: any[];
  id: number;
  url: string;
  projectsImages: any[];
};

type ProjectModalProps = {
  onCloseModal: () => void;
  onSaveModal: () => void;
  isOpen: boolean;
  userId?: string;
};

const ProjectSectionModal = ({ isOpen, onCloseModal, onSaveModal, userId }: ProjectModalProps) => {
  const allRoutes = ['add-project', 'view-projects'];
  const [dataToEdit, setDataToEdit] = useState<Data | null>(null);
  const [route, setRoute] = useState<allRouteOptions>('add-project');
  const [loading, setLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState([]);

  const handleEditData = (data: Data) => {
    setDataToEdit(data);
  };

  const handleSetRoute = (data: allRouteOptions) => {
    setRoute(data);
  };

  const endpoint = 'https://hng6-r5y3.onrender.com';
  const getAllProjects = () => {
    setLoading(true);
    axios
      .get(`${endpoint}/api/users/${userId}/projects`)
      .then((res) => {
        setLoading(false);
        setProjects(res.data.data);
        if (res?.data?.data.length > 0) {
          setRoute('view-projects');
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getAllProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal size="xxl" closeOnOverlayClick isOpen={isOpen} closeModal={onCloseModal} isCloseIconPresent={false}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {route === allRoutes[0] && (
            <ProjectSection
              dataToEdit={dataToEdit}
              onSaveModal={onSaveModal}
              onCloseModal={onCloseModal}
              userId={userId}
            />
          )}
          {route === allRoutes[1] && (
            <AllProjectsModal
              handleSetRoute={handleSetRoute}
              projects={projects}
              onEdit={handleEditData}
              onCloseModal={onCloseModal}
            />
          )}
        </>
      )}
    </Modal>
  );
};

export default ProjectSectionModal;
