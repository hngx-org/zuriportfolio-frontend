import React, { useState, useEffect } from 'react';
import Header from '../../modules/assessment/component/Header';
import addmessage from '../../public/assets/assessment/message-add.png';
import draftsimg from '../../public/assets/assessment/drafts.png';
import ratioimg from '../../public/assets/assessment/ratio.png';
import searchimg from '../../public/assets/assessment/search.png';

import bookimg from '../../public/assets/assessment/book.png';
import booksaved from '../../public/assets/assessment/book-saved.png';

import Image from 'next/image';

import Link from 'next/link';
import Description from '../../modules/assessment/component/Description';
export const ListContext = React.createContext([{}]);
function Index() {
  return (
    <div className="w-full items-start justify-start">
      <Header heading={'Admin Assessment Board'} body={'For the general creation and management of assessments'} />
      <div className="assessment-body text-Manrope mx-[24px] lg:mx-[104px]">
        <div className="assessment-links mt-[95px] flex px-[100px] gap-[13vw]">
          <div className="flex-1 border-[1px] border-[#A8ACAB] p-6 rounded-lg hover:text-[#005427]">
            <Link className="w-full grid place-items-center" href="/assessment/new">
              <Image src={addmessage} width="33" height="33" alt="add message" />
              <div className="text-base font-semibold font-ManropeB pt-[9px]">Create new assesment</div>
            </Link>
          </div>
          <div className="flex-1 center border-[1px] border-[#A8ACAB] p-6 rounded-lg hover:text-[#005427]">
            <Link className="grid place-items-center w-full" href="/assessment/drafts">
              <Image src={draftsimg} width="33" height="33" alt="go to drafts" />
              <div className="grid place-items-center text-base font-semibold font-ManropeB pt-[9px]">My drafts</div>
            </Link>
          </div>
        </div>
        <div className="board-desc flex gap-[26px] justify-center w-full my-[79px]">
          <Description info="Responses" number={120} icon={bookimg} />
          <Description info="CREATED ASSESSMENTS" number={12} icon={booksaved} />
          <Description info="PASS/FAIL RATIO" number={'3:1'} icon={ratioimg} />
        </div>
        <div className="search w-full border-[#E1E3E2] border-[1px] p-4 rounded-lg flex items-center">
          <div className="icon relative w-4 h-4 mr-2">
            <Image src={searchimg} alt="search" layout="fill" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
