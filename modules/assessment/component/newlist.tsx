type option = any;
type questions = {
  question_no: number;
  question_text: string;
  question_type: string;
  answer: {
    options: any;
    correct_option: string;
  };
};
const questions_and_answers: questions[] = [
  {
    question_no: 1,
    question_text: '',
    question_type: 'multiple_choice',
    answer: {
      options: [''],
      correct_option: '',
    },
  },
];
export default questions_and_answers;
