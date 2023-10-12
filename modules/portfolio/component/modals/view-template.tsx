import React, { useContext } from 'react';
import Modal from '@ui/Modal';
import { Briefcase, CloseSquare } from 'iconsax-react';
import Portfolio from '../../../../context/PortfolioLandingContext';

const ViewTemplate = () => {
  const { isOpen, onClose, toggleSection, sections } = useContext(Portfolio);
  return (
    <>
      <Modal isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="xl">
        <div className=" bg-white-100 p-3 py-5 rounded-lg">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <p className="text-4xl sm:text-[1.5rem] text-[#2E3130] font-manropeL font-bold leading-10">
                Pick a template
              </p>
              <CloseSquare size="32" color="#009254" variant="Bold" onClick={onClose} className="cursor-pointer" />
            </div>
          </div>
          <div>
            {/* <div
              className="bg-[#ffffff] p-4 rounded-lg flex items-center cursor-pointer border border-green-500 border-dashed hover:border-2 hover:border-green-500"
              
            > */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              <div className="bg-[#F4FBF6] p-4 rounded-lg cursor-pointer hover:border-2 hover:border-green-500 border-2 border-transparent">
                <div className="flex gap-2">
                  <Briefcase className="mt-1 text-green-500" />
                  <h2 className="font-bold text-black leading-6 text-base">Product Design</h2>
                </div>
                <p>
                  Pick this product design template to build your product design portfolio with pre-defined sections
                </p>
              </div>
              <div className="bg-[#F4FBF6] p-4 rounded-lg cursor-pointer hover:border-2 hover:border-green-500 border-2 border-transparent">
                <div className="flex gap-2">
                  <Briefcase className="mt-1 text-green-500" />
                  <h2 className="font-bold text-black leading-6 text-base">Video Marketing</h2>
                </div>
                <p>Show off your academic qualification degrees, and also relevant certification.</p>
              </div>
              <div className="bg-[#F4FBF6] p-4 rounded-lg cursor-pointer hover:border-2 hover:border-green-500 border-2 border-transparent">
                <div className="flex gap-2">
                  <Briefcase className="mt-1 text-green-500" />
                  <h2 className="font-bold text-black leading-6 text-base">Skill</h2>
                </div>
                <p>List your your expertise, technical, managerial or soft skill abilities in this section</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewTemplate;
