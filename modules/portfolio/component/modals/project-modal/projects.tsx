import { useEffect, useState } from 'react';
import Modal from '@ui/Modal';
import { Add, CloseCircle, CloseSquare } from 'iconsax-react';
import { Input } from '@ui/Input';
import Button from '@ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
import Image from 'next/image';
import axios from 'axios';
import { notify } from '@ui/Toast';
import { checkObjectProperties } from '@modules/portfolio/functions/checkObjectProperties';
import { Data, allRouteOptions } from './project-section-modal';
import Loader from '@ui/Loader';

type ProjectSectionProps = {
  onCloseModal: () => void;
  onSaveModal: () => void;
  userId: string | undefined;
  dataToEdit: Data | null;
  projects: any[];
  handleSetRoute: (data: allRouteOptions) => void;
};

const endpoint = 'https://hng6-r5y3.onrender.com';
const ProjectSection: React.FC<ProjectSectionProps> = ({
  dataToEdit,
  onCloseModal,
  userId,
  onSaveModal,
  projects,
  handleSetRoute,
}) => {
  const [title, setTitle] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [thumbnail, setThumbnail] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [media, setMedia] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [allChecks, setAllChecks] = useState<string[]>([]);
  const [id, setId] = useState<number | null>();
  const [urlsFromCloudinary, setUrlsFromCloudinary] = useState<string[]>([]);
  const years = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016];

  const items = {
    sectionid: 5,
    userid: userId,
    title,
    year,
    url: link,
    tags: selectedTags.join(', '),
    description,
  };

  const handleDataClear = () => {
    setId(null);
    setTitle('');
    setYear('');
    setLink('');
    setThumbnail('');
    setSelectedTags([]);
    setTagInput('');
    setDescription('');
    setMedia([]);
    setFiles([]);
  };

  const handleAddTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (tagInput.trim() !== '' && !selectedTags.includes(tagInput)) {
        setSelectedTags([...selectedTags, tagInput]);
        setTagInput('');
      }
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
      const selectedImages = Array.from(files).slice(0, 6);

      const imageUrls = selectedImages.map((file) => URL.createObjectURL(file));

      setMedia((prevMedia: any) => [...prevMedia, ...imageUrls]);
      setFiles((prev: any) => [...prev, ...selectedImages]);
    }
  };

  const handleRemoveMedia = (index: any) => {
    const updatedMedia = [...media];
    updatedMedia.splice(index, 1);
    setMedia(updatedMedia);
  };

  const handleRemoveUrlsFromCloudinary = (clickedValue: string) => {
    const updatedUrls = urlsFromCloudinary.filter((value: string) => value.trim() !== clickedValue.trim());
    setUrlsFromCloudinary(updatedUrls);
  };

  const close = () => {
    if (projects.length > 0) {
      handleDataClear();
      handleSetRoute('view-projects');
    } else {
      handleDataClear();
      onCloseModal();
    }
  };

  const handleSetYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') {
      setYear('');
    } else {
      setYear(e.target.value);
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { allChecksPassed, failedChecks } = checkObjectProperties(items);
    setAllChecks(failedChecks);
    const formData = new FormData();
    if (allChecksPassed) {
      setLoading(true);
      if (id) {
        const data = {
          ...items,
          id,
          thumbnail: files[0],
          prevImageUrls: urlsFromCloudinary,
        };
        files.map((item) => {
          formData.append('images', item);
        });

        formData.append('jsondata', JSON.stringify(data));

        axios
          .put(`${endpoint}/api/projects/${id}`, formData)
          .then((res) => {
            setLoading(false);
            notify({
              message: 'Project updated successfully',
              position: 'top-center',
              theme: 'light',
              type: 'success',
            });
            handleDataClear();
            onSaveModal();
          })
          .catch((err) => {
            setLoading(false);
            notify({
              message: 'Error occurred',
              position: 'top-center',
              theme: 'light',
              type: 'error',
            });
          });
      } else {
        const data = {
          ...items,
          thumbnail: files[0],
        };
        files.map((item) => {
          formData.append('images', item);
        });
        formData.append('jsondata', JSON.stringify(data));

        axios
          .post(`${endpoint}/api/v1/projects`, formData)
          .then((res) => {
            setLoading(false);
            notify({
              message: 'Projects created successfully',
              position: 'top-center',
              theme: 'light',
              type: 'success',
            });
            handleDataClear();
            onSaveModal();
          })
          .catch((err) => {
            setLoading(false);
            notify({
              message: err?.response?.data?.message || 'Error occurred',
              position: 'top-center',
              theme: 'light',
              type: 'error',
            });
          });
      }
    }
  };

  const handleEditData = () => {
    if (dataToEdit !== null) {
      const { title, year, link, thumbnail, tags, description, media, id, projectsImages } = dataToEdit;
      setTitle(title);
      setYear(year);
      setLink(link);
      setThumbnail(thumbnail);
      setSelectedTags(tags.trim().split(','));
      setDescription(description);
      setUrlsFromCloudinary(projectsImages);
      setId(id);
    }
  };

  useEffect(() => {
    handleEditData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataToEdit]);

  return (
    <section className="px-6 pt-10 max-sm:w-full max-sm:px-1">
      {/* header */}

      <div className="flex justify-between items-center max-sm:w-full">
        <p className="text-[1.2rem] sm:text-[1.5rem] font-extrabold text-[#2E3130] font-manropeL">Projects</p>
        <CloseSquare size="32" color="#009254" variant="Bold" onClick={close} className="cursor-pointer" />
      </div>
      <hr className="border-2 rounded-lg border-brand-green-primary mt-2.5 md:mb-1 mb-10 " />
      <div className="w-full flex-col bg-white-100 p-4 py-5 font-manropeL mt-12">
        <div className="flex flex-col gap-5 w-full">
          <form className="flex flex-col gap-5 w-full max-sm:w-full">
            {/* title */}
            <div className="flex justify-center items-center flex-col md:flex-row gap-5">
              <div className="w-full">
                <p className="font-bold text-gray-200 pb-2 text-base">Project Title*</p>
                <Input
                  placeHolder="My best yet"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  className={`${
                    allChecks.includes('title') ? 'border-red-205' : 'border-[#E1E3E2]'
                  } w-full h-[50px] rounded-md border-[2px] text-[12px] font-medium placeholder:text-[#8D9290] placeholder:font-normal text-base font-manropeL text-black`}
                  inputSize={'lg'}
                  value={title}
                />
              </div>
              <div className="w-full md:w-[50%]">
                <p className="font-medium text-gray-200 pb-2 text-base">Year*</p>
                <select
                  onChange={(e) => handleSetYear(e)}
                  placeholder="Year"
                  className={`w-full h-[50px] bg-white-100 border-2 rounded-md px-4 ${
                    allChecks.includes('year') ? 'border-red-205' : 'border-[#E1E3E2]'
                  } border-white-300 font-medium placeholder:text-[#8D9290] placeholder:font-normal text-base font-manropeL text-black`}
                >
                  <option value="">Select Year</option>
                  {years.map((year, index) => (
                    <option className="text-gray-300 bg-transparent px-4" key={index} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Link */}
            <div className="flex justify-center items-center flex-col md:flex-row md:gap-5">
              <div className="flex-[7] w-full md:w-[50%]">
                <p className="font-medium text-gray-200 pb-2 text-base">Link to project</p>
                <div className="flex">
                  {/* <p
                    className={`min-w-fit grid place-content-center px-2 border-2 rounded-lg border-[#E1E3E2]
                    rounded-tr-none rounded-br-none border-r-0 font-base text-gray-300 text-base`}
                  >
                    Type link
                  </p> */}

                  <Input
                    placeHolder="Type Link"
                    onChange={(e) => {
                      setLink(e.target.value);
                    }}
                    className={`${
                      allChecks.includes('url') ? 'border-red-205' : 'border-[#E1E3E2]'
                    } w-full h-[50px] rounded-md border-[2px] text-[14px] font-medium placeholder:text-[#8D9290] placeholder:font-normal text-base font-manropeL text-black`}
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
            {thumbnail && (
              <div onClick={() => setThumbnail('')} className="flex items-center">
                <div className="relative ">
                  <Image
                    src={thumbnail}
                    priority
                    unoptimized
                    width={0}
                    height={0}
                    alt=""
                    className="rounded-lg object-cover object-center w-full h-[80px]"
                  />
                  <CloseCircle className="text-white-100 absolute top-2 right-2 cursor-pointer" size={24} />
                </div>
              </div>
            )}
            {/* Tags */}
            <div className="flex gap-1 flex-col">
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag: any, index: any) => (
                  <div
                    onClick={() => handleRemoveTag(index)}
                    key={index}
                    className="rounded-lg px-2 py-1 bg-green-50 text-sm flex justify-center items-center gap-1 cursor-pointer text-[#003A1B]"
                  >
                    {tag} <CloseCircle className="inline-block w-[16px] text-brand-green-primary " />
                  </div>
                ))}
              </div>
              <div>
                <p className="font-medium text-gray-200 pb-2 text-base">Tags</p>
                <Input
                  placeHolder=""
                  onKeyDown={handleAddTags}
                  onChange={(e) => setTagInput(e.target.value)}
                  className={`${
                    allChecks.includes('tags') ? 'border-red-205' : 'border-[#E1E3E2]'
                  } w-full h-[50px]  rounded-md border-[2px] text-[12px] font-medium placeholder:text-[#8D9290] placeholder:font-normal text-base font-manropeL text-black`}
                  inputSize={'lg'}
                  value={tagInput}
                />
                <label htmlFor="" className="text-brand-green-primary ">
                  Enter your tags and press enter
                </label>
              </div>
            </div>
            {/* description */}
            <div className="flex flex-col w-full">
              <div className="w-full">
                <p className="font-medium text-gray-200 pb-2 text-base">Description *</p>
                <Input
                  placeHolder="Add some details about your project"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  className={`${
                    allChecks.includes('description') ? 'border-red-205' : 'border-[#E1E3E2]'
                  } w-full h-[50px]  rounded-md border-[2px] text-[12px] font-medium placeholder:text-[#8D9290] placeholder:font-normal text-base font-manropeL text-black`}
                  inputSize={'lg'}
                  value={description}
                />
              </div>
            </div>
            {/* urlsFromCloudinary, media */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
              {urlsFromCloudinary.length > 0 &&
                urlsFromCloudinary.map((url: string) => (
                  <div onClick={() => handleRemoveUrlsFromCloudinary(url)} key={url} className="flex items-center">
                    <div className="relative ">
                      <Image
                        src={url}
                        priority
                        unoptimized
                        width={0}
                        height={0}
                        alt=""
                        className="rounded-lg object-cover object-center w-full h-[80px]"
                      />
                      <CloseCircle className="text-white-100 absolute top-2 right-2 cursor-pointer" size={24} />
                    </div>
                  </div>
                ))}
              {media.length > 0 &&
                media.map((media: any, index: any) => (
                  <div onClick={() => handleRemoveMedia(index)} key={index} className="flex w-full gap-4 items-center ">
                    <div className="relative">
                      <Image
                        src={media}
                        priority
                        unoptimized
                        width={0}
                        height={0}
                        alt=""
                        className="rounded-lg object-cover object-center w-full h-[80px]"
                      />
                      <CloseCircle
                        className="text-white-100 shadow-md absolute top-2 right-2 cursor-pointer"
                        size={24}
                      />
                    </div>
                  </div>
                ))}
              <label
                htmlFor="mediaUpload"
                className={`rounded-lg mt-2.5 px-2 h-[80px] w-[80px] py-1 ${
                  media.length >= 6 ? 'bg-green-50' : 'bg-green-600'
                } cursor-pointer text-[12px] flex justify-center items-center`}
              >
                <Add className="text-white-100" size={42} />
                <input
                  disabled={media.length === 6 ? true : false}
                  id="mediaUpload"
                  type="file"
                  onChange={(e) => handleMedia(e)}
                  className="hidden"
                  accept="image/png, image/jpeg"
                />
              </label>
            </div>
            <p className="font-medium text-base text-white-650 mt-2.5">
              {' '}
              Note: you can only add 6 images. Sizes 1080 X 566{' '}
            </p>

            {/* buttons */}
            <div className="my-10 flex gap-4 justify-end items-center">
              <Button onClick={close} intent={'secondary'} className="rounded-lg min-w-[100px]">
                Cancel
              </Button>
              <Button
                disabled={loading}
                className={`${loading ? 'opacity-90' : 'opacity-100'} rounded-lg min-w-[100px]`}
                onClick={handleSubmit}
              >
                {loading ? <Loader /> : 'Save'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
