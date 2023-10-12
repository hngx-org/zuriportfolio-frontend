import React, { useState, useEffect, useContext } from 'react';
import Button from '@ui/Button';
import { Input } from '@ui/Input';
import { Add } from 'iconsax-react';
import Avatar from '../../../public/assets/assessment/avatar';
import Minus from '../../../public/assets/assessment/minus';
import questions_and_answers from './newlist';
import { ToPushContext } from '../../../pages/assessment/new';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
import { UpdateContext } from '../../../pages/assessment/new';
const CreateTemplate = () => {
  const [newobject, setObject]: any = useContext(ToPushContext);
  const [list, setList] = useState(questions_and_answers);

  const handleinputQuestion = (e: any, index: number) => {
    const updatedData = [...list];
    updatedData[index].question_text = e.target.value;
    setList(updatedData);
  };
  const [listupdate, setListupdate]: any = useContext(UpdateContext);
  const handleinputOption = (e: any, index: number, n: number) => {
    console.log(index, n);
    const updatedData = [...list];
    console.log(list);
    updatedData[index].options[n] = e.target.value;
    setList(updatedData);
  };
  function splicearr(arr: any, index: number) {
    const resultArray = arr.slice(0, index).concat(arr.slice(index + 1));

    return resultArray;
  }
  //deleting options
  const handleDelete = (index: number, opt: string) => {
    var num = 0;
    var updatedData = [...list];
    updatedData[index].options.filter((data) => {
      if (data == opt) {
        num = updatedData[index].options.indexOf(data);
      }
    });
    const newdata = splicearr(updatedData[index].options, num);
    updatedData[index].options = newdata;
    console.log(newdata, updatedData);

    setList(updatedData);
  };
  //adding options
  const handleIncreaseOption = (index: number) => {
    const updatedData = [...list];
    //updatedData[indextoadd]?.options.push('')
    updatedData[index].options.push('');
    setList(updatedData);
  };

  //handling Adding questions
  const handleAddquestion = () => {
    setList((list) => [
      ...list,
      {
        question_no: list.length + 1,
        question_text: '',
        options: [''],
        correct_option: 1,
      },
    ]);
  };
  useEffect(() => {
    if (listupdate === true) {
      const newt = { ...newobject };
      newt.questions_and_answers = list;
      console.log(newt);
      setObject(newt);
      setListupdate(false);
    }
  }, [listupdate, newobject, setObject, setListupdate, list]);
  return (
    <>
      <div className="flex flex-col gap-y-8">
        {list?.map((item, index) => {
          return (
            <div
              key={index}
              className="w-full border-[1px] border-[#DFE3E6] rounded-[18px] py-10 px-6 relative text-left"
            >
              <div className="font-semibold text-[20px] text-[#1A1C1B]">{`Question ${index + 1}`}</div>
              <div className="flex items-center pt-4 gap-x-4">
                <Input
                  className="flex-1 border-[#DFE3E6] border-[1px] text-[#1A1C1B] opacity-100"
                  onChange={(e) => handleinputQuestion(e, index)}
                  type="text"
                  name="question"
                  placeHolder=""
                  intent={'default'}
                  size={15}
                />
                <div className="bg-[#dcd2d2] rounded">
                  <Avatar />
                </div>
              </div>
              <div className=" text-[20px] font-semibold pt-4 text-[#1A1C1B]">Answers</div>
              {list[index]?.options.map((opt, n) => {
                return (
                  <div key={index} className="pt-4 flex flex-col gap-y-[10px]">
                    <div className=" text-[18px] font-semibold  text-[#1A1C1B]">{`Option ${n + 1}`}</div>
                    <div className="flex items-center justify-between gap-x-2">
                      <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="14" cy="14.5" r="13.5" stroke="#009254" />
                      </svg>
                      <Input
                        className="flex-1 border-[#DFE3E6] border-[1px] text-[#1A1C1B] opacity-100"
                        onChange={(e) => {
                          handleinputOption(e, index, n);
                        }}
                        type="text"
                        name={`opt-${n + 1}`}
                        placeHolder=""
                        intent={'default'}
                        size={15}
                      />
                      <div
                        onClick={() => {
                          handleDelete(index, opt);
                        }}
                      >
                        <Minus />
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="pt-2">
                <Button
                  onClick={() => handleIncreaseOption(index)}
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
                    console.log(value);
                  }}
                >
                  <SelectTrigger className="w-full p-6">
                    <SelectValue placeholder="Option1" />
                  </SelectTrigger>
                  <SelectContent>
                    {list[index].options.map((optt: any, n: number) => {
                      return (
                        <SelectItem key={`${index}${n}`} value={`option 1${n}`}>
                          Option {n + 1}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pt-10 text-center flex justify-center">
        <Button
          onClick={handleAddquestion}
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

export default CreateTemplate;
