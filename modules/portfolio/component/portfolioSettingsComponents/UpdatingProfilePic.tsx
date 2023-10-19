import React from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../../../context/AuthContext';
//import { useQuery, useMutation } from 'react-query';
import Image from 'next/image';
import defaultpic from '../../../../public/assets/inviteAssets/profile.svg';
import $http from '../../../../http/axios';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useMutation, useQuery } from '@tanstack/react-query';

const UpdatingProfilePic = () => {
  const [selectedPics, setSelectedPics] = React.useState<string | StaticImport>('');
  const { auth } = useAuth();
  const baseUrl = 'https://hng6-r5y3.onrender.com/api/';

  // Fetch user data with React Query
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

  // Mutation function to update the profile picture
  const profilePicMutation = useMutation(async (coverImage: string | Blob) => {
    try {
      const formData = new FormData();
      formData.append('images', coverImage as string | Blob);
      formData.append('userId', auth?.user?.id as string);

      const response = await $http.post(`${baseUrl}profile/image/upload`, formData);

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to upload the image');
      }
    } catch (error) {
      throw new Error('An error occurred while uploading the image');
    }
  });

  // Handle file change
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const image = URL.createObjectURL(file);
      if (e.target.id === 'avatarUpload') {
        setSelectedPics(image);
      }

      // Using toast.promise to display pending and resolved toasts
      const promise = profilePicMutation.mutateAsync(file);
      toast
        .promise(promise, {
          pending: 'Uploading image...',
          success: 'Image uploaded successfully',
          error: 'An error occurred while uploading the image',
        })
        .then(() => {
          // Handle any post-toast logic here
        });

      // Optional: You can also handle errors in the `.catch` block if needed
      promise.catch((error) => {
        console.error('An error occurred while uploading the image:', error);
      });
    }
  };

  return (
    <>
      <h3 className="font-manropeEB text-[1rem] sm:text-[1.375rem] text-[#2E3130] leading-[1.75rem]">
        Account Management
      </h3>
      <div className="rounded-full">
        <label
          htmlFor="avatarUpload"
          className="flex rounded-full w-fit items-end gap-3 my-4 text-[#5B8DEF] text-[16px]"
        >
          <>
            <Image
              src={selectedPics || userData?.user?.profilePic || defaultpic}
              width={280}
              height={180}
              alt=""
              className="w-[140px] h-[140px] rounded-full"
            ></Image>
          </>
          Edit
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
