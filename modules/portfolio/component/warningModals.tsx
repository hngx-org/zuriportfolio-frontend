import Button from '@ui/Button';
import Modal from '@ui/Modal';
import { SectionModalProps } from '../../../@types';
import { CloseSquare } from 'iconsax-react';
import { useContext } from 'react';
import Portfolio from '../../../context/PortfolioLandingContext';
import { set } from 'nprogress';

//A section modal component for both the unsave changes and section delete
function SectionModal({
  openButtonText,
  heading,
  paragraph,
  primaryText,
  onClickAction,
  sectionToDelete,
}: SectionModalProps) {
  //Destructure the useDisclosure hook
  const { openDelete, setOpenDelete } = useContext(Portfolio);
  const onClose = () => setOpenDelete(false);

  return (
    <>
      {/*Creating a button here because of the click event needed to open the Modal*/}

      <Modal closeOnOverlayClick isOpen={openDelete} closeModal={onClose} isCloseIconPresent={false} size="sm">
        <CloseSquare
          size="32"
          color="#009254"
          variant="Bold"
          onClick={onClose}
          className="absolute top-6 right-6 cursor-pointer"
        />

        <div className="box-border h-full w-full my-14 text-center font-normal flex justify-center items-center flex-col gap-6 py-8 px-1">
          <h1 className="text-red-200 text-xl font-manropeL">{heading}</h1>

          <p className="text-sm sm:w-3/5 text-gray-400 font-manropeE">{paragraph}</p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 sm:px-5 w-9/12 sm:w-full">
            <Button
              intent={'secondary'}
              size={'md'}
              isLoading={false}
              spinnerColor="#000"
              onClick={onClose}
              className="w-full border rounded-xl"
            >
              Cancel
            </Button>

            <Button
              intent={'primary'}
              size={'md'}
              isLoading={false}
              spinnerColor="#000"
              onClick={onClickAction}
              className="w-full rounded-xl"
            >
              {primaryText}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

//A Modal function for the deleting of a section
export function SectionDeleteModal({ sectionToDelete }: SectionModalProps) {
  const { toggleSection, setOpenDelete } = useContext(Portfolio);
  const deleteFromBe = sectionToDelete?.split(' ')[0] === 'be';
  const deleteLocal = sectionToDelete?.split(' ')[0] === 'local';

  const deleteSection = () => {
    if (deleteFromBe) {
    } else if (deleteLocal) {
      const parts = sectionToDelete.split(' ');
      const section = parts.slice(1).join(' ');
      toggleSection(section);
      setOpenDelete(false);
    }
  };
  return (
    <>
      <SectionModal
        openButtonText={'Delete Section Modal'}
        heading={'Delete entire section?'}
        paragraph={'Oh my! you’re about to delete an entire section, delete anyway?'}
        primaryText={'Delete'}
        onClickAction={deleteSection}
        sectionToDelete={sectionToDelete}
      />
    </>
  );
}

//A Modal function for exiting without saving changes
export function ExitWithUnsavedChanges() {
  return (
    <>
      <SectionModal
        openButtonText={'Exit Modal'}
        heading={'Unsave changes'}
        paragraph={'You have unsaved changes, exit anyway?'}
        primaryText={'Exit'}
        onClickAction={() => {}}
      />
    </>
  );
}
