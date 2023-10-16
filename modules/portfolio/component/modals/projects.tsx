import { useEffect, useState } from 'react';
import Modal from '@ui/Modal';
import { Add, CloseCircle, CloseSquare } from 'iconsax-react';
import { Input } from '@ui/Input';
import Button from '@ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
import Image from 'next/image';
import axios from 'axios';
import { notify } from '@ui/Toast';

type ProjectSectionProps = {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
};

const endpoint = 'https://hng6-r5y3.onrender.com';
const ProjectSection: React.FC<ProjectSectionProps> = ({ isOpen, onClose, userId }) => {
  const [title, setTitle] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [media, setMedia] = useState<any[]>([]);
  const years = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016];

  const handleDataClear = () => {
    setTitle('');
    setYear('');
    setLink('');
    setThumbnail('');
    setSelectedTags([]);
    setTagInput('');
    setDescription('');
    setMedia([]);
  };

  const handleAddTags = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSelectedTags([...selectedTags, tagInput]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (index: any) => {
    const updatedTags = [...selectedTags];
    updatedTags.splice(index, 1);
    setSelectedTags(updatedTags);
  };

  const handleThumbnail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const image = URL.createObjectURL(file);
      if (e.target.id === 'thumbnailUpload') {
        setThumbnail(image);
      }
    }
  };

  const handleMedia = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const selectedImages = Array.from(files).slice(0, 10);
      const imageUrls = selectedImages.map((file) => URL.createObjectURL(file));

      setMedia((prevMedia: any) => [...prevMedia, ...imageUrls]);
    }
  };

  const handleRemoveMedia = (index: any) => {
    const updatedMedia = [...media];
    updatedMedia.splice(index, 1);
    setMedia(updatedMedia);
  };

  const close = () => {
    onClose();
  };

  // {"title":"Live test for issue ART-36 ", "year":"2023", "url":"https://link-to-project.com", "tags":"all, tags, here, comma separated", "description": "Updated new description", "userId":"2c92b6a8-e672-41c5-af97-a643ce56ce6c", "sectionId":"4"}
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const userID = 'f8e1d17d-0d9e-4d21-89c5-7a564f8a1e90';
    const formData = new FormData();
    const data = {
      sectionid: 5,
      userid: userID,
      title,
      year,
      url: link,
      thumbnail: 0,
      tags: selectedTags.join(', '),
      description,
      media,
    };
    console.log(data);

    media.map((item) => {
      formData.append('images', item);
    });
    formData.append('jsondata', JSON.stringify(data));
    axios
      .post(`${endpoint}/api/projects`, formData)
      .then((res) => {
        notify({
          message: 'Projects created successfully',
          position: 'top-center',
          theme: 'light',
          type: 'success',
        });
        handleDataClear();
        // onClose();
        console.log(res);
      })
      .catch((err) => {
        notify({
          message: 'Error occurred',
          position: 'top-center',
          theme: 'light',
          type: 'error',
        });
        console.log(err);
      });
  };

  return (
    <Modal isOpen={true} closeModal={close} isCloseIconPresent={false} size="xl">
      <div className="w-full flex-col bg-white-100 p-4 py-5 font-manropeL">
        <div className="flex flex-col gap-5 w-full">
          {/* header */}
          <div className="flex justify-between items-center">
            <p className="text-[1.2rem] sm:text-[1.5rem] font-bold text-[#2E3130] font-manropeL">Projects</p>
            <CloseSquare size="32" color="#009254" variant="Bold" onClick={close} className="cursor-pointer" />
          </div>
          <hr className="border-2 rounded-lg border-brand-green-primary md:mb-1 mb-10" />
          <form className="flex flex-col gap-5 w-full">
            {/* title */}
            <div className="flex justify-center items-center flex-col md:flex-row gap-5">
              <div className="w-full md:w-[50%]">
                <p className="font-semibold text-gray-200 pb-2">Project Title*</p>
                <Input
                  placeHolder="My best yet"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  className="border-[#E1E3E2] w-full h-[50px]  rounded-md border-[2px] text-[12px] font-semibold"
                  inputSize={'lg'}
                  value={title}
                />
              </div>
              <div className="w-full md:w-[50%]">
                <p className="font-semibold text-gray-200 pb-2">Year*</p>
                <Select
                  // className="w-full md:w-[50%] h-[60px] text-gray-300"
                  onValueChange={(value: string) => {
                    setYear(value);
                  }}
                  value={year}
                >
                  <SelectTrigger className="w-full h-[50px] font-semibold text-gray-300">
                    <SelectValue className="text-gray-300" placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent className="text-gray-300">
                    {years.map((year: any, index: any) => (
                      <SelectItem className="text-gray-300" key={index} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Link */}
            <div className="flex justify-center items-center flex-col md:flex-row md:gap-5">
              <div className="flex-[7] w-full md:w-[50%]">
                <p className="font-semibold text-gray-200 pb-2">Link to project</p>
                <div className="flex">
                  <p className="min-w-fit grid place-content-center px-2 border-2 rounded-lg border-[#E1E3E2] rounded-tr-none rounded-br-none border-r-0 font-base text-gray-300">
                    Type link
                  </p>

                  <Input
                    placeHolder="www.untitled.com"
                    onChange={(e) => {
                      setLink(e.target.value);
                    }}
                    className="border-[#E1E3E2] w-full h-[50px] rounded-md border-[2px] rounded-tl-none rounded-bl-none text-[14px] font-semibold"
                    inputSize={'lg'}
                    value={link}
                  />
                </div>
              </div>
              {!thumbnail && (
                <label
                  htmlFor="thumbnailUpload"
                  className="flex-[2] w-full md:w-[50%] flex justify-center items-center border-2 border-brand-green-primary min-h-[50px] mt-7 rounded-lg px-2 cursor-pointer"
                >
                  <Add className="text-brand-green-primary" />{' '}
                  <p className="text-brand-green-primary">Insert thumbnail</p>
                  <input
                    id="thumbnailUpload"
                    type="file"
                    onChange={(e) => handleThumbnail(e)}
                    className="hidden"
                    accept="image/png, image/jpeg"
                  />
                </label>
              )}
            </div>
            {/* Tags */}
            <div className="flex gap-3 flex-col">
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag: any, index: any) => (
                  <div
                    onClick={() => handleRemoveTag(index)}
                    key={index}
                    className="rounded-lg px-2 py-1 bg-green-50 text-[12px] flex justify-center items-center gap-1 cursor-pointer"
                  >
                    {tag} <CloseCircle className="inline-block w-[16px] text-brand-green-primary " />
                  </div>
                ))}
              </div>
              <div>
                <p className="font-semibold text-gray-200 pb-2">Tags</p>
                <Input
                  placeHolder="Enter your tag and press 'ENTER'"
                  onKeyDown={handleAddTags}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="border-[#E1E3E2] w-full h-[50px]  rounded-md border-[2px] text-[12px] font-semibold"
                  inputSize={'lg'}
                  value={tagInput}
                />
              </div>
            </div>
            {/* desctiprion */}
            <div className="flex flex-col w-full">
              <div className="w-full">
                <p className="font-semibold text-gray-200 pb-2">Description</p>
                <Input
                  placeHolder="Add some details about your project"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  className="border-[#E1E3E2] w-full h-[50px]  rounded-md border-[2px] text-[12px] font-semibold"
                  inputSize={'lg'}
                  value={description}
                />
              </div>
            </div>
            {/* media */}
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full gap-4">
              {media.length > 0 &&
                media.map((media: any, index: any) => (
                  <div onClick={() => handleRemoveMedia(index)} key={index} className="flex gap-4 items-center">
                    <div className="relative">
                      <Image
                        src={media}
                        priority
                        unoptimized
                        width={0}
                        height={0}
                        alt=""
                        className="rounded-lg object-cover object-center w-full aspect-square"
                      />
                      <CloseCircle className="text-white-100 absolute top-2 right-2 cursor-pointer" size={24} />
                    </div>
                  </div>
                ))}
              {media.length < 10 && (
                <label
                  htmlFor="mediaUpload"
                  className="rounded-lg px-2 py-1 bg-green-50 text-[12px] flex justify-center items-center gap-1 cursor-pointer aspect-square"
                >
                  <Add className="text-white-100" size={42} />
                  <input
                    id="mediaUpload"
                    type="file"
                    onChange={(e) => handleMedia(e)}
                    className="hidden"
                    accept="image/png, image/jpeg"
                  />
                </label>
              )}
            </div>
            {/* buttons */}
            <div className="my-10 flex gap-4 justify-end items-center">
              <Button intent={'secondary'} className="rounded-lg min-w-[100px]">
                Cancel
              </Button>
              <Button className="rounded-lg min-w-[100px]" onClick={handleSubmit}>
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ProjectSection;
