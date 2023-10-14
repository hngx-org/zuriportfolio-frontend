import { Item } from '@radix-ui/react-select';
import Button from '@ui/Button';
import { Input } from '@ui/Input';
import Modal from '@ui/Modal';
import { useEffect, useState, MouseEvent } from 'react';
import { AiOutlinePlus, AiOutlineCloseCircle, AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { number } from 'zod';
import { Math } from 'iconsax-react';

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
  const [arrayOne, setArrayOne] = useState<Array<string>>([
    'Version Control',
    'DevOps',
    'Testing',
    'Art',
    'Sketch',
    'Visual Branding',
    'Graphics Design',
    'Color Theory',
    'Illustration',
    'Animation',
    'API Intergration',
  ]);
  const [arrayTwo, setArrayTwo] = useState<Array<string>>([]);
  const [response, setResponse] = useState([]);
  const [skillData, setSkillData] = useState<Array<skillListRes>>([]);
  const [inputArray, setInputArray] = useState<Array<skillListRes>>([]);

  const fetchSkillData = async () => {
    try {
      // Make a GET request to the API
      const response = await axios.get('https://hng6-r5y3.onrender.com/api/skills-details');
      // const suggestionRes = await axios.get('https://piranha-assessment.onrender.com/api/admin/skills/');
      const data = response.data.data;
      // const skillList = data.map((item:skillListRes) => item.skill)
      // Set the data in the state
      setSkillData(data);
    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Call the fetchData function
    fetchSkillData();
  }, []);

  const handleMoveToTwo = (item: string) => {
    setArrayOne(arrayOne.filter((el: string) => el !== item));
    setArrayTwo((prevArrayTwo) => [...prevArrayTwo, item]);
  };
  const handleSetSkillData = (item: skillListRes) => {
    setSkillData((prevArray) => [...prevArray, item]); // Use the callback
  };

  const handleMoveToOne = (item: string) => {
    setArrayTwo((prevArrayTwo) => prevArrayTwo.filter((el) => el !== item));
    setArrayOne([...arrayOne, item]);
  };

  const handleArrayOneSetSkill = (item: skillListRes) => {
    setSkillData((prevArray) => prevArray.filter((el) => el !== item));
  };

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === 'Enter') {
      const trimmedValue = inputValue.trim();
      setInputArray([...inputArray, { skill: String(trimmedValue), skillId: new Date().getTime() }]);
      setInputValue('');

      if (trimmedValue !== '') {
        // setArrayTwo((prevArray) => [...prevArray, trimmedValue]);
        // setToLocalStorage(trimmedValue);
      }
    }
  };

  const suggestedArray = [...skillData, ...inputArray];

  const arrayToBePosted = [...arrayTwo, ...inputArray];
  const cancelBtnFn = () => {
    localStorage.removeItem('arrayTwo');
    setArrayTwo([]);
  };

  // const setToLocalStorage = (trimmedValue: string) => {
  //   localStorage.setItem('arrayTwo', JSON.stringify([...arrayTwo, trimmedValue]));
  // };

  const apiUrl = 'https://hng6-r5y3.onrender.com/api/create-skills';
  // const customHeaders = {
  //   Authorization: `Bearer ${token}`,
  //   'Content-Type': 'application/json',
  // { headers: customHeaders }
  // };

  const requestData = {
    skills: arrayToBePosted,
    sectionId: 5,
    userId: userId,
  };

  // console.log(requestData.userId)

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
      const response = await axios.delete(`https://hng6-r5y3.onrender.com/api/delete-skills/${id}`);
      if (response.data.successful) {
        fetchSkillData();
      }
      // console.log(response.data.data);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error; // You can handle the error further if needed
    }
  }

  // console.log(skillData);

  function handleAddSkills(event: MouseEvent<HTMLButtonElement>): void {
    postSkillData();
    onClose();
  }

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
            {suggestedArray?.length > 0 && (
              <ul className="w-full flex flex-wrap gap-4 my-12">
                {suggestedArray?.map((item: skillListRes) => (
                  <li key={item.skillId}>
                    <Button
                      className=" group/skillsbtn text-brand-green-shade20 h-10 bg-brand-green-shade95  hover:text-white-100 hover: text-sm font-semibold leading-5 rounded-lg px-2 py-4 flex items-center gap-4"
                      onClick={() => {
                        handleMoveToOne(item.skill);
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
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              value={inputValue}
            />
          </div>

          <div className="w-full">
            <h2 className="text-brand-green-primary text-base font-bold">Suggestions</h2>
            {arrayOne.length > 0 && (
              <ul className=" pt-4 flex gap-6 rounded-sm flex-wrap w-full max-sm:p-2 max-sm:text-sm">
                {arrayOne.map((item) => (
                  <li key={item}>
                    <Button
                      className="text-[#737876] group/addSkillsBtn  bg-white border-2 border-brand-disabled2 hover:text-white-100"
                      onClick={() => {
                        handleMoveToTwo(item);
                        handleSetSkillData({ skillId: new Date().getTime(), skill: item });
                      }}
                      type="button"
                    >
                      {item}
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
