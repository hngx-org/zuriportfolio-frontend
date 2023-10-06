import React, { useState } from 'react';
import useDisclosure from '../../../hooks/useDisclosure';
import Modal from '@ui/Modal';
import { CloseCircle } from 'iconsax-react';
import { Input, SelectInput } from '@ui/Input';
import Button from '@ui/Button';
import { WorkExperience } from '../../../@types';

const WorkExperienceSection = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [startYear, setStartYear] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [endYear, setEndYear] = useState<string | 'Present'>('Present');
  const [endMonth, setEndMonth] = useState('');
  const [isChecked, setIsChecked] = useState(true);
  const [idCounter, setIdCounter] = useState(1);
  const [isForm, setIsForm] = useState(true);

  const handleSaveExperience = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const experienceObject = {
      id: idCounter,
      role,
      company,
      description,
      startMonth,
      startYear,
      endYear,
      endMonth,
    };
    if (
      role === '' ||
      company === '' ||
      description === '' ||
      startMonth === '' ||
      startYear === '' ||
      endYear === '' ||
      endMonth === ''
    ) {
      alert('Pls fill in all the inputs');
      return;
    }
    setWorkExperiences((prev) => [experienceObject, ...prev]);
    setIdCounter((prev) => prev + 1);
    setIsForm(false);

    // Reset form fields
    // setRole('');
    // setCompany('');
    // setDescription('');
    // setStartMonth('');
    // setStartYear('');
    // setEndYear('Present');
    // setEndMonth('');
    // setIsChecked(true);
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

  console.log(workExperiences);

  const handleDeleteExperience = (id: number) => {
    const updatedExperience = workExperiences.filter((experience) => experience.id !== id);
    setWorkExperiences(updatedExperience);
  };

  return (
    <>
      <Modal isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="lg">
        <div className="space-y-6 bg-white-100 p-4 py-5">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <p className="text-[1.5rem] font-bold text-[#2E3130] font-manropeL">Work Experience</p>
              <button onClick={onClose} className="bg-brand-green-primary rounded-md text-white-100">
                <CloseCircle />
              </button>
            </div>
            <div className="bg-brand-green-primary h-1 rounded-sm"></div>
          </div>
          <div className="">
            <div className="">
              {workExperiences.map((experience, index) => {
                return (
                  <article
                    className={`border-b-2 pt-4 pb-5 border-brand-disabled flex flex-col gap-5 px-2 py-3 sm:px-0`}
                    key={index}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row flex-2 justify-between">
                      <div className="flex gap-3 sm:gap-5 flex-col sm:flex-row">
                        <p className="text-[#8D9290] font-semibold font-manropeB">
                          {experience.startMonth} {experience.startYear} - {experience.endYear}
                        </p>
                        <div>
                          <p className="text-[#2E3130] mb-1 text-[1.375rem] font-semibold">{experience.company}</p>
                          <p className="font-normal text-brand-green-primary text-sm">{experience.role}</p>
                        </div>
                      </div>
                      <div className="font-semibold font-manropeEB text-[12px] text-[#737876]">
                        {experience.description}
                      </div>
                    </div>
                    <div className="self-end flex gap-4 font-manropeL">
                      <span className="font-semibold cursor-pointer text-[#5B8DEF]">Edit</span>
                      <span
                        className="font-semibold cursor-pointer text-brand-red-hover"
                        onClick={() => handleDeleteExperience(experience.id)}
                      >
                        Delete
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
          <>
            {isForm && (
              <form onSubmit={handleSaveExperience} className="flex flex-col gap-y-7">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-[.5rem] w-[90%]">
                    <label className="font-semibold text-[#444846] text-[1rem]">Role</label>
                    <Input
                      placeHolder=""
                      onChange={(e) => {
                        setRole(e.target.value);
                        console.log(e.target.value);
                      }}
                      className="border-[#E1E3E2]"
                      inputSize={'lg'}
                    />
                  </div>
                  <div className="flex flex-col gap-[.5rem] w-[90%]">
                    <label className="font-semibold text-[#444846] text-[1rem]">Company</label>
                    <Input
                      placeHolder=""
                      onChange={(e) => {
                        setCompany(e.target.value);
                        console.log(e.target.value);
                      }}
                      className="border-[#E1E3E2]"
                      inputSize={'lg'}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-[.5rem]">
                  <label className="font-semibold text-[#444846] text-[1rem]">Description</label>
                  <textarea
                    className="resize-none border-2 border-solid border-[#E1E3E2] pt-2 pl-2 text-dark-600 rounded-lg outline-none focus:border-brand-green-primary "
                    name=""
                    id=""
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex justify-between flex-col sm:flex-row gap-3">
                  <div className="w-full sm:justify-start flex gap-2">
                    <SelectInput
                      options={months}
                      disabled={false}
                      className="w-full sm:w-auto border-[#E1E3E2]"
                      intent="default"
                      onChange={(e) => setStartMonth(e.target.value)}
                    />
                    <SelectInput
                      options={years}
                      disabled={false}
                      intent="default"
                      className="w-full sm:w-auto border-[#E1E3E2]"
                      onChange={(e) => setStartYear(e.target.value)}
                    />
                  </div>
                  <div className="w-full flex gap-2 flex-1 flex-col">
                    <div className="flex gap-2">
                      <SelectInput
                        options={months}
                        disabled={false}
                        className="w-full sm:w-auto border-[#E1E3E2]"
                        intent="default"
                        onChange={(e) => setEndMonth(e.target.value)}
                      />
                      <SelectInput
                        options={years}
                        disabled={false}
                        intent="default"
                        onChange={(e) => setEndYear(e.target.value)}
                        className="justify-self-end w-full sm:w-auto border-[#E1E3E2]"
                      />
                    </div>
                    <div className="self-start">
                      <input
                        checked={isChecked}
                        onChange={() => {
                          setIsChecked(!isChecked);
                          if (!isChecked) {
                            // Clear endYear and endMonth when 'Present' is unchecked
                            setEndYear('');
                            setEndMonth('');
                          } else {
                            // Set 'Present' when 'Present' is checked
                            setEndYear('Present');
                            setEndMonth('Present');
                          }
                        }}
                        type="checkbox"
                        name=""
                        id=""
                      />
                      <span className="font-normal font-manropeL ml-2 text-[#5B5F5E]">Present</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-start sm:justify-end">
                  <Button intent={'secondary'} className="w-full rounded-md sm:w-[6rem]" size={'lg'}>
                    Cancel
                  </Button>
                  <Button type="submit" className="w-full rounded-md sm:w-[6rem]" size={'lg'}>
                    Save
                  </Button>
                </div>
              </form>
            )}
          </>
          <>
            {!isForm && (
              <div className="px-4 flex justify-between flex-col sm:flex-row">
                <button
                  className="text-brand-green-primary font-semibold font-manropeB"
                  onClick={() => setIsForm(true)}
                >
                  Add new work experience
                </button>
                <div className="flex gap-3">
                  <Button intent={'secondary'} className="w-full rounded-md sm:w-[6rem]" size={'lg'}>
                    Cancel
                  </Button>
                  <Button type="submit" className="w-full rounded-md sm:w-[6rem]" size={'lg'}>
                    Save
                  </Button>
                </div>
              </div>
            )}
          </>
        </div>
      </Modal>
      <button className="bg-black text-white-100" onClick={onOpen}>
        open bobo
      </button>
    </>
  );
};

export default WorkExperienceSection;
