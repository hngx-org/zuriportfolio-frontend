import { useContext, useEffect, useState } from 'react';
import Modal from '@ui/Modal';
import { Add, ArrowLeft2, CloseSquare } from 'iconsax-react';
import { Input } from '@ui/Input';
import Button from '@ui/Button';
import { WorkExperience } from '../../../@types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
import { months, years } from '../data';
import { WorkExperienceModalContext } from '../context/work-experience-modal-context';
import Loader from '@ui/Loader';
import { WorkExperience as WorkExperienceSkeleton } from './landing/Skeleton';
import Portfolio from '../../../context/PortfolioLandingContext';
import { generateEndYears } from '../data';
import { Edit2, Trash } from 'iconsax-react';
import { boolean } from 'zod';

type WorkExperienceModalProps = {
  onCloseModal: () => void;
  onSaveModal: () => void;
  isOpen: boolean;
  userId?: string;
};

const WorkExperienceModalSection: React.FC<WorkExperienceModalProps> = ({ isOpen, onCloseModal, onSaveModal }) => {
  const {
    role,
    company,
    description,
    startMonth,
    startYear,
    isChecked,
    endYear,
    endMonth,
    workExperiences,
    addWorkExperience,
    setRole,
    setCompany,
    isLoading,
    setEndMonth,
    setStartMonth,
    setEndYear,
    isForm,
    setIsForm,
    setIsChecked,
    setDescription,
    setStartYear,
    handleDeleteExperience,
    handleEditExperience,
    isEditMode,
    setIsEditMode,
    resetForm,
    isData,
    setIsData,
  } = useContext(WorkExperienceModalContext);
  const [editingExperienceId, setEditingExperienceId] = useState<number | null>(null);
  const [editingExperience, setEditingExperience] = useState<WorkExperience | null>(null);
  const [selectedStartYear, setSelectedStartYear] = useState('');
  const [endYears, setEndYears] = useState<any>([]);

  const prefillForm = (experience: WorkExperience) => {
    setEditingExperienceId(experience.id);
    setRole(experience.role);
    setCompany(experience.company);
    setDescription(experience.description);
    setStartMonth(experience.startMonth);
    setStartYear(experience.startYear);
    if (experience.endYear === 'Present') {
      setIsChecked(true);
    } else {
      setIsChecked(false);
      setEndMonth(experience.endMonth);
      setEndYear(experience.endYear);
    }
    setIsForm(true);
  };

  useEffect(() => {
    const date = new Date();
    const currMonth = months[date.getMonth()];
    const currYr = date.getFullYear();
    if (isChecked) {
      setEndMonth(currMonth?.value);
      setEndYear(String(currYr));
    } else {
      setEndMonth(endMonth);
      setEndYear(endYear);
    }
  }, [isChecked, endMonth, endYear]);

  return (
    <Modal isOpen={isOpen} closeModal={onCloseModal} isCloseIconPresent={false} size="xl">
      <div className="space-y-6 bg-white-100 p-4 py-5">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <>
                {isEditMode && (
                  <ArrowLeft2
                    size="32"
                    color="#009254"
                    onClick={() => {
                      setIsForm(false);
                      setIsEditMode(false);
                      setIsData(true);
                      resetForm();
                    }}
                  />
                )}
              </>
              <p className="text-[1.2rem] sm:text-[1.4rem] font-bold text-[#2E3130] font-manropeL">Work Experience</p>
            </div>
            <CloseSquare size="32" color="#009254" variant="Bold" onClick={onCloseModal} className="cursor-pointer" />
          </div>
          <div className="bg-brand-green-primary h-1 rounded-sm"></div>
        </div>
        {/* <>{isLoading && <Loader />}</> */}
        <>
          {isData && (
            <>
              {workExperiences
                .slice()
                .reverse()
                .map((experience: WorkExperience, index: number) => {
                  const endYear = experience.isEmployee ? 'Present' : experience.endYear;

                  return (
                    <article key={index} className="border-b-2 flex flex-col border-brand-disabled">
                      {/* <WorkExperienceSkeleton data={experience} /> */}
                      <section className="flex w-full gap-x-10 mb-4 max-sm:flex-col max-sm:gap-y-3">
                        <p className="text-gray-300 font-semibold text-sm flex-[3]">
                          <span>
                            {experience?.startMonth} {experience?.startYear}
                          </span>{' '}
                          -{' '}
                          <span>
                            {experience?.endMonth} {endYear}
                          </span>
                        </p>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-200">{experience?.company}</h3>
                          <p className="text-sm font-manropeL text-brand-green-primary">{experience?.role}</p>
                        </div>
                        <p className="font-semibold text-sm text-gray-400 break-all flex-[4] break-normal">
                          {experience?.description}
                        </p>
                      </section>
                      <div className="self-end pb-4 flex gap-4 font-manropeL">
                        <span
                          className="font-semibold cursor-pointer "
                          onClick={(e) => {
                            setIsEditMode(true);
                            setEditingExperience(experience);
                            prefillForm(experience);
                            setIsData(false);
                          }}
                        >
                          <Edit2 size="32" color="#37d67a" variant="Outline" />
                        </span>
                        <span
                          className="font-semibold cursor-pointer"
                          onClick={(e) => handleDeleteExperience(experience.id, e)}
                        >
                          <Trash size="32" color="#f47373" variant="Outline" />
                        </span>
                      </div>
                    </article>
                  );
                })}
            </>
          )}
        </>
        <div>
          {isEditMode && (
            <article className={`border-b-2 pt-4 pb-5 border-brand-disabled flex flex-col gap-5 px-2 py-3 sm:px-0`}>
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                <div className="flex gap-3 sm:gap-5 flex-col sm:flex-row">
                  <p className="text-[#8D9290] font-semibold font-manropeB">
                    {editingExperience?.startMonth} {editingExperience?.startYear} - {endYear}
                  </p>
                  <div>
                    <p className="text-[#2E3130] mb-1 text-[1.375rem] font-semibold">{editingExperience?.company}</p>
                    <p className="font-normal text-brand-green-primary text-sm">{editingExperience?.role}</p>
                  </div>
                </div>
                <p
                  style={{
                    whiteSpace: 'normal',
                    overflowWrap: 'break-word',
                  }}
                  className="font-semibold text-left sm:text-left font-manropeEB text-[12px] max-w-full  text-ellipsis text-[#737876]"
                >
                  {editingExperience?.description}
                </p>
              </div>
              <div className="self-end flex gap-4 font-manropeL">
                <span className="font-semibold cursor-pointer">
                  <Edit2 size="20" color="#009254" variant="Outline" />
                </span>
                <span
                  className="font-semibold cursor-pointer text-brand-red-hover"
                  onClick={(e) => {
                    handleDeleteExperience(editingExperience?.id, e);
                    resetForm();
                  }}
                >
                  <Trash size="32" color="#f47373" variant="Outline" />
                </span>
              </div>
            </article>
          )}
        </div>
        <>
          {isForm && (
            <form
              onSubmit={(e) => (isEditMode ? handleEditExperience(editingExperienceId, e) : addWorkExperience(e))}
              className="flex flex-col gap-y-7"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex flex-col gap-[.5rem] w-full sm:w-[90%]">
                  <label className="font-semibold text-[#444846] text-[1rem]">Role *</label>
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
                  <label className="font-semibold text-[#444846] text-[1rem]">Company *</label>
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
                <label className="font-semibold text-[#444846] text-[1rem]">Description *</label>
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
                        <SelectTrigger className="w-[180px] outline-none">
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
                          setSelectedStartYear(value); // Update selected start year
                          const generatedEndYears = generateEndYears(value); // Generate end year options
                          setEndYears(generatedEndYears); // Set end year options
                        }}
                        value={startYear}
                      >
                        <SelectTrigger className="w-[180px] outline-none">
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
                        <SelectTrigger className="w-[180px] outline-none">
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
                        <SelectTrigger className="w-[180px] border-[2px] outline-none">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <>
                          <SelectContent>
                            {endYears.length === 0
                              ? years.map((year: any, index: number) => (
                                  <SelectItem key={index} value={year.value}>
                                    {year.label}
                                  </SelectItem>
                                ))
                              : endYears.map((year: any, index: number) => (
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
                        checked={isChecked}
                        onChange={() => {
                          setIsChecked((prev: boolean) => !prev);
                          // const date = new Date();
                          // const currMonth = months[date.getMonth()];
                          // const currYr = date.getFullYear();
                          // if (!isChecked) {
                          //   setEndMonth(currMonth?.value);
                          //   setEndYear(String(currYr));
                          // }
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
                  onClick={() => {
                    onCloseModal();
                    resetForm();
                    setIsEditMode(false);
                    setIsData(true);
                  }}
                  intent={'secondary'}
                  className="w-full rounded-md sm:w-[6rem]"
                  size={'lg'}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isLoading}
                  spinnerColor="#000"
                  disabled={isLoading}
                  type="submit"
                  className="w-full rounded-md sm:w-[6rem]"
                  size={'lg'}
                >
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
                className="text-brand-green-primary self-center text-[12px] sm:text-[15px] flex items-center gap-1 font-semibold font-manropeB outline-none"
                onClick={() => {
                  setIsForm(true);
                  setIsData(false);
                  resetForm();
                }}
              >
                <Add size="16" color="#009254" /> Add new work experience
              </button>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setIsEditMode(false);
                    setIsForm(false);
                    setIsData(true);
                    onCloseModal();
                  }}
                  intent={'secondary'}
                  className="w-full rounded-md sm:w-[6rem]"
                  size={'lg'}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={() => {
                    onSaveModal();
                  }}
                  className="w-full rounded-md sm:w-[6rem]"
                  size={'lg'}
                  disabled={isLoading}
                >
                  Save
                </Button>
              </div>
            </div>
          )}
        </>
      </div>
    </Modal>
  );
};

export default WorkExperienceModalSection;
