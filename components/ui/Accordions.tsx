import React, { ButtonHTMLAttributes, DetailedHTMLProps, useState } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

export default function Accordion(prop: {
  rightIcon: 'plus-minus' | 'arrow-up-down';
  title: string;
  details: string;
  leftIcon?: boolean | React.ReactNode | string | 'false';
  scale?: 75 | 50 | 90 | 100;
}) {
  const [open, setOpen] = useState(true);
  const hh = true;
  const plusIcon = open ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" fill="none" viewBox="0 0 12 13">
      <path fill="#003A1B" d="M6.64 5.742h4.829v1.594H6.64v4.969H5.035v-4.97H.207V5.743h4.828V.75h1.606v4.992z"></path>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="2" fill="none" viewBox="0 0 7 2">
      <path fill="#003A1B" d="M.96 1.922V.188h5.813v1.734H.961z"></path>
    </svg>
  );

  const arrow = open ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
      <g>
        <path
          fill="#000"
          d="M11.669 23.531a1.6 1.6 0 010-2.262L16.937 16l-5.268-5.269A1.6 1.6 0 0113.93 8.47l6.4 6.4a1.6 1.6 0 010 2.262l-6.4 6.4a1.6 1.6 0 01-2.262 0z"
        ></path>
      </g>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
      <g>
        <path
          fill="#000"
          d="M8.469 11.669a1.6 1.6 0 012.262 0L16 16.937l5.269-5.268a1.6 1.6 0 112.262 2.262l-6.4 6.4a1.6 1.6 0 01-2.262 0l-6.4-6.4a1.6 1.6 0 010-2.262z"
        ></path>
      </g>
    </svg>
  );

  const chartIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
      <g>
        <path
          fill="#000"
          d="M2.75 8a3.917 3.917 0 013.917-3.917H20A3.917 3.917 0 0123.917 8v1.417h1.416a3.917 3.917 0 013.917 3.916v8a3.917 3.917 0 01-3.917 3.917h-1.416v4.083a1.25 1.25 0 01-2.134.884l-4.967-4.967H12a3.901 3.901 0 01-1.741-.408l-.042.042A1.25 1.25 0 018.083 24v-4.083H6.667A3.917 3.917 0 012.75 16V8zm9.601 14.75h4.982c.332 0 .65.132.884.366l3.2 3.2V24c0-.69.56-1.25 1.25-1.25h2.666c.783 0 1.417-.634 1.417-1.417v-8c0-.782-.634-1.416-1.417-1.416h-1.416V16A3.917 3.917 0 0120 19.917h-4.816l-2.833 2.833zM21.417 8c0-.782-.635-1.417-1.417-1.417H6.667c-.783 0-1.417.635-1.417 1.417v8c0 .782.634 1.417 1.417 1.417h2.666c.69 0 1.25.56 1.25 1.25v2.315l3.2-3.2a1.25 1.25 0 01.884-.365H20c.782 0 1.417-.635 1.417-1.417V8z"
        ></path>
      </g>
    </svg>
  );
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <details className="mx-auto max-w-[340px] border-b  pb-3 ">
      <summary
        onClick={handleOpen}
        className="list-none flex gap-3 items-center  justify-between pt-4 px-2 cursor-pointer"
      >
        <span className="gap-3 flex ">
          {prop.leftIcon === 'false' ? null : (
            <span className={`scale-${prop.scale || 75}`}> {prop.leftIcon ? prop.leftIcon : chartIcon}</span>
          )}
          <span className="max-w-[260px]text-green-950 text-base font-bold leading-normal tracking-tight">
            {prop.title}
          </span>
        </span>
        <span className={`scale-${prop.scale || 75}`}>
          {' '}
          {prop.rightIcon === 'plus-minus' ? plusIcon : prop.rightIcon === 'arrow-up-down' ? arrow : null}
        </span>
      </summary>
      <p className="mt-4 px-2">{prop.details}</p>
    </details>
  );
}
