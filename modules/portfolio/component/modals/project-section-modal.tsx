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
  id: number | null;
  url: string;
  projectsImages: any[];
};

type ProjectModalProps = {
  onCloseModal: () => void;
  onSaveModal: () => void;
  isOpen: boolean;
  userId?: string | undefined;
};

const ProjectSectionModal = ({ isOpen, onCloseModal, onSaveModal, userId }: ProjectModalProps) => {
  const allRoutes = ['add-project', 'view-projects'];
  const [dataToEdit, setDataToEdit] = useState<Data | null>(null);
  const [route, setRoute] = useState<allRouteOptions>('add-project');
  const [loading, setLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<any[]>([]);

  const handleEditData = (data: Data) => {
    setDataToEdit(data);
  };

  const handleSetRoute = (data: allRouteOptions) => {
    setRoute(data);
  };

  const handleSetProjects = (data: any[]) => {
    setProjects(data);
  };

  const handleLoading = (data: boolean) => {
    setLoading(data);
  };

  const endpoint = 'https://hng6-r5y3.onrender.com';
  const getAllProjects = () => {
    setLoading(true);
    axios
      .get(`${endpoint}/api/v1/users/${userId}/projects`)
      .then((res) => {
        setLoading(false);
        setProjects(res.data.data);

        if (res?.data?.data.length > 0) {
          setRoute('view-projects');
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (projects.length < 0) {
      setRoute('add-project');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal size="xxl" closeOnOverlayClick isOpen={isOpen} closeModal={onCloseModal} isCloseIconPresent={false}>
      {loading ? (
        <>
          <Loader />
          <p className="text-center text-green-400 my-3 font-semibold text-lg animate-pulse">Please wait</p>
        </>
      ) : (
        <>
          {route === allRoutes[0] && (
            <ProjectSection
              handleSetRoute={handleSetRoute}
              dataToEdit={dataToEdit}
              onSaveModal={onSaveModal}
              onCloseModal={onCloseModal}
              userId={userId}
              projects={projects}
            />
          )}
          {route === allRoutes[1] && (
            <AllProjectsModal
              handleSetProjects={handleSetProjects}
              handleSetRoute={handleSetRoute}
              handleLoading={handleLoading}
              projects={projects}
              onEdit={handleEditData}
              onCloseModal={onCloseModal}
              userId={userId}
            />
          )}
        </>
      )}
    </Modal>
  );
};

export default ProjectSectionModal;
