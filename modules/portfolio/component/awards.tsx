import Button from '@ui/Button';
import Modal from '@ui/Modal';
import { ArrowLeft2, CloseSquare } from 'iconsax-react'; // Remove unused imports
import React, { useState } from 'react';
import AwardRead from './award-read';

const Awards = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [selectedYear, setSelectedYear] = useState('2023');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div>
      {!isModalOpen && (
        <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false}>
          <div className="p-5 sm:p-6 lg:p-8 flex gap-12 flex-col font-manropeB">
            <div className="flex gap-2  border-b-4 border-brand-green-primary py-4 px-0 justify-between items-center">
              <div className="flex items-center gap-6">
                <ArrowLeft2 />
                <h1 className="font-bold text-2xl  text-white-700">Awards</h1>
              </div>
              <div onClick={onClose}>
                <CloseSquare className="fill-brand-green-primary text-white-100 h-7 w-7 cursor-pointer" />
              </div>
            </div>
            <div>
              <form className="flex flex-col gap-6 px-6">
                <div className="flex flex-col sm:flex-row w-full gap-[10px]">
                  <div className="flex  flex-col gap-2 flex-1">
                    <label htmlFor="home" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                      Awards Title*
                    </label>
                    <input
                      type="text"
                      id="home"
                      name="home"
                      placeholder="My best yet"
                      className="p-4 border-brand-disabled placeholder:text-[16px] placeholder:leading-6   placeholder:text-[#737876] placeholder:font-semibold rounded-lg border-[1px]"
                    />
                  </div>
                  <div className="flex  flex-col gap-[10px] flex-1">
                    <label htmlFor="year" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                      Year
                    </label>
                    <select
                      id="year"
                      name="year"
                      className="p-4 border-brand-disabled rounded-lg border-[1px]"
                      value={selectedYear}
                      onChange={handleYearChange}
                    >
                      {Array.from({ length: 124 }, (_, index) => {
                        const year = 2023 - index;
                        if (year >= 1900) {
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          );
                        }
                        return null;
                      })}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row w-full gap-[10px]">
                  <div className="flex  flex-col gap-[10px] flex-1">
                    <label htmlFor="home" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                      Organization*
                    </label>
                    <input
                      type="text"
                      id="home"
                      name="home"
                      placeholder="Google"
                      className="p-4 border-brand-disabled placeholder:text-[16px] placeholder:leading-[24px]   placeholder:text-[#737876] placeholder:font-semibold rounded-lg border-[1px]"
                    />
                  </div>
                  <div className="flex  flex-col gap-[10px] flex-1">
                    <label htmlFor="home" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                      Url
                    </label>
                    <input
                      type="text"
                      id="home"
                      name="home"
                      placeholder="Type link"
                      className="p-4 border-brand-disabled placeholder:text-[16px] placeholder:leading-[24px]   placeholder:text-[#737876] placeholder:font-semibold rounded-lg border-[1px]"
                    />
                  </div>
                </div>
                <div className="flex  flex-col gap-[10px]">
                  <label htmlFor="home" className="font-semibold text-[16px] leading-[24px]  text-[#444846]">
                    Description
                  </label>
                  <input
                    type="text"
                    id="home"
                    name="home"
                    placeholder=""
                    className="p-4 border-brand-disabled placeholder:text-[16px] placeholder:leading-[24px]   placeholder:text-[#737876] placeholder:font-semibold rounded-lg border-[1px]"
                  />
                </div>
                <div className="flex gap-4 justify-end items-center">
                  <Button className="py-3 px-5 rounded-lg bg-white-100 border-[#009444] border-[1px] text-[#009444] hover:bg-brand-disabled">
                    Cancel
                  </Button>{' '}
                  <Button
                    onClick={openModal}
                    className="py-3 px-5 rounded-lg bg-[#009444] border-white-100 border-[1px] text-white-100"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      )}
      {isModalOpen && <AwardRead isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  );
};

export default Awards;
