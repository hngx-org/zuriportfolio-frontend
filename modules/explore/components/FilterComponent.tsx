import { ArrowDown2 } from 'iconsax-react';
import React, { useState } from 'react';
import CustomDropdown from './CustomDropdown';
import Button from '@ui/Button';

interface Option {
  label?: string;
  value?: string;
  filters: {
    SortBy?: number;
    Location?: string;
    Skill?: string;
    Track?: string;
    Ranking?: string;
    Tag?: string;
    Provider?: string;
  };
  handleFilters: (type: string, value: string | number) => void;
  showFilterComponent: boolean;
  closeFilterComponent: (option?: 'close' | 'clear') => void;
}

const FilterComponent = (prop: Option) => {
  //   const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedOption2, setSelectedOption2] = useState<string>('');
  const [selectedOption3, setSelectedOption3] = useState<string>('');
  const [selectedOption4, setSelectedOption4] = useState<string>('');
  const [selectedOption5, setSelectedOption5] = useState<string>('');
  const [selectedOption6, setSelectedOption6] = useState<string>('');

  const { filters, handleFilters, closeFilterComponent } = prop;

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
    if (option !== 'Track') {
      return handleFilters('Track', option);
    }

    delete filters.Track;
  };
  const handleCustomDropdownChange5 = (option: string) => {
    setSelectedOption5(option);
    if (option !== 'Tag') {
      return handleFilters('Tag', option);
    }

    delete filters.Tag;
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
      <div className="max-w-[1280px] mt-8">
        <div className="w-full flex justify-between items-center">
          <div className="btn flex gap-3">
            <Button className="px-4">Apply Filter</Button>
            <Button onClick={() => closeFilterComponent('clear')} className="px-6" intent={'secondary'}>
              Clear
            </Button>
          </div>

          <div className=" cursor-pointer" onClick={() => closeFilterComponent('close')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" fill="none" viewBox="0 0 33 32">
              <path
                stroke="#464646"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M16.5 29.333c7.333 0 13.333-6 13.333-13.333s-6-13.333-13.333-13.333c-7.334 0-13.334 6-13.334 13.333s6 13.333 13.334 13.333zM12.727 19.773l7.546-7.546M20.273 19.773l-7.546-7.546"
              ></path>
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 max-w-[1280px] mx-auto  lg:mb-0 mb-6 mt-5 lg:grid-cols-6 sm:grid-cols-2 md:mx-auto lg:flex lg:justify-between ">
          <CustomDropdown
            options={['Ibadan', 'Lagos', 'Abuja', 'Portharcourt', 'Abeokuta', 'Kaduna']}
            selectedValue={selectedOption}
            placeholder="Location"
            onChange={handleCustomDropdownChange}
          />
          <CustomDropdown
            options={['C++', 'Javascript', 'Vue', 'React', 'Angular', 'Python']}
            selectedValue={selectedOption2}
            placeholder="Skill"
            onChange={handleCustomDropdownChange2}
          />
          <CustomDropdown
            options={['Frontend', 'Design', 'Backend', 'Video Marketing']}
            selectedValue={selectedOption3}
            placeholder="Track"
            onChange={handleCustomDropdownChange3}
          />
          <CustomDropdown
            options={['Intern', 'Junior', 'Associate', 'Mid-Senior', 'Senior']}
            selectedValue={selectedOption4}
            placeholder="Level"
            onChange={handleCustomDropdownChange4}
          />
          <CustomDropdown
            options={['E-Commerce', 'Proptech', 'Entertainment', 'Health', 'Fintech', 'Edtech']}
            selectedValue={selectedOption5}
            placeholder="Tag"
            onChange={handleCustomDropdownChange5}
          />
          <CustomDropdown
            options={['Beginner', 'Intermediate', 'Expert']}
            selectedValue={selectedOption6}
            placeholder="Ranking"
            onChange={handleCustomDropdownChange6}
          />
        </div>
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
