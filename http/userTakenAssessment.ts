import axios from 'axios';

const baseURL = 'http://104.248.143.148/api'
const token = 'l3h5.34jb3%2C4mh346gv%2C34h63vk3j4h5k43hjg54kjhkg4j6h45g6kjh45gk6jh6k6g34hj6'

interface Assessments {
  "question_id": number,
  "question_no": number,
  "question_text": string,
  "question_type": string,
  "user_selected_answer"?: null,
  "options": [
    string
  ]
}

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchUserTakenAssessment = async () => {
    try {
        const res = await axiosInstance.post(`/assessments/start-assessment?fake_token=${token}`, { "assessment_id": 23});
        // console.log(res);
        return res
    } catch (error) {
        console.error('Error fetching user taken assessment:', error);
        throw error;
    }
}
