import { UseQueryResult, useQuery, useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';

interface AssessmentProps {
  assessment_id: string;
  skill_id: string;
  title: string;
  description: string;
  duration_minutes: number;
  status: string;
  start_date: string;
  end_date: string;
}

export type AssessmentQuestion = {
  question_id: string;
  question_no: string;
  question_text: string;
  question_type: string;
  user_selected_answer: string | null;
  options: string[];
};

type AssessmentQuestionApiResponse = {
  message: string;
  status_code: number | null;
  data: AssessmentQuestion[];
}[];

type StartAssessmentFormType = {
  assessment_id: string | string[] | undefined;
};

type UseStartAssessmentParams = {
  assessment_id: string | string[] | undefined;
};

export const useGetAssessment = ({
  assessment_id,
}: {
  assessment_id?: string | string[];
}): UseQueryResult<AssessmentProps> => {
  return useQuery<AssessmentProps>(['get-assessment', assessment_id], {
    queryFn: async () => {
      const { data } = await axios.get<AssessmentProps>(
        `http://104.248.143.148/api/assessments/${assessment_id}?fake_token=l3h5.34jb3%2C4mh346gv%2C34h63vk3j4h5k43hjg54kjhkg4j6h45g6kjh45gk6jh6k6g34hj6`,
      );

      return data;
    },
  });
};

export const useStartAssessment = ({
  assessment_id,
}: UseStartAssessmentParams): UseMutationResult<
  AssessmentQuestionApiResponse,
  unknown,
  StartAssessmentFormType,
  unknown
> => {
  const onStart = async (formData: StartAssessmentFormType) => {
    const { data } = await axios.post<AssessmentQuestionApiResponse>(
      `http://104.248.143.148/api/assessments/start-assessment?fake_token=l3h5.34jb3%2C4mh346gv%2C34h63vk3j4h5k43hjg54kjhkg4j6h45g6kjh45gk6jh6k6g34hj6`,
      formData,
    );

    return data;
  };

  return useMutation<AssessmentQuestionApiResponse, unknown, StartAssessmentFormType, unknown>({
    mutationFn: onStart,
  });
};
