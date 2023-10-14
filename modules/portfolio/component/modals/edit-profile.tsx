'use-client';
import React, { useState, useEffect, useContext } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
import { Input } from '@ui/Input';
import Button from '@ui/Button';
import Image from 'next/image';
import Portfolio from '../../../../context/PortfolioLandingContext';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Modal from '@ui/Modal';

const EditProfile = () => {
  const [picture, setPicture] = useState<string | StaticImport>();
  const [name, setName] = useState('');
  const [track, setTrack] = useState('');
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState<any>();
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const getUser = async () => {
    try {
      const response = await fetch(`https://hng6-r5y3.onrender.com/api/users/f8e1d17d-0d9e-4d21-89c5-7a564f8a1e90`);
      const data = await response.json();
      setSelectedTrack(data?.tracks?.[0].track);
      setPicture(data?.user?.profilePic);
      setName(data?.user?.firstName + ' ' + data?.user?.lastName);
      setCity(data?.portfolio?.city);
      setCountry(data?.portfolio?.country);
    } catch (error: any) {
      console.log(error);
    }
  };
  const getTracks = async () => {
    try {
      const response = await fetch(`https://hng6-r5y3.onrender.com/api/tracks`);
      const data = await response.json();
      setTracks(data.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      await getUser();
      await getTracks();
    };
    getData();
  }, []);

  const { setHasData, setUserData, showProfileUpdate, modal } = useContext(Portfolio);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const tracks: { track: string; id: number }[] = [
      {
        id: 1,
        track: 'Frontend',
      },
      {
        id: 2,
        track: 'Backend',
      },
      {
        id: 3,
        track: 'Design',
      },
    ];

    const firstName = name.split(' ')[0];
    const lastName = name.split(' ')[1];
    const trackId = tracks.find((el: { track: string; id: number }) => el.track === selectedTrack)?.id;

    const axios = require('axios');
    let data = JSON.stringify({
      name: firstName + ' ' + lastName,
      trackId: trackId,
      city: city,
      country: country,
    });
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: 'https://hng6-r5y3.onrender.com/api/update-profile-details/f8e1d17d-0d9e-4d21-89c5-7a564f8a1e90',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    axios
      .request(config)
      .then((response: any) => {
        const { data } = response;
        setUserData({
          firstName: data?.user?.firstName,
          lastName: data?.user?.lastName,
          avatarImage: data?.user?.profilePic,
          city: data?.portfolio?.city,
          country: data?.portfolio?.country,
          tracks: data?.tracks,
          hasDataFromBE: true,
          coverImage: data?.user?.profileCoverPhoto,
        });
        modal();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const uploadCover = async (coverImage: string | Blob) => {
    try {
      const formData = new FormData();
      const userId = 'f8e1d17d-0d9e-4d21-89c5-7a564f8a1e90';
      formData.append('images', coverImage as string | Blob);
      formData.append('userId', userId);
      const response = await fetch('https://hng6-r5y3.onrender.com/api/profile/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setUserData((p: any) => ({ ...p, hasDataFromBE: true, avatarImage: data.data.profilePic }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const image = URL.createObjectURL(file);
      if (e.target.id === 'avatarUpload') {
        setPicture(image);
      }
      await uploadCover(file);
    }
  };
  return (
    <Modal isOpen={showProfileUpdate} closeModal={() => modal()} isCloseIconPresent={false}>
      <form
        className="p-4 mt-3 flex flex-col gap-4 rounded-lg border-brand-disabled items-center justify-start hover:border-green-500"
        onSubmit={handleSubmit}
      >
        <div className="grid place-content-center absolute w-[120px] md:w-[150px] object-cover object-center aspect-square rounded-full bg-emerald-50 mx-auto">
          {picture ? (
            <div>
              <Image
                src={picture || ''}
                priority
                unoptimized
                width={0}
                height={0}
                alt="profile"
                className="w-full aspect-square rounded-full "
              />
            </div>
          ) : (
            ''
          )}
          <label className="absolute bottom-2 -right-2 w-[35%] bg-brand-green-primary aspect-square rounded-full grid place-content-center cursor-pointer">
            {' '}
            <Image
              src="/assets/images/portfolioLanding/add.svg"
              width={0}
              height={0}
              alt="cover"
              className="w-[25px] md:w-[30px] object-fill object-center aspect-square -bottom-5 md:-bottom-10 left-0 rounded-full"
            />
            <input
              id="avatarUpload"
              type="file"
              onChange={handleUploadImage}
              className="hidden"
              accept="image/png, image/jpeg"
            />
          </label>
        </div>
        <div className="mt-[150px] md:mt-[170px] w-[100%]">
          <div className="w-[100%]">
            <label>Name *</label>
            <Input
              className="w-[100%] mt-3"
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              intent={'default'}
              disabled={false}
              placeHolder="Enter your name"
              value={name}
            />
          </div>
          <div className="w-[100%] mt-5 block">
            <label className="mb-5">Track *</label>
            <Select
              onValueChange={(value: string) => {
                setTrack(value);
              }}
              value={track}
            >
              <SelectTrigger className="border-[#59595977] text-gray-300 h-[50px] rounded-[10px]">
                <SelectValue
                  defaultValue={selectedTrack}
                  placeholder={selectedTrack}
                  className="hover:border-green-500"
                />
              </SelectTrigger>
              <SelectContent className="border-[#FFFFFF] text-gray-300 hover:border-green-500 bg-white-100">
                {tracks?.map((track: any, index: number) => (
                  <SelectItem className="text-gray-300" key={index} value={track.track}>
                    {track.track}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full flex md:flex-row gap-4 justify-between mt-5">
            <div className="w-full md:w-[47%]">
              <label>
                City
                <span> (optional) </span>
              </label>
              <Input
                className="w-[100%] mt-3"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                type="text"
                intent={'default'}
                disabled={false}
                placeHolder="Lagos"
                value={city}
              />
            </div>
            <div className="w-full md:w-[47%]">
              <label>
                Country
                <span> (optional) </span>
              </label>
              <Input
                className="w-[100%] mt-3"
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                type="text"
                intent={'default'}
                disabled={false}
                placeHolder="Nigeria"
                value={country}
              />
            </div>
          </div>
          <div className="w-full flex  md:flex-row gap-4 justify-between mt-10">
            <div className="w-full md:w-[47%]">
              <Button
                intent={'secondary'}
                size={'sm'}
                className="w-full rounded-lg"
                type="button"
                onClick={() => modal()}
              >
                Close
              </Button>
            </div>
            <div className="w-full md:w-[47%]">
              <Button intent={'primary'} size={'sm'} className="w-full rounded-lg" type="submit">
                Save
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};
export default EditProfile;
