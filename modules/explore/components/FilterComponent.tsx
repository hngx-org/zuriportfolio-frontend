import { ArrowDown2 } from 'iconsax-react';
import React, { useState } from 'react';
import CustomDropdown from './CustomDropdown';

interface Option {
  label?: string;
  value?: string;
  filters: { SortBy?: number; Location?: string; Skill?: string; Track?: string; Ranking?: string };
  handleFilters: (type: string, value: string | number) => void;
}

const FilterComponent = (prop: Option) => {
  //   const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedOption2, setSelectedOption2] = useState<string>('');
  const [selectedOption3, setSelectedOption3] = useState<string>('');
  const [selectedOption4, setSelectedOption4] = useState<string>('');
  const [selectedOption5, setSelectedOption5] = useState<string>('');
  const [selectedOption6, setSelectedOption6] = useState<string>('');

  const { filters, handleFilters } = prop;

  const handleCustomDropdownChange = (option: string) => {
    setSelectedOption(option);
    if (option !== 'location') {
      return handleFilters('Location', option);
    }

    delete filters.Location;
  };
  const handleCustomDropdownChange2 = (option: string) => {
    setSelectedOption2(option);
    if (option !== 'Skill') {
      return handleFilters('Skill', option);
    }

    delete filters.Skill;
  };
  const handleCustomDropdownChange3 = (option: string) => {
    setSelectedOption3(option);
    if (option !== 'Track') {
      return handleFilters('Track', option);
    }

    delete filters.Track;
  };
  const handleCustomDropdownChange4 = (option: string) => {
    setSelectedOption4(option);
  };
  const handleCustomDropdownChange5 = (option: string) => {
    setSelectedOption5(option);
  };
  const handleCustomDropdownChange6 = (option: string) => {
    setSelectedOption6(option);
    if (option !== 'Ranking') {
      return handleFilters('Ranking', option);
    }

    delete filters.Ranking;
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 max-w-[90vw] mx-auto lg:px-6 lg:mb-0 mb-6 mt-5 lg:grid-cols-6 sm:grid-cols-2 md:mx-auto lg:flex lg:justify-between lg:w-[90vw]">
        <CustomDropdown
          options={['Location', 'Ibadan', 'Lagos', 'Abuja', 'Portharcourt', 'Abeokuta', 'Kaduna']}
          selectedValue={selectedOption}
          onChange={handleCustomDropdownChange}
        />
        <CustomDropdown
          options={['Skill', 'C++', 'Javascript', 'Vue', 'React', 'Angular', 'Python']}
          selectedValue={selectedOption2}
          onChange={handleCustomDropdownChange2}
        />
        <CustomDropdown
          options={['Track', 'Frontend', 'Design', 'Backend', 'Video Marketing']}
          selectedValue={selectedOption3}
          onChange={handleCustomDropdownChange3}
        />
        <CustomDropdown
          options={['level', 'Intern', 'Junior', 'Associate', 'Mid-Senior', 'Senior']}
          selectedValue={selectedOption4}
          onChange={handleCustomDropdownChange4}
        />
        <CustomDropdown
          options={['Tag', 'E-Commerce', 'Proptech', 'Entertainment', 'Health', 'Fintech', 'Edtech']}
          selectedValue={selectedOption5}
          onChange={handleCustomDropdownChange5}
        />
        <CustomDropdown
          options={['Ranking', 'Beginner', 'Intermediate', 'Expert']}
          selectedValue={selectedOption6}
          onChange={handleCustomDropdownChange6}
        />
      </div>

      <div className="lg:hidden mx-auto">
        <div className="w-[90vw] h-[123px] flex-col justify-center items-center gap-4 inline-flex">
          <div className="w-[90vw] h-[60px] px-5 py-3 bg-brand-green-primary rounded-2xl justify-center items-center inline-flex">
            <div className="text-center text-white text-sm font-manropeB leading-tight tracking-tight cursor-pointer">
              Apply Filter
            </div>
          </div>
          <div className="w-[90vw] h-[47px] px-5 py-3 bg-white rounded-2xl border border-brand-green-primary justify-center items-center inline-flex">
            <div className="text-center text-brand-green-primary text-sm font-manropeB leading-tight tracking-tight cursor-pointer">
              Clear
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterComponent;
