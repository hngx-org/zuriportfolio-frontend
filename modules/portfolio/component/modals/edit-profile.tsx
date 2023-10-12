'use client';
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
import { Input } from '@ui/Input';
import Button from '@ui/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';
import cover from '../../../public/assets/images/portfolioLanding/cover.png';
import profile from '../../../public/assets/images/portfolioLanding/profile.png';


interface PortfolioDetails {
  name: string;
  city: string;
  country: string;
  trackId: string;
}

const EditProfile = () => {
  const router = useRouter(); 
  const [file, setFile] = useState<File | undefined>();
  const [picture, setPicture] = useState('');
  const [name, setName] = useState('');
  const [track, setTrack] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');



  const [portfolioDetails, setPortfolioDetails] = useState<PortfolioDetails>({
    name: '',
    city: '',
    country: '',
    trackId: '',
  });


  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setError('Please select an image.');
      return;
    }

    try {
      const data = new FormData();
      data.append('file', file);

      // Here, you should replace 'YOUR_API_ENDPOINT' with the actual API endpoint to upload the image.
      const res = await fetch('https://hng6-r5y3.onrender.com/api/profile/:userId', {
        method: 'POST',
        body: data,
      });


      if (res.ok) {
        localStorage.setItem('userProfile', JSON.stringify(portfolioDetails));
        setError('');

        router.push({
          pathname: '/',
          query: { data: JSON.stringify(portfolioDetails) }, // Pass the data as query parameters
        });
      } else {
        console.error(await res.text());
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <form
      className="p-4 mt-3 flex flex-col gap-4 rounded-lg  items-center justify-start hover:border-green-500"
      onSubmit={handleSave}
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
            onChange={(e) => setFile(e.target.files?.[0])}
            className="hidden"
            accept="image/png, image/jpeg"
            value={picture}
          />
        </label>
      </div>
      <div className="mt-[80px]">
        <div className="w-[100%]">
          <label>Name *</label>
          <Input
            className="w-[100%] mt-3"
            onChange={(e) => {
              const newName = e.target.value;
              if (newName.length >= 1 && newName.length <= 50) {
                setPortfolioDetails({
                  ...portfolioDetails,
                  name: newName,
                });
                setError(''); // Clear the error if input is valid
              } else {
                setError('Name must be between 3 and 50 characters.');
              }
            }}
            type="text"
            intent={'default'}
            // disabled={false}
            placeHolder="Enter your name"
            value={portfolioDetails.name}
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="w-[100%] mt-5 block">
          <label className="mb-3">Track *</label>
          <Select
            onValueChange={(value: string) => {
              setTrack(value);
            }}
            value={track}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Track" />
            </SelectTrigger>
            <SelectContent className="border-[#ffffff] hover:border-green-500 bg-white-100">
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
