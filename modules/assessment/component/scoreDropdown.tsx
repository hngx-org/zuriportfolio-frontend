import { SelectInput } from '@ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
import React, { useState, useEffect, useRef } from 'react';

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

const ScoreDropdown = (props: { item?: string }) => {
  const [selectedValue, setSelectedValue] = useState(''); // State to store the selected value
  return (
    <div>
      <div className="flex items-center">
        <h3 className="text-base text-gray-500 w-32">{props.item}:</h3>
        <Select
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
        </Select>
      </div>
    </div>
  );
};

export default ScoreDropdown;
