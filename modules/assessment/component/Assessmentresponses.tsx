import React, { useState, useContext } from 'react';
import { ListContext } from '../../../pages/assessment';
import Image from 'next/image';
import trash from '../../../public/assets/assessment/trash.png';
import editmessage from '../../../public/assets/assessment/message-edit.png';
import Link from 'next/link';

interface Assessment {
  id: number;
  trackname: string;
  createddate: string;
  modifieddate: string;
  // Add other properties as needed
}

function Assessmentresponses({ assessments }: { assessments: Assessment[] }) {
  console.log('assesment::::',assessments);
  //Uses and updates the list from the index page
  const [list, setList]: any = useContext(ListContext);
  //todel is a state, booleen, to be updated when the user tries to delete a project
  const [todel, setTodel] = useState(false);
  //todelId is the id of the project to be deleted
  const [todelId, setTodelId] = useState();
  const delitem = (id: any) => {
    setTodelId(id);
    setTodel(true);
  };
  //holdon, to stop deleting flow
  const holdon = () => {
    setTodel(false);
  };
  //to confirm and delete item
  const yesdelete = () => {
    setList(
      list?.filter((child: any) => {
        return child?.id !== todelId;
      }),
    );
    setTodel(false);
  };

  function formatDateToPattern(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${day}-${month}-${year}`;
  }

  return (
    <div className="w-full flex flex-col gap-[15px] md:gap-[23px] mt-[55px] mb-[139px] p-4 md:p-8 rounded border-[1px] border-brand-disabled2 font-manropeL">
      {todel && (
        <div className="fixed bg-dark-600 top-0 left-0 w-full h-full grid place-items-center">
          <div className="bg-white-100 w-[300px] md:w-[558px] text-center font-semibold py-[60px] md:py-[118px] px-[20px] rounded-2xl">
            <div className="text-custom-color10 mb-6">Are you sure you want to delete?</div>
            <div className="flex gap-2 mx-4px md:mx-[30px] lg:mx-[92px] cursor-pointer">
              <div
                className="flex1 w-full px-4 py-3 bg-brand-green-ttr border-green-600 border-[1px] text-green-600 rounded-full hover:text-white-100 hover:bg-green-600 transition"
                onClick={holdon}
              >
                Hold On
              </div>
              <div
                className="w-full flex1 px-4 py-3 bg-brand-red-primary text-white-100 rounded-full hover:text-brand-red-primary hover:border-[1px] hover:border-brand-red-primary hover:bg-white-100 transition"
                onClick={yesdelete}
              >
                Yes, Delete
              </div>
            </div>
          </div>
        </div>
      )}
      {assessments?.map((child: any) => {
        return (
          <div
            className="w-full flex items-center justify-between border-[1px] rounded p-4 md:p-6  border-brand-disabled2"
            key={child?.id}
          >
            <div>
              <div className="text-custom-color11 text-base md:text-[18px] font-manropeB font-bold mb-[4px]">
                {child?.title}
              </div>
              <div className="my-[6px] md:my-[10px] text-white-650">
                {' '}
                Created {formatDateToPattern(child?.createdAt)}
              </div>
              <div className="text-white-650">Modified {formatDateToPattern(child?.updatedAt)}</div>
            </div>
            <div className="flex gap-2 md:gap-8">
              <div className="flex flex-col items-center cursor-pointer">
                <Image src={editmessage} height="24" width="24" alt="edit message" />
                <Link href={`/assessment/preview-edit/${child?.id}` }className="text-xs md:text-base pt-[6px]">
                  Edit
                </Link>
              </div>
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => {
                  delitem(child?.id);
                }}
              >
                <Image src={trash} height="24" width="24" alt="trash" />
                <p className="text-xs md:text-base pt-[6px]">Delete</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Assessmentresponses;
