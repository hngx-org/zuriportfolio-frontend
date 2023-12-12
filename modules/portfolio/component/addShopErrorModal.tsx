import Button from '@ui/Button';
import Modal from '@ui/Modal';
import useDisclosure from '../../../hooks/useDisclosure';
import { CloseSquare } from 'iconsax-react';
import { useContext, useState, useRef } from 'react';
import Portfolio from '../../../context/PortfolioLandingContext';
import { useRouter } from 'next/navigation';
import { Input } from '@ui/Input';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SHOP_API_URL } from '../../../http/checkout';

function AddShopErrorModal({ isOpen, onCloseModal, onSaveModal }: any) {
  // const { isOpen, onClose, onOpen, onToggle } = useDisclosure();

  const { openShop, setOpenShop } = useContext(Portfolio);

  const onClose = () => setOpenShop(false);

  const router = useRouter();

  return (
    <>
      <Modal
        closeOnOverlayClick
        isOpen={isOpen}
        closeModal={() => {
          onCloseModal();
          onSaveModal();
        }}
        isCloseIconPresent={false}
        size="lg"
        title="Shop"
      >
        <CloseSquare
          size="32"
          color="#009254"
          variant="Bold"
          onClick={() => {
            onCloseModal();
            onSaveModal();
          }}
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

export function AddShopModal({ isOpen, onCloseModal, onSaveModal }: any) {
  //set states
  const [shopName, setShopName] = useState<string>('');
  const [shopId, setShopId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // function for popup
  const toastId = useRef<any>(null);

  //function for creating a user's shop
  async function handleSubmit() {
    // created popup
    const notify = () => (toastId.current = toast.success('Shop created successfully'));

    //make loader visible
    setLoading(true);
    const url = `${SHOP_API_URL}/shop`;

    //get bearer token
    const BearerToken = localStorage.getItem('zpt');

    //set configuration for axios
    const config = {
      headers: { Authorization: `Bearer ${BearerToken}` },
    };

    //set the name
    const name = { name: shopName };

    try {
      //Query the backend for creating of shp
      const result = await axios.post(url, name, config);

      //Show popup when shop is created successfully
      notify();

      console.log({
        result: result.data.data.id,
        BearerToken: BearerToken,
      });

      //close the Modal and refresh
      onCloseModal();
      onSaveModal();
      //if failed logged out error
    } catch (error: any) {
      const result = error.response.data;
      console.log({
        result: result,
        BearerToken: BearerToken,
      });
    }

    //reset the shop name
    //set name field back to default
    setShopName('');
    //remove loader
    setLoading(false);
  }

  return (
    <>
      <Modal
        closeOnOverlayClick
        isOpen={isOpen}
        closeModal={() => {
          onCloseModal();
          onSaveModal();
        }}
        isCloseIconPresent={false}
        size="lg"
        title="Create shop"
      >
        <CloseSquare
          size="32"
          color="#009254"
          variant="Bold"
          onClick={() => {
            onCloseModal();
            onSaveModal();
          }}
          className="absolute top-3 right-4 cursor-pointer "
        />

        <hr className="mt-2 bg-green-600 border-t-2 border-green-600 px-4" />

        <form onSubmit={handleSubmit} className="flex flex-col mt-5 gap-y-5 px-4">
          <Input
            placeHolder="Enter shop name"
            onChange={(e) => {
              setShopName(e.target.value);
            }}
            className="border-[#E1E3E2] text-sm font-semibold text-gray-900 border w-[100%] font-manropeL rounded-md"
            inputSize={'sm'}
            value={shopName}
          />

          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Button
              type="button"
              onClick={onCloseModal}
              intent={'secondary'}
              className="border w-full rounded-md sm:w-[4.5rem] sm:h-[2.5rem]"
              size={'sm'}
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              type="submit"
              className={`${loading ? 'opacity-50' : 'opacity-100'} w-full rounded-md sm:w-[4.5rem] sm:h-[2.5rem]`}
              size={'sm'}
              isLoading={loading}
              spinnerColor="#000"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
