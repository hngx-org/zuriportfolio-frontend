import React, { useState } from 'react';
import Modal from '@ui/Modal';
import useDisclosure from '../../../hooks/useDisclosure';
import { Add, Award, Briefcase, CloseSquare, Global, Menu, Teacher } from 'iconsax-react';
import Button from '@ui/Button';

function Home() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isCustomSectionModalOpen, setCustomSectionModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedEditSection, setSelectedEditSection] = useState<string | null>(null); // Track which section to edit
  const [selectedDeleteSection, setSelectedDeleteSection] = useState<string | null>(null); // Track which section to delete

  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [customSectionTitle, setCustomSectionTitle] = useState<string>('');

  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const sections = [
    {
      title: 'Work Experience',
      description: 'A place to highlight your work professional experience or internship training',
      icon: <Briefcase />,
    },
    {
      title: 'Education',
      description: 'Show off your  academic qualification  degrees, and also relevant certification.',
      icon: <Teacher />,
    },
    {
      title: 'Skill',
      description: 'List your your expertise, technical, managerial or soft skill abilities in this section',
      icon: <Briefcase />,
    },
    {
      title: 'Interests',
      description: 'A place to highlight your professional experience A place to highlight your professional ',
      icon: <Briefcase />,
    },
    {
      title: 'About Me',
      description: 'A place to highlight your professional experience A place to highlight your professional ',
      icon: <Briefcase />,
    },
    {
      title: 'Project',
      description: 'A place to highlight your professional experience A place to highlight your professional ',
      icon: <Briefcase />,
    },
    {
      title: 'Certification',
      description: 'A place to highlight your professional experience A place to highlight your professional ',
      icon: <Briefcase />,
    },
    {
      title: 'Language',
      description: 'A place to highlight your professional experience A place to highlight your professional ',
      icon: <Global />,
    },
    {
      title: 'Awards',
      description: 'A place to highlight your professional experience A place to highlight your professional ',
      icon: <Award />,
    },
    {
      title: 'Reference',
      description: 'A place to highlight your professional experience A place to highlight your professional ',
      icon: <Briefcase />,
    },
    {
      title: 'Shop',
      description: 'A place to highlight your professional experience A place to highlight your professional ',
      icon: <Briefcase />,
    },
    {
      title: 'Contact',
      description: 'A place to highlight your professional experience A place to highlight your professional ',
      icon: <Briefcase />,
    },
  ];

  const isSectionSelected = (title: string) => selectedSections.includes(title);

  const handleSectionClick = (sectionTitle: string) => {
    if (sectionTitle === 'Custom') {
      setCustomSectionModalOpen(true);
    } else if (!isSectionSelected(sectionTitle)) {
      setSelectedSections([...selectedSections, sectionTitle]);
      onClose();
    }
  };

  const addCustomSection = () => {
    if (customSectionTitle.trim() !== '') {
      setSelectedSections([...selectedSections, customSectionTitle]);
      setCustomSectionTitle('');
      setCustomSectionModalOpen(false);
    }
  };

  const openEditModal = (sectionTitle: string) => {
    setSelectedEditSection(sectionTitle); // Set the section to edit
    setEditModalIsOpen(true);
  };

  const openDeleteModal = (sectionTitle: string) => {
    setSelectedDeleteSection(sectionTitle); // Set the section to delete
    setDeleteModalIsOpen(true);
  };

  return (
    <>
      <Modal isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="xxl">
        <div className=" bg-white-100 p-3 py-5 rounded-lg">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <p className="text-4xl sm:text-[1.5rem] text-[#2E3130] font-manropeL font-bold leading-10">
                Add a section
              </p>
              <CloseSquare size="32" color="#009254" variant="Bold" onClick={onClose} className="cursor-pointer" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {sections.map(
              (section, index) =>
                !isSectionSelected(section.title) && (
                  <div
                    key={index}
                    className="bg-[#F4FBF6] p-4 rounded-lg cursor-pointer hover:border-2 hover:border-green-500 border-2 border-transparent"
                    onClick={() => handleSectionClick(section.title)}
                  >
                    <div className="flex gap-2 items-center text-green-500">
                      {section.icon}
                      <h2 className="text-black leading-6 text-base font-medium">{section.title}</h2>
                    </div>
                    <div>
                      <p className="text-[#444846] mt-2">{section.description}</p>
                    </div>
                  </div>
                ),
            )}
            <div
              className="bg-[#ffffff] p-4 rounded-lg flex items-center cursor-pointer border border-green-500 border-dashed hover:border-2 hover:border-green-500"
              onClick={() => handleSectionClick('Custom')}
            >
              <div>
                <div className="flex gap-2">
                  <Briefcase className="mt-1 text-green-500" />
                  <h2 className="font-bold text-black leading-6 text-base">Custom</h2>
                </div>
                <p>You didn’t find what you’re looking for? Make a custom section</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* after adding section */}

      <div className="p-4">
        {selectedSections.map((section) => (
          <div key={section} className="p-4  mt-4 cursor-pointer" onClick={() => setSelectedSection(section)}>
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <Menu className="text-sm font-thin" />
                <h2 className="text-black font-bold leading-6 text-base relative gap-2 p-2">
                  {section}
                  <span className="absolute left-0 bottom-0 w-full h-1 bg-green-500"></span>
                </h2>
              </div>
              <div className="ml-auto flex space-x-2">
                <button className="text-[#5B8DEF]" onClick={() => openEditModal(section)}>
                  Edit
                </button>
                <button className="text-[#FF5C5C]" onClick={() => openDeleteModal(section)}>
                  Delete
                </button>
              </div>
            </div>

            <div className="p-4 flex flex-col sm:flex-row text-gray-500  gap-4">
              <div className="p-4 font-light text-sm sm:text-left sm:w-1/3">mm/yyyy - mm/yyyy</div>

              <div className="w-full sm:w-2/3 sm:pl-4 text-gray-500 ">
                <div className=" font-medium text-gray-500 ]">Company</div>
                <div className="font-light text-sm">role</div>
              </div>
              <div className="mt-0 text-sm sm:mt-2 font-normal">Description</div>
            </div>
          </div>
        ))}
        <Button
          onClick={onOpen}
          className="p-2 ml-6 mt-4 bg-[#ffffff] hover:text-[#ffffff] rounded-lg shadow-md flex items-center cursor-pointer border border-green-500 text-[#009254] "
        >
          <Add size="16" className="hover:text-[#ffffff] text-[#009254]" />
          Add section
        </Button>
      </div>

      {/* Edit Modal */}
      <Modal closeModal={() => setEditModalIsOpen(false)} isOpen={editModalIsOpen}>
        <div className="p-4 bg-white">
          <h2 className="font-semibold text-lg">Edit</h2>
          <p>placeholder for the edit modal</p>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal closeModal={() => setDeleteModalIsOpen(false)} isOpen={deleteModalIsOpen}>
        <div className="p-4 bg-white">
          <h2 className="font-semibold text-lg">Delete</h2>
          <p>placeholder for the delete modal</p>
        </div>
      </Modal>

      {/* Section Modal */}
      {sections.map((section, index) => (
        <div key={index}>
          {selectedSection === section.title ? (
            <Modal closeModal={() => setSelectedSection(null)} isOpen={selectedSection === section.title}>
              <div className="p-4 bg-white">
                <h2 className="font-semibold text-lg">{section.title}</h2>
                <p>placeholder for {section.title} modal</p>
              </div>
            </Modal>
          ) : null}
        </div>
      ))}

      {/* Custom Section Modal */}
      <Modal closeModal={() => setCustomSectionModalOpen(false)} isOpen={isCustomSectionModalOpen}>
        <div className="p-4 bg-white">
          <p className="font-semibold">Placeholder for Custom Section</p>
        </div>
      </Modal>
    </>
  );
}

export default Home;
