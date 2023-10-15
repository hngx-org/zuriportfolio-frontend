import React, { useState, useEffect } from 'react';
import Modal from '@ui/Modal';
import { Add, CloseSquare } from 'iconsax-react';
import { Input } from '@ui/Input';
import Button from '@ui/Button';
import { DegreeOption, Education } from '../../../@types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
import { months, years } from '../data';

type EducationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const EducationSection: React.FC<EducationModalProps> = ({ isOpen, onClose }) => {
  const [educations, setEducations] = useState<Education[]>([]);
  const [degreeOptions, setDegreeOptions] = useState<DegreeOption[]>([]);
  const [degree, setDegree] = useState('');
  // const [educationDetails, setEducationDetails] = useState<EducationDetail[]>([]);
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [description, setDescription] = useState('');
  const [school, setSchool] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [isForm, setIsForm] = useState(true);
  const [editedEducation, setEditedEducation] = useState<Education | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [educationId, setEducationId] = useState(0);
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');

  useEffect(() => {
    fetch('https://hng6-r5y3.onrender.com/api/degree')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDegreeOptions(data.data);
      });
  }, []);
  const API_BASE_URL = 'https://hng6-r5y3.onrender.com/';
  const userId = 'f8e1d17d-0d9e-4d21-89c5-7a564f8a1e90';
  const getAllEducationDetail = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}api/getPortfolioDetails/${userId}`);
      if (response.ok) {
        const data = await response.json();
        const { education } = data;
        console.log(education);
        setEducations(education);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllEducationDetail();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedDegreeOption = degreeOptions.find((option) => option.type === degree)!;
    const educationObj = {
      // sectionId: 22,
      degreeId: 1,
      fieldOfStudy: fieldOfStudy,
      school: school,
      description: description,
      from: from,
      to: to,
    };
    if (editMode) {
      console.log(editMode);
      console.log(educationObj);
      try {
        const response = await fetch(`https://hng6-r5y3.onrender.com/api/updateEducationDetail/${educationId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(educationObj),
        });
        if (response.ok) {
          console.log('Education details created successfully.');
          setIsForm(false);
        } else {
          console.error('Failed to create Education details.');
        }
      } catch (error) {
        console.error('Error creating education details:', error);
      }
    } else {
      try {
        const response = await fetch(
          'https://hng6-r5y3.onrender.com/api/education/f8e1d17d-0d9e-4d21-89c5-7a564f8a1e90',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(educationObj),
          },
        );

        if (response.ok) {
          console.log('Education details created successfully.');
          setIsForm(false);
        } else {
          console.error('Failed to create Education details.');
        }
      } catch (error) {
        console.error('Error creating education details:', error);
      }
    }
  };
  const handleEdit = async (id: number) => {
    const editedEducation = educations.find((education) => education.id === id);
    if (editedEducation) {
      setDegree(degree + 'bachelor of science');
      setFieldOfStudy(editedEducation.fieldOfStudy);
      setDescription(editedEducation.description);
      setSchool(editedEducation.school);
      setFrom(editedEducation.from);
      setTo(editedEducation.to);
      // setIsForm(true);
      setEditMode(true);
      setEducationId(editedEducation.id);
      // setEditedEducation(editedEducation);
    }
    if (editedEducation) {
      console.log('yes', editMode);
      console.log('yes', educationId);
    }
  };

  const handleSaveEdit = async (id: number) => {
    // const selectedDegreeOption = degreeOptions.find((option) => option.type === degree)!;
    // const editEducationObj = {
    //   sectionId: 22,
    //   id:
    //   degreeId: selectedDegreeOption,
    //   fieldOfStudy: fieldOfStudy,
    //   school: school,
    //   description: description,
    //   from: dateFrom,
    //   to: dateTo,
    // };
    try {
      // console.log(`Editing education entry with degree`);
      const response = await fetch(`https://hng6-r5y3.onrender.com/api/educationDetail/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedEducation),
      });

      if (response.ok) {
        console.log('Education details updated successfully.');
      } else {
        console.error('Failed to update education details.');
      }
    } catch (error) {
      console.error('Error updating education details:', error);
    }

    // setEditMode(false);
    // setEditedEducation(null);
  };

  const handleDelete = async (id: number) => {
    try {
      // console.log(`Deleting education entry with degreeId`);
      const response = await fetch(`https://hng6-r5y3.onrender.com/api/education/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // console.log('Education details deleted successfully.');
        setEducations((prevEducation) => prevEducation.filter((education) => education.id !== id));
      } else {
        console.error('Failed to delete education details.');
      }
    } catch (error) {
      console.error('Error deleting education details:', error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="xl">
        <div className="space-y-6 bg-white-100 p-4 py-5">
          <div className="flex flex-col gap-3 px-10 mb-6">
            <div className="flex justify-between items-center">
              <p className="text-[1.2rem] sm:text-[1.5rem] font-bold text-[#2E3130] font-manropeL">Education</p>
              <CloseSquare size="32" color="#009254" variant="Bold" onClick={onClose} className="cursor-pointer" />
            </div>
            <div className="bg-brand-green-primary h-1 rounded-sm"></div>
          </div>
          <div className="">
            <div className="">
              {educations.map((education, index) => {
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
                        className="font-semibold whitespace-normal font-manropeEB text-[14px] px-6 max-w-full text-ellipsis text-[#737876] "
                      >
                        {education.description}
                      </p>
                    </div>
                    <div className="self-end flex gap-4 font-manropeL px-8">
                      <span
                        onClick={() => handleEdit(education.id)}
                        className="font-semibold cursor-pointer text-[#5B8DEF]"
                      >
                        Edit
                      </span>
                      <span
                        className="font-semibold cursor-pointer text-brand-red-hover"
                        onClick={() => handleDelete(education.id)}
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
              <form onSubmit={handleFormSubmit} className="w-full gap-y-7 px-12">
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
                        {degreeOptions.map((option, index) => (
                          <SelectItem
                            key={index}
                            value={option.type}
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
                    <label className="block mb-1 text-[16px] font-semibold" htmlFor="description">
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
                    <div className="flex gap-4">
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
                          <SelectTrigger className="w-[265px]">
                            <SelectValue placeholder="2023" />
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
                          <SelectTrigger className="w-[265px]">
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
                    <Button type="button" onClick={onClose} className="w-full rounded-md sm:w-[6rem]">
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="w-full rounded-md sm:w-[6rem]"
                      // onClick={() => handleSaveEdit(educations)}
                    >
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
                  onClick={() => setIsForm(true)}
                >
                  <Add size="16" color="#009254" /> Add new Education
                </button>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button type="button" onClick={onClose} className="w-full rounded-md sm:w-[6rem]">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="w-full rounded-md sm:w-[6rem]"
                    // onClick={() => handleSaveEdit(education.id)}
                  >
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

export default EducationSection;
