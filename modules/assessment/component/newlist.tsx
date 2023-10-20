type option = any;
type questions = {
  question_no: number;
  question_text: string;
  question_type: string;
  options: any;
  correct_option: number;
};
const questions_and_answers: questions[] = [
  {
    question_no: 1,
    question_text: '',
    question_type: 'multiple_choice',
    options: [''],
    correct_option: 0,
  },
];
export default questions_and_answers;
