import React from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../../../context/AuthContext';
//import { useQuery, useMutation } from 'react-query';
import Image from 'next/image';
import defaultpic from '../../../../public/assets/inviteAssets/avatar.svg';
import $http from '../../../../http/axios';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import addPics from '../../../../public/assets/inviteAssets/add-circle.svg';
import { notify } from '@ui/Toast';
import { API_BASE_URL } from '../../../../http/checkout';

const UpdatingProfilePic = ({userId}:{userId: string}) => {
  const queryClient = useQueryClient();

  const [selectedPics, setSelectedPics] = React.useState<string | StaticImport>('');
  const [reload, setReload] = React.useState<boolean>(false);

  /**  LINES 21 - 35 WAS COPIED to TopBar.tsx Component, from LINE 53.
   * If anything changes in the below lines(21-35), make sure it is changed in TopBar.tsx
   */
  const baseUrl = `${API_BASE_URL}/portfolio/` as string;

  const {
    data: userData,
    isLoading: isUserDataLoading,
    isError: isUserDataError,
  } = useQuery(['userData', userId], async () => {
    const response = await $http.get(`${baseUrl}users/${userId}`);
    if (response.status === 200) {
      return response.data;
    }
  });

  const profilePicMutation = useMutation(async (coverImage: string | Blob) => {
    try {
      const formData = new FormData();
      formData.append('images', coverImage as string | Blob);
      formData.append('userId', userId);

      const response = await axios.post(`${baseUrl}profile/image/upload`, formData);

      if (response.status === 200) {
        return response.data;
      } else {
      }
    } catch (error) {
      notify({
        type: 'error',
        message: 'uploaded failed',
      });
      setTimeout(() => {
        toast.dismiss();
      }, 4000);
    }
  });

  if (profilePicMutation.isSuccess) {
    queryClient.invalidateQueries(['userData', userId]);
  }
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const image = URL.createObjectURL(file);
      setSelectedPics(image);
      if (e.target.id === 'avatarUpload') {
        setSelectedPics(image);
      }

      const promise = profilePicMutation.mutateAsync(file);
      toast
        .promise(promise, {
          pending: 'Uploading image...',
          success: 'Image uploaded successfully',
          error: 'An error occurred while uploading the image',
        })
        .then((res) => {
          if (res?.statues == 200) {
            notify({
              type: 'success',
              message: 'uploaded sucessfully',
            });
          }
          setTimeout(() => {
            toast.dismiss();
          }, 4000);
        });

      promise.catch((error) => {
        console.error('An error occurred while uploading the image:', error);
        notify({
          type: 'error',
          message: 'failed to upload',
        });
        setTimeout(() => {
          toast.dismiss();
        }, 4000);
      });
    }
  };

  return (
    <>
      <h3 className="font-manropeL text-[1rem] sm:text-[22px] text-[#2E3130] leading-[1.75rem]">Account Management</h3>
      <h4 className="text-[14px] md:text-[16px] font-manropeB mt-4 text-[#2E3130]"> Profile Image</h4>
      <div className="rounded-full">
        <label
          htmlFor="avatarUpload"
          className="flex rounded-full relative w-fit items-end gap-3 my-4 text-[#5B8DEF] text-[16px]"
        >
          <>
            <Image
              src={selectedPics || userData?.data?.user?.profilePic || defaultpic}
              width={280}
              height={180}
              alt="avatar"
              className={`${
                !userData?.data?.user?.profilePic
                  ? ' rounded-none w-[107px] h-[100px]'
                  : 'w-[107px] h-[100px] rounded-full object-cover'
              }`}
            ></Image>
            {/* <Image
              src={addPics}
              width={30}
              height={30}
              alt=""
              className="bg-brand-green-primary rounded-full p-1 absolute right-0 bottom-0"
            ></Image> */}
          </>
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          name="profilepics"
          id="avatarUpload"
          className="hidden outline-none"
        />
      </div>
    </>
  );
};

export default UpdatingProfilePic;
