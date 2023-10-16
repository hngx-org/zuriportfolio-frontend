import { useEffect, useState } from 'react';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import 'nprogress/nprogress.js';
import { FileHeader } from './FileHeader';

export interface SingleFileWithProgressProps {
  file: File;
  onDelete: (file: File) => void;
  onUpload: (file: File, url: string) => void;
}

export function SingleFileWithProgress({ file, onDelete, onUpload }: SingleFileWithProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function upload() {
      // Start nprogress bar
      nprogress.start();

      setTimeout(async () => {
        const url = await uploadFile(file, setProgress);
        onUpload(file, url);

        // Finish nprogress bar
        nprogress.done();
      }, 100);
    }

    upload();
  }, []);

  useEffect(() => {
    // Simulate progress updates
    const simulateProgress = () => {
      let progress = 0;
      const maxProgress = 100;
      const interval = 1000; // 1 second

      const updateProgressBar = () => {
        if (progress < maxProgress) {
          progress += 10;
          setProgress(progress);
        }
      };

      const progressInterval = setInterval(updateProgressBar, interval);

      return () => {
        clearInterval(progressInterval);
      };
    };

    const cleanup = simulateProgress();

    // Clean up the interval when the component unmounts
    return () => {
      cleanup();
    };
  }, []);

  return (
    <div>
      <FileHeader file={file} onDelete={onDelete} />
      <div className="w-100 bg-dark-115 rounded-md m-2 border border-[#37AB87]">
        <div className="w-0 h-2 bg-brand-green-primary transition-all" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

function uploadFile(file: File, onProgress: (percentage: number) => void) {
  const url = 'https://api.cloudinary.com/v1_1/demo/image/upload';
  const key = 'docs_upload_example_us_preset';
  return new Promise<string>((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText);
      res(resp.secure_url);
    };
    xhr.onerror = (evt) => rej(evt);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        onProgress(Math.round(percentage));
      }
    };
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', key);
    xhr.send(formData);
  });
}
