import { Input } from '@ui/Input';
import Modal from '@ui/Modal';
import Image from 'next/image';
import flutterwave from '../../public/assets/futterwave.png';
import paystack from '../../public/assets/paystack.png';
import cancel from '../../public/assets/images/logo/otp-modal-cancel.svg';
import Button from '@ui/Button';
import { createTempUser, makePayment } from '../../http/checkout';
import { useAuth } from '../../context/AuthContext';

interface TempUser {
  isOpen: boolean;
  onClose: () => void;
}


const TempUser = ({ isOpen, onClose }: TempUser) => {
  const {auth} = useAuth();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const userForm = new FormData(event.currentTarget);
    const data = {
      email: userForm.get('email') as string,
      firstName: userForm.get('first_name') as string,
      lastName: userForm.get('last_name') as string,
    }
    const payment= userForm.get('paymentMethod') as string;
    const tempUser = await createTempUser(data)
    
    
    if (tempUser.data.token) {
      const response = await makePayment(payment,tempUser.data.token);
      window.location.href = response.transaction_url;
    }
      
    
  };

  return (
    <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="sm">
      <div className="flex items-end justify-end">
        <Image className="cursor-pointer" src={cancel} alt="cancel modal" onClick={onClose} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-[5px] p-[20px] animate-slideIn"
      >
        <div className="flex w-full flex-col items-start gap-[6px]">
          <label className="text-[16px] font-manropeL not-italic font-semibold leading-[24px] tracking-[0.024px]">
            Firstname
          </label>
          <input
            className="flex items-center justify-between w-full border border-[#E1E3E2] rounded-lg p-4 mb-4 focus:outline-none focus:border-brand-green-primary"
            placeholder="Mark"
            type="text"
            name='first_name'
            required
          />
        </div>
        <div className="flex w-full flex-col items-start gap-[6px]">
          <label className="text-[16px] font-manropeL not-italic font-semibold leading-[24px] tracking-[0.024px]">
            Lastname
          </label>
          <input
            className="flex items-center justify-between w-full border border-[#E1E3E2] rounded-lg p-4 mb-4 focus:outline-none focus:border-brand-green-primary"
            placeholder="Essein"
            type="text"
            name='last_name'
            required
          />
        </div>
        <div className="flex w-full flex-col items-start gap-[6px]">
          <label className="text-[16px] font-manropeL not-italic font-semibold leading-[24px] tracking-[0.024px]">
            Email
          </label>
          <input
            className="flex items-center justify-between w-full border border-[#E1E3E2] rounded-lg p-4 mb-4 focus:outline-none focus:border-brand-green-primary"
            placeholder="example@email.com"
            type="email"
            name='email'
            required
          />
        </div>
        <div className="flex items-center justify-between w-full border border-[#E1E3E2] rounded-lg p-4 mb-4">
          <label className="inline-flex items-center flex-grow">
            <input
              type="radio"
              className="form-radio h-4 w-4 text-indigo-600 "
              required
              name="paymentMethod"
              value="paystack"
            />
            <span className="ml-2">Pay with Paystack </span>
          </label>
          <Image src={paystack} alt="paystack" width={64} height={64} />
        </div>
        <div className="flex items-center justify-between w-full border rounded-lg p-4 mb-4 border-[#E1E3E2]">
          <label className="inline-flex items-center flex-grow">
            <input
              type="radio"
              className="form-radio h-4 w-4 text-indigo-600 "
              required
              name="paymentMethod"
              value="flutterwave"
            />
            <span className="ml-2">Pay with Flutterwave</span>
          </label>
          <Image src={flutterwave} alt="mastercard" width={76} height={76} />
        </div>
        <div className="flex w-[360px]">
          <Button
            type="submit"
            className="flex w-full px-[24px] py-[16px] flex-col justify-center items-center gap-[10px] rounded-[10px] bg-[#006F37]"
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TempUser;
