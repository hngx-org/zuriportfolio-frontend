import Button from '@ui/Button';
import Modal from '@ui/Modal';
import useDisclosure from '../../../hooks/useDisclosure';
import { CloseSquare } from 'iconsax-react';
import { useContext } from 'react';
import Portfolio from '../../../context/PortfolioLandingContext';
import { useRouter } from 'next/navigation';

function AddShopErrorModal() {
  // const { isOpen, onClose, onOpen, onToggle } = useDisclosure();

  const { openShop, setOpenShop } = useContext(Portfolio);

  const onClose = () => setOpenShop(false);

  const router = useRouter();

  return (
    <>
      {/* <Button intent={'primary'} size={'md'} isLoading={false} spinnerColor="#000" onClick={onOpen} className="m-5">
        Add Shop
      </Button> */}

      <Modal
        closeOnOverlayClick
        isOpen={openShop}
        closeModal={onClose}
        isCloseIconPresent={false}
        size="lg"
        title="Shop"
      >
        <CloseSquare
          size="32"
          color="#009254"
          variant="Bold"
          onClick={onClose}
          className="absolute top-3 right-4 cursor-pointer"
        />

        <hr className="mt-2 bg-green-600 border-t-2 border-green-600" />
        <div className="box-border h-full w-full mb-5 text-center font-normal flex flex-col gap-7 pt-10">
          <h1 className="text-[#FF5C5C] text-xl font-manropeEB">uh oh!</h1>

          <p className="text-sm text-[#737876] block mx-auto font-manropeE">
            You cannot add your shop when there are no items in the shop
          </p>

          <Button
            intent={'primary'}
            size={'sm'}
            isLoading={false}
            spinnerColor="#000"
            onClick={() => router.push('/shops/id')}
            className="w-full rounded-lg"
          >
            Go to Shop
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default AddShopErrorModal;
