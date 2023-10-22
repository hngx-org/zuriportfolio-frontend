import Button from '@ui/Button';
import Modal from '@ui/Modal';
import { useState, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../../../../context/AuthContext';
import { notify } from '@ui/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function DeleteAccount() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { auth } = useAuth();
  const router = useRouter();
  const handleToggleModal = () => {
    setOpenModal((prev: boolean) => !prev);
  };
  const userId: string | undefined = auth?.user.id;
  const deleteAccountMutation = useMutation(
    () => axios.delete(`https://hng6-r5y3.onrender.com/api/delete-user-account/${userId}`),
    {
      onSuccess: () => {
        // If the delete operation is successful, you can perform any necessary actions here.
        console.log('Account Delete Successful!');
        notify({
          message: 'Account Delete Successful!',
          type: 'success',
        });
        localStorage.removeItem('zpt');
        setOpenModal((prev: boolean) => !prev);
        router.push('/');
      },
      onError: (error: any) => {
        // Handle errors
        console.log(error);
        notify({
          message: `Error: ${error?.response?.data?.message || error?.message}`,
          type: 'error',
        });
      },
    },
  );
  const handleDeleteAccount = () => {
    deleteAccountMutation.mutate();
  };

  const modalTitle = (
    <p className=" font-manropeEL text-[0.75rem] sm:text-[0.875rem] lg:text-[1rem] leading-[1rem] lg:leading-[1.5rem] text-[#444846] mb-[16px]">
      <span className="text-[#E53535] font-manropeB">Warning: </span>
      <span>Deleting your account is irreversible</span>
    </p>
  );
  return (
    <div className="w-full sm:w-[465px] mt-[2rem] sm:mt-0">
      <div className="flex flex-col gap-y-[1rem]">
        <h3 className="font-manropeL text-[1rem] sm:text-[22px] text-[#2E3130] leading-[1.75rem]  ">Delete Account</h3>
        <p className="text-[#737876] font-manropeL text-[0.875rem] leading-[1.25rem] ">
          Would you like to delete your portfolio account:{' '}
          <span className="text-[#009254] text-[0.875rem] sm:text-[1rem]  font-manropeEL leading-[1.5rem]">
            @{auth?.user.firstName}
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
        <div className="w-full px-[8px] flex flex-col">
          {modalTitle}
          <p className="sm:pr-5 font-manropeEL text-[0.75rem] sm:text-[0.875rem] lg:text-[1rem] leading-[1rem] lg:leading-[1.5rem] text-[#8D9290]">
            Are you sure you want to delete your account? This action will permanently remove your profile, projects,
            and all associated data from the platform.
          </p>
          <div className="flex flex-row justify-end mt-[30px] sm:mt-[38px] gap-x-[16px]">
            <Button
              onClick={handleToggleModal}
              size="sm"
              intent="secondary"
              className="w-fit rounded-[0.5rem] py-[4px] px-[14px] sm:py-[4px] text-[12px] sm:text-[14px] lg:text-[16px] font-manropeB border-[1px]"
            >
              Cancel
            </Button>
            <Button
              disabled={deleteAccountMutation.isLoading}
              isLoading={deleteAccountMutation.isLoading}
              onClick={handleDeleteAccount}
              size="sm"
              intent="error"
              className="w-fit rounded-[0.5rem] py-[4px] px-[14px] sm:py-[4px] text-[12px] sm:text-[14px] lg:text-[16px] font-manropeB bg-[#FF2E2E]"
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
