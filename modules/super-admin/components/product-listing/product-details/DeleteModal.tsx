import Button from '@ui/Button';
import Modal from '@ui/Modal';
import { CloseCircle } from 'iconsax-react';
import { useState } from 'react';

const DeleteModal = ({
  isOpen,
  closeModal,
  reasons,
  setReasons,
}: {
  isOpen: boolean;
  closeModal: () => void;
  reasons: Map<string, string>;
  setReasons: React.Dispatch<React.SetStateAction<Map<string, string>>>;
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const reasonsList = ['Policy violations', 'Offensive words', 'Just feel like it', 'Other'];
  const handleCheckboxChange = (reason: string) => {
    const newSelectedReasons = new Map(reasons);
    if (newSelectedReasons.has(reason)) {
      newSelectedReasons.delete(reason);
    } else {
      newSelectedReasons.set(reason, '');
    }
    setReasons(newSelectedReasons);
  };
  const reasonsKeysArray = Array.from(reasons.keys());
  return (
    <>
      <Modal isOpen={isOpen} closeModal={closeModal} closeOnOverlayClick isCloseIconPresent={false} size="xl">
        <div className="p-5 flex flex-col gap-8">
          <h2 className="font-manropeB text-[28px] lg:text-[36px]">Delete Product</h2>
          <p className="font-manrope leading-[28px] text-[22px]">
            <span className="font-bold">Webinar and Course Slide Templates (Soft Copy)</span> will be deleted as a
            vendor from Zuri Marketplace and all their products as well. They will get a notification email.
          </p>
          <div>
            <p className="text-[20px] lg:text-[22px] mb-4">Reason for deleting:</p>
            <ul className="flex flex-col gap-4 text-base">
              {reasonsList.map((reason) => (
                <li key={reason} className="flex items-center gap-4 py-4 border-b border-1 border-white-300">
                  <input
                    id={reason}
                    type="checkbox"
                    className="lg:w-[20px] lg:h-[20px]"
                    onChange={() => handleCheckboxChange(reason)}
                    checked={reasonsKeysArray.includes(reason)}
                  />
                  <label htmlFor={reason}>{reason}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end gap-9 mt-20">
            <Button
              intent={'secondary'}
              size={'lg'}
              spinnerColor="#000"
              className="w-[117px] rounded-[8px]"
              onClick={() => {
                closeModal();
                setReasons(new Map());
              }}
            >
              Cancel
            </Button>
            <Button
              intent={'primary'}
              size={'lg'}
              spinnerColor="#000"
              className="rounded-[8px] w-[117px]"
              disabled={Array.from(reasons.values()).filter((value) => value === '').length === 0}
              onClick={() => {
                closeModal();
                setOpenDeleteModal(true);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={openDeleteModal}
        closeModal={() => setOpenDeleteModal(false)}
        closeOnOverlayClick
        isCloseIconPresent={false}
        size="md"
      >
        <div className="flex justify-end mb-8">
          <CloseCircle
            size="32"
            color="#546069"
            className="cursor-pointer"
            onClick={() => {
              setOpenDeleteModal(false);
              setReasons(new Map());
            }}
          />
        </div>
        <div>
          <p className="text-center font-manropeB text-[24px] w-[331px] mx-auto leading-[32px]">
            Are you sure you want to delete this product?
          </p>
          <p className="mt-2 text-[16px] text-center">Product will be permanently deleted from list.</p>
          <div className="flex flex-col gap-3 mt-8">
            <Button intent={'error'} spinnerColor="#000" className="w-full rounded-[16px]" onClick={() => null}>
              Delete Product
            </Button>
            <Button
              intent={'secondary'}
              size={'lg'}
              spinnerColor="#000"
              className="w-full rounded-[16px]"
              onClick={() => {
                setOpenDeleteModal(false);
                setReasons(new Map());
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
