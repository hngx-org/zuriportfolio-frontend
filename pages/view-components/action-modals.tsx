import { SectionDeleteModal, ExitWithUnsavedChanges } from '../../modules/portfolio/component/warningModals';
import AddShopErrorModal from '../../modules/portfolio/component/addShopErrorModal';

//Display all modals
function ActionModals() {
  return (
    <>
      <SectionDeleteModal />
      <ExitWithUnsavedChanges />
      <AddShopErrorModal />
    </>
  );
}

export default ActionModals;
