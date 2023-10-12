import Image from 'next/image';
import React, { useState } from 'react';
import DraftCard from './component/draftCard';
import Link from 'next/link';
import { useContext } from 'react';
import { useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Draft {
  id: number;
  title: string;
  createdAt: string;
}
const DraftPage = () => {

  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [draftList, setDraftList] = useState<Draft[]>([]);
 

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `Created ${day}/${month}/${year}`;
  };

  const setLoading = (status: boolean) => {
    setIsLoading(status);
  };

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://piranha-assessment.onrender.com/api/admin/drafts/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            // 'Authorization': `Token ${user?.token}`,
          },
        });

        const data = await response.json(); 
        if (!response.ok) {
          toast.error(data.detail);
          return;
        }

        
        console.log(data)
        setLoading(false);
        setDraftList(data); // Assuming the response is an array of drafts
      } catch (error) {
        console.error('Error fetching drafts:', error);
        setLoading(false);
      }
    };

    
      fetchDrafts();
    
  }, []);

 // Handle renaming of draft name
 const handleRename = async (id: number, newTitle: string) => {
  try {
    setLoading(true);
    const response = await fetch(`https://piranha-assessment.onrender.com/api/admin/drafts/${id}/`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Token ${user?.token}`,
        'Content-Type': 'application/json',
        'X-CSRFTOKEN': 'jRc2ZpP1CpofaUIH2PzCuLJv7ZXzwX478mGc0KeehQACbHBm9aR12Err7zG9xKs1'
      },
      body: JSON.stringify({
        questions: [
          {
            question_no: 0,
            question_text: 'string',
            options: ['string'],
            correct_option: 0
          }
        ],
        is_published: false,
        title: newTitle,
        duration_minutes: 0
      })
    });

    const data = await response.json(); 
    if (!response.ok) {
      toast.error(data.detail);
      return;
    }

    const updatedList = draftList.map(item => (item.id === id ? { ...item, title: newTitle } : item));
    setDraftList(updatedList);
    toast.success(data.message);
    setLoading(false);
  } catch (error) {
    console.error('Error renaming draft:', error);
    toast.error('Error renaming draft');
    setLoading(false);
  }
};


// Handle deleting of draft
const handleDelete = async (id: number) => {
  try {
    setLoading(true);
    const response = await fetch(`https://piranha-assessment.onrender.com/api/admin/drafts/${id}/`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Token ${user?.token}`,
        'Content-Type': 'application/json',
        'X-CSRFTOKEN': 'jRc2ZpP1CpofaUIH2PzCuLJv7ZXzwX478mGc0KeehQACbHBm9aR12Err7zG9xKs1'
      },
    });

    const data = await response.json(); 
    if (!response.ok) {
      toast.error(data.detail);
      return;
    }

    const updatedList = draftList.filter(item => item.id !== id);
    setDraftList(updatedList);
    toast.success(data.message);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.error('Error deleting draft:', error);
    toast.error('Error deleting draft');
  }
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
            item={{
              ...item,
              createdAt: formatDate(item.createdAt), 
            }}
            onRename={(id, newTitle) => handleRename(item.id, newTitle)}
            onDelete={() => handleDelete(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DraftPage;
