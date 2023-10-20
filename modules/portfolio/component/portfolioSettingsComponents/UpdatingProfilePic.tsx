import React from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../../../context/AuthContext';
//import { useQuery, useMutation } from 'react-query';
import Image from 'next/image';
import defaultpic from '../../../../public/assets/inviteAssets/profile.svg';
import $http from '../../../../http/axios';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import addPics from '../../../../public/assets/inviteAssets/add-circle.svg';
import { notify } from '@ui/Toast';

const UpdatingProfilePic = () => {
  const [selectedPics, setSelectedPics] = React.useState<string | StaticImport>('');
  const { auth } = useAuth();
  const baseUrl = 'https://hng6-r5y3.onrender.com/api/';
  const {
    data: userData,
    isLoading: isUserDataLoading,
    isError: isUserDataError,
  } = useQuery(['userData', auth?.user.id], async () => {
    const response = await $http.get(`${baseUrl}users/${auth?.user.id}`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to fetch user data');
  });

  const profilePicMutation = useMutation(async (coverImage: string | Blob) => {
    try {
      const formData = new FormData();
      formData.append('images', coverImage as string | Blob);
      formData.append('userId', auth?.user?.id as string);

      const response = await axios.post(`${baseUrl}profile/image/upload`, formData);

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to upload the image');
      }
    } catch (error) {
      throw new Error('An error occurred while uploading the image');
    }
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const image = URL.createObjectURL(file);
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
        .then(() => {
          notify({
            type: 'success',
            message: 'uploaded sucessfully',
          });
          setTimeout(() => {
            toast.dismiss();
          }, 4000);
        });

      promise.catch((error) => {
        console.error('An error occurred while uploading the image:', error);
        notify({
          type: 'success',
          message: 'failed to upload',
        });
      });
    }
  };

  return (
    <>
      <h3 className="font-manropeEB text-[1rem] sm:text-[1.375rem] text-[#2E3130] leading-[1.75rem]">
        Account Management
      </h3>
      <h4 className="text-4 font-manropeB mt-4 text-[#2E3130]"> Profile Image</h4>
      <div className="rounded-full">
        <label
          htmlFor="avatarUpload"
          className="flex rounded-full relative w-fit items-end gap-3 my-4 text-[#5B8DEF] text-[16px]"
        >
          <>
            <Image
              src={selectedPics || userData?.user?.profilePic || defaultpic}
              width={280}
              height={180}
              alt="avatar"
              className="w-[100px] h-[100px] rounded-full"
            ></Image>
            <Image
              src={addPics}
              width={30}
              height={30}
              alt=""
              className="bg-brand-green-primary rounded-full p-1 absolute right-0 bottom-0"
            ></Image>
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
