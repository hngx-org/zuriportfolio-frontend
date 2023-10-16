import React, { useContext, useState, useEffect } from 'react';
import Modal from '@ui/Modal';
import { Add, ArrowLeft2, CloseSquare } from 'iconsax-react';
import { Input } from '@ui/Input';
import Button from '@ui/Button';
import { DegreeOption, Education } from '../../../@types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
import { years } from '../data';
import { EducationModalContext } from '../context/education-context';

type EducationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const EducationSection: React.FC<EducationModalProps> = ({ isOpen, onClose }) => {
  const [editingEducationId, setEditingEducationId] = useState<string | null>();
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [isForm, setIsForm] = useState(false);
  const [isData, setIsData] = useState(false);
  const [educations, setEducations] = useState<Education[]>([]);
  const [degreeOptions, setDegreeOptions] = useState<DegreeOption[] | []>([]);
  const [degree, setDegree] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [description, setDescription] = useState('');
  const [school, setSchool] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [editMode, setEditMode] = useState(false);
  const resetForm = () => {
    setDegree('');
    setFieldOfStudy('');
    setDescription('');
    setFrom('');
    setTo('');
    setSchool('');
  };

  const prefillForm = (education: Education) => {
    setEditingEducationId(String(education.id));
    setDegree(education.degree);
    setFieldOfStudy(education.fieldOfStudy);
    setDescription(education.description);
    setSchool(education.school);
    setFrom(education.from);
    setTo(education.to);
    setIsForm(true);
  };

  function handleDelete(id: number | undefined, e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void {
    throw new Error('Function not implemented.');
  }
  useEffect(() => {
    fetch('https://hng6-r5y3.onrender.com/api/degree')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setDegreeOptions(data.data);
      });
  }, []);

  function addNewEducation(e: React.FormEvent<HTMLFormElement>): void {
    throw new Error('Function not implemented.');
  }

  return (
    // <Modal isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="xl">
    <div>
      <div className="space-y-6 bg-white-100 p-4 py-5">
        <div className="flex flex-col gap-3 px-10 mb-6">
          <div className="flex justify-between items-center">
            <>
              {editMode && (
                <ArrowLeft2
                  size="32"
                  color="#009254"
                  onClick={() => {
                    setIsForm(false);
                    setEditMode(false);
                    setIsData(true);
                    resetForm();
                  }}
                />
              )}
            </>
            <p className="text-[1.2rem] sm:text-[1.5rem] font-bold text-[#2E3130] font-manropeL">Education</p>
            <CloseSquare size="32" color="#009254" variant="Bold" onClick={onClose} className="cursor-pointer" />
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
                    className={`border-b-2 pt-4 pb-5 border-brand-disabled flex flex-col gap-5 px-2 py-3 sm:px-0 rounded-md shadow-md bg-white mb-4`}
                    key={index}
                  >
                    <div className="flex justify-around">
                      <p className="text-[#8D9290] font-semibold whitespace-normal font-manropeB">
                        {education.from} - {education.to}
                      </p>
                      <div className="">
                        <p className="text-[#2E3130] mb-1 text-[1.375rem] whitespace-normal font-semibold">
                          {education.fieldOfStudy}
                        </p>
                        <p className="font-normal text-brand-green-primary font-semibold text-md">{education.school}</p>
                        <p className="font-normal text-brand-green-primary font-semibold text-md">{education.degree}</p>
                      </div>
                      <p
                        style={{
                          whiteSpace: 'normal',
                          overflowWrap: 'break-word',
                        }}
                        className="font-semibold whitespace-normal font-manropeEB text-[14px]  text-[#737876] "
                      >
                        {education.description}
                      </p>
                    </div>
                    <div className="self-end flex gap-4 font-manropeL px-8">
                      <span
                        onClick={(e) => {
                          setEditMode(true);
                          setEditingEducation(education);
                          prefillForm(education);
                          setIsData(false);
                        }}
                        className="font-semibold cursor-pointer text-[#5B8DEF]"
                      >
                        Edit
                      </span>
                      <span
                        className="font-semibold cursor-pointer text-brand-red-hover"
                        onClick={(e) => handleDelete(education.id, e)}
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
          {editMode && (
            <article className={`border-b-2 pt-4 pb-5 border-brand-disabled flex flex-col gap-5 px-2 py-3 sm:px-0`}>
              <div className="flex flex-col gap-[.5rem] w-full mb-4">
                <label className="font-semibold text-[#444846] text-[1rem] mt-6">Degree</label>
                <Select
                  onValueChange={(value: string) => {
                    setDegree(value);
                  }}
                  value={degree}
                >
                  <SelectTrigger className="w-full focus:outline-none border focus:ring-0 focus-within:border-brand-green-primary border-solid border-[2px] border-white-120">
                    <SelectValue placeholder="Select a degree" />
                  </SelectTrigger>
                  <SelectContent>
                    {degreeOptions.map((option: DegreeOption, index: number) => (
                      <SelectItem key={index} value={option.type} className="hover:text-[#009254] hover:bg-[#F4FBF6]">
                        {option.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-[#2E3130] mb-1 text-[1.375rem] font-semibold">{editingEducation?.fieldOfStudy}</p>
                <p className="font-normal text-brand-green-primary text-sm">{editingEducation?.school}</p>
              </div>
              <p
                style={{
                  whiteSpace: 'normal',
                  overflowWrap: 'break-word',
                }}
                className="font-semibold text-left font-manropeEB text-[12px] max-w-full sm:pl-[2rem] text-ellipsis text-[#737876]"
              >
                {editingEducation?.description}
              </p>
              <div className="self-end flex gap-4 font-manropeL">
                <span className="font-semibold cursor-pointer text-[#5B8DEF]">Edit</span>
                <span
                  className="font-semibold cursor-pointer text-brand-red-hover"
                  onClick={(e) => handleDelete(editingEducation?.id, e)}
                >
                  Delete
                </span>
              </div>
            </article>
          )}
        </div>
        <>
          {isForm && (
            <form onSubmit={(e) => addNewEducation(e)} className="w-full gap-y-7 px-12">
              <div className="w-full">
                <div className="flex flex-col gap-[.5rem] w-full mb-4">
                  <label className="font-semibold text-[#444846] text-[1rem] mt-6">Degree</label>
                  <Select
                    onValueChange={(value: string) => {
                      setDegree(value);
                    }}
                    value={degree}
                  >
                    <SelectTrigger className="w-full focus:outline-none border focus:ring-0 focus-within:border-brand-green-primary border-solid border-[2px] border-white-120">
                      <SelectValue placeholder="Select a degree" />
                    </SelectTrigger>
                    <SelectContent>
                      {degreeOptions.map((option: DegreeOption, index: number) => (
                        <SelectItem key={index} value={option.type} className="hover:text-[#009254] hover:bg-[#F4FBF6]">
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
                  <label
                    className="block mb-1 text-[16px] max-w-full  text-ellipsis font-semibold"
                    htmlFor="description"
                  >
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
                <div className="w-full">
                  <div className="flex gap-4 w-full">
                    <div className="w-1/2 font-semibold">
                      <label>From*</label>
                    </div>
                    <div className="w-1/2 font-semibold">
                      <label>To*</label>
                      {''}
                    </div>
                  </div>

                  <div className="w-full flex gap-2">
                    <>
                      <Select
                        onValueChange={(value: string) => {
                          setFrom(value);
                        }}
                        value={from}
                      >
                        <SelectTrigger className="w-[400px]">
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
                        <SelectTrigger className="w-[400px]">
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
                <div className="flex flex-col sm:flex-row gap-3 justify-start sm:justify-end mt-12">
                  <Button
                    type="button"
                    onClick={() => {
                      onClose();
                      resetForm();
                      setEditMode(false);
                      setIsForm(false);
                    }}
                    className="w-full rounded-md sm:w-[6rem]"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="w-full rounded-md sm:w-[6rem]">
                    Save
                  </Button>
                </div>
              </div>
            </form>
          )}
        </>
        <>
          {!isForm && (
            <div className="px-3 gap-2 flex justify-between flex-col sm:flex-row">
              <button
                className="text-brand-green-primary self-center text-[12px] sm:text-[15px] flex items-center gap-1 font-semibold font-manropeB"
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
                    onClose();
                    resetForm();
                    setEditMode(false);
                    setIsForm(false);
                  }}
                  className="w-full rounded-md sm:w-[6rem]"
                >
                  Cancel
                </Button>
                <Button type="submit" className="w-full rounded-md sm:w-[6rem]">
                  Save
                </Button>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default EducationSection;
