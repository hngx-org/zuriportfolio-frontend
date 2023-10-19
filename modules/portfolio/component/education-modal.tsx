import { useContext, useEffect, useState } from 'react';
import Modal from '@ui/Modal';
import { Add, ArrowLeft2, CloseSquare } from 'iconsax-react';
import { Input } from '@ui/Input';
import Button from '@ui/Button';
import { Education, DegreeOption } from '../../../@types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
import { years } from '../data';
import { EducationModalContext } from '../context/education-context';

type EducationModalProps = {
  isOpen: boolean;
  onCloseModal: () => void;
  onSaveModal: () => void;
};

const EducationSection: React.FC<EducationModalProps> = ({ isOpen, onCloseModal, onSaveModal }) => {
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
  } = useContext(EducationModalContext);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);

  // const[degreeOptions, setDegreeOptions] = useState<DegreeOption | null>(null);

  const prefillForm = async (education: any) => {
    console.log(degreeOptions);
    console.log(education, 'education from');
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
      <div className="space-y-6 bg-white-100 p-4 py-5">
        <div className="flex flex-col gap-3 px-6 mb-6">
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
        <>
          {isData && (
            <div className="">
              {educations.map((education: Education, index: number) => {
                const year = new Date().getFullYear();
                const currYear = String(year);
                const endYear = education.to === currYear ? 'Present' : education.to;

                return (
                  <article
                    className={`border-b-2 pt-4 pb-5 border-brand-disabled flex flex-col gap-5 px-2 py-3 sm:px-0`}
                    key={index}
                  >
                    <div className="flex justify-around">
                      <div className="flex gap-4">
                        <div className="gap-4">
                          <p className="text-[#8D9290] font-semibold font-manropeB">
                            {education?.from} - {endYear}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1 ml-4">
                          <p className="text-[#2E3130] mb-1 text-[1.375rem] font-semibold">{education.fieldOfStudy}</p>
                          <p className="font-normal text-brand-green-primary text-sm">{education.school}</p>
                        </div>
                      </div>
                      <p
                        style={{
                          whiteSpace: 'normal',
                          overflowWrap: 'break-word',
                        }}
                        className="font-semibold text-right font-manropeEB text-[12px] max-w-full sm:pl-[2rem] text-ellipsis text-[#737876]"
                      >
                        {education.description}
                      </p>
                    </div>
                    <div className="self-end flex gap-4 font-manropeL">
                      <span
                        className="font-semibold cursor-pointer text-[#5B8DEF]"
                        onClick={(e) => {
                          setIsEditMode(true);
                          setEditingEducation(education);
                          prefillForm(education);
                          setIsData(false);
                        }}
                      >
                        Edit
                      </span>
                      <span
                        className="font-semibold cursor-pointer text-brand-red-hover"
                        onClick={(e) => handleDeleteEducation(education.id, e)}
                      >
                        Delete
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </>
        <div>
          {isEditMode && (
            <article className={`border-b-2 pt-4 pb-5 border-brand-disabled flex flex-col gap-5 px-2 py-3 sm:px-0`}>
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
                  Delete
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
              <div className="w-full">
                <div className="flex flex-col gap-[.5rem] w-full mb-4">
                  <label className="font-semibold text-[#444846] text-[1rem] mt-6">Degree</label>
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
                      {degreeOptions.map((option: Omit<DegreeOption, 'id'> & { id: string }) => (
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
                  <label className="block mb-1 text-md font-semibold" htmlFor="fieldOfStudy">
                    Field of Study
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
                  <label className="block mb-1 text-md font-semibold" htmlFor="school">
                    School/Institution
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
                  <label className="block mb-1 text-[16px]  font-semibold" htmlFor="description">
                    Description
                  </label>
                  <Input
                    type="text"
                    placeHolder="Add more details"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border-white-120"
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="flex gap-4 ">
                  <div className="w-1/2 font-semibold">
                    <label>From*</label>
                  </div>
                  <div className="font-semibold w-[300px]">
                    <label>To*</label>
                    {''}
                  </div>
                </div>

                <div className="w-full flex gap-4">
                  <>
                    <Select
                      onValueChange={(value: string) => {
                        setFrom(value);
                      }}
                      value={from}
                    >
                      <SelectTrigger className="w-[320px]">
                        <SelectValue placeholder="2020" />
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
                  <>
                    <Select
                      onValueChange={(value: string) => {
                        setTo(value);
                      }}
                      value={to}
                    >
                      <SelectTrigger className="w-[320px]">
                        <SelectValue placeholder="Present" />
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
                className="text-brand-green-primary self-center text-[12px] sm:text-[15px] flex items-center gap-1 font-semibold font-manropeB outline-none"
                onClick={() => {
                  setIsForm(true);
                  setIsData(false);
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
                  onClick={() => {
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
