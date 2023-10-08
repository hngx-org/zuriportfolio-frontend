import Image from 'next/image';
import React, { useState } from 'react';

type DraftCardProps = {
  item: {
    id: number;
    title: string;
    time: string;
  };
  onRename: (id: number, newTitle: string) => void;
  onDelete: () => void;
};

const DraftCard: React.FC<DraftCardProps> = ({ item, onRename, onDelete }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(item.title);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleOpenState = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleRename = () => {
    if (isEditing) {
      // Save the edited title and exit edit mode
      onRename(item.id, newTitle);
      setIsEditing(false);
      setIsOpen(false);
    } else {
      // Enter edit mode
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    // Cancel edit mode and revert to the original title
    setIsEditing(false);
    setNewTitle(item.title);
  };

  return (
    <div className="relative flex flex-col w-[270px] h-[243px] border border-solid border-[#A8ACAB] rounded-t-2xl rounded-b-xl ">
      <div className="h-full flex items-center px-[10px]">
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            className="border border-solid border-green-100 outline-none rounded p-1"
            onChange={(e) => setNewTitle(e.target.value)}
          />
        ) : (
          <p className="text-[#006F37] text-[45px] leading-none">{newTitle}</p>
        )}
      </div>
      <div className="flex px-[10px] justify-between items-center w-full h-[55px] bg-[#F9F9FA] rounded-b-xl border-t border-solid border-[#A8ACAB]">
        <p className="text-[#BF8443] font-manropeB text-[12px]">{item.time}</p>
        <Image
          src="/assets/more.svg"
          alt="more icon"
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={toggleOpenState}
        />
      </div>
      {isOpen && (
        <div className="flex z-10 flex-col w-[74px] h-[68px] rounded-lg border border-solid border-[#A8ACAB] bg-[#F9F9F9] absolute right-0 bottom-[-76px] overflow-hidden">
          <div
            className="flex justify-center items-center text-[10px] text-[#1A1C1B] h-full cursor-pointer hover:bg-green-50"
            onClick={onDelete}
          >
            Delete
          </div>
          <div
            className="flex justify-center items-center text-[10px] text-[#1A1C1B] h-full cursor-pointer hover:bg-green-50"
            onClick={handleRename}
          >
            {isEditing ? 'Save' : 'Rename'}
          </div>
          {isEditing && (
            <div
              className="flex justify-center items-center text-[10px] text-[#1A1C1B] h-full cursor-pointer hover:bg-green-50"
              onClick={handleCancelEdit}
            >
              Cancel
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DraftCard;
