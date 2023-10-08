import Button from '@ui/Button';
import Modal from '@ui/Modal';
import useDisclosure from '../../../hooks/useDisclosure';
import { SectionModalProps } from '../../../@types';

//A section modal component for both the unsave changes and section delete
function SectionModal({ openButtonText, heading, paragraph, primaryText, onClickAction }: SectionModalProps) {
  //Destructure the useDisclosure hook
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();

  return (
    <>
      {/*Creating a button here because of the click event needed to open the Modal*/}
      <Button intent={'primary'} size={'md'} isLoading={false} spinnerColor="#000" onClick={onOpen} className="m-5">
        {openButtonText}
      </Button>

      <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={true} size="sm">
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
export function SectionDeleteModal() {
  return (
    <>
      <SectionModal
        openButtonText={'Delete Section Modal'}
        heading={'Delete entire section?'}
        paragraph={'Oh my! you’re about to delete an entire section, delete anyway?'}
        primaryText={'Delete'}
        onClickAction={() => {}}
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
