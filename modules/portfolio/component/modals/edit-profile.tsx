'use-client';
import React, { useState, useEffect, useContext } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
import Button from '@ui/Button';
import Image from 'next/image';
import Portfolio from '../../../../context/PortfolioLandingContext';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Modal from '@ui/Modal';
import Loader from '@ui/Loader';
import CountryCityDropdown from './CountryCityDropdown';
import Badges from './badges';

const inputStyle = `placeholder-gray-300 placeholder-opacity-40 font-semibold text-gray-500 h-[50px] border-2 border-[#bcbcbc] rounded-[10px] px-4  ring-0 outline-brand-green-primary transition-all duration-300 ease-in-out select-none focus-within:border-brand-green-primary`;

const EditProfile = () => {
  const { setUserData, showProfileUpdate, setShowProfileUpdate } = useContext(Portfolio);
  const [picture, setPicture] = useState<string | StaticImport>();
  const [firstNamee, setFirstnamee] = useState('');
  const [lastNamee, setLastNamee] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<any>();
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [availableTracks, setAvailableTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: '' });
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const { userId, onSaveModal } = useContext(Portfolio);

  // const [isFormValid, setIsFormValid] = useState(false);

  const [badgeData, setBadgeData] = useState({
    name: '',
    badgeImage: '',
  });

  useEffect(() => {
    // Fetch badge data from the provided endpoint
    fetch('https://hng6-r5y3.onrender.com/api/v1/users/e2009b92-8acf-406d-a974-95fb6a5215f3')
      .then((response) => response.json())
      .then((data) => {
        // Assuming that the badge label and badge image data are in the response
        // Update the badge data state
        setBadgeData({
          name: data.name,
          badgeImage: data.badgeImage,
        });
      })
      .catch((error) => {
        console.error('Error fetching badge data:', error);
      });
  }, []);

  const getUser = async () => {
    try {
      const response = await fetch(`https://hng6-r5y3.onrender.com/api/v1/users/${userId}`);
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.log(error);
    }
  };
  const getTracks = async () => {
    try {
      const response = await fetch('https://hng6-r5y3.onrender.com/api/v1/tracks');
      const data = await response.json();
      return data.data;
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userData = await getUser();
        const tracks = await getTracks();
        setPicture(userData?.user?.profilePic);
        setFirstnamee(userData?.user?.firstName);
        setLastNamee(userData?.user?.lastName);
        setCity(userData?.portfolio?.city);
        setCountry(userData?.portfolio?.country);
        setSelectedTrack(userData?.userTracks?.track);
        setAvailableTracks(tracks);
        setIsLoading(false);
      } catch (error: any) {
        setError({ status: true, message: error.message });
        setIsLoading(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // console.log(response);
  }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let matchingTrack: any;
    matchingTrack = availableTracks.find((track: any) => track.track === selectedTrack);
    if (!isLoading) {
      try {
        if (firstNamee.trim().length === 0 || lastNamee.trim().length === 0) {
          setError({ status: true, message: 'Please fill out the required field' });
          return;
        }
        matchingTrack = availableTracks.find((track: any) => track.track === selectedTrack);
        if (matchingTrack) {
          setIsLoading(true);
          const response = await fetch(`https://hng6-r5y3.onrender.com/api/v1/users/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: firstNamee + ' ' + lastNamee,
              trackId: matchingTrack?.id,
              city: selectedCity,
              country: selectedCountry,
            }),
          });
          // if (!response.ok) {
          //   throw new Error('Failed to update data');
          // }
          const data = await response.json();
          onSaveModal();
          setIsLoading(false);
          setShowProfileUpdate(false);
        } else {
          setError({ status: true, message: 'Please Select Tracks' });
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setError({ status: true, message: 'An error occurred while updating data' });
      }
    }
  };
  // try {
  //   setIsLoading(true);
  //   const update = await fetch(`https://hng6-r5y3.onrender.com/api/users/${userId}`, {
  //     method: 'Post',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(body),
  //   });
  //   await update.json();
  //   console.log(update);
  //   await fetch(`https://hng6-r5y3.onrender.com/api/getPortfolioDetails/${userId}`);
  //   setIsLoading(false);
  //   modal();
  // } catch (error) {
  //   console.error(error);
  //   await fetch(`https://hng6-r5y3.onrender.com/api/getPortfolioDetails/${userId}`);
  //   setIsLoading(false);
  // }
  const uploadProfile = async (coverImage: string | Blob) => {
    try {
      const formData = new FormData();
      formData.append('images', coverImage as string | Blob);
      formData.append('userId', userId);
      const response = await fetch('https://hng6-r5y3.onrender.com/api/v1/profile/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setUserData((p: any) => ({ ...p, avatarImage: data.data.profilePic }));
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
      await uploadProfile(file);
    }
  };
  return (
    <Modal isOpen={showProfileUpdate} closeModal={() => setShowProfileUpdate(false)} isCloseIconPresent={false}>
      {isLoading ? (
        <div className="space-y-6 bg-white-100 p-4 py-5">
          <Loader />
        </div>
      ) : (
        <form
          className="p-4 mt-3 flex flex-col rounded-lg border-brand-disabled items-center justify-start hover:border-green-500"
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
                  className="w-full aspect-square rounded-full"
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
            <div className="flex flex-col md:flex-row md:gap-5 w-[100%] gap-1">
              <label className="w-full mb-3">
                Firstname <span className="text-red-200">*</span>
                <input
                  className={`w-[100%] text-black mt-1 ${inputStyle}`}
                  onChange={(e) => {
                    setFirstnamee(e.target.value);
                  }}
                  type="text"
                  disabled={false}
                  placeholder="Enter your firstname"
                  value={firstNamee}
                />
              </label>
            </div>
            <div className="flex flex-col md:flex-row md:gap-5 w-[100%] gap-1">
              <label className="w-full text-black mb-3">
                Lastname <span className="text-red-200">*</span>
                <input
                  className={`w-[100%] mt-1 ${inputStyle}`}
                  onChange={(e) => {
                    setLastNamee(e.target.value);
                  }}
                  type="text"
                  disabled={false}
                  placeholder="Enter your lastname"
                  value={lastNamee}
                />
              </label>
            </div>
            <div className="w-[100%] flex flex-col justify-center items-start">
              <label className="w-full mb-3">
                Track <span className="text-red-200">*</span> ​
                <Select
                  onValueChange={(value: string) => {
                    setSelectedTrack(value);
                  }}
                  value={selectedTrack}
                >
                  <SelectTrigger className="border-[#59595977] text-grey-300 h-[50px] rounded-[10px]">
                    <SelectValue
                      defaultValue={selectedTrack}
                      placeholder="Select Track"
                      className="hover:border-green-500"
                    />
                  </SelectTrigger>
                  <SelectContent
                    className="border-[#FFFFFF]  hover:border-green-500 bg-white-100"
                    style={{ maxHeight: '200px', overflowY: 'auto' }}
                  >
                    {availableTracks?.map((track: any, index: number) => (
                      <SelectItem className="text-black" key={index} value={track.track}>
                        {track.track}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
              <Badges name={badgeData.name} badgeImage={badgeData.badgeImage} />
            </div>
            ​ ​
            <CountryCityDropdown
              setSelectedCountry={setSelectedCountry}
              setSelectedCity={setSelectedCity}
              selectedCountry={selectedCountry}
              selectedCity={selectedCity}
            />
            ​
            <div className="w-full flex  md:flex-row gap-4 justify-between mt-6">
              <div className="w-full md:w-[47%]">
                <Button
                  intent={'secondary'}
                  size={'sm'}
                  className="w-full rounded-lg"
                  type="button"
                  onClick={() => setShowProfileUpdate(false)}
                >
                  Close
                </Button>
              </div>
              <div className="w-full md:w-[47%]">
                <Button intent={'primary'} size={'sm'} className="w-full rounded-lg cursor-pointer" type="submit">
                  Save
                </Button>
              </div>
            </div>
          </div>
          {error.status && <p className="text-red-200 font-semibold mt-5">{error.message}</p>}
        </form>
      )}
    </Modal>
  );
};
export default EditProfile;
