import React, { createContext, useEffect, useState } from 'react';
import { Education, DegreeOption } from '../../../@types';
import { notify } from '@ui/Toast';

interface EducationModalContextType {
  educations: Education[];
  handleDelete: (id: string) => void;
  getAllEducationDetail: () => void;
  addNewEducation: (education: Education) => void;
  handleEditEducation: (id: string) => void;
  degree: string;
  fieldOfStudy: string;
  description: string;
  school: string;
  from: string;
  to: string;
  degreeId: string;
  isForm: boolean;
  setDegree: (text: string) => void;
  setFieldOfStudy: (text: string) => void;
  setDescription: (text: string) => void;
  setSchool: (text: string) => void;
  setFrom: (text: string) => void;
  setTo: (text: string) => void;
  setIsForm: (value: boolean) => void; // Added
  resetForm: () => void;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  isData: boolean;
  setIsData: (value: boolean) => void;
}

export const EducationModalContext = createContext<any>('');

export const EducationModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [degree, setDegree] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [description, setDescription] = useState('');
  const [degreeOptions, setDegreeOptions] = useState<DegreeOption[]>([]);
  const [school, setSchool] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [isForm, setIsForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isData, setIsData] = useState(false);
  const resetForm = () => {
    setDegree('');
    setFieldOfStudy('');
    setDescription('');
    setFrom('');
    setTo('');
    setSchool('');
  };

  const API_BASE_URL = 'https://hng6-r5y3.onrender.com/';
  const userId = 'f8e1d17d-0d9e-4d21-89c5-7a564f8a1e90';

  const getAllEducationDetail = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}api/educationDetail/${userId}`, {
        method: 'GET',
      });
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

  const [educations, setEducations] = useState<Education[] | []>([]);

  const handleDelete = async (id: number, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}api/education/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        notify({
          message: `education ${editMode ? 'Edited' : 'Deleted'} successfully`,
          position: 'top-center',
          theme: 'light',
          type: 'success',
        });
        setEducations((prevEducation) => prevEducation.filter((education) => education.id !== id));
      }
    } catch (error) {
      console.log(error);
      notify({
        message: 'Was not able to delete education',
        position: 'top-center',
        theme: 'light',
        type: 'success',
      });
    }
  };
  const handleEditEducation = async (id: string) => {
    console.log(id);
    const selectedDegreeOption = degreeOptions.find((option) => option.type === degree)!;
    try {
      const response = await fetch(`${API_BASE_URL}api/updateEducationDetail/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          degreeId: selectedDegreeOption,
          degree,
          fieldOfStudy,
          school,
          from,
          to,
          description,
          sectionId: 22,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addNewEducation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const missingFields = [];

      if (fieldOfStudy === '') {
        missingFields.push('fieldOfStudy');
      }
      if (school === '') {
        missingFields.push('school');
      }
      if (description === '') {
        missingFields.push('Description');
      }

      if (missingFields.length > 0) {
        const missingFieldsString = missingFields.join(', ');
        notify({
          message: `Please fill in the required fields: ${missingFieldsString}`,
          position: 'top-center',
          theme: 'light',
          type: 'error',
        });
        return;
      }

      const year = new Date().getFullYear();
      const currYear = String(year);
      const selectedDegreeOption = degreeOptions.find((option) => option.type === degree)!;

      const response = await fetch(`${API_BASE_URL}api/education/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          degreeId: selectedDegreeOption,
          degree,
          fieldOfStudy,
          school,
          from,
          to,
          description,
          sectionId: 22,
        }),
      });

      if (response.ok) {
        getAllEducationDetail();
        notify({
          message: 'education created successfully',
          position: 'top-center',
          theme: 'light',
          type: 'success',
        });
        resetForm();
        setIsForm(false);
        setIsData(true);
      } else {
        // Request failed, handle the error
        console.error('Request failed with status:', response.status);
        notify({
          message: 'no education added',
          position: 'top-center',
          theme: 'light',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getAllEducationDetail();
  }, []);

  return (
    <EducationModalContext.Provider
      value={{
        degree,
        fieldOfStudy,
        description,
        school,
        from,
        to,
        isForm,
        educations,
        editMode,
        isData,
        resetForm,
        setDegree,
        setDescription,
        setFrom,
        setTo,
        setSchool,
        handleDelete,
        getAllEducationDetail,
        handleEditEducation,
        addNewEducation,
        setEditMode,
        setIsForm,
        setIsData,
      }}
    >
      {children}
    </EducationModalContext.Provider>
  );
};
