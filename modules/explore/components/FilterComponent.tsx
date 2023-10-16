import { ArrowDown2 } from 'iconsax-react';
import React, { useState } from 'react';
import CustomDropdown from './CustomDropdown';
import Button from '@ui/Button';
import Loader from '@ui/Loader';
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
  const [selectedOptions, setSelectedOptions] = useState({
    Location: '',
    Skill: '',
    Track: '',
    Ranking: '',
    Tag: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const applyFilters = () => {
    setIsLoading(true);

    setTimeout(() => {
      handleFilters('Location', selectedOptions.Location);
      handleFilters('Skill', selectedOptions.Skill);
      handleFilters('Track', selectedOptions.Track);
      handleFilters('Ranking', selectedOptions.Ranking);
      handleFilters('Tag', selectedOptions.Tag);

      setIsLoading(false);
    }, 2000);
  };

  const { filters, handleFilters, closeFilterComponent } = prop;

  const handleCustomDropdownChange = (option: string, fieldName: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [fieldName]: option,
    });
  };

  // const applyFilters = () => {
  //   // Apply the selected filters
  //   setTimeout(() => {
  //     handleFilters('Location', selectedOptions.Location);
  //     handleFilters('Skill', selectedOptions.Skill);
  //     handleFilters('Track', selectedOptions.Track);
  //     handleFilters('Ranking', selectedOptions.Ranking);
  //     handleFilters('Tag', selectedOptions.Tag);
  //     setIsLoading(false);
  //   }, 1000);
  // };

  const clearAllOptions = () => {
    setSelectedOptions({
      Location: '',
      Skill: '',
      Track: '',
      Ranking: '',
      Tag: '',
    });

    // Also, clear the corresponding filter options in the state if needed
    handleFilters('Location', '');
    handleFilters('Skill', '');
    handleFilters('Track', '');
    handleFilters('Ranking', '');
    handleFilters('Tag', '');
  };

  return (
    <>
      <div className="max-w-[1280px] mt-8">
        <div className="w-full flex justify-between items-center">
          <div className="btn flex gap-3">
            <Button onClick={applyFilters} className="px-4">
              Apply Filter
            </Button>
            <Button onClick={clearAllOptions} className="px-6" intent={'secondary'}>
              Clear
            </Button>
          </div>
          {/* {isLoading && <Loader />} */}
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
            selectedValue={selectedOptions.Location}
            placeholder="Location"
            onChange={(option) => handleCustomDropdownChange(option, 'Location')}
          />
          <CustomDropdown
            options={['C++', 'Javascript', 'Vue', 'React', 'Angular', 'Python']}
            selectedValue={selectedOptions.Skill}
            placeholder="Skill"
            onChange={(option) => handleCustomDropdownChange(option, 'Skill')}
          />
          <CustomDropdown
            options={['Frontend', 'Design', 'Backend', 'Video Marketing']}
            selectedValue={selectedOptions.Track}
            placeholder="Track"
            onChange={(option) => handleCustomDropdownChange(option, 'Track')}
          />
          <CustomDropdown
            options={['Beginner', 'Intermediate', 'Expert']}
            selectedValue={selectedOptions.Ranking}
            placeholder="Ranking"
            onChange={(option) => handleCustomDropdownChange(option, 'Ranking')}
          />
          <CustomDropdown
            options={['E-Commerce', 'Proptech', 'Entertainment', 'Health', 'Fintech', 'Edtech']}
            selectedValue={selectedOptions.Tag}
            placeholder="Tag"
            onChange={(option) => handleCustomDropdownChange(option, 'Tag')}
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
