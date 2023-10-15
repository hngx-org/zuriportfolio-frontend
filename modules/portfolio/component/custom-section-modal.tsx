import { Input } from '@ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
import { Add, CloseSquare } from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import { years } from '../data';
import Modal from '@ui/Modal';
import Button from '@ui/Button';

type Section = {
  type: string; // Type of the section (e.g., 'title', 'sub-title', etc.)
  data: Record<string, any>; // Section-specific data stored as a key-value pair
  id: number;
};

type CustomSectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CustomSectionModal = ({ isOpen, onClose }: CustomSectionModalProps) => {
  const [fields, setFields] = useState<Section[]>([]); // Initialize fields state to store added fields
  // const [sections, setSections] = useState<any>([]);
  const [customTitle, setCustomTitle] = useState('');
  const [isTitle, setIsTitle] = useState(false);
  const [sections, setSections] = useState<{ title: string; fields: Section[]; id: number }[]>([]);
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [isForm, setIsForm] = useState(true);
  const [isFormValid, setIsFormValid] = useState(true);
  const [idCounter, setIdCounter] = useState(1);

  const isFieldEmpty = (field: Section) => {
    if (field.data.title === '') {
      alert('pls fill in all fields');
      return;
    }
    // Add conditions for other field types (e.g., 'description', 'links', etc.) here.
    return false; // Default to not empty if the field type is not recognized.
  };

  const handleAddField = (sectionType: string) => {
    setIdCounter((prev) => prev + 1);
    // Check if the section type is in the oneInstanceTypes array
    const oneInstanceTypes = ['title', 'sub-title', 'dates'];
    if (oneInstanceTypes.includes(sectionType)) {
      // Check if a section of the same type already exists
      const sectionExists = fields.some((field) => field.type === sectionType);

      if (sectionExists) {
        // Section of the same type already exists, prevent adding another one
        alert(`You already created a ${sectionType}`);
        return;
      }
    }

    // Create a new section based on the section type
    const newField = {
      type: sectionType,
      data: {}, // Store section-specific data here
      id: idCounter,
    };
    setFields([...fields, newField]);
    // setIsTitle(false);
  };

  const handleSave = () => {
    // Create a new section with the title "Section Title" and the current fields
    setIsFormValid(true);
    const newSection = {
      title: customTitle, // You can customize this title as needed
      id: idCounter,
      fields: fields,
    };

    // Add the new section to the sections state
    setSections([...sections, newSection]);

    // Clear the fields
    setFields([]);
  };

  const handleUpdateField = ({ sectionIndex, newData }: { sectionIndex: number; newData: Record<string, any> }) => {
    const updatedFields = [...fields];
    updatedFields[sectionIndex].data = newData;
    setFields(updatedFields);
  };

  const handleDeleteCustomItem = (id: number) => {
    const updatedExperience = sections.filter((section) => section.id !== id);
    setSections(updatedExperience);
  };
  const renderfields = () => {
    return (
      // <div className="flex flex-col gap-7">
      <>
        {fields.map((field, index) => (
          <React.Fragment key={index}>
            {field.type === 'sub-title' && (
              <div className="flex flex-col gap-1 items-start">
                <p className="text-brand-green-primary text-[0.6875rem] tracking-[0.00344rem] font-semibold">
                  #4 Subtitle
                </p>
                <input
                  type="text"
                  className="text-left mb-2 text-custom-color43 w-full font-semibold font-manropeL outline-none"
                  placeholder="Field Title"
                />
                <div className="w-full">
                  <Input
                    placeHolder="Senior project manager"
                    className="border-[#E1E3E2] w-full h-[54px] rounded-md border-[1px]"
                    inputSize={'lg'}
                    onChange={(e) => {
                      const newData = { ...field.data, title: e.target.value };
                      handleUpdateField({ sectionIndex: index, newData });
                    }}
                  />
                </div>
              </div>
            )}
            {field.type === 'links' && (
              <div className="flex text-left flex-col gap-1 items-start">
                <div>
                  <p className="text-brand-green-primary text-[0.6875rem] tracking-[0.00344rem] font-semibold">
                    #4 Links
                  </p>
                  <input
                    type="text"
                    className="text-left mb-1 text-custom-color43 w-full font-semibold font-manropeL outline-none"
                    placeholder="Field Title"
                  />
                </div>
                <div className="w-full">
                  <Input
                    placeHolder="Links"
                    className="border-[#E1E3E2] w-full h-[54px] rounded-md border-[1px]"
                    inputSize={'lg'}
                    onChange={(e) => {
                      const newData = { ...field.data, title: e.target.value };
                      handleUpdateField({ sectionIndex: index, newData });
                    }}
                  />
                </div>
              </div>
            )}
            {field.type === 'description' && (
              <div className="flex flex-col text-left gap-1 items-start">
                <div>
                  <p className="text-brand-green-primary text-[0.6875rem] tracking-[0.00344rem] font-semibold">
                    #5 Description
                  </p>
                  <p className="text-left mb-1 text-custom-color43 w-full font-semibold font-manropeL">Description</p>
                </div>
                <div className="w-full">
                  <textarea
                    className="resize-none border-[1px] w-full border-solid border-[#E1E3E2] pt-2 pl-2 text-white-650 font-semibold rounded-lg outline-none focus:border-brand-green-primary "
                    rows={3}
                    onChange={(e) => {
                      const newData = { ...field.data, title: e.target.value };
                      handleUpdateField({ sectionIndex: index, newData });
                    }}
                  ></textarea>
                </div>
              </div>
            )}
            {field.type === 'dates' && (
              <div className="flex flex-col gap-2 items-start">
                <p className="text-brand-green-primary text-[0.6875rem] tracking-[0.00344rem] font-semibold">
                  #6 Dates
                </p>
                <div className="w-full">
                  <div className="flex justify-between gap-7">
                    <div className="w-full">
                      <p className="text-[#444846] mb-2 text-left font-semibold">From *</p>
                      <Select
                        onValueChange={(value: string) => {
                          setStartYear(value);
                        }}
                        value={startYear}
                      >
                        <SelectTrigger className="w-full border-[1px] border-brand-disabled">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <>
                          <SelectContent>
                            {years.map((year, index) => (
                              <SelectItem key={index} value={year.value}>
                                {year.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </>
                      </Select>
                    </div>
                    <div className="w-full">
                      <p className="text-[#444846] mb-2 text-left font-semibold">To *</p>
                      <Select
                        onValueChange={(value: string) => {
                          setStartYear(value);
                        }}
                        value={startYear}
                      >
                        <SelectTrigger className="w-full border-[1px] border-brand-disabled">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <>
                          <SelectContent>
                            {years.map((year, index) => (
                              <SelectItem key={index} value={year.value}>
                                {year.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {field.type === 'input-field' && (
              <div className="flex flex-col gap-1 items-start">
                <p className="text-brand-green-primary text-[0.6875rem] tracking-[0.00344rem] font-semibold">
                  #1 Input field
                </p>
                <input
                  type="text"
                  className="text-left mb-2 text-custom-color43 w-full font-semibold font-manropeL outline-none"
                  placeholder="Field Title"
                />
                <div className="w-full">
                  <Input
                    placeHolder="Senior project manager"
                    className="border-[#E1E3E2] w-full h-[54px] rounded-md border-[1px]"
                    inputSize={'lg'}
                    onChange={(e) => {
                      const newData = { ...field.data, title: e.target.value };
                      handleUpdateField({ sectionIndex: index, newData });
                    }}
                  />
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  const handleAddTitle = () => {
    setIsTitle(true);
  };

  useEffect(() => {
    console.log(sections);
  }, [sections]);

  return (
    <Modal isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="xl">
      <div className="px-5 flex flex-col gap-7">
        {sections.map((section, index) => (
          <CustomSectionItem
            handleDeleteCustomItem={handleDeleteCustomItem}
            onClose={onClose}
            key={index}
            sectionItem={section}
          />
        ))}
      </div>
      <div className="px-5">
        <div className="border-brand-disabled rounded py-5 px-6 mt-8 mb-8 border-[1px]">
          <SectionBtns handleAddTitle={handleAddTitle} handleAddField={handleAddField} />
        </div>
        <div className="border-brand-disabled rounded p-5 mt-2 mb-10 text-center border-[1px]">
          {fields.length > 0 || isTitle ? (
            <div>
              <>
                {isTitle && (
                  <div className="flex flex-col gap-1 mb-7 items-start">
                    <p className="text-brand-green-primary text-[0.6875rem] tracking-[0.00344rem;] font-semibold">
                      #1 Title
                    </p>
                    <div className="">
                      <input
                        className="border-brand-green-primary border-b-[5px] w-min-[9rem] pb-2 text-2xl inline-block focus:outline-none placeholder-black"
                        placeholder="Section Title"
                        onChange={(e) => {
                          setCustomTitle(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                )}
              </>
              {fields.length > 0 && <div className="flex flex-col gap-7 pb-4">{renderfields()}</div>}
            </div>
          ) : (
            <h1></h1>
          )}
        </div>
        <>
          {fields.length < 0 || !isTitle ? (
            <div className="border-brand-disabled h-[250px] font-manropeL text-[#444846] flex items-center justify-center flex-col gap-7 rounded p-5 mt-3 mb-8 text-center border-[1px]">
              Customize and arrange your fields by clicking on the options above
            </div>
          ) : (
            <h1></h1>
          )}
        </>
        <div className="flex gap-2 justify-end items-end">
          <Button
            type="button"
            onClick={onClose}
            intent={'secondary'}
            className="w-full rounded-md self-end sm:w-[6rem]"
            size={'lg'}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => {
              handleSave();
              setIsTitle(false);
            }}
            className="w-full rounded-md self-end sm:w-[6rem]"
            size={'lg'}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const sectionButtonsData = [
  {
    type: 'sub-title',
    title: 'Sub Title',
  },
  {
    type: 'input-field',
    title: 'Input filed',
  },
  {
    type: 'links',
    title: 'Links',
  },
  {
    type: 'description',
    title: 'Description',
  },
  {
    type: 'images',
    title: 'Images',
  },
  {
    type: 'dates',
    title: 'Dates',
  },
];

const SectionBtns = ({
  handleAddField,
  handleAddTitle,
}: {
  handleAddField: (type: string) => void;
  handleAddTitle: () => void;
}) => {
  // const handleOpenFileManager = (e: React.FormEvent<HTMLInputElement>) => {
  //   // Create a file input element
  //   const fileInput = document.createElement('input');
  //   fileInput.type = 'file';
  //   fileInput.accept = 'image/*'; // Set the accepted file types (e.g., images)
  //   fileInput.style.display = 'none';

  //   // Add an event listener to handle the selected files
  //   fileInput.addEventListener('change', (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const selectedFiles = event.target.files;
  //     if (selectedFiles && selectedFiles.length > 0) {
  //       const selectedFile = selectedFiles[0];
  //       // Process the selected file here (e.g., upload it or display it)
  //     }
  //   });

  //   // Trigger a click event on the file input
  //   fileInput.click();
  // };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(8rem, 1fr))',
        gap: '1rem',
      }}
      className=""
    >
      <button
        onClick={handleAddTitle}
        className="bg-brand-green-ttr px-[.8rem] py-[.5rem] rounded-md text-lg text-white-650 flex gap-2 justify-between items-center"
      >
        Title
        <Add size="16" color="#003A1B" />
      </button>
      {sectionButtonsData.map((sectionBtn) => (
        <button
          key={sectionBtn.type}
          onClick={() => handleAddField(sectionBtn.type)}
          className="bg-brand-green-ttr px-[.8rem] py-[.5rem] rounded-md text-lg text-white-650 flex gap-2 justify-between items-center"
        >
          {sectionBtn.title}
          <Add size="16" color="#003A1B" />
        </button>
      ))}
    </div>
  );
};

type SectionItemProps = {
  title: string;
  id: number;
  fields: Section[];
};

const InputField = ({ fields }: { fields: Section[] }) => {
  const inputs = fields.filter((field: Section) => field.type === 'input-field');

  return (
    <div className="flex flex-col gap-4">
      {inputs.map((field: any, index: number) => {
        return (
          <p className="text-[#8D9290]" key={index}>
            {field.data.title}
          </p>
        );
      })}
    </div>
  );
};

const DescriptionField = ({ fields }: { fields: Section[] }) => {
  const inputs = fields?.filter((field: Section) => field.type === 'description');
  return (
    <div className="flex flex-col gap-3">
      {inputs.map((field: any, index: number) => {
        return (
          <p key={index} className="text-[#737876] font-manropeL">
            {field?.data?.title}
          </p>
        );
      })}
    </div>
  );
};

const CustomSectionItem = ({
  sectionItem,
  onClose,
  handleDeleteCustomItem,
}: {
  sectionItem: SectionItemProps;
  onClose: () => void;
  handleDeleteCustomItem: (id: number) => void;
}) => {
  const subTitle = sectionItem?.fields?.filter((field: Section) => field.type === 'sub-title');

  return (
    <article className="flex flex-col gap-4 justify-between">
      <div className="flex flex-col gap-2 mb-4">
        <div className="w-full flex justify-between items-center">
          <p className="text-[1.2rem] sm:text-[1.5rem] font-bold text-[#2E3130] font-manropeL">{sectionItem?.title}</p>
          <CloseSquare size="32" color="#009254" variant="Bold" onClick={onClose} className="cursor-pointer" />
        </div>
        <div className="bg-brand-green-primary w-full h-1 rounded-sm"></div>
      </div>
      <div className="flex justify-between gap-4">
        <div>
          <p className="text-[1.115rem] mb-2 font-manropeB text-[#2E3130]">{subTitle[0]?.data?.title}</p>
          <InputField fields={sectionItem?.fields} />
        </div>
        <DescriptionField fields={sectionItem?.fields} />
      </div>
      <div className="h-[1px] bg-[#E1E3E2] w-full"></div>
      <div className="self-end flex gap-4 font-manropeL">
        <span className="font-semibold cursor-pointer text-[#5B8DEF]">Edit</span>
        <span
          className="font-semibold cursor-pointer text-brand-red-hover"
          onClick={() => handleDeleteCustomItem(sectionItem?.id)}
        >
          Delete
        </span>
      </div>
    </article>
  );
};

export default CustomSectionModal;
