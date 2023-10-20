import React, { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { Input } from '@ui/Input';
import Button from '@ui/Button';
import { Add } from 'iconsax-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type AnswerType = {
  options: string[];
  correct_option: number;
};

type QuestionType = {
  question_no: number;
  question_text: string;
  question_type: string;
  answer: AnswerType;
};

// const initialOptions: string[] = ["Option 1", "Option 2", "Option 3", "Option 4"];
const EditLayout = ({}) => {
  const notifySuccess = () => toast('Assessment updated successfully, You can go back');
  const notifyFailure = () => toast('Assessment did not update, Try again');
  const [editDisabled, setEditDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useRouter();
  const router = useRouter();
  //Get question number to edit
  const questioNumber = router.query.id;
  // Get Id of the skill/assessment that contains the question
  // const assessmentId = router.query.assessmentId;
  // if (assessmentId) {
  //   sessionStorage.setItem('assessmentId', assessmentId as string); // Cast assessmentId to string
  // }
  const [assessmentId, setAssessmentId] = useState<number>(0);
  const [mockArr, setMcokarr] = useState(new Array(4).fill(null));

  //State to store Original Array of Questions
  const [originalArrayQuestions, setOriginalArrayQuestions] = useState([]);

  //State to store Assessment Title
  const [assessmentTitle, setAssessmentTitle] = useState<string | null>(null);

  //State to store Assessment Question number that we are editing
  const [assessmentQuestionNumber, setAssessmentQuestionNumber] = useState<number>(0);

  //State to store questions/answers to edit
  const [editable, setEditable] = useState<QuestionType | null>(null);

  //State to store initial question text
  const initialQuestionText = editable ? editable.question_text : '';
  const [question_text, setQuestion_text] = useState(initialQuestionText);

  //State to store initial correct option
  const [correctOption, setCorrectOption] = useState('');

  //array to store options for the question we want to edit
  const [editedOptions, setEditedOptions] = useState<string[]>([]);

  //function to update the question/answer state based on edits
  const handleOptionInputChange = (index: number, newValue: string) => {
    // Create a new array with the edited value at the specified index.
    const newOptions = [...editedOptions];
    newOptions[index] = newValue;
    setEditedOptions(newOptions);
    console.log(editedOptions);
  };

  //state to store edited questions
  const [edited, setEdited] = useState<QuestionType | null>(null);

  const handleDelete = (indexToDelete: number) => {
    const updatedArr = mockArr.filter((item, index) => index !== indexToDelete);
    setMcokarr(updatedArr);
  };

  const handleIncreaseLength = () => {
    if (mockArr.length > 0) {
      const lastElement = mockArr[mockArr.length - 1];
      const updatedArr = [...mockArr, lastElement];
      setMcokarr(updatedArr);
    }
  };

  interface OptionsType {
    options: string[];
    correct_option: string | number;
  }
  interface Question {
    question_no: string | number | undefined;
    question_text: string;
    question_type: string;
    answer: OptionsType;
  }

  const newQuestionObject: Question = {
    question_no: assessmentQuestionNumber,
    question_text: question_text,
    question_type: 'multiple_choice',
    answer: {
      options: editedOptions,
      correct_option: correctOption,
    },
  };
  function updateQuestionArray(questionArray: Question[], newQuestion: Question): Question[] {
    console.log('questionArray', questionArray);
    console.log('newQuestion', newQuestion);
    const updatedArray: Question[] = [...questionArray]; // Create a new array to avoid modifying the original one

    // Check if a question with the same question_no already exists
    const existingQuestionIndex = updatedArray.findIndex(
      (question) => question.question_no === newQuestion.question_no,
    );

    if (existingQuestionIndex !== -1) {
      // If an existing question is found, update it
      updatedArray[existingQuestionIndex] = newQuestion;
    } else {
      // If no existing question is found, add the new question to the array
      updatedArray.push(newQuestion);
    }

    arrangeAssessmentData(updatedArray);

    return updatedArray;
  }
  //This function arranges uses the updated array to arrange the assessment data for a put request
  const arrangeAssessmentData = (updatedArray: Question[]) => {
    const AssessmentData: AssessmentData = {
      questions: updatedArray,
      title: assessmentTitle,
      duration_in_minutes: 0,
    };
    updateAssessment(assessmentId, AssessmentData);
  };

  interface AssessmentData {
    questions: {
      question_no: string | string[] | undefined | number;
      question_text: string | string[] | undefined;
      question_type: string | string[] | undefined;
      answer: OptionsType;
    }[];
    title: string | null;
    duration_in_minutes: number;
  }

  async function updateAssessment(assessmentId: number, assessmentData: AssessmentData): Promise<void> {
    console.log(assessmentData);
    const apiUrl = `https://piranha-assessment-jco5.onrender.com/api/admin/assessments/${assessmentId}/`;

    const zptToken = localStorage.getItem('zpt') ?? '';

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${zptToken}`,
      },
      body: JSON.stringify(assessmentData),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);

      if (!response.ok) {
        throw new Error('Failed to update the assessment');
      }

      const data = await response.json();
      console.log('Assessment updated successfully:', data);
      // alert('Assessment updated successfully, You can go back');
      setEditDisabled(false);
      notifySuccess();
      <ToastContainer />;
    } catch (error) {
      console.error('Error:', error);
      setEditDisabled(false);
      notifyFailure();
    }
  }

  useEffect(() => {
    const theSkillId = Number(sessionStorage.getItem('assessmentId'));

    if (theSkillId) {
      console.log('Dont Navigate');
      setAssessmentId(theSkillId);
      const fetchSkillsQuestions = async () => {
        try {
          const apiUrl = `https://piranha-assessment-jco5.onrender.com/api/admin/assessments/${sessionStorage.getItem(
            'assessmentId',
          )}/`;

          const zptToken = localStorage.getItem('zpt') ?? '';

          const response = await fetch(apiUrl, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${zptToken}`,
            },
          });

          const data = await response.json();
          console.log('data', data);
          setAssessmentTitle(data.title);
          setOriginalArrayQuestions(data.questions);

          //Extract the exact question to edit
          let editable = data.questions.filter((question: any) => {
            return question.question_no == questioNumber;
          });
          setEditable(editable[0]);
          setEditedOptions(editable[0].answer.options);
          setAssessmentQuestionNumber(editable[0].question_no);
          setCorrectOption(editable[0].answer.correct_option);
        } catch (error) {
          console.error('Error fetching data in editlayout:', error);
        }
      };
      fetchSkillsQuestions();
    } else {
      console.log('Navigate');
      navigate.push('/super-admin/assessment/');
    }
  }, []);

  useEffect(() => {
    if (editable) {
      setQuestion_text(editable.question_text);
      setLoading(false);
    }
  }, [editable]);

  // if (loading) {
  //   return (
  //     <div className="fixed bg-brand-green-primary w-full h-full grid place-items-center">
  //       <div className=" items-center ">
  //         <FaSpinner color="#fff" className="animate-spin" size={100} />
  //       </div>
  //     </div>
  //   );
  // }
  return loading ? (
    <div className="grid place-items-center">
      <div className=" items-center ">
        <FaSpinner color="green" className="animate-spin" size={100} />
      </div>
    </div>
  ) : (
    <div className="w-full border-[1px] border-[#DFE3E6] rounded-[18px] py-10 px-6 relative text-left">
      <div className="font-semibold text-[20px] text-[#1A1C1B]">{`Question ${questioNumber}`}</div>
      <div className="flex items-center pt-4 gap-x-4">
        <Input
          className="flex-1 border-[#DFE3E6] border-[1px] text-[#1A1C1B] opacity-100"
          onChange={(e) => {
            setQuestion_text(e.target.value);
          }}
          type="text"
          name="question"
          placeHolder=""
          intent={'default'}
          size={15}
          value={question_text}
        />
        <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M33.0204 25.94L28.3254 14.975C26.7354 11.255 23.8104 11.105 21.8454 14.645L19.0104 19.76C17.5704 22.355 14.8854 22.58 13.0254 20.255L12.6954 19.835C10.7604 17.405 8.03038 17.705 6.63538 20.48L4.05538 25.655C2.24038 29.255 4.86538 33.5 8.88538 33.5H28.0254C31.9254 33.5 34.5504 29.525 33.0204 25.94Z"
            stroke="#464646"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.9551 12.5C13.4404 12.5 15.4551 10.4853 15.4551 8C15.4551 5.51472 13.4404 3.5 10.9551 3.5C8.4698 3.5 6.45508 5.51472 6.45508 8C6.45508 10.4853 8.4698 12.5 10.9551 12.5Z"
            stroke="#464646"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className=" text-[20px] font-semibold pt-4 text-[#1A1C1B]">Answers</div>
      {editedOptions.map((item, index) => {
        return (
          <div key={index} className="pt-4 flex flex-col gap-y-[10px]">
            <div className=" text-[18px] font-semibold  text-[#1A1C1B]">{`Option ${index + 1}`}</div>
            <div className="flex items-center justify-between gap-x-2">
              <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="14.5" r="13.5" stroke="#009254" />
              </svg>
              <Input
                className="flex-1 border-[#DFE3E6] border-[1px] text-[#1A1C1B] opacity-100"
                type="text"
                name="opt-1"
                placeHolder=""
                intent={'default'}
                size={15}
                value={item}
                onChange={(e) => handleOptionInputChange(index, e.target.value)}
              />
              <svg
                width="28"
                height="29"
                viewBox="0 0 28 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  handleDelete(index);
                }}
                className="cursor-pointer"
              >
                <path
                  d="M13.9069 26.1667C20.3236 26.1667 25.5736 20.9167 25.5736 14.5C25.5736 8.08334 20.3236 2.83334 13.9069 2.83334C7.49023 2.83334 2.24023 8.08334 2.24023 14.5C2.24023 20.9167 7.49023 26.1667 13.9069 26.1667Z"
                  fill="#FF5C5C"
                  stroke="#464646"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.24023 14.5H18.5736"
                  stroke="#464646"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        );
      })}
      <div className="pt-2">
        <Button
          onClick={handleIncreaseLength}
          rightIcon={<Add color="black" />}
          intent={'primary'}
          size={'md'}
          className="bg-[tansparent] text-dark-100 hover:text-dark-100 hover:bg-[transparent]"
        >
          Add Another Option
        </Button>
      </div>
      <div className=" text-[20px] font-semibold  text-[#1A1C1B] pt-3">Choose Correct Answer</div>
      <div className="pt-4 w-full ">
        <Select
          onValueChange={(value) => {
            setCorrectOption(value);
          }}
        >
          <SelectTrigger className="w-full p-6">
            <SelectValue placeholder={editable ? editable.answer.correct_option : 'Select an Option'} />
          </SelectTrigger>
          <SelectContent>
            {editedOptions.map((option, index) => {
              return (
                <SelectItem key={index} value={option || 'Type an Option'}>
                  {option}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4 items-center pt-2">
        <Button
          type="button"
          onClick={() => {
            setEditDisabled(true);
            updateQuestionArray(originalArrayQuestions, newQuestionObject);
          }}
          disabled={editDisabled}
          // intent={'primary'}
          // size={'md'}
          // className="bg-[tansparent] text-dark-100 hover:text-dark-100 hover:bg-[transparent]"
        >
          Click to Edit
        </Button>
        {editDisabled && (
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 mr-2 text-white-200 animate-spin dark:text-gray-600 fill-green-500"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditLayout;

// {
//   questions_and_answers: [
//     {question_no: '1',
//      question_text: '',
//      question_type: 'Multiple Choice',
//      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'],
//      correct_option: ''
//     }
//   ],
//   assessment_name: 'something',
//   duration_in_minutes: 0
// }
