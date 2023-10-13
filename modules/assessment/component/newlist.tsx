type option = any;
type questions = {
  question_no: number;
  question_text: string;
  options: option[];
  correct_option: number;
};
const questions_and_answers: questions[] = [
  {
    question_no: 1,
    question_text: '',
    options: [''],
    correct_option: 1,
  },
];
export default questions_and_answers;
