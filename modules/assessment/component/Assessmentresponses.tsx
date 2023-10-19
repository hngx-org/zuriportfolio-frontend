import React, { useState, useContext } from 'react';
import { ListContext } from '../../../pages/super-admin/assessment';
import Image from 'next/image';
import trash from '../../../public/assets/assessment/trash.png';
import editmessage from '../../../public/assets/assessment/message-edit.png';
import Link from 'next/link';
import { FaSpinner } from 'react-icons/fa';
// interface Assessment {

//   // Add other properties as needed
// }
type PropsAss<T> = {
  onDelete: React.Dispatch<React.SetStateAction<T[]>>;
  assessments: {
    id: number;
    trackname: string;
    createddate: string;
    modifieddate: string;
  }[];
};

function Assessmentresponses(props: PropsAss<any>) {
  const { assessments, onDelete } = props;
  console.log(assessments);
  //Uses and updates the list from the index page
  const [list, setList]: any = useContext(ListContext);
  const [deleting, setDeleting] = useState(false);
  //todel is a state, booleen, to be updated when the user tries to delete a project
  const [todel, setTodel] = useState(false);
  //todelId is the id of the project to be deleted
  const [todelId, setTodelId] = useState();
  const [delText, setDelText] = useState('Deleting Assessment...');
  const delitem = (id: any) => {
    setTodelId(id);
    setTodel(true);
    setDeleting(false);
  };
  //holdon, to stop deleting flow
  const holdon = () => {
    setTodel(false);
    console.log(assessments);
  };
  //to confirm and delete item
  //still throwing forbidden do not uncomment ==> Error 403
  const yesdelete = async (currId: any) => {
    console.log(assessments);
    const reqOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('zpt')}`,
      },
    };
    setDeleting(true);
    const response = await fetch(
      `https://piranha-assessment-jco5.onrender.com/api/admin/assessments/${currId}/`,
      reqOptions,
    );

    if (response.ok) {
      onDelete(
        assessments.filter((item) => {
          return item.id !== currId;
        }),
      );
      setDelText('Assessment Deleted Successfully');
    } else {
      setDelText('Failed To Delete Assessment');
    }
    setTimeout(() => {
      setTodel(false);
    }, 4000);
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
            <div className="text-custom-color10 mb-6">
              {deleting ? (
                <>
                  <div className="text-center flex flex-col justit-center items-center gap-y-[20px]">
                    <FaSpinner color="green" className="animate-spin text-center" size={70} />
                    <p>{delText}</p>
                  </div>
                </>
              ) : (
                'Are you sure you want to delete?'
              )}
            </div>
            <div className="flex gap-2 mx-4px md:mx-[30px] lg:mx-[92px] cursor-pointer">
              {!deleting && (
                <>
                  <div
                    className="flex1 w-full px-4 py-3 bg-brand-green-ttr border-green-600 border-[1px] text-green-600 rounded-full hover:text-white-100 hover:bg-green-600 transition"
                    onClick={holdon}
                  >
                    Hold On
                  </div>
                  <div
                    className="w-full flex1 px-4 py-3 bg-brand-red-primary text-white-100 rounded-full hover:text-brand-red-primary hover:border-[1px] hover:border-brand-red-primary hover:bg-white-100 transition"
                    onClick={() => {
                      yesdelete(todelId);
                    }}
                  >
                    Yes, Delete
                  </div>
                </>
              )}
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
              <Link
                href={`/super-admin/assessment/assessment?assessment_id=${child.id}`}
                className="text-custom-color11 text-base md:text-[18px] font-manropeB font-bold mb-[4px]"
              >
                {child?.title}
              </Link>
              <div className="my-[6px] md:my-[10px] text-white-650">
                {' '}
                Created {formatDateToPattern(child?.createdAt)}
              </div>
              <div className="text-white-650">Modified {formatDateToPattern(child?.updatedAt)}</div>
            </div>
            <div className="flex gap-2 md:gap-8">
              <div className="flex flex-col items-center cursor-pointer">
                <Image src={editmessage} height="24" width="24" alt="edit message" />
                <Link
                  href={`/super-admin/assessment/preview-edit/?assessmentId=${child.id}`}
                  className="text-xs md:text-base pt-[6px]"
                >
                  Edit
                </Link>
              </div>
              <div
                className="cursor-pointer flex flex-col items-center justify-center gap-y-1"
                onClick={() => {
                  delitem(child?.id);
                }}
              >
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 6.47998C17.67 6.14998 14.32 5.97998 10.98 5.97998C9 5.97998 7.02 6.07998 5.04 6.27998L3 6.47998"
                    stroke="#464646"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.5 5.47L8.72 4.16C8.88 3.21 9 2.5 10.69 2.5H13.31C15 2.5 15.13 3.25 15.28 4.17L15.5 5.47"
                    stroke="#464646"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.8499 9.64001L18.1999 19.71C18.0899 21.28 17.9999 22.5 15.2099 22.5H8.7899C5.9999 22.5 5.9099 21.28 5.7999 19.71L5.1499 9.64001"
                    stroke="#464646"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.3301 17H13.6601"
                    stroke="#464646"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.5 13H14.5"
                    stroke="#464646"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Delete
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Assessmentresponses;
