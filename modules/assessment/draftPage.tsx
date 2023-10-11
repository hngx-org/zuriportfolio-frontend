import Image from 'next/image';
import React, { useState } from 'react';
import DraftCard from './component/draftCard';
import Link from 'next/link';

const DraftPage = () => {
  const [draftList, setDraftList] = useState([
    {
      id: 1,
      title: 'Virtual Reality',
      time: 'Created 20/10/2020',
    },
    {
      id: 2,
      title: 'Untitled Assessment',
      time: 'Created 20/10/2020',
    },
    {
      id: 3,
      title: 'Artificial Intelligence',
      time: 'Created 20/10/2020',
    },
    {
      id: 4,
      title: 'Fronted Development',
      time: 'Created 20/10/2020',
    },
    {
      id: 5,
      title: 'Video Marketing',
      time: 'Created 20/10/2020',
    },
    {
      id: 6,
      title: 'Mobile Development',
      time: 'Created 20/10/2020',
    },
    {
      id: 7,
      title: 'Back End Development',
      time: 'Created 20/10/2020',
    },
    {
      id: 8,
      title: 'Product Design',
      time: 'Created 20/10/2020',
    },
    {
      id: 9,
      title: 'Digital Marketing',
      time: 'Created 20/10/2020',
    },
    {
      id: 10,
      title: 'Untitled',
      time: 'Created 20/10/2020',
    },
    {
      id: 11,
      title: 'Untitled',
      time: 'Created 20/10/2020',
    },
  ]);

  //   Handle renaming of draft name
  const handleRename = (id: number, newTitle: string) => {
    const updatedList = draftList.map((item) => (item.id === id ? { ...item, title: newTitle } : item));
    setDraftList(updatedList);
  };

  // Handle deleting of draft
  const handleDelete = (id: number) => {
    const updatedList = draftList.filter((item) => item.id !== id);
    setDraftList(updatedList);
  };

  return (
    <div className="mx-auto py-4 px-8 md:px-24 sm:py-11 lg:px-12 xl:px-[105px] 2xl:w-[1440px] mb-10">
      <Link href="/assessment" className="flex gap-1 items-center mb-16 cursor-pointer w-52">
        <Image src="/assets/arrow-left.svg" alt="arrow left icon" width={20} height={20} />
        <span>Go back</span>
      </Link>
      {/* <div className="flex justify-center gap-6 flex-wrap"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-6">
        {draftList.map((item) => (
          <DraftCard
            key={item.id}
            item={item}
            onRename={(id, newTitle) => handleRename(item.id, newTitle)}
            onDelete={() => handleDelete(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DraftPage;
