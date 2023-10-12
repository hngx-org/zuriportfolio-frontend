import { Input } from '@ui/Input';
import React, { ChangeEvent } from 'react';

interface ScoreDropdownProps {
  item: string; // Specify the type for the 'item' prop
  handleGradingChange: (e: ChangeEvent<HTMLInputElement>) => void;
  gradingValue: MyGradingRangeType;
}

type MyGradingRangeType = {
  minScore: string;
  maxScore: string;
};

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

const ScoreDropdown: React.FC<ScoreDropdownProps> = ({ item, handleGradingChange, gradingValue }) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center">
        <h3 className="text-base self-start sm:self-end text-gray-500 w-32">{item}:</h3>
        <div className="flex gap-10">
          <div className="flex flex-col gap-1">
            <label htmlFor="min-score" className="text-xs text-gray-400">
              Min Score
            </label>
            <Input
              type="text"
              value={gradingValue.minScore}
              name="minScore"
              id="min-score"
              onChange={handleGradingChange}
              placeHolder=""
              className="h-8 w-20 rounded-md border text-base font-bold text-black"
              style={{ textAlign: 'center' }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="max-score" className="text-xs text-gray-400">
              Max Score
            </label>
            <Input
              type="text"
              value={gradingValue.maxScore}
              name="maxScore"
              id="max-score"
              onChange={handleGradingChange}
              placeHolder=""
              className="h-8 w-20 rounded-md border text-base font-bold text-black"
              style={{ textAlign: 'center' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreDropdown;
