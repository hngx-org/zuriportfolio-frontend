import React, { createContext, useEffect, useState } from 'react';
import { WorkExperience } from '../../../@types';

interface WorkExperienceModalContextType {
  workExperiences: WorkExperience[];
  handleDeleteExperience: (id: string) => void;
  getAllWorkExperience: () => void;
  addWorkExperience: (experience: WorkExperience) => void;
  handleEditExperience: (id: string) => void;
  role: string;
  company: string;
  description: string;
  startMonth: string;
  endMonth: string;
  endYear: string;
  startYear: string;
  isChecked: boolean;
  isForm: boolean;
  idCounter: number;
  setCompany: (text: string) => void;
  setRole: (text: string) => void;
  setDescription: (text: string) => void;
  setStartMonth: (text: string) => void;
  setEndMonth: (text: string) => void;
  setStartYear: (text: string) => void;
  setEndYear: (text: string) => void;
  setIsForm: (value: boolean) => void; // Added
  setIsChecked: (value: boolean) => void; // Added
  resetForm: () => void;
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
}

export const WorkExperienceModalContext = createContext<any>(null);

export const WorkExperienceModalContextProvider = ({ children }: { children: React.ReactNode }) => {
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
  const [isEditMode, setIsEditMode] = useState(false);
  const resetForm = () => {
    setRole('');
    setCompany('');
    setDescription('');
    setStartMonth('');
    setEndMonth('');
    setStartYear('');
    setEndYear('');
    setIsChecked(false);
    setIsForm(true);
  };

  const getUserWorkExperience = async () => {
    const data = await fetch(`${API_BASE_URL}api/getPortfolioDetails/${userId}`);
    const response = await data.json();
    const { workExperience } = response;
    console.log('User work experience', workExperience);
  };

  const API_BASE_URL = 'https://hng6-r5y3.onrender.com/';
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[] | []>([]);
  const handleEditExperience = async (id: string) => {
    console.log(id);
    try {
      const response = await fetch(`${API_BASE_URL}api/update-work-experience/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          company,
          role,
          startMonth,
          startYear,
          endMonth,
          endYear,
          description,
          isEmployee: true,
          userId,
          sectionId: 2,
        }),
      });
      // if (response.ok) {
      // console.log(body);
      const data = await response.text();
      // console.log(response);

      // console.log(data);
      // }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteExperience = async (id: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const experienceId = parseInt(id, 10); // Convert id to a number
    if (isNaN(experienceId)) {
      console.error('Invalid experience id:', id);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}api/work-experience/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const data = await response.json();
        setWorkExperiences((prevExperiences) => prevExperiences.filter((experience) => experience.id !== experienceId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllWorkExperience = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}api/getPortfolioDetails/${userId}`);

      if (response.ok) {
        const data = await response.json();
        const { workExperience } = data;
        setWorkExperiences(workExperience);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const userId = 'f8e1d17d-0d9e-4d21-89c5-7a564f8a1e90';

  const addWorkExperience = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}api/create-work-experience/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify({
          company, // Assuming `company` is a variable in your scope
          // Add other data you want to send to the backend here
          role,
          startMonth,
          startYear,
          endMonth,
          endYear,
          description,
          isEmployee: true,
          userId,
          sectionId: 2,
        }),
      });

      if (response.ok) {
        // Request was successful, you can handle the response here
        const data = await response.json(); // Parse the response as JSON
        getAllWorkExperience();
        resetForm();
      } else {
        // Request failed, handle the error
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getAllWorkExperience();
  }, []);

  useEffect(() => {
    console.log('User work experience ', workExperiences);
  }, [workExperiences]);

  return (
    <WorkExperienceModalContext.Provider
      value={{
        role,
        resetForm,
        company,
        description,
        startMonth,
        endMonth,
        endYear,
        startYear,
        isChecked,
        isForm,
        setCompany,
        setIsChecked,
        setRole,
        setDescription,
        setStartMonth,
        setEndMonth,
        setStartYear,
        setEndYear,
        idCounter,
        workExperiences,
        handleDeleteExperience,
        getAllWorkExperience,
        addWorkExperience,
        handleEditExperience,
        isEditMode,
        setIsEditMode,
      }}
    >
      {children}
    </WorkExperienceModalContext.Provider>
  );
};
