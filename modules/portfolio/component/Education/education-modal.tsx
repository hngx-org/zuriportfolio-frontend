import React, { useState, useEffect, ChangeEvent } from 'react';
import Modal from '@ui/Modal';
import Button from '@ui/Button';
import useDisclosure from '../../../../hooks/useDisclosure';
import { useEducation } from '../Education/EducationContext';
import { CloseSquare } from 'iconsax-react';
import { Input, SelectInput } from '@ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';

interface EducationData {
  degree: string;
  fieldOfStudy: string;
  school: string;
  description: string;
  dateFrom: string;
  dateTo: string;
}
function EducationSection() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { educationList, addEducation, deleteEducation } = useEducation();
  const [educationData, setEducationData] = useState<EducationData>({
    degree: '',
    fieldOfStudy: '',
    school: '',
    description: '',
    dateFrom: '',
    dateTo: '',
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [formChanged, setFormChanged] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const initialEducationData: EducationData = {
    degree: '',
    fieldOfStudy: '',
    school: '',
    description: '',
    dateFrom: '',
    dateTo: '',
  };
  const selectOptions = [
    {
      value: 'MasterDegree',
      label: 'Masters of Science(M.Sc)',
    },
    {
      value: 'BachelorDegree',
      label: 'Bachelors of Science(B.Sc)',
    },
    {
      value: 'Post Graduate',
      label: 'Post Graduate',
    },
    {
      value: 'Ph.D.',
      label: 'Doctor of Philosophy (phD)',
    },
  ];
  const handleSave = () => {
    if (editIndex !== null) {
      const updatedList = [...educationList];
      updatedList[editIndex] = { ...educationData };
      setEducationData(initialEducationData);
      setEditIndex(null);
    } else {
      addEducation(educationData);
      setEducationData(initialEducationData);
    }
    setShowForm(false);
    setFormChanged(false);
    setEditMode(false);
  };
  useEffect(() => {
    setEducationData(educationData);
  }, [educationData]);

  const handleEdit = (index: number) => {
    const entryToEdit = educationList[index];
    console.log('Entry to Edit:', entryToEdit);
    setEducationData({ ...entryToEdit });
    setEditIndex(index);
    setEditMode(true);
    setShowForm(true);
    setFormChanged(false);
  };

  const handleDelete = (index: number) => {
    deleteEducation(index);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof EducationData) => {
    setEducationData({ ...educationData, [field]: e.target.value });
    setFormChanged(true);
  };
  const handleCancel = () => {
    if (formChanged) {
      if (window.confirm('Discard changes?')) {
        setEducationData(initialEducationData);
        setShowForm(false);
        setFormChanged(false);
        setEditMode(false);
      }
    } else {
      setEducationData(initialEducationData);
      setShowForm(false);
      setEditMode(false);
    }
  };

  return (
    <>
      <Button onClick={() => setShowModal((p) => !p)}>openModal</Button>
      <Modal
        closeOnOverlayClick
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        isCloseIconPresent={false}
        size="sm"
      >
        <div className="education-section p-4 w-full">
          <div className="flex justify-between items-center border-b-4 border-green-600 mb-11 ">
            <h2 className="text-3xl font-[24px] font-Manrope font-semibold pb-2">Education</h2>
            <CloseSquare
              size="32"
              color="#009254"
              variant="Bold"
              onClick={() => setShowModal(false)}
              className="cursor-pointer"
            />
          </div>
          {showForm ? (
            <div className="w-full">
              <div className="mb-4 w-full">
                <label className="block mb-1 text-md font-bold" htmlFor="Degree">
                  Degree
                </label>
                <Select
                  onValueChange={(value) => {
                    console.log(value);
                  }}
                >
                  <SelectTrigger className="w-full focus:outline-none border focus:ring-0 focus-within:border-brand-green-primary border-solid border-[2px] border-white-400 ">
                    <SelectValue placeholder="Select a degree" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectOptions.map((option, index) => (
                      <SelectItem key={index} value={option.value} className="hover:text-[#009254] hover:bg-[#F4FBF6]">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-md font-bold" htmlFor="fieldOfStudy">
                  Field of Study
                </label>
                <Input
                  type="text"
                  intent={'default'}
                  placeHolder="Enter field of study"
                  onChange={(e) => handleChange(e, 'fieldOfStudy')}
                  className="w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-md font-bold" htmlFor="school">
                  School/Institution
                </label>
                <Input
                  type="text"
                  intent={'default'}
                  placeHolder="Enter school name"
                  onChange={(e) => handleChange(e, 'school')}
                  className="w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-md font-bold" htmlFor="description">
                  Description
                </label>
                <Input
                  type="text"
                  intent={'default'}
                  placeHolder="Add some details"
                  onChange={(e) => handleChange(e, 'description')}
                  className="w-full"
                />
              </div>
              <div className="mb-4 flex gap-4">
                <div className="w-1/2">
                  <label className="block mb-1 text-md font-bold" htmlFor="dateFrom">
                    From*
                  </label>
                  <Input
                    type="date"
                    intent={'default'}
                    placeHolder="2023"
                    onChange={(e) => handleChange(e, 'dateFrom')}
                    className="w-full"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block mb-1 text-md font-bold" htmlFor="dateTo">
                    To*
                  </label>
                  <Input
                    type="date"
                    intent={'default'}
                    placeHolder="Present"
                    onChange={(e) => handleChange(e, 'dateTo')}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  intent={'primary'}
                  className="bg-white text-lg font-semibold text-[#009444] border border-green-600 rounded-lg border-2 mr-6 px-6 py-3 rounded hover:bg-red-500 hover:text-white cursor-pointer"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  intent={'success'}
                  className="bg-[#009444] text-lg font-semibold text-white-100 border border-green-600 rounded-lg border-2 px-8 py-3 rounded cursor-pointer"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div className="saved-section border-transparent">
              {educationList.map((entry, index) => (
                <div key={index} className="border border-transparent flex flex-wrap mt-3">
                  <div className="w-full sm:w-1/4 py-6">
                    <p className="text-sm text-gray-600">
                      {entry.dateFrom.split('-')[0]} - {entry.dateTo.split('-')[0]}
                    </p>
                  </div>
                  <div className="w-full sm:w-1/4 py-6">
                    <p className="text-lg font-semibold">{entry.fieldOfStudy}</p>
                    <p>{entry.school}</p>
                  </div>
                  <div className="w-full sm:w-1/4 py-6 ml-20">
                    <p>{entry.description}</p>
                  </div>
                  <div className="w-full flex justify-end mt-2">
                    <div className="ml-auto">
                      <a
                        className="text-[#5B8DEF] cursor-pointer mr-2 text-lg font-semibold"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </a>
                      <a
                        className="text-[#FF5C5C] cursor-pointer ml-2 text-lg font-semibold"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t border-gray-300 w-full h-0"></div>
              <div className="mt-4 flex items-center justify-between h-24 gap-2">
                <a
                  className="text-[16px] font-medium text-green-600 cursor-pointer mr-3"
                  onClick={() => {
                    setEducationData({
                      degree: '',
                      fieldOfStudy: '',
                      school: '',
                      description: '',
                      dateFrom: '',
                      dateTo: '',
                    });
                    setEditIndex(null);
                    setShowForm(true);
                  }}
                >
                  + Add new education
                </a>
                <div className="mt-4 flex justify-end">
                  <Button
                    intent={'primary'}
                    className="bg-white text-lg font-semibold text-[#009444] border border-green-600 rounded-lg border-2 mr-4 px-4 py-3 rounded hover:bg-red-500 hover:text-white cursor-pointer"
                    onClick={() => {
                      setShowForm(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    intent={'success'}
                    className="bg-[#009444] text-lg font-semibold text-white-100 border border-green-700 rounded-lg border-2 px-6 py-3 rounded cursor-pointer"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

export default EducationSection;
