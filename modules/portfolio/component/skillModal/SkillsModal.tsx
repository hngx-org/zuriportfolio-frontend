import Button from '@ui/Button';
import { Input } from '@ui/Input';
import Modal from '@ui/Modal';
import { useRef, useState } from 'react';

const SkillModal = () => {
  const [skillModalOpen, setIsSkillModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const isSkillModalOpen = () => {
    setIsSkillModalOpen(true);
  };

  const onClose = () => {
    setIsSkillModalOpen(false);
  };

  const [arrayOne, setArrayOne] = useState<Array<string>>([
    'Version Control',
    'DevOps',
    'Testing',
    'Art',
    'Sketch',
    'Visual Branding',
    'Graphics Design',
    'Animation',
    'Color Theory',
    'Illustration',
    'Animation',
    'API Intergration',
  ]);
  const [arrayTwo, setArrayTwo] = useState<Array<string>>([]);

  const handleMoveToTwo = (item: string) => {
    setArrayOne(arrayOne.filter((el: string) => el !== item));
    setArrayTwo([...arrayTwo, item]);
  };

  const handleMoveToOne = (item: string) => {
    setArrayTwo(arrayTwo.filter((el) => el !== item));
    setArrayOne([...arrayOne, item]);
  };

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === 'Enter') {
      const trimmedValue = inputValue.trim();

      if (trimmedValue !== '') {
        setArrayTwo((prevArray) => [...prevArray, trimmedValue]);
        setInputValue(''); // Clear the input field after pushing the value
      }
    }
  };
  console.log(arrayTwo);

  return (
    <section className="w-full flex items-center justify-center ">
      {skillModalOpen && (
        <Modal closeOnOverlayClick isOpen={skillModalOpen} closeModal={onClose} isCloseIconPresent={true} size="lg">
          <div className=" w-full max-sm:w-full px-4 py-6 fontFamily-manropeEL">
            <div className="flex justify-between items-center border-b-4 border-brand-green-primary pb-4">
              <h1 className="font-bold text-2xl ">Skill</h1>
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
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                              stroke="#00894C"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M9.16992 14.8319L14.8299 9.17188"
                              stroke="#00894C"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M14.8299 14.8319L9.16992 9.17188"
                              stroke="#00894C"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </span>
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="my-12">
              <button onKeyDown={handleKeyPress} className="w-full">
                <Input
                  type="text"
                  placeHolder='Enter your skill and press "ENTER'
                  className="w-full rounded-lg p-4 mb-6 border-2 border-[#C4C7C6]"
                  onKeyDown={handleKeyPress}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </button>
            </div>

            <div className="w-full">
              <h2 className="text-brand-green-primary text-base font-bold">Suggestions</h2>
              {arrayOne.length > 0 && (
                <ul className=" p-4  flex gap-6 rounded-lg flex-wrap w-full ">
                  {arrayOne.map((item) => (
                    <li key={item}>
                      <Button
                        className="text-[#737876] bg-white border-2 border-brand-disabled2 hover:text-white-100"
                        onClick={() => handleMoveToTwo(item)}
                        type="button"
                      >
                        {item}
                        <span>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="vuesax/linear/add">
                              <g id="add">
                                <path
                                  id="Vector"
                                  d="M6 12H18"
                                  stroke="#003A1B"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  id="Vector_2"
                                  d="M12 18V6"
                                  stroke="#003A1B"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </g>
                            </g>
                          </svg>
                        </span>
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-4 pb-4 max-sm:flex-col max-sm:items-center">
            <button className="border-2 p-5 rounded-lg h-5 text-center w-24 flex items-center max-sm:w-10/12 border-brand-green-primary text-brand-green-primary">
              Cancel
            </button>
            <Button className="border-2 p-5 rounded-lg h-5 w-24 flex items-center max-sm:w-10/12 border-brand-green-primary">
              Save
            </Button>
          </div>
        </Modal>
      )}

      <Button className="bg-brand-green-primary text-brand-green-ttr my-10" onClick={isSkillModalOpen} type="button">
        Open Modal
      </Button>
    </section>
  );
};

export default SkillModal;
