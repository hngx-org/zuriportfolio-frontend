import Modal from '@ui/Modal';
import { useState } from 'react';
import ProjectSection from './projects';
import AllProjectsModal from '../all-projects-modal';

type allRouteOptions = 'add-project' | 'view-projects';

const ProjectSectionModal = ({
  isOpen,
  onClose,
  userId,
}: {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
}) => {
  const allRoutes = ['add-project', 'view-projects'];
  const [route, setRoute] = useState<allRouteOptions>('add-project');
  return (
    <Modal isOpen={isOpen} closeModal={close} isCloseIconPresent={false} size="xxl">
      {route === allRoutes[0] && <ProjectSection onClose={onClose} userId={userId ? userId : ''} />}
      {/* { route === allRoutes[1] && <AllProjectsModal /> } */}
    </Modal>
  );
};

export default ProjectSectionModal;
