import React, { useEffect, useState } from 'react';
import Button from '@ui/Button';
import { Input } from '@ui/Input';
import { Add } from 'iconsax-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';

type CreateassProps = {
  dataValues?: (dataObject: { [key: string]: string }) => void;
};

const CreateDraftQuestion: React.FC<CreateassProps> = ({ dataValues }) => {
  const [questions, setQuestions] = useState<Array<{ question: string; options: string[]; correctOption: string }>>([
    { question: '', options: [], correctOption: '' },
  ]);

  // Add a new question field
  const handleAddQuestion = () => {
    setQuestions((prevQuestions) => [...prevQuestions, { question: '', options: [], correctOption: '' }]);
  };

  const handleChangeQuestion = (index: number, value: string) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index].question = value;
      return updatedQuestions;
    });
  };

  const handleChangeOption = (questionIndex: number, optionIndex: number, value: string) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].options[optionIndex] = value;
      return updatedQuestions;
    });
  };

  const handleDeleteOption = (questionIndex: number, optionIndex: number) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].options.splice(optionIndex, 1);
      return updatedQuestions;
    });
  };

  const handleAddOption = (questionIndex: number) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].options.push('');
      return updatedQuestions;
    });
  };

  const handleSelectCorrectOption = (questionIndex: number, value: string) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].correctOption = value;
      return updatedQuestions;
    });
  };

  return (
    <>
      <div className="flex flex-col gap-y-8">
        {questions.map((question, questionIndex) => {
          return (
            <div
              key={questionIndex}
              className="w-full border-[1px] border-[#DFE3E6] rounded-[18px] py-10 px-6 relative text-left"
            >
              <div className="font-semibold text-[20px] text-[#1A1C1B]">{`Question ${questionIndex + 1}`}</div>
              <div className="flex items-center pt-4 gap-x-4">
                <Input
                  className="flex-1 border-[#DFE3E6] border-[1px] text-[#1A1C1B] opacity-100 text-[18px]"
                  onChange={(e) => handleChangeQuestion(questionIndex, e.target.value)}
                  type="text"
                  placeholder=""
                  value={question.question}
                  size={15}
                />
              </div>
              <div className=" text-[20px] font-semibold pt-4 text-[#1A1C1B]">Answers</div>
              {question.options.map((option, optionIndex) => {
                return (
                  <div key={optionIndex} className="pt-4 flex flex-col gap-y-[10px]">
                    <div className=" text-[18px] font-semibold  text-[#1A1C1B]">{`Option ${optionIndex + 1}`}</div>
                    <div className="flex items-center justify-between gap-x-2">
                      <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="14" cy="14.5" r="13.5" stroke="#009254" />
                      </svg>
                      <Input
                        className="flex-1 border-[#DFE3E6] border-[1px] text-[#1A1C1B] opacity-100 text-[17px]"
                        onChange={(e) => handleChangeOption(questionIndex, optionIndex, e.target.value)}
                        type="text"
                        placeholder=""
                        value={option}
                      />
                      <svg
                        width="28"
                        height="29"
                        viewBox="0 0 28 29"
                        fill="none"
                        onClick={() => handleDeleteOption(questionIndex, optionIndex)}
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
                  onClick={() => handleAddOption(questionIndex)}
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
                  onValueChange={(value) => handleSelectCorrectOption(questionIndex, value)}
                  name={`selectDrop${questionIndex}`}
                  value={question.correctOption || `option0`}
                >
                  <SelectTrigger className="w-full p-6">
                    <SelectValue placeholder={`Option ${questionIndex + 1}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {question.options.map((option, optionIndex) => (
                      <SelectItem key={optionIndex} value={`option${optionIndex}`}>
                        {`Option ${optionIndex + 1}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pt-10 text-center flex justify-center">
        <Button
          onClick={handleAddQuestion}
          leftIcon={<Add color="black" />}
          intent={'primary'}
          size={'md'}
          className="bg-[transparent] text-dark-100 border-2 border-[#009444]"
        >
          Add Question
        </Button>
      </div>
    </>
  );
};

export default CreateDraftQuestion;
