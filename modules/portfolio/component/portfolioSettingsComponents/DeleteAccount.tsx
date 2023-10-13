import Button from '@ui/Button';
import Modal from '@ui/Modal';
import { useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';

function DeleteAccount() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isPending, setIspending] = useState<boolean>(false);
  const handleToggleModal = () => {
    setOpenModal((prev: boolean) => !prev);
  };
  const modalTitle = (
    <p className=" font-manropeEL text-[0.75rem] sm:text-[0.875rem] lg:text-[1rem] leading-[1rem] lg:leading-[1.5rem] text-[#444846] mb-[16px]">
      <span className="text-[#E53535] font-manropeB">Warning: </span>
      <span>Deleting your account is irreversible</span>
    </p>
  );
  const notifySuccess = (toastContent: string) => toast.success(toastContent, { closeOnClick: true, autoClose: 3000 });

  const notifyError = (toastContent: string) => toast.error(toastContent);
  const userId: string = '9d0cabc0-500a-44eb-8564-301e8e90ce20';

  const handleDeleteAccount = useCallback(() => {
    setIspending(true);
    console.log('hello');
    axios
      .delete(`https://hng6-r5y3.onrender.com/api/delete-user-account/${userId}`)
      .then((response) => {
        if (response.status === 200) {
          notifySuccess('Account Delete Successful!');
          setIspending(false);
          redirect('/');
        }
      })
      .catch((error) => {
        setIspending(false);
        console.log(error);
        if (error) {
          notifyError(`Error: ${error.response.data.message}`);
        }
      })
      .finally(() => console.log(''));
  }, []);
  return (
    <div className="w-full sm:w-[465px] mt-[2rem] sm:mt-0">
      <div className="flex flex-col gap-y-[1rem]">
        <h3 className=" font-manropeB text-[1rem] sm:text-[1.375rem] text-[#2E3130] leading-[1.75rem]">
          Delete Account
        </h3>
        <p className="text-[#737876] font-manropeL text-[0.875rem] leading-[1.25rem] ">
          Would you like to delete your portfolio account:{' '}
          <span className="text-[#009254] text-[0.875rem] sm:text-[1rem]  font-manropeEL leading-[1.5rem]">
            @pleroma
          </span>
          ?
        </p>
        <p className="text-[#737876] font-manropeL text-[0.875rem] sm:text-[1rem] leading-[1.25rem] sm:leading-[1.5rem]">
          Deleting your account will remove all of your content and data associated with it.
        </p>
        <p
          onClick={handleToggleModal}
          className=" hover:cursor-pointer text-[#FF2E2E] text-[0.875rem] sm:text-[1rem] leading-[1.25rem] sm:leading-[1.5rem] font-manropeB sm:font-manropeEB"
        >
          I want to delete my account
        </p>
      </div>
      <Modal size="sm" isOpen={openModal} isCloseIconPresent={false} closeModal={handleToggleModal} closeOnOverlayClick>
        <div className="w-full px-[24px lg:px-[32px] flex flex-col">
          {modalTitle}
          <p className=" font-manropeEL text-[0.75rem] sm:text-[0.875rem] lg:text-[1rem] leading-[1rem] lg:leading-[1.5rem] text-[#8D9290]">
            Are you sure you want to delete your account? This action will permanently remove your profile, projects,
            and all associated data from the platform.
          </p>
          <div className="flex flex-row justify-end mt-[45px] gap-x-[16px]">
            <Button
              onClick={handleToggleModal}
              size="sm"
              intent="secondary"
              className="w-fit rounded-[0.5rem] py-[0.5rem] px-[1rem] sm:text-[0.875rem] lg:text-[1rem] font-manropeB border-[1px]"
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              onClick={handleDeleteAccount}
              size="sm"
              intent="error"
              className="w-fit rounded-[0.5rem] py-[0.5rem] px-[1rem] sm:text-[0.875rem] lg:text-[1rem] font-manropeB bg-[#FF2E2E]"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DeleteAccount;
