import Button from '@ui/Button';
import React from 'react';

const CustomFooter = ({
  handleClose,
  isLoading,
  onclick,
}: {
  handleClose: () => void;
  isLoading: boolean;
  onclick?: () => void;
}) => {
  return (
    <div className="flex gap-2 justify-end items-end">
      <Button
        type="button"
        onClick={handleClose}
        intent={'secondary'}
        className="w-full rounded-md self-end sm:w-[6rem]"
        size={'sm'}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        isLoading={isLoading}
        onClick={onclick}
        className="w-full rounded-md self-end sm:w-[6rem]"
        size={'sm'}
      >
        Save
      </Button>
    </div>
  );
};

export default CustomFooter;
