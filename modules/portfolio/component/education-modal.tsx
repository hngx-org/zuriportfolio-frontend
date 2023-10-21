import { useContext, useEffect, useState } from 'react';
import Modal from '@ui/Modal';
import { Add, ArrowLeft2, CloseSquare } from 'iconsax-react';
import { Input } from '@ui/Input';
import Button from '@ui/Button';
import { Education, DegreeOption } from '../../../@types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
import { generateEndYears, years } from '../data';
import { EducationModalContext } from '../context/education-context';
import Portfolio from '../../../context/PortfolioLandingContext';
import Loader from '@ui/Loader';
import { Edit2, Trash } from 'iconsax-react';

type EducationModalProps = {
  isOpen: boolean;
  onCloseModal: () => void;
  onSaveModal: () => void;
};

const EducationSection: React.FC<EducationModalProps> = ({ isOpen, onCloseModal, onSaveModal }) => {
  const [selectedStartYear, setSelectedStartYear] = useState('');
  const [endYears, setEndYears] = useState<any>([]);

  const {
    degreeOptions,
    fieldOfStudy,
    description,
    school,
    from,
    to,
    educations,
    addNewEducation,
    setDegreeOptions,
    setFieldOfStudy,
    setFrom,
    setTo,
    isForm,
    degree,
    setDegree,
    setSchool,
    setIsForm,
    setDescription,
    setStartYear,
    handleDeleteEducation,
    handleEditEducation,
    isEditMode,
    setIsEditMode,
    resetForm,
    handleDegreeSelection,
    isData,
    setIsData,
    selectedDegreeId,
    setSelectedDegreeId,
    setnewdegree,
    setEditingEducationId,
    editingEducationId,
    isLoading,
  } = useContext(EducationModalContext);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);

  // const[degreeOptions, setDegreeOptions] = useState<DegreeOption | null>(null);

  const prefillForm = async (education: any) => {
    setSelectedDegreeId(String(education.degree.id));
    setEditingEducationId(String(education.id));
    setnewdegree();
    setFieldOfStudy(education.fieldOfStudy);
    setDescription(education.description);
    setSchool(education.school);
    setFrom(education.from);
    setTo(education.to);
    setIsForm(true);
  };

  return (
    <Modal isOpen={isOpen} closeModal={onCloseModal} isCloseIconPresent={false} size="xl">
      <div className="space-y-6 bg-white-100 px-6 py-5 max-sm:px-">
        <div className="flex flex-col gap-3 mb-6  w-full">
          <div className="flex justify-between items-center">
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
            <p className="text-[1.2rem] sm:text-[1.5rem] font-bold text-[#2E3130] font-manropeL">Education</p>
            <CloseSquare size="32" color="#009254" variant="Bold" onClick={onCloseModal} className="cursor-pointer" />
          </div>
          <div className="bg-brand-green-primary h-1 rounded-sm"></div>
        </div>
        {/* <>{isLoading && <Loader />}</> */}
        <>
          {isData && (
            <div className="">
              {educations.map((education: Education, index: number) => {
                const year = new Date().getFullYear();
                const currYear = String(year);
                const endYear = education.to === currYear ? 'Present' : education.to;
                console.log(education);

                return (
                  <>
                    <article key={index} className="border-b-2 flex flex-col border-brand-disabled">
                      <section className="flex w-full gap-x-10 mb-4 max-sm:flex-col max-sm:gap-y-3">
                        <p className="text-[#8D9290] font-semibold font-manropeB">
                          {education?.from} - {endYear}
                        </p>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-200">{education?.fieldOfStudy}</h3>
                          <p className="text-sm font-manropeL text-brand-green-primary">{education?.school}</p>
                        </div>
                        <p className="font-semibold text-sm text-gray-400 break-all flex-[4] break-normal">
                          {education?.description}
                        </p>
                      </section>
                      <div className="self-end pb-4 flex gap-4 font-manropeL">
                        <span
                          className="font-semibold cursor-pointer "
                          onClick={(e) => {
                            setIsEditMode(true);
                            setEditingEducation(education);
                            prefillForm(education);
                            setIsData(false);
                          }}
                        >
                          <Edit2 size="24" color="#37d67a" variant="Outline" />
                        </span>
                        <span
                          className="font-semibold cursor-pointer"
                          onClick={(e) => handleDeleteEducation(education.id, e)}
                        >
                          <Trash size="24" color="#f47373" variant="Outline" />
                        </span>
                      </div>
                    </article>
                  </>
                );
              })}
            </div>
          )}
        </>
        <div>
          {isEditMode && (
            <article className={`border-b-2 pt-4 pb-5 border-brand-disabled flex flex-col gap-5 px-2 py-3 sm:px-0 `}>
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                <div className="flex gap-3 sm:gap-5 flex-col sm:flex-row">
                  <p className="text-[#8D9290] font-semibold font-manropeB">
                    {editingEducation?.from} - {to}
                  </p>
                  <div>
                    <p className="text-[#2E3130] mb-1 text-[1.375rem] font-semibold">
                      {editingEducation?.fieldOfStudy}
                    </p>
                    <p className="font-normal text-brand-green-primary text-sm">{editingEducation?.school}</p>
                  </div>
                </div>
                <p
                  style={{
                    whiteSpace: 'normal',
                    overflowWrap: 'break-word',
                  }}
                  className="font-semibold text-left sm:text-right font-manropeEB text-[12px] max-w-full sm:pl-[2rem] text-ellipsis text-[#737876]"
                >
                  {editingEducation?.description}
                </p>
              </div>
              <div className="self-end flex gap-4 font-manropeL">
                <span className="font-semibold cursor-pointer text-[#5B8DEF]">Edit</span>
                <span
                  className="font-semibold cursor-pointer text-brand-red-hover"
                  onClick={(e) => handleDeleteEducation(editingEducation?.id, e)}
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
              onSubmit={(e) => (isEditMode ? handleEditEducation(e, editingEducationId) : addNewEducation(e))}
              className=""
            >
              <div className="w-full px-2">
                <div className="flex flex-col gap-[.5rem] w-full mb-4">
                  <label className="font-semibold text-[#444846] text-base mt-6">Degree *</label>
                  <Select
                    onValueChange={(value: string) => {
                      handleDegreeSelection(value); // Update the selected degree ID
                    }}
                    value={selectedDegreeId}
                  >
                    <SelectTrigger className="w-full focus:outline-none focus:ring-0 focus-within:border-brand-green-primary border-solid border-[2px] border-white-120">
                      <SelectValue placeholder="Select a degree" />
                    </SelectTrigger>
                    <SelectContent>
                      {degreeOptions?.map((option: Omit<DegreeOption, 'id'> & { id: string }) => (
                        <SelectItem
                          key={option.id}
                          value={option.id}
                          className="hover:text-[#009254] hover:bg-[#F4FBF6]"
                        >
                          {option.type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="mb-4 w-full">
                  <label className="block mb-1 text-base font-semibold text-[#444846]" htmlFor="fieldOfStudy">
                    Field of Study *
                  </label>
                  <Input
                    type="text"
                    placeHolder="Enter field of study"
                    value={fieldOfStudy}
                    onChange={(e) => setFieldOfStudy(e.target.value)}
                    className="w-full border-white-120"
                  />
                </div>
                <div className="mb-4  w-full">
                  <label className="block mb-1 text-base font-semibold text-[#444846]" htmlFor="school">
                    School/Institution *
                  </label>
                  <Input
                    type="text"
                    placeHolder="Enter name of school"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="w-full border-white-120"
                  />
                </div>
                <div className="mb-4 w-full">
                  <label className="block mb-1 text-base font-semibold text-[#444846]" htmlFor="description">
                    Description *
                  </label>
                  <textarea
                    className="resize-none border-[1px] border-solid w-full border-[#E1E3E2] pt-2 pl-2 text-dark-600 rounded-lg outline-none focus:border-brand-green-primary "
                    rows={4}
                    value={description}
                    placeholder="Add more details"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="w-full">
                <div className="flex gap-4 ">
                  <div className=" font-semibold w-3/6">
                    <label className="text-[#444846]">From*</label>
                    <>
                      <Select
                        onValueChange={(value: string) => {
                          setFrom(value);
                          setSelectedStartYear(value); // Update selected start year
                          const generatedEndYears = generateEndYears(value); // Generate end year options
                          setEndYears(generatedEndYears); // Set end year options
                        }}
                        value={from}
                      >
                        <SelectTrigger className="w-full">
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
                  <div className="font-semibold w-3/6">
                    <label className="text-[#444846]">To*</label>
                    <>
                      <Select
                        onValueChange={(value: string) => {
                          setTo(value);
                        }}
                        value={to}
                      >
                        <SelectTrigger className="w-full">
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
                    {''}
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-start sm:justify-end mt-6">
                <Button
                  type="button"
                  onClick={() => {
                    onCloseModal();
                    resetForm();
                    setIsEditMode(false);
                    setIsForm(false);
                  }}
                  intent={'secondary'}
                  className="w-full rounded-md sm:w-[6rem]"
                  size={'lg'}
                >
                  Cancel
                </Button>
                <Button disabled={isLoading} type="submit" className="w-full rounded-md sm:w-[6rem]" size={'lg'}>
                  {isLoading ? <Loader /> : 'Save'}
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
                <Add size="16" color="#009254" /> Add new Education
              </button>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  onClick={() => {
                    onCloseModal();
                    resetForm();
                    setIsEditMode(false);
                    setIsForm(false);
                  }}
                  intent={'secondary'}
                  className="w-full rounded-md sm:w-[6rem]"
                  size={'lg'}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full rounded-md sm:w-[6rem]"
                  size={'lg'}
                  disabled={isData}
                  onClick={() => {
                    console.log('SAVING');
                    onSaveModal();
                  }}
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
export default EducationSection;
