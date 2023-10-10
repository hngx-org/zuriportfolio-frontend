import { Item } from '@radix-ui/react-select';
import Button from '@ui/Button';
import { Input } from '@ui/Input';
import Modal from '@ui/Modal';
import { useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineCloseCircle, AiOutlineClose } from 'react-icons/ai';

type skillModalProps = {
  handleCloseSkillModal: () => void;
  isSkillModalOpen: boolean;
};

const SkillModal = ({ handleCloseSkillModal, isSkillModalOpen }: skillModalProps) => {
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

  useEffect(() => {
    const storedArrayTwo = JSON.parse(localStorage.getItem('arrayTwo') || '[]') as string[];
    setArrayTwo(storedArrayTwo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMoveToTwo = (item: string) => {
    setArrayOne(arrayOne.filter((el: string) => el !== item));
    setArrayTwo((prevArrayTwo) => [...prevArrayTwo, item]); // Use the callback
    localStorage.setItem('arrayTwo', JSON.stringify([...arrayTwo, item]));
  };

  const handleMoveToOne = (item: string) => {
    setArrayTwo((prevArrayTwo) => prevArrayTwo.filter((el) => el !== item));
    setArrayOne([...arrayOne, item]);

    // Update local storage with the modified arrayTwo (removed the selected item)
    localStorage.setItem('arrayTwo', JSON.stringify([...arrayTwo.filter((el) => el !== item)]));
  };

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === 'Enter') {
      const trimmedValue = inputValue.trim();

      if (trimmedValue !== '') {
        setArrayTwo((prevArray) => [...prevArray, trimmedValue]);
        setToLocalStorage(trimmedValue);
      }
    }
    setInputValue(''); // Clear the input field after pushing the value
  };
      
  const  cancelBtnFn = () =>{
    localStorage.removeItem('arrayTwo')
    setArrayTwo([])
  }

  const saveBtn = () => {
    handleCloseSkillModal()
    console.log("me")
  }

  const setToLocalStorage = (trimmedValue: string) => {
    localStorage.setItem('arrayTwo', JSON.stringify([...arrayTwo, trimmedValue]));
  };

  return (
    <section className="w-full flex items-center justify-center fontFamily-manropeEL">
      <Modal
        closeOnOverlayClick
        isOpen={isSkillModalOpen}
        closeModal={handleCloseSkillModal}
        isCloseIconPresent={false}
        size="xl"
      >
        <div className=" w-full max-sm:w-full px-10 py-6 fontFamily-manropeEL max-sm:px-2 ">
          <div className="flex justify-between items-center border-b-4 border-brand-green-primary pb-4">
            <h1 className="font-bold text-2xl ">Skill</h1>
            <button
              className="bg-green-500 w-8 h-8 rounded-lg flex justify-center items-center text-white-100"
              onClick={handleCloseSkillModal}
            >
              <AiOutlineClose />
            </button>
          </div>
          <div className="w-full">
            {arrayTwo.length > 0 && (
              <ul className="w-full flex flex-wrap gap-4 my-12">
                {arrayTwo.map((item) => (
                  <li key={item}>
                    <Button
                      className=" group/skillsbtn text-brand-green-shade20 h-10 bg-brand-green-shade95  hover:text-white-100 hover: text-sm font-semibold leading-5 rounded-lg px-2 py-4 flex items-center gap-4"
                      onClick={() => handleMoveToOne(item)}
                      type="button"
                    >
                      {item}
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
            />
          </div>

          <div className="w-full">
            <h2 className="text-brand-green-primary text-base font-bold">Suggestions</h2>
            {arrayOne.length > 0 && (
              <ul className=" p-4  flex gap-6 rounded-sm flex-wrap w-full max-sm:p-2 max-sm:text-sm">
                {arrayOne.map((item) => (
                  <li key={item}>
                    <Button
                      className="text-[#737876] group/addSkillsBtn  bg-white border-2 border-brand-disabled2 hover:text-white-100"
                      onClick={() => handleMoveToTwo(item)}
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
                handleCloseSkillModal();
                cancelBtnFn();
              }}
            >
              Cancel
            </Button>
            <Button className="border-2 p-5 rounded-lg h-5 w-24 flex items-center max-sm:w-10/12 border-brand-green-primary"
            onClick={()=> {saveBtn()}}
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
