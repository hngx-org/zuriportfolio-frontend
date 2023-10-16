import React from 'react';
import Button from '@ui/Button';

export interface FileHeaderProps {
  file: File;
  onDelete: (file: File) => void;
}

export function FileHeader({ file, onDelete }: FileHeaderProps) {
  return (
    <div className="container flex flex-row justify-between align-middle items-center m-2 ml-4 pr-6">
      <div>{file.name}</div>
      <Button className="w-4 h-4 p-4 bg-red-400" onClick={() => onDelete(file)}>
        x
      </Button>
    </div>
  );
}
