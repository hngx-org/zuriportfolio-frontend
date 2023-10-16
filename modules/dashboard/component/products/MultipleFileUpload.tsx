import React from 'react';
import { useCallback, useState } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { SingleFileWithProgress } from './singleFileWithProgress';
import uploadorange from '../../../../public/assets/images/uploadorange.png';
import Image from 'next/image';

export interface UploadableFile {
  file: File;
  errors: FileError[];
  url?: string;
}

export function MultipleFileUpload() {
  const [files, setFiles] = useState<UploadableFile[]>([]);
  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAcc = accFiles.map((file) => ({ file, errors: [] }));
    setFiles((curr) => [...curr, ...mappedAcc, ...rejFiles]);
  }, []);

  function onUpload(file: File, url: string) {
    setFiles((curr) =>
      curr.map((fw) => {
        if (fw.file === file) {
          return { ...fw, url };
        }

        return fw;
      }),
    );
  }

  function onDelete(file: File) {
    setFiles((curr) => curr.filter((fw) => fw.file !== file));
  }
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <React.Fragment>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="bg-[#F8F9FA] mt-4 p-2 rounded-sm items-center text-center">
          <center>
            <Image src={uploadorange} alt="uploadicon" className="w-10 object-contain mb-2 cursor-pointer" />

            <span className="font-manropeL text-[#8D9290] text-[12px] md:text-[16px] cursor-pointer">
              <span className="text-[12px] md:text-[16px] text-[#F1AE67] font-manropeL mr-2">Click here</span>
              or drag and drop to upload file
            </span>
          </center>
        </div>
      </div>

      {files.map((fileWrapper, index) => (
        <SingleFileWithProgress onUpload={onUpload} onDelete={onDelete} key={index} file={fileWrapper.file} />
      ))}
    </React.Fragment>
  );
}
