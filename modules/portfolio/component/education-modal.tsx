import { useState } from 'react';
import Modal from '@ui/Modal';
import { Add, CloseSquare } from 'iconsax-react';
import { Input } from '@ui/Input';
import Button from '@ui/Button';
import { Education } from '../../../@types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';

type EducationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const EducationSection: React.FC<EducationModalProps> = ({ isOpen, onClose }) => {
  const [Educations, setEducations] = useState<Education[]>([]);
  const [degree, setDegree] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [description, setDescription] = useState('');
  const [school, setSchool] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [idCounter, setIdCounter] = useState(1);
  const [isForm, setIsForm] = useState(true);
  const [editedEducation, setEditedEducation] = useState<Education | null>(null);
  const [editMode, setEditMode] = useState(false);
  const handleEditEducation = (id: number) => {
    const editedEducation = Educations.find((education) => education.id === id);
    if (editedEducation) {
      setDegree(editedEducation.degree);
      setFieldOfStudy(editedEducation.fieldOfStudy);
      setDescription(editedEducation.description);
      setSchool(editedEducation.school);
      setDateFrom(editedEducation.dateFrom);
      setDateTo(editedEducation.dateTo);
      setIsForm(true);
      setEditMode(true);
      setEditedEducation(editedEducation);
    }
    handleDeleteEducation(id);
  };

  const educationObject = {
    degree,
    fieldOfStudy,
    description,
    school,
    id: idCounter,
    dateFrom,
    dateTo,
  };

  const handleSaveEducation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEducations((prev) => [educationObject, ...prev]);
    setIdCounter((prev) => prev + 1);
    setIsForm(false);
    setDegree('');
    setFieldOfStudy('');
    setDescription('');
    setSchool('');
    setDateFrom('');
    setDateTo('');
  };
  const selectOptions = [
    {
      value: 'MasterDegree',
      label: 'Masters of Science(M.Sc)',
    },
    {
      value: 'BachelorDegree',
      label: 'Bachelors of Science(B.Sc)',
    },
    {
      value: 'Post Graduate',
      label: 'Post Graduate',
    },
    {
      value: 'Ph.D.',
      label: 'Doctor of Philosophy (phD)',
    },
  ];

  const handleDeleteEducation = (id: number) => {
    const updatedEducation = Educations.filter((education) => education.id !== id);
    setEducations(updatedEducation);
  };

  return (
    <>
      <Modal isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="xl">
        <div className="space-y-6 bg-white-100 p-4 py-5">
          <div className="flex flex-col gap-3 px-12 mb-6">
            <div className="flex justify-between items-center">
              <p className="text-[1.2rem] sm:text-[1.5rem] font-bold text-[#2E3130] font-manropeL">Education</p>
              <CloseSquare size="32" color="#009254" variant="Bold" onClick={onClose} className="cursor-pointer" />
            </div>
            <div className="bg-brand-green-primary h-1 rounded-sm"></div>
          </div>
          <div className="">
            <div className="">
              {Educations.map((education, index) => {
                return (
                  <article
                    className={`border-b-2 pt-4 pb-5 border-brand-disabled flex flex-col gap-5 px-2 py-3 sm:px-0`}
                    key={index}
                  >
                    {/* <div className="flex justify-between"> */}
                    <div className="flex justify-around">
                      <p className="text-[#8D9290] font-semibold font-manropeB">
                        {education.dateFrom.split('-')[0]} - {education.dateTo.split('-')[0]}
                      </p>
                      <div className="">
                        <p className="text-[#2E3130] mb-1 text-[1.375rem] font-semibold">{education.fieldOfStudy}</p>
                        <p className="font-normal text-brand-green-primary text-sm">{education.school}</p>
                      </div>
                      <p
                        style={{
                          whiteSpace: 'normal',
                          overflowWrap: 'break-word',
                        }}
                        className="font-semibold font-manropeEB text-[12px] max-w-full text-ellipsis text-[#737876] "
                      >
                        {education.description}
                      </p>
                    </div>
                    {/* <p
                        style={{
                          whiteSpace: 'normal',
                          overflowWrap: 'break-word',
                        }}
                        className="font-semibold font-manropeEB text-[12px] max-w-full sm:pl-[3rem] text-ellipsis text-[#737876] "
                      >
                        {education.description}
                      </p> */}
                    {/* </div> */}
                    <div className="self-end flex gap-4 font-manropeL">
                      <span
                        onClick={() => handleEditEducation(education.id)}
                        className="font-semibold cursor-pointer text-[#5B8DEF]"
                      >
                        Edit
                      </span>
                      <span
                        className="font-semibold cursor-pointer text-brand-red-hover"
                        onClick={() => handleDeleteEducation(education.id)}
                      >
                        Delete
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
          <>
            {isForm && (
              <form onSubmit={handleSaveEducation} className="w-full gap-y-7 px-12">
                <div className="w-full">
                  <div className="flex flex-col gap-[.5rem] w-full mb-4">
                    <label className="font-semibold text-[#444846] text-[1rem] mt-6">Degree</label>
                    <Select
                      onValueChange={(value: string) => {
                        setDegree(value);
                      }}
                      value={degree}
                    >
                      <SelectTrigger className="w-full focus:outline-none border focus:ring-0 focus-within:border-brand-green-primary border-solid border-[2px] border-white-120">
                        <SelectValue placeholder="Select a degree" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectOptions.map((option, index) => (
                          <SelectItem
                            key={index}
                            value={option.value}
                            className="hover:text-[#009254] hover:bg-[#F4FBF6]"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mb-4 w-full">
                    <label className="block mb-1 text-md font-semibold" htmlFor="fieldOfStudy">
                      Field of Study
                    </label>
                    <Input
                      type="text"
                      intent={'default'}
                      placeHolder="Enter field of study"
                      value={fieldOfStudy}
                      onChange={(e) => setFieldOfStudy(e.target.value)}
                      className="w-full border-white-120"
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <label className="block mb-1 text-md font-semibold" htmlFor="fieldOfStudy">
                      School/Institution
                    </label>
                    <Input
                      type="text"
                      intent={'default'}
                      placeHolder="Enter name of school"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      className="w-full border-white-120"
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <label className="block mb-1 text-md font-semibold" htmlFor="fieldOfStudy">
                      Description
                    </label>
                    <Input
                      type="text"
                      intent={'default'}
                      placeHolder="Enter field of study"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full border-white-120"
                    />
                  </div>
                  <div className="mb-4 flex gap-4">
                    <div className="w-1/2">
                      <label className="block mb-1 text-md font-semibold" htmlFor="dateFrom">
                        From*
                      </label>
                      <Input
                        type="date"
                        intent={'default'}
                        placeHolder="2023"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className="w-full border-white-120"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block mb-1 text-md font-semibold" htmlFor="dateTo">
                        To*
                      </label>
                      <Input
                        type="date"
                        intent={'default'}
                        placeHolder="Present"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        className="w-full border-white-120"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-start sm:justify-end mt-12">
                  <Button
                    type="button"
                    onClick={onClose}
                    intent={'secondary'}
                    className="w-full rounded-md sm:w-[6rem]"
                    size={'lg'}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="w-full rounded-md sm:w-[6rem]" size={'lg'}>
                    Save
                  </Button>
                </div>
              </form>
            )}
          </>
          <>
            {!isForm && (
              <div className="px-3 gap-2 flex justify-between flex-col sm:flex-row">
                <button
                  className="text-brand-green-primary self-center text-[12px] sm:text-[15px] flex items-center gap-1 font-semibold font-manropeB"
                  onClick={() => setIsForm(true)}
                >
                  <Add size="16" color="#009254" /> Add new Education
                </button>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    type="button"
                    onClick={onClose}
                    intent={'secondary'}
                    className="w-full rounded-md sm:w-[6rem]"
                    size={'lg'}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="w-full rounded-md sm:w-[6rem]" size={'lg'}>
                    Save
                  </Button>
                </div>
              </div>
            )}
          </>
        </div>
      </Modal>
    </>
  );
};

export default EducationSection;
