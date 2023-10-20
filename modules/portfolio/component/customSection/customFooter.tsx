import Button from '@ui/Button';
import React from 'react';

const CustomFooter = ({
  handleClose,
  setNewSection,
  collapse,
  newSection,
}: {
  handleClose: () => void;
  setNewSection: React.Dispatch<React.SetStateAction<boolean>>;
  collapse?: boolean;
  newSection?: boolean;
}) => {
  return (
    <>
      {collapse ? (
        <div className="flex justify-between items-center mt-10">
          <Button
            onClick={() => setNewSection(true)}
            className={`${
              newSection ? 'invisible' : ' visible'
            } bg-white-100 text-green-600 hover:bg-white-100 active:bg-white-100 focus:bg-white-100`}
          >
            Customize new section
          </Button>
          <div className="flex gap-2 justify-end items-end">
            <Button
              type="button"
              onClick={handleClose}
              intent={'secondary'}
              className="w-full rounded-md self-end sm:w-[6rem]"
              size={'lg'}
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full rounded-md self-end sm:w-[6rem]" size={'lg'}>
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 justify-end items-end">
          <Button
            type="button"
            onClick={handleClose}
            intent={'secondary'}
            className="w-full rounded-md self-end sm:w-[6rem]"
            size={'lg'}
          >
            Cancel
          </Button>
          <Button type="submit" className="w-full rounded-md self-end sm:w-[6rem]" size={'lg'}>
            Save
          </Button>
        </div>
      )}
    </>
  );
};

export default CustomFooter;
