import Button from '@ui/Button';
import Modal from '@ui/Modal';
import { SectionModalProps } from '../../../@types';
import { CloseSquare } from 'iconsax-react';
import { useContext, useRef, useState } from 'react';
import Portfolio from '../../../context/PortfolioLandingContext';
import { redirect } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useRouter } from 'next/navigation';
import router from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

//A section modal component for both the unsave changes and section delete
function SectionModal({
  openButtonText,
  heading,
  paragraph,
  primaryText,
  onClickAction,
  sectionToDelete,
  loading,
}: SectionModalProps) {
  //Destructure the useDisclosure hook
  const { openDelete, setOpenDelete } = useContext(Portfolio);
  const onClose = () => setOpenDelete(false);

  return (
    <>
      <Modal closeOnOverlayClick isOpen={openDelete} closeModal={onClose} isCloseIconPresent={false} size="sm">
        <CloseSquare
          size="32"
          color="#009254"
          variant="Bold"
          onClick={onClose}
          className="absolute top-6 right-6 cursor-pointer"
        />

        <div className="box-border h-full w-full my-10 mb-2 text-center font-normal flex justify-center items-center flex-col gap-6 py-4 px-1">
          <h1 className="text-[#FF5C5C] text-xl font-manropeEB">{heading}</h1>

          <p className="text-sm sm:w-3/5 text-[#737876] font-manropeE">{paragraph}</p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 sm:px-3 w-9/12 sm:w-full">
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
              disabled={loading}
              isLoading={loading}
              spinnerColor="#000"
              onClick={onClickAction}
              className={`${loading ? 'opacity-50' : 'opacity-100'} w-full rounded-xl`}
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
  const queryClient = useQueryClient();

  const { setOpenDelete, idToDelete, onSaveModal } = useContext(Portfolio);
  const [loading, setLoading] = useState<boolean>(false);

  //userID
  const { userId } = useContext(Portfolio);

  // function for popup
  const toastId = useRef<any>(null);

  //function to delete sections
  const deleteSection = async () => {
    //make loader visible
    setLoading(true);

    //Query the backend
    let myHeaders: any;
    myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let raw: any;
    raw = JSON.stringify({
      section: idToDelete,
    });

    let requestOptions: any;
    requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    // delete popup
    const notify = () => (toastId.current = toast.success('Section deleted successfully'));

    //fetch the endpoint for deleting
    await fetch(`https://hng6-r5y3.onrender.com/api/v1/profile/details/${userId}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        //Show popup when section is deleted successfully
        notify();
        //take off the modal
        setOpenDelete(false);
        //Update the main page
        onSaveModal(idToDelete);
        queryClient.invalidateQueries({ queryKey: ['sections'] });
      })
      .catch((error) => console.log({ error: error }));

    //remove loader
    setLoading(false);
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
        loading={loading}
      />

      <ToastContainer />
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
