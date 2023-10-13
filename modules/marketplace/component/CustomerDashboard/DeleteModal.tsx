import Button from '@ui/Button';
import Modal from '@ui/Modal';
import { Trash } from 'iconsax-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleDelete: (orderId: string) => void;
  checkedItems: any;
}

const DeleteModal: React.FC<Props> = ({ isOpen, onClose, handleDelete, checkedItems }) => {
  return (
    <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="sm" title="">
      <div className="cus-2-content p-[2rem]">
        <div className="icon flex justify-center mb-[2rem]">
          <div className="l1 p-[1.3rem] bg-brand-red-hover/20 rounded-full">
            <div className="l2 bg-red-305 rounded-full p-[1.3rem]">
              <Trash size={30} color="#ffff" />
            </div>
          </div>
        </div>
        <div className="cus-2-title text-center">
          <h3 className="font-bold text-[1.5rem]">Delete Order History</h3>
        </div>
        <div className="cus-2-para text-center my-[2rem]">
          <p className="text-[1.2rem] font-[200]">
            Are you sure you want to delete this history? Don’t worry, we have sent a copy for you to your mail just
            incase.
          </p>
        </div>
        <div className="cta flex justify-center gap-[2rem]">
          <Button intent={'secondary'} size={'md'} onClick={onClose}>
            No, Back
          </Button>
          <Button size={'lg'} onClick={() => handleDelete(checkedItems)}>
            Yes, Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;