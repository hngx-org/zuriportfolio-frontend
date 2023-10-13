import React, { useState, useEffect } from 'react';
import Modal from '@ui/Modal';
import { Add, CloseSquare } from 'iconsax-react';
import { Input } from '@ui/Input';
import Button from '@ui/Button';
import { DegreeOption, Education } from '../../../@types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';

type EducationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const EducationSection: React.FC<EducationModalProps> = ({ isOpen, onClose }) => {
  const [educations, setEducations] = useState<Education[]>([]);
  const [degreeOptions, setDegreeOptions] = useState<DegreeOption[]>([]);
  const [degree, setDegree] = useState<string>('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [description, setDescription] = useState('');
  const [school, setSchool] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [isForm, setIsForm] = useState(true);
  const [editedEducation, setEditedEducation] = useState<Education | null>(null);
  const [editMode, setEditMode] = useState(false);
  // const[userId, setUserId] = useState();

  useEffect(() => {
    fetch('https://hng6-r5y3.onrender.com/api/degree')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDegreeOptions(data.data);
      });
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedDegreeOption = degreeOptions.find((option) => option.type === degree)!;
    const educationObj = {
      sectionId: 22,
      degreeId: selectedDegreeOption.id,
      fieldOfStudy: fieldOfStudy,
      school: school,
      description: description,
      from: dateFrom,
      to: dateTo,
    };

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
      } else {
        console.error('Failed to create Education details.');
      }
    } catch (error) {
      console.error('Error creating education details:', error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      console.log(`Editing education entry with degree`);
      const response = await fetch('https://hng6-r5y3.onrender.com/api/updateEducationDetail/1', {
        method: 'PUT',
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

    setEditMode(false);
    setEditedEducation(null);
  };

  const handleDelete = async () => {
    try {
      console.log(`Deleting education entry with degreeId`);
      const response = await fetch(
        `https://hng6-r5y3.onrender.com/api/education/f8e1d17d-0d9e-4d21-89c5-7a564f8a1e90`,
        {
          method: 'DELETE',
        },
      );

      if (response.ok) {
        console.log('Education details deleted successfully.');
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
          <div className="flex flex-col gap-3 px-12 mb-6">
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
                    className={`border-b-2 pt-4 pb-5 border-brand-disabled flex flex-col gap-5 px-2 py-3 sm:px-0`}
                    key={index}
                  >
                    <div className="flex justify-around">
                      <p className="text-[#8D9290] font-semibold font-manropeB">
                        {education.dateFrom} - {education.dateTo}
                      </p>
                      <div className="">
                        <p className="text-[#2E3130] mb-1 text-[1.375rem] font-semibold">{education.fieldOfStudy}</p>
                        <p className="font-normal text-brand-green-primary text-sm">{education.school}</p>
                      </div>
                      <p
                        style={{
                          whiteSpace: 'normal',
                          overflowWrap: 'break-word',
                        }}
                        className="font-semibold font-manropeEB text-[12px] max-w-full text-ellipsis text-[#737876] "
                      >
                        {education.description}
                      </p>
                    </div>
                    <div className="self-end flex gap-4 font-manropeL">
                      <span onClick={() => handleSaveEdit()} className="font-semibold cursor-pointer text-[#5B8DEF]">
                        Edit
                      </span>
                      <span
                        className="font-semibold cursor-pointer text-brand-red-hover"
                        onClick={() => handleDelete()}
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
                      intent={'default'}
                      placeHolder="Enter field of study"
                      value={fieldOfStudy}
                      onChange={(e) => setFieldOfStudy(e.target.value)}
                      className="w-full border-white-120"
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <label className="block mb-1 text-md font-semibold" htmlFor="fieldOfStudy">
                      School/Institution
                    </label>
                    <Input
                      type="text"
                      intent={'default'}
                      placeHolder="Enter name of school"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      className="w-full border-white-120"
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <label className="block mb-1 text-md font-semibold" htmlFor="fieldOfStudy">
                      Description
                    </label>
                    <Input
                      type="text"
                      intent={'default'}
                      placeHolder="Add more details"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full border-white-120"
                    />
                  </div>
                  <div className="mb-4 flex gap-4">
                    <div className="w-1/2">
                      <label className="block mb-1 text-md font-semibold" htmlFor="dateFrom">
                        From*
                      </label>
                      <Input
                        type="date"
                        intent={'default'}
                        placeHolder="2023"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className="w-full border-white-120"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block mb-1 text-md font-semibold" htmlFor="dateTo">
                        To*
                      </label>
                      <Input
                        type="date"
                        intent={'default'}
                        placeHolder="Present"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        className="w-full border-white-120"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-start sm:justify-end mt-12">
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
                  <Add size="16" color="#009254" /> Add new Education
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

export default EducationSection;
