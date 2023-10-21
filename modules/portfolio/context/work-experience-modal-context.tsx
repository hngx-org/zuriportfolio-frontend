import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { WorkExperience } from '../../../@types';
import { notify } from '@ui/Toast';
import Portfolio from '../../../context/PortfolioLandingContext';
import axios from 'axios';
import { months } from '../data';

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
  isData: boolean;
  setIsData: (value: boolean) => void;
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
  const [isForm, setIsForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isData, setIsData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
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

  const { userId, portfolioUrl, slug } = useContext(Portfolio);
  const API_BASE_URL = 'https://hng6-r5y3.onrender.com/';
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[] | []>([]);

  const handleEditExperience = async (id: number, e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e?.preventDefault();
    const experienceObject = JSON.stringify({
      userId,
      company,
      role,
      startMonth,
      startYear,
      endMonth,
      endYear,
      description,
      isEmployee: isChecked,
      sectionId: 2,
    });
    try {
      const response = await fetch(`${API_BASE_URL}api/v1/updateexperience/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: experienceObject,
      });
      if (response.ok) {
        setIsEditMode(false);
        setIsData(true);
        setIsForm(false);
        getAllWorkExperience();
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteExperience = async (id: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const experienceId = parseInt(id, 10); // Convert id to a number
    if (isNaN(experienceId)) {
      console.error('Invalid experience id:', id);
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}api/v1/experience/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        notify({
          message: `Work experience ${isEditMode ? 'Edited' : 'Deleted'} successfully`,
          position: 'top-center',
          theme: 'light',
          type: 'success',
        });
        setWorkExperiences((prevExperiences) => prevExperiences.filter((experience) => experience.id !== experienceId));
      }
    } catch (error) {
      console.error(error);
      notify({
        message: 'Was not able to delete work experience 😞',
        position: 'top-center',
        theme: 'light',
        type: 'error',
      });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllWorkExperience = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${portfolioUrl}/${slug}`);

      if (response.ok) {
        const data = await response.json();
        const { workExperience } = data;
        if (workExperience.length === 0) {
          setIsForm(true);
        }
        setWorkExperiences(workExperience);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, [userId, slug]);

  const addWorkExperience = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setIsLoading(true);
    try {
      const missingFields = [];

      if (role === '') {
        missingFields.push('Role');
      }
      if (company === '') {
        missingFields.push('Company');
      }
      if (description === '') {
        missingFields.push('Description');
      }
      if (startMonth === '') {
        missingFields.push('Start Month');
      }
      if (startYear === '') {
        missingFields.push('Start Year');
      }
      if (endMonth === '') {
        missingFields.push('End Month');
      }
      if (endYear === '') {
        missingFields.push('End Year');
      }

      if (missingFields.length > 0) {
        // Handle the case when required values are missing
        const missingFieldsString = missingFields.join(', ');
        // Notify the user about missing fields
        notify({
          message: `Please fill in the required fields: ${missingFieldsString}`,
          position: 'top-center',
          theme: 'light',
          type: 'error',
        });
        return;
      }

      const endYearValue = isChecked ? 'Present' : endYear;

      const response = await fetch(`${API_BASE_URL}api/v1/createexperience/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify({
          company,
          role,
          startMonth,
          startYear,
          endMonth,
          endYear: endYearValue,
          description,
          isEmployee: isChecked,
          userId,
          sectionId: 2,
        }),
      });
      if (response.ok) {
        getAllWorkExperience();
        notify({
          message: 'Work experience created successfully',
          position: 'top-center',
          theme: 'light',
          type: 'success',
        });
        resetForm();
        setIsForm(false);
        setIsData(true);
      } else {
        const responseJson = await response.json();
        console.error('Request failed with status:', response.status);
        if (
          responseJson?.message &&
          responseJson?.message?.includes('String must contain at least 13 character(s) in description')
        ) {
          notify({
            message: 'Description must contain more than 13 characters',
            position: 'top-center',
            theme: 'light',
            type: 'error',
          });
        }
        if (
          responseJson?.message &&
          responseJson?.message?.includes('End month must match or exceed start month in the same year')
        ) {
          notify({
            message: 'End month must match or exceed start month in the same year',
            position: 'top-center',
            theme: 'light',
            type: 'error',
          });
        }
        if (
          responseJson?.message &&
          responseJson?.message?.includes('End month must be at or after start month for the same year')
        ) {
          notify({
            message: 'End month must be at or after start month for the same year',
            position: 'top-center',
            theme: 'light',
            type: 'error',
          });
        }
        notify({
          message: 'We had some issues adding ur work experience',
          position: 'top-center',
          theme: 'light',
          type: 'error',
        });
      }
    } catch (error: any) {
      // Handle network or other errors
      console.error('Error:', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId.trim().length > 0) {
      getAllWorkExperience();
    }
  }, [getAllWorkExperience, userId]);

  return (
    <WorkExperienceModalContext.Provider
      value={{
        role,
        company,
        description,
        startMonth,
        endMonth,
        endYear,
        startYear,
        isChecked,
        isForm,
        workExperiences,
        isEditMode,
        isData,
        isLoading,
        setIsLoading,
        resetForm,
        setCompany,
        setIsChecked,
        setRole,
        setDescription,
        setStartMonth,
        setEndMonth,
        setStartYear,
        setEndYear,
        handleDeleteExperience,
        getAllWorkExperience,
        addWorkExperience,
        handleEditExperience,
        setIsEditMode,
        setIsForm,
        setIsData,
      }}
    >
      {children}
    </WorkExperienceModalContext.Provider>
  );
};
