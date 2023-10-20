import { Category } from 'iconsax-react';
import React from 'react';

type Section = {
  key?: string | number;
  icon?: React.ReactElement;
  activeIcon: React.ReactElement;
  text: string;
  filterType: string;
};

type SectionsProps = {
  sectionsData: Section[];
  activeSection: number;
  setActiveSection: (index: number) => void;
  handleFilters: (type: string, value: string) => void;
  setShowFilterComponent: (show: boolean) => void;
  fetchProducts: (text: string) => void;
  fetchAllData: () => void;
};

const SectionData: React.FC<SectionsProps> = ({
  sectionsData,
  activeSection,
  setActiveSection,
  handleFilters,
  setShowFilterComponent,
  fetchProducts,
  fetchAllData,
}) => {
  return (
    <div className="justify-start items-center inline-flex mt-4 gap-6">
      <div
        className={`px-4 py-[0.625rem] rounded-2xl justify-center items-center gap-4 flex cursor-pointer font-manropeL text-[12px] ${
          activeSection === 11 ? 'bg-brand-green-primary text-white-100' : 'bg-white text-[#737876]'
        }`}
        onClick={() => {
          setActiveSection(11);
          handleFilters('All', 'All');
          fetchAllData();
          setShowFilterComponent(true);
        }}
      >
        <div className="w-6 h-6 relative">
          <Category color={activeSection === 11 ? '#fff' : '#737373'} variant="Bold" />
        </div>
        <div className="text-center">All</div>
      </div>
      {sectionsData?.map((section: Section, index: number) => (
        <div
          key={index}
          className={`px-4 py-[0.625rem] rounded-2xl justify-center items-center gap-4 flex cursor-pointer font-manropeL text-[12px] ${
            activeSection === index ? 'bg-brand-green-primary text-white-100' : 'bg-white text-[#737876]'
          } ${section?.text === 'All' ? 'hidden sm:flex' : ''}`}
          onClick={() => {
            setActiveSection(index);
            fetchProducts(section?.text);
            handleFilters(section?.filterType, section?.text);
            setShowFilterComponent(section.text === 'All Filter');
          }}
        >
          <div className="w-6 h-6 relative">{activeSection === index ? section.icon : section.activeIcon}</div>
          <div className="text-center">{section.text}</div>
        </div>
      ))}
    </div>
  );
};

export default SectionData;
