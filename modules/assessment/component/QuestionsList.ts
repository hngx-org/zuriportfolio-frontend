type QuizQuestion = {
  index: number;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctOption: string;
};

const QuestionsList: QuizQuestion[] = Array.from({ length: 10 }, (_, index) => ({
  index: index + 1,
  question: `Question ${index + 1}`,
  option1: `Option 1 for question ${index + 1}`,
  option2: `Option 2 for question ${index + 1}`,
  option3: `Option 3 for question ${index + 1}`,
  option4: `Option 4 for question ${index + 1}`,
  correctOption: `Option ${(index % 4) + 1} for question ${index + 1}`, // This will cycle through options 1-4 as the correct answer
}));

export default QuestionsList;
