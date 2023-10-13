// CreatingAssessmentContext.js
import React, { createContext, useContext, useState, ChangeEvent, SetStateAction, Dispatch } from 'react';

type AssessmentScoringType = {
  badge_option: string;
  beginner_score_range: string;
  intermediate_score_range: string;
  advanced_score_range: string;
};

type CreatingAssessmentContextType = {
  isAutoSubmitOn: boolean;
  setIsAutoSubmitOn: Dispatch<SetStateAction<boolean>>;
  examDuration: string;
  setExamDuration: Dispatch<SetStateAction<string>>;
  assessmentScoring: AssessmentScoringType;
  setAssessmentScoring: Dispatch<SetStateAction<AssessmentScoringType>>;
};

const CreatingAssessmentContext = createContext<CreatingAssessmentContextType | undefined>(undefined);

export const useCreatingAssessmentContext = () => {
  const context = useContext(CreatingAssessmentContext);
  if (!context) {
    throw new Error('useCreatingAssessmentContext must be used within a CreatingAssessmentProvider');
  }
  return context;
};

export function CreatingAssessmentProvider({ children }: { children: React.ReactNode }) {
  const [isAutoSubmitOn, setIsAutoSubmitOn] = useState<boolean>(false);
  const [examDuration, setExamDuration] = useState<string>('');
  const [assessmentScoring, setAssessmentScoring] = useState<AssessmentScoringType>({
    badge_option: '',
    beginner_score_range: '',
    intermediate_score_range: '',
    advanced_score_range: '',
  });

  const contextValue = {
    isAutoSubmitOn,
    setIsAutoSubmitOn,
    examDuration,
    setExamDuration,
    assessmentScoring,
    setAssessmentScoring,
  };

  return <CreatingAssessmentContext.Provider value={contextValue}>{children}</CreatingAssessmentContext.Provider>;
}
