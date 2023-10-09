import { useState } from 'react';
import Modal from '@ui/Modal';
import { Add, CloseSquare } from 'iconsax-react';
import { Input } from '@ui/Input';
import Button from '@ui/Button';
import { WorkExperience } from '../../../@types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';

type WorkExperienceModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const WorkExperienceSection: React.FC<WorkExperienceModalProps> = ({ isOpen, onClose }) => {
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [startYear, setStartYear] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [endYear, setEndYear] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [idCounter, setIdCounter] = useState(1);
  const [isForm, setIsForm] = useState(true);
  const [editedExperience, setEditedExperience] = useState<WorkExperience | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleEditExperience = (id: number) => {
    const editedExperience = workExperiences.find((experience) => experience.id === id);

    // Set the form fields with the values from the found experience
    if (editedExperience) {
      setRole(editedExperience.role);
      setCompany(editedExperience.company);
      setDescription(editedExperience.description);
      setStartMonth(editedExperience.startMonth);
      setStartYear(editedExperience.startYear);
      setEndYear(editedExperience.endYear);
      setEndMonth(editedExperience.endMonth);
      setIsChecked(editedExperience.endYear === 'Present'); // Set the checkbox based on 'endYear'

      // Now, set the form into edit mode
      setIsForm(true);
      setEditMode(true);
      setEditedExperience(editedExperience);
    }
    handleDeleteExperience(id);
  };

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
      alert('Pls fill in all the inputs');
      return;
    }
    setWorkExperiences((prev) => [experienceObject, ...prev]);
    setIdCounter((prev) => prev + 1);
    setIsForm(false);

    // Reset form fields
    setRole('');
    setCompany('');
    setDescription('');
    setStartMonth('');
    setStartYear('');
    setEndYear('Present');
    setEndMonth('');
    setIsChecked(true);
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

  const handleDeleteExperience = (id: number) => {
    const updatedExperience = workExperiences.filter((experience) => experience.id !== id);
    setWorkExperiences(updatedExperience);
  };

  return (
    <>
      <Modal isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="xl">
        <div className="space-y-6 bg-white-100 p-4 py-5">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <p className="text-[1.2rem] sm:text-[1.5rem] font-bold text-[#2E3130] font-manropeL">Work Experience</p>
              <CloseSquare size="32" color="#009254" variant="Bold" onClick={onClose} className="cursor-pointer" />
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
                    {/* <div className="flex flex-col gap-3 sm:flex-row flex-2 justify-between"> */}
                    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                      <div className="flex gap-3 sm:gap-5 flex-col sm:flex-row">
                        <p className="text-[#8D9290] font-semibold font-manropeB">
                          {experience.startMonth} {experience.startYear} - {experience.endYear}
                        </p>
                        <div>
                          <p className="text-[#2E3130] mb-1 text-[1.375rem] font-semibold">{experience.company}</p>
                          <p className="font-normal text-brand-green-primary text-sm">{experience.role}</p>
                        </div>
                      </div>
                      <p
                        style={{
                          whiteSpace: 'normal',
                          overflowWrap: 'break-word',
                        }}
                        className="font-semibold font-manropeEB text-[12px] max-w-full sm:pl-[3rem] text-ellipsis text-[#737876]"
                      >
                        {experience.description}
                      </p>
                    </div>
                    <div className="self-end flex gap-4 font-manropeL">
                      <span
                        onClick={() => handleEditExperience(experience.id)}
                        className="font-semibold cursor-pointer text-[#5B8DEF]"
                      >
                        Edit
                      </span>
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
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex flex-col gap-[.5rem] w-full sm:w-[90%]">
                    <label className="font-semibold text-[#444846] text-[1rem]">Role</label>
                    <Input
                      placeHolder=""
                      onChange={(e) => {
                        setRole(e.target.value);
                      }}
                      className="border-[#E1E3E2] w-full h-[44px] rounded-md border-[1px]"
                      inputSize={'lg'}
                      value={role}
                    />
                  </div>
                  <div className="flex flex-col gap-[.5rem] w-full sm:w-[90%]">
                    <label className="font-semibold text-[#444846] text-[1rem]">Company</label>
                    <Input
                      placeHolder=""
                      onChange={(e) => {
                        setCompany(e.target.value);
                      }}
                      className="border-[#E1E3E2] w-full h-[44px] rounded-md border-[1px]"
                      inputSize={'lg'}
                      value={company}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-[.5rem]">
                  <label className="font-semibold text-[#444846] text-[1rem]">Description</label>
                  <textarea
                    className="resize-none border-[1px] border-solid border-[#E1E3E2] pt-2 pl-2 text-dark-600 rounded-lg outline-none focus:border-brand-green-primary "
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                  <div className="w-full sm:justify-start flex flex-col gap-2">
                    <p className="text-[#444846] font-normal font-manropeL">
                      Start date <span className="text-[#8D9290]">(optional)</span>
                    </p>
                    <div className="flex gap-2">
                      <>
                        <Select
                          onValueChange={(value: string) => {
                            setStartMonth(value);
                          }}
                          value={startMonth}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                          <>
                            <SelectContent>
                              {months.map((month, index) => (
                                <SelectItem key={index} value={month.value}>
                                  {month.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </>
                        </Select>
                      </>
                      <>
                        <Select
                          onValueChange={(value: string) => {
                            setStartYear(value);
                          }}
                          value={startYear}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <>
                            <SelectContent>
                              {years.map((year, index) => (
                                <SelectItem key={index} value={year.value}>
                                  {year.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </>
                        </Select>
                      </>
                    </div>
                  </div>
                  <div className="w-full flex gap-2 flex-1 flex-col">
                    <p className="text-[#444846] font-normal font-manropeL">
                      End date <span className="text-[#8D9290]">(optional)</span>
                    </p>
                    <div className="flex gap-2">
                      <>
                        <Select
                          onValueChange={(value: string) => {
                            setEndMonth(value);
                          }}
                          value={endMonth}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                          <>
                            <SelectContent>
                              {months.map((month, index) => (
                                <SelectItem key={index} value={month.value}>
                                  {month.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </>
                        </Select>
                      </>
                      <>
                        <Select
                          onValueChange={(value: string) => {
                            setEndYear(value);
                          }}
                          value={endYear}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <>
                            <SelectContent>
                              {years.map((year, index) => (
                                <SelectItem key={index} value={year.value}>
                                  {year.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </>
                        </Select>
                      </>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative w-7 h-7 flex items-center justify-center">
                        <input
                          type="checkbox"
                          defaultChecked={isChecked}
                          onChange={() => {
                            setIsChecked(!isChecked);
                            if (isChecked) {
                              setEndYear('Present');
                              setEndMonth('Present');
                            } else {
                              setEndMonth(endMonth);
                              setEndYear(endYear);
                            }
                          }}
                          className="peer shrink-0 appearance-none h-[100%] w-[100%] border-[1px] border-[#A8ACAB] rounded-md checked:bg-brand-green-primary checked:border-0"
                        />
                        <svg
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 hidden peer-checked:block pointer-events-none"
                          xmlns="http://w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <p>Present</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-start sm:justify-end">
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
              </form>
            )}
          </>
          <>
            {!isForm && (
              <div className="px-3 gap-2 flex justify-between flex-col sm:flex-row">
                <button
                  className="text-brand-green-primary self-center text-[12px] sm:text-[15px] flex items-center gap-1 font-semibold font-manropeB"
                  onClick={() => setIsForm(true)}
                >
                  <Add size="16" color="#009254" /> Add new work experience
                </button>
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
            )}
          </>
        </div>
      </Modal>
    </>
  );
};

export default WorkExperienceSection;
