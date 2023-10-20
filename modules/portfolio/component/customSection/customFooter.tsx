import Button from '@ui/Button';
import React from 'react';

const CustomFooter = ({ handleClose }: { handleClose: () => void }) => {
  return (
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
  );
};

export default CustomFooter;
