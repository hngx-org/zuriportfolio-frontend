import Modal from '@ui/Modal';
import { useEffect, useState } from 'react';
import ProjectSection from './projects';
import axios from 'axios';
import Loader from '@ui/Loader';
import AllProjectsModal from './all-projects-modal';
import SingleProject from './single-project';

export type allRouteOptions = 'add-project' | 'view-projects' | 'single-project';

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
  const allRoutes = ['add-project', 'view-projects', 'single-project'];
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

  useEffect(() => {
    console.log(route, 'routee');
  }, [route]);

  return (
    <>
      {loading ? (
        <Modal size={'xxl'} closeOnOverlayClick isOpen={isOpen} closeModal={onCloseModal} isCloseIconPresent={false}>
          <div className="py-52">
            <Loader />
            <p className="text-center text-green-400 my-3 font-semibold text-lg animate-pulse"></p>
          </div>
        </Modal>
      ) : (
        <>
          {route === allRoutes[0] && (
            <Modal
              size={'xxl'}
              closeOnOverlayClick
              isOpen={isOpen}
              closeModal={onCloseModal}
              isCloseIconPresent={false}
            >
              <ProjectSection
                handleSetRoute={handleSetRoute}
                dataToEdit={dataToEdit}
                onSaveModal={onSaveModal}
                onCloseModal={onCloseModal}
                userId={userId}
                projects={projects}
              />
            </Modal>
          )}

          {route === allRoutes[1] && (
            <Modal
              size={'xxl'}
              closeOnOverlayClick
              isOpen={isOpen}
              closeModal={onCloseModal}
              isCloseIconPresent={false}
            >
              <AllProjectsModal
                handleSetProjects={handleSetProjects}
                handleSetRoute={handleSetRoute}
                handleLoading={handleLoading}
                projects={projects}
                onEdit={handleEditData}
                onCloseModal={onCloseModal}
                userId={userId}
              />
            </Modal>
          )}
          {route === allRoutes[2] && (
            <Modal size={'lg'} closeOnOverlayClick isOpen={isOpen} closeModal={onCloseModal} isCloseIconPresent={false}>
              <SingleProject dataToEdit={dataToEdit} handleSetRoute={handleSetRoute} />
            </Modal>
          )}
        </>
      )}
    </>
  );
};

export default ProjectSectionModal;
