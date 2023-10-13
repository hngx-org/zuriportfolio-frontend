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
import Assessmentlist from '../../modules/assessment/component/assessmentlist';
import Assessmentresponses from '../../modules/assessment/component/Assessmentresponses';
import MainLayout from '../../components/Layout/MainLayout';
import backarrow from '../../modules/assessment/component/backarrow.svg';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
export const ListContext = React.createContext([{}]);
function Index() {
  const [newModal, setnewModal]: any = useState(false);
  const [track, setTrack]: any = useState(null);
  const [loading, setLoading] = useState(true);
  const [list, setList]: any = useState(Assessmentlist);
  const [trackids, setTrackids] = useState([]);
  //This is for the search box, to be updated as user inputs
  const [filterParam, setfilterParam] = useState('');
  const [filteredData, setFilteredData] = useState(Assessmentlist);
  const onFilter = (e: any) => {
    setfilterParam(e.target.value.toLowerCase());
  };

  useEffect(() => {

    setFilteredData(
      list.filter((child:any) => {
        if (filterParam === '') {
          return true; // Return true to include all items when filterParam is empty
        } else {
          return child?.trackname.toLowerCase().includes(filterParam);
        }
      }))
    }, [filterParam, list]);

      useEffect(() => {
  const apiUrl = 'https://hng6-r5y3.onrender.com/api/tracks';

      
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON response
      })
      .then((responseData) => {
        setTrackids(responseData.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="fixed bg-brand-green-primary w-full h-full grid place-items-center">
        <div className=" items-center text-white-100 text-2xl">Loading...</div>
      </div>

    );
  }
  return (
    <MainLayout activePage="/assessment/" className="assessmentheader" showTopbar showDashboardSidebar={false}>
      {newModal && (
        <div className="fixed bg-dark-600 top-0 left-0 w-full h-full grid place-items-center z-20">
          <div className="bg-white-100 w-[300px] md:w-[558px] text-center font-semibold py-[60px] md:py-[80px] px-[20px] rounded-2xl">
            <div className="text-custom-color10 mb-6">Select the category you are creating an assessment in</div>
            <div className="pb-6 w-full ">
              <Select
                onValueChange={(value) => {
                  setTrack(value);
                }}
              >
                <SelectTrigger className="w-full p-2 ">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {trackids.map((track: any) => {
                    return (
                      <SelectItem key={track.id} value={track?.id}>
                        {track?.track}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 mx-4px md:mx-[30px] lg:mx-[92px] cursor-pointer">
              <div
                className="flex1 w-full px-4 py-3 bg-brand-green-ttr border-green-600 border-[1px] text-green-600 rounded-full hover:text-white-100 hover:bg-green-600 transition"
                onClick={() => setnewModal(false)}
              >
                Cancel
              </div>
              <Link
                href={{ pathname: track === null ? '/assessment' : '/assessment/new', query: { name: track } }}
                onClick={() => {
                  setnewModal(false);
                }}
                className="w-full flex1 px-4 py-3 bg-green-600 text-white-100 rounded-full hover:text-green-600 hover:border-[1px] hover:border-green-600 hover:bg-white-100 transition"
              >
                Create
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="w-full items-start justify-start">
        <Header heading={'Admin Assessment Board'} body={'For the general creation and management of assessments'} />
        <div className="assessment-body text-Manrope mx-[16px] lg:mx-[104px]">
          <Link href={'/'} className="flex pt-2 items-center hover:text-green-750">
            <Image src={backarrow} alt="go back" width={20} height={20} />
            <p className="pl-1">Go back to home page</p>
          </Link>
          <div className="assessment-links mt-[50px] md:mt-[95px] flex px:[12px] md:px-[50px] lg:px-[100px] gap-3 md:gap-[13vw]">
            <div className="flex-1 border-[1px] border-white-400 p-1 md:p-6 rounded-lg hover:text-brand-green-shade40">
              <div className="w-full grid place-items-center" onClick={() => setnewModal(true)}>
                <Image src={addmessage} width="33" height="33" alt="add message" />
                <div className="text-sm md:text-base font-semibold font-ManropeB pt-[9px] text-center cursor-pointer">
                  Create new assessment
                </div>
              </div>
            </div>
            <div className="flex-1 center border-[1px] border-[#A8ACAB] p-2 md:p-6 rounded-lg hover:text-brand-green-shade40">
              <Link className="grid place-items-center w-full" href="/assessment/drafts">
                <Image src={draftsimg} width="33" height="33" alt="go to drafts" />
                <div className="grid place-items-center text-sm md:text-base font-semibold font-ManropeB pt-[9px]">
                  My drafts
                </div>
              </Link>
            </div>
          </div>
          <div className="board-desc flex flex-wrap gap-[14px] md:gap-[26px] justify-center w-full my-[50px] md:my-[79px]">
            <Description info="Responses" number={120} icon={bookimg} />
            <Description info="CREATED ASSESSMENTS" number={12} icon={booksaved} />
            <Description info="PASS/FAIL RATIO" number={'3:1'} icon={ratioimg} />
          </div>
          <div className="search w-full border-dark-200 border-[1px] p-2 md:p-4 rounded-lg flex items-center">
            <div className="icon relative w-4 h-4 mr-2">
              <Image src={searchimg} alt="search" layout="fill" />
            </div>

            <input className="w-full outline-none" placeholder="Search assessments and responses" onInput={onFilter} />
          </div>
          <ListContext.Provider value={[filteredData, setList]}>
            <Assessmentresponses />
          </ListContext.Provider>
        </div>
      </div>
    </MainLayout>
  );
}

export default Index;
