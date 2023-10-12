import { Input, SelectInput } from '@ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
import React, { useState, useEffect, useRef, ChangeEvent } from 'react';

interface ScoreDropdownProps {
  item: string; // Specify the type for the 'item' prop
}

const grades = [
  {
    value: '0% - 49%',
    label: '0% - 49%',
  },
  {
    value: '50% - 79%',
    label: '50% - 79%',
  },
  {
    value: '80% - 100%',
    label: '80% - 100%',
  },
];

type MyScoreRangeType = {
  minScore: string;
  maxScore: string;
  // Add more properties as needed
};

const ScoreDropdown = (props: { item?: string }) => {
  const [selectedValue, setSelectedValue] = useState(''); // State to store the selected value
  const [inputValue, setInputValue] = useState<MyScoreRangeType>({
    minScore: '',
    maxScore: '',
  }); // Explicitly specify the type as string

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const name = e.target.name;

    // Check if the new value is an empty string (no characters entered)
    if (newValue === '') {
      setInputValue({
        minScore: '',
        maxScore: '',
      }); // Reset the input to an empty string
    } else {
      const numericValue = parseInt(newValue, 10);
      if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100) {
        setInputValue({
          ...inputValue,
          [name]: numericValue.toString(),
        });
      }
      // You can add additional validation or error handling here if needed
    }
  };
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center">
        <h3 className="text-base self-start sm:self-end text-gray-500 w-32">{props.item}:</h3>
        <div className="flex gap-10">
          <div className="flex flex-col gap-1">
            <label htmlFor="min-score" className="text-xs text-gray-400">
              Min Score
            </label>
            <Input
              type="text"
              value={inputValue.minScore}
              name="minScore"
              id="min-score"
              onChange={handleInputChange}
              placeHolder=""
              className="h-8 w-20 rounded-md border"
              style={{ textAlign: 'center' }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="max-score" className="text-xs text-gray-400">
              Max Score
            </label>
            <Input
              type="text"
              value={inputValue.maxScore}
              name="maxScore"
              id="max-score"
              onChange={handleInputChange}
              placeHolder=""
              className="h-8 w-20 rounded-md border"
              style={{ textAlign: 'center' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreDropdown;

{
  /* <Select
  onValueChange={(value: string) => {
    setSelectedValue(value);
  }}
  value={selectedValue}
>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="" />
  </SelectTrigger>
  <>
    <SelectContent>
      {grades.map((grade, index) => (
        <SelectItem key={index} value={grade.value}>
          {grade.label}
        </SelectItem>
      ))}
    </SelectContent>
  </>
</Select>; */
}
