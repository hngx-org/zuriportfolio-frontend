'use-client';
import React, { useState, useEffect, useContext } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
import { Input } from '@ui/Input';
import Button from '@ui/Button';
import Image from 'next/image';
import axios from 'axios';
import cover from '../../../public/assets/images/portfolioLanding/cover.png';
import profile from '../../../public/assets/images/portfolioLanding/profile.png';
import Portfolio from '../../../../context/PortfolioLandingContext';
import { useRouter } from 'next/router';
const EditProfile = () => {
  // edit profile
  const [picture, setPicture] = useState('');
  const [name, setName] = useState('');
  const [trackId, setTrackId] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://hng6-r5y3.onrender.com/api/users/f8e1d17d-0d9e-4d21-89c5-7a564f8a1e90`);
        const data = await response.json();
        console.log(data);
        // setPicture(data?.user?.profilePic);
        setName(data?.user?.firstName + ' ' + data?.user?.lastName);
        setCity(data?.portfolio?.city);
        setCountry(data?.portfolio?.country);
        // data?.tracks.map(el => {
        //   console.log(el);
        // })
        setIsLoading(false);
      } catch (error: any) {
        // setError({ state: true, error: error.message });
      }
    };
    getUser();
  }, []);
  // console.log(picture);
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (e.target.id === 'coverUpload') {
        setPicture(URL.createObjectURL(file));
      }
    }
  };
  interface PortfolioDetails {
    name: string;
    city: string;
    country: string;
    trackId: string;
  }
  // const [portfolioDetails, setPortfolioDetails] = useState<PortfolioDetails>({
  //   name: "",
  //   city: "",
  //   country: "",
  //   trackId: "",
  // });
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const profileObj = {
  //     name: name,
  //     trackId: trackId,
  //     city: city,
  //     country: country,
  //   };
  //   console.log(trackId)
  //   try {
  //     const response = await fetch("https://hng6-r5y3.onrender.com/api/profile/f8e1d17d-0d9e-4d21-89c5-7a564f8a1e90", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(profileObj),
  //     });
  //     if (response.ok) {
  //       // Data successfully saved
  //       console.log("success");
  //     } else {
  //       // Handle error
  //       console.log("error1");
  //     }
  //   } catch (error) {
  //     // Handle network error
  //     console.log("error3");
  //   }
  // };
  // useEffect(() => {
  // })
  const { setHasData, setCoverImage, setUserData } = useContext(Portfolio);
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ')[1];
    const axios = require('axios');
    let data = JSON.stringify({
      name: firstName + ' ' + lastName,
      trackId: 1,
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
        console.log(data);
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
        router.reload();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  const uploadCover = async (coverImage: string | Blob) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      const userId = 'f8e1d17d-0d9e-4d21-89c5-7a564f8a1e90';
      formData.append('images', coverImage as string | Blob);
      formData.append('userId', userId);
      const response = await fetch('https://hng6-r5y3.onrender.com/api/profile/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setUserData((p: any) => ({ ...p, hasDataFromBE: true, coverImage: data.data.profilePic }));
      setHasData(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const image = URL.createObjectURL(file);
      if (e.target.id === 'imageUpload') {
        // setCoverImage(image);
        await uploadCover(file);
      }
    }
  };
  return (
    <form
      className="p-4 mt-3 flex flex-col gap-4 rounded-lg border-brand-disabled items-center justify-start hover:border-green-500"
      onSubmit={handleSubmit}
    >
      <div className="grid place-content-center absolute w-[60px] md:w-[80px] object-fill object-center aspect-square rounded-full bg-emerald-50 mx-auto">
        <Image
          src="/assets/images/portfolioLanding/profilePlaceholder.svg"
          width={0}
          height={0}
          alt="cover"
          className="w-[100%] aspect-square rounded-full "
        />
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
            onChange={handleUpload}
            className="hidden"
            accept="image/png, image/jpeg"
            value={picture}
          />
        </label>
      </div>
      <div className="mt-[80px] w-[100%]">
        <div className="w-[100%]">
          <label>Name *</label>
          <Input
            className="w-[100%] mt-3"
            onChange={(e) => {
              // setPortfolioDetails({
              //   ...portfolioDetails,
              //   name: e.target.value,
              // });
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
              setTrackId(value);
            }}
            // onChange={(e) => {
            //   setPortfolioDetails({
            //     ...portfolioDetails,
            //     trackId: e.target.value,
            //   });
            // }}
            value={trackId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Track" className="hover:border-green-500" />
            </SelectTrigger>
            <SelectContent className="border-[#FFFFFF] hover:border-green-500 bg-white-100">
              <SelectItem className=" hover:text-green-500" value="behance">
                Product Design
              </SelectItem>
              <SelectItem className=" hover:text-green-500" value="github">
                Video Editor
              </SelectItem>
              <SelectItem className=" hover:text-green-500" value="instagram">
                Frontend Development
              </SelectItem>
              <SelectItem className=" hover:text-green-500" value="linkedIn">
                Digital Marketer
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4 justify-between mt-5">
          <div className="w-full md:w-[47%]">
            <label>
              City
              <span> (optional) </span>
            </label>
            <Input
              className="w-[100%] mt-3"
              onChange={(e) => {
                // setPortfolioDetails({
                //   ...portfolioDetails,
                //   city: e.target.value,
                // });
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
                // setPortfolioDetails({
                //   ...portfolioDetails,
                //   country: e.target.value,
                // });
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
            <Button intent={'secondary'} size={'sm'} className="w-full" type="button">
              Close
            </Button>
          </div>
          <div className="w-full md:w-[47%]">
            <Button intent={'primary'} size={'sm'} className="w-full" type="submit">
              Save
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default EditProfile;
Collapse



















Message Prosper Pii:seven:Frontend Developer






