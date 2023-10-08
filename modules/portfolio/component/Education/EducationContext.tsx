import React, { createContext, useContext, useState } from 'react';

interface EducationData {
  degree: string;
  fieldOfStudy: string;
  school: string;
  description: string;
  dateFrom: string;
  dateTo: string;
}

interface EducationContextType {
  educationList: EducationData[];
  setEducationList: React.Dispatch<React.SetStateAction<EducationData[]>>;
  addEducation: (education: EducationData) => void;
  deleteEducation: (index: number) => void;
}

const EducationContext = createContext<EducationContextType | undefined>(undefined);

export const EducationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [educationList, setEducationList] = useState<EducationData[]>([]);
  const addEducation = (education: EducationData) => {
    setEducationList([...educationList, education]);
  };

  const deleteEducation = (index: number) => {
    const updatedList = [...educationList];
    updatedList.splice(index, 1);
    setEducationList(updatedList);
  };

  return (
    <EducationContext.Provider value={{ educationList, setEducationList, addEducation, deleteEducation }}>
      {children}
    </EducationContext.Provider>
  );
};

export function useEducation() {
  const context = useContext(EducationContext);
  if (context === undefined) {
    throw new Error('useEducation must be used within an EducationProvider');
  }
  return context;
}
