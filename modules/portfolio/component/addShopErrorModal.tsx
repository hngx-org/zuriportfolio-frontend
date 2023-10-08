import Button from '@ui/Button';
import Modal from '@ui/Modal';
import useDisclosure from '../../../hooks/useDisclosure';

function AddShopErrorModal() {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();

  return (
    <>
      <Button intent={'primary'} size={'md'} isLoading={false} spinnerColor="#000" onClick={onOpen} className="m-5">
        Add Shop
      </Button>

      <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={true} size="lg" title="Shop">
        <hr className="mt-5 bg-green-600 border-t-2 border-green-600" />
        <div className="box-border h-full w-full mb-5 text-center font-normal flex flex-col gap-7 pt-10">
          <h1 className="text-red-200 text-xl font-manropeL">uh oh!</h1>

          <p className="text-sm text-gray-400 block mx-auto font-manropeE">
            You’ll need to create a shop to add this section to your porfolio
          </p>

          <Button
            intent={'primary'}
            size={'sm'}
            isLoading={false}
            spinnerColor="#000"
            onClick={() => {}}
            className="w-full rounded-lg"
          >
            Create a Shop
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default AddShopErrorModal;
