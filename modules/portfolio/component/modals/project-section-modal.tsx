import Modal from '@ui/Modal';
import { useState } from 'react';
import ProjectSection from './projects';
import AllProjectsModal from '../all-projects-modal';

type allRouteOptions = 'add-project' | 'view-projects';

const ProjectSectionModal = ({
  isOpen,
  onCloseModal,
  onSaveModal,
  userId,
}: {
  isOpen: boolean;
  onCloseModal: () => void;
  onSaveModal: () => void;
  userId?: string;
}) => {
  const allRoutes = ['add-project', 'view-projects'];
  const [route, setRoute] = useState<allRouteOptions>('add-project');
  return (
    <Modal size="xxl" closeOnOverlayClick isOpen={isOpen} closeModal={onCloseModal} isCloseIconPresent={false}>
      {route === allRoutes[0] && (
        <ProjectSection onSaveModal={onSaveModal} onCloseModal={onCloseModal} userId={userId ? userId : ''} />
      )}
      {/* { route === allRoutes[1] && <AllProjectsModal /> } */}
    </Modal>
  );
};

export default ProjectSectionModal;
