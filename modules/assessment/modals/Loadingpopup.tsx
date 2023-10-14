import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalClasses = isOpen ? 'fixed inset-0 flex items-center w-[200px]  justify-center  m-auto' : 'hidden';

  return (
    <div className={`${modalClasses} z-[1000]`}>
      <div className=" m-auto items-center font-manropeB text-center justify-center bg-green-500 rounded-[16px] p-20 gap-3 flex flex-col shadow-md ">
        <div className="flex flex-col gap-8 m-auto text-center justify-center items-center px-15 py-10">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
