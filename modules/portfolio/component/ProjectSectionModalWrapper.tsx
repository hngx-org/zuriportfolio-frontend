import React, { useState } from 'react';
import useDisclosure from '../../../hooks/useDisclosure';
import Modal from '@ui/Modal';
import { Add, CloseSquare } from 'iconsax-react';
import Image from 'next/image';
import thumb from '../../../public/assets/thumb.png';
import { Input } from '@ui/Input';
import Button from '@ui/Button';
import { WorkExperience } from '../../../@types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';

const ProjectSectionModalWrapper = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [startYear, setStartYear] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [endYear, setEndYear] = useState<string | 'Present'>('Present');
  const [endMonth, setEndMonth] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [idCounter, setIdCounter] = useState(1);
  const [isForm, setIsForm] = useState(true);
  const [editedExperience, setEditedExperience] = useState<WorkExperience | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleEditExperience = (id: number) => {
    const editedExperience = workExperiences.find((experience) => experience.id === id);

    // if (editedExperience) {
    //   setRole(editedExperience.role);
    //   setCompany(editedExperience.company);
    //   setDescription(editedExperience.description);
    //   setStartMonth(editedExperience.startMonth);
    //   setStartYear(editedExperience.startYear);
    //   setEndYear(editedExperience.endYear);
    //   setEndMonth(editedExperience.endMonth);
    //   setIsChecked(editedExperience.endYear === 'Present');
    //   setIsForm(true);
    //   setEditMode(true);
    //   setEditedExperience(editedExperience);
    // }
    handleDeleteExperience(id);
  };

  const handleSaveExperience = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      role === '' ||
      company === '' ||
      description === '' ||
      startMonth === '' ||
      startYear === '' ||
      (!isChecked && (endYear === '' || endMonth === ''))
    ) {
      alert('Please fill in all the inputs');
      return;
    }

    const experienceObject = {
      id: idCounter,
      role,
      company,
      description,
      startMonth,
      startYear,
      endYear: isChecked ? 'Present' : endYear,
      endMonth: isChecked ? 'Present' : endMonth,
    };

    if (editMode && editedExperience) {
      // Update the existing experience
      const updatedExperiences = workExperiences.map((experience) =>
        experience.id === editedExperience.id ? experienceObject : experience,
      );
      setWorkExperiences(updatedExperiences);
    } else {
      // Add a new experience
      setWorkExperiences((prev) => [experienceObject, ...prev]);
      setIdCounter((prev) => prev + 1);
    }

    // // Reset form fields
    // setRole('');
    // setCompany('');
    // setDescription('');
    // setStartMonth('');
    // setStartYear('');
    // setEndYear('Present');
    // setEndMonth('');
    // setIsChecked(true);
    // setIsForm(false);
    // setEditMode(false);
    // setEditedExperience(null);
  };

  const handleDeleteExperience = (id: number) => {
    const updatedExperience = workExperiences.filter((experience) => experience.id !== id);
    setWorkExperiences(updatedExperience);
  };

  const months = [
    {
      label: 'Month',
      value: 'January',
    },
    {
      label: 'February',
      value: 'February',
    },
    {
      label: 'March',
      value: 'March',
    },
    {
      label: 'April',
      value: 'April',
    },
    {
      label: 'May',
      value: 'May',
    },
    {
      label: 'June',
      value: 'June',
    },
    {
      label: 'July',
      value: 'July',
    },
    {
      label: 'August',
      value: 'August',
    },
    {
      label: 'September',
      value: 'September',
    },
    {
      label: 'October',
      value: 'October',
    },
    {
      label: 'November',
      value: 'November',
    },
    {
      label: 'December',
      value: 'December',
    },
  ];

  const years = [];

  // Define the range of years you want to create
  const startFrom = 2000;
  const endAt = 2023;

  // Loop through the range and create objects for each year
  for (let year = startFrom; year <= endAt; year++) {
    // Create an object with "label" and "value" keys
    const yearObject = {
      label: year.toString(),
      value: year.toString(),
    };

    // Push the object into the "years" array
    years.push(yearObject);
  }

  return (
    <>
      <Modal isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="xl">
        <div className="space-y-6 bg-white-100 p-4 py-5">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <p className="text-[1.2rem] sm:text-[1.5rem] font-bold text-[#2E3130] font-manropeL">Project</p>
              <CloseSquare size="32" color="#009254" variant="Bold" onClick={onClose} className="cursor-pointer" />
            </div>
            <div className="bg-brand-green-primary h-1 rounded-sm"></div>
          </div>

          {/* onSubmit={handleSaveExperience} */}
          <>
            {isForm && (
              <form className="flex flex-col gap-y-7">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-[.5rem] w-[90%]">
                    <label className="font-semibold text-[#444846] text-[1rem]">Project Title</label>
                    <Input
                      placeHolder="my best yet"
                      // onChange={(e) => {
                      //   setRole(e.target.value);
                      // }}
                      className="border-[#E1E3E2] w-full h-[44px] rounded-md border-[1px]"
                      inputSize={'lg'}
                      value={role}
                    />
                  </div>
                  <div className="flex flex-col gap-[.5rem] w-[90%]">
                    {/* <Select
                          onValueChange={(value: string) => {
                            setStartYear(value);
                          }}
                          value={startYear}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((year, index) => (
                              <SelectItem key={index} value={year.value}>
                                {year.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select> */}
                  </div>
                </div>

                <div className="flex flex-row gap-[20px]">
                  <div className="flex flex-col gap-[10px] mt-[30px]">
                    <label className="text-[14px] text-bold">Link to project</label>

                    <div className="flex">
                      <span className="w-[65px] md:w-[75px] text-[11px] md:text-[13px] h-[35px] px-[10px] py-[5px] border border-gray-400  rounded-tl-[5px] rounded-bl-[5px] ">
                        Type link
                      </span>
                      <input
                        type="text"
                        placeholder="www.untitleui.com"
                        className="w-[150px] md:w-[300px] h-[35px] rounded-tr-[5px] rounded-br-[5px] border-x-gray-light border border-gray-400 border-l-0 px-[5px] text-[13px]"
                      />
                    </div>
                  </div>

                  <div className="relative mt-[60px] md:mt-[60px]">
                    <div className="relative text-[13px]">
                      <input
                        type="text"
                        placeholder="Insert thumbnail"
                        className="w-[120px] md:w-[150px] h-[40px] rounded-[5px] border border-green-500 pl-[20px] md:pl-[30px] text-[13px] placeholder-green-500"
                      />
                    </div>
                    <span className="absolute top-[10px] left-[2px] md:left-[10px] text-green-500 text-[17px]"></span>
                  </div>
                </div>

                <div className="flex flex-col gap-[.5rem] w-[90%]">
                  <label className="font-semibold text-[#444846] text-[1rem]">Tags</label>
                  <Input
                    placeHolder="Enter your tags and press ENTER"
                    // onChange={(e) => {
                    //   setRole(e.target.value);
                    // }}
                    className="border-[#E1E3E2] w-full h-[44px] rounded-md border-[1px]"
                    inputSize={'lg'}
                    value={role}
                  />
                </div>

                <div className="flex flex-col gap-[.5rem]">
                  <label className="font-semibold text-[#444846] text-[1rem]">Description</label>
                  <textarea
                    className="resize-none border-[1px] border-solid border-[#E1E3E2] pt-2 pl-2 text-dark-600 rounded-lg outline-none focus:border-brand-green-primary "
                    rows={2}
                    value={description}
                    // onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex flex-col gap-2">
                  <Image src={thumb} alt="" width={300} height={200} className=" w-[100px] h-[100px] " />
                  <span className="text-gray-400 text-[14px]">Note: you can only add 10 images. Sizes 1080 x 566</span>
                </div>

                <div className="px-3 gap-2 flex justify-between flex-col sm:flex-row">
                  <button
                    className="text-brand-green-primary self-center text-[12px] sm:text-[15px] flex items-center gap-1 font-semibold font-manropeB"
                    // onClick={() => setIsForm(true)}
                  ></button>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      onClick={onClose}
                      intent={'secondary'}
                      className="w-full rounded-md sm:w-[6rem]"
                      size={'lg'}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="w-full rounded-md sm:w-[6rem]" size={'lg'}>
                      Save
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </>
        </div>
      </Modal>

      {/* Trigger button to open the modal */}
      <Button onClick={onOpen} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Edit Modal
      </Button>
    </>
  );
};

export default ProjectSectionModalWrapper;
