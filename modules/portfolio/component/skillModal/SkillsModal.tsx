
import Button from '@ui/Button';
import { Input } from '@ui/Input';
import Modal from '@ui/Modal';
import { useEffect, useState, MouseEvent } from 'react';
import { AiOutlinePlus, AiOutlineCloseCircle, AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';

type skillModalProps = {
  onClose: () => void;
  isOpen: boolean;
  userId: string;
};

type PostSkillResponse = {
  skills: Array<string>;
  sectionId: number;
};

type skillListRes = {
  skillId: number;
  skill: string;
};

const SkillModal = ({ onClose, isOpen, userId }: skillModalProps) => {
  const [inputValue, setInputValue] = useState('');
  const [arrayOne, setArrayOne] = useState<Array<skillListRes>>([
    { skill: 'Version Control', skillId: 1 },
    { skill: 'DeveOps', skillId: 2 },
    { skill: 'Testing', skillId: 3 },
    { skill: 'Art', skillId: 4 },
    { skill: 'Sketch', skillId: 5 },
    { skill: 'Visual Branding', skillId: 6 },
    { skill: 'Graphics Design', skillId: 7 },
    { skill: 'Color Theory', skillId: 8 },
    { skill: 'Illustration', skillId: 9 },
    { skill: 'Animation', skillId: 10 },
    { skill: 'API Intergration', skillId: 11 },
  ]);
  const [arrayTwo, setArrayTwo] = useState<Array<skillListRes>>([]);
  const [values, setValues] = useState<Array<skillListRes>>([]);
  const userID = 'f8e1d17d-0d9e-4d21-89c5-7a564f8a1e90';

  const fetchSkillData = async () => {
    try {
      // Make a GET request to the API
      const response = await axios.get(`https://hng6-r5y3.onrender.com/api/skills-details/${userID}`);
      const data = response.data.data;
      setValues(data);
    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error);
    }
  };
  // set the data in the db on the modal onload

  useEffect(() => {
    fetchSkillData();
  }, []);

  // on Enter press append input value to array two(setValues)
  const handleKeyPress = (e: { key: string }) => {
    if (e.key === 'Enter') {
      const trimmedValue = inputValue.trim();
      if (trimmedValue !== '' && !values.some((skill) => skill.skill === trimmedValue)) {
        setValues([...values, { skillId: new Date().getTime(), skill: String(trimmedValue) }]);
        setInputValue('');
      }
    }
  };

  // handle input change
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputChangeValue = e.target.value.trim();
    if (inputChangeValue !== '') {
      setInputValue(e.target.value);
    }
  };

  const arrayTwolist = (item: skillListRes) => {
    setInputValue('');
    const updatedValues = values.filter((value) => value !== item);
    setValues(updatedValues);
  };

  const arrayOneItemAddition = (item: skillListRes) => {
    if (!values.some((skill) => skill.skill === item.skill)) {
      //avoid duplicates
      setValues((values) => [...values, item]);
    }
  };

  const skillsArray = values.map((obj) => obj.skill);

  // update skill items on the landing page with reloading the page 
  const getAllSkill = async () => {
    try {
      const response = await fetch(`https://hng6-r5y3.onrender.com/api/getPortfolioDetails/${userID}`);

      if (response.ok) {
        const data = await response.json();
        const { skills } = data;
        console.log(data);
        arrayTwolist(skills);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const apiUrl = 'https://hng6-r5y3.onrender.com/api/create-skills';
  const requestData = {
    skills: skillsArray,
    sectionId: 5,
    userId: userID,
  };

  async function postSkillData(): Promise<PostSkillResponse> {
    try {
      const response = await axios.post(apiUrl, requestData);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error; // You can handle the error further if needed
    }
  }

  async function deleteSkillsData(id: number) {
    try {
      const response = await axios.delete(`https://hng6-r5y3.onrender.com/api/delete-skills/${id}}`);
      if (response.data.successful) {
        fetchSkillData();
      }
      return response.data;
    } catch (error: any) {
      if (error.message !== 'Request failed with status code 404') {
        throw error;
      }
    }
  }

  // onclick of save button, it saves data to the endpoint
  function handleAddSkills(event: MouseEvent<HTMLButtonElement>): void {
    postSkillData();
    getAllSkill();
    onClose();
  }

  // clear array two on cancel btn click
  const cancelBtnFn = () => {
    setValues([]);
  };

  return (
    <section className="w-full flex items-center justify-center fontFamily-manropeEL">
      <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="xl">
        <div className=" w-full max-sm:w-full px-10 py-6 fontFamily-manropeEL max-sm:px-2 ">
          <div className="flex justify-between items-center border-b-4 border-brand-green-primary pb-4">
            <h1 className="font-bold text-2xl ">Skill</h1>
            <button
              className="bg-green-500 w-8 h-8 rounded-lg flex justify-center items-center text-white-100"
              onClick={onClose}
            >
              <AiOutlineClose />
            </button>
          </div>
          <div className="w-full">
            {values?.length > 0 && (
              <ul className="w-full flex flex-wrap gap-4 my-12">
                {values?.map((item: skillListRes) => (
                  <li key={item.skillId}>
                    <Button
                      className=" group/skillsbtn text-brand-green-shade20 h-10 bg-brand-green-shade95  hover:text-white-100   text-sm font-semibold leading-5 rounded-lg px-2 py-4 flex items-center gap-4"
                      onClick={() => {
                        arrayTwolist(item);
                        deleteSkillsData(item.skillId);
                      }}
                      type="button"
                    >
                      {item.skill}
                      <span className="text-base rounded-full m-auto ml-4 flex items-center justify-center  group-hover/skillsbtn:border-white-100">
                        <AiOutlineCloseCircle />
                      </span>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="my-12">
            <Input
              type="text"
              placeHolder='Enter your skill and press "ENTER'
              className="w-full rounded-lg p-4 mb-6 border-2 border-[#C4C7C6] max-sm:p-2"
              onChange={inputChange}
              onKeyDown={handleKeyPress}
              value={inputValue}
            />
          </div>

          <div className="w-full">
            <h2 className="text-brand-green-primary text-base font-bold">Suggestions</h2>
            {arrayOne.length > 0 && (
              <ul className=" pt-4 flex gap-6 rounded-sm flex-wrap w-full max-sm:p-2 max-sm:text-sm">
                {arrayOne.map((item) => (
                  <li key={item.skillId}>
                    <Button
                      className="text-[#737876] group/addSkillsBtn  bg-white border-2 border-brand-disabled2 hover:text-white-100 focus:text-white-100 "
                      onClick={() => {
                        arrayOneItemAddition(item);
                      }}
                      type="button"
                    >
                      {item.skill}
                      <span className="group-hover/skillsbtn:border-white-100">
                        <AiOutlinePlus />
                      </span>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex justify-end gap-4 pb-4 max-sm:flex-col max-sm:items-center pt-12">
            <Button
              className="border-2 p-5 rounded-lg h-5 text-center w-24 flex bg-white-100 hover:text-white-100 items-center max-sm:w-10/12 border-brand-green-primary text-brand-green-primary"
              onClick={() => {
                onClose();
                cancelBtnFn();
              }}
            >
              Cancel
            </Button>
            <Button
              className="border-2 p-5 rounded-lg h-5 w-24 flex items-center max-sm:w-10/12 border-brand-green-primary"
              onClick={handleAddSkills}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default SkillModal;
function setItems(arg0: any) {
  throw new Error('Function not implemented.');
}
