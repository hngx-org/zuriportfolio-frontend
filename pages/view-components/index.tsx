import React from 'react';
import Image from 'next/image';
// import Modal from '@ui/Modal';
// import PropTypes from 'prop-types'; // Import PropTypes if needed

// import photo1 from "../../public/photo1.svg";
// import bg1 from '../../public/bg1.svg';
// import total_projects from '../../public/total-projects.svg';
// import badge_beginner from '../../public/badge-beginner.svg';
// import Location from '../../public/location.svg';
// import bgcover from '../../public/Name and DP.svg';
// import bgcover2 from '../../public/socials.svg';
// import bglay from '../../public/bg1.png';
import bookmark from '../../public/bookmark.svg';
import download from '../../public/download.svg';
import Location from '../../public/location.svg';
import X from '../../public/X.svg';
import Linkedin from '../../public/Linkedin.svg';
import ig from '../../public/ig.svg';
import tiktok from '../../public/Tiktok.svg';
import spotify from '../../public/Spotify.svg';
import Pc from '../../public/monitor.svg';
import dribble from '../../public/dribble.svg';
import behance from '../../public/behance.svg';
import Map from '../../public/map.svg';
import group from '../../public/ppl1.svg';
import gather from '../../public/ppl2.svg';


// import './YourComponent.css'; // Import your CSS file

type CardHoverProps = {
  setOpenCard?: (openCard: boolean) => void;
  openCard?: boolean;
}

const CardHover: React.FC<CardHoverProps> = ({setOpenCard, openCard}) => {
  return (
<div className={`absolute z-[6]  border-1 bg-[#fff] border m-auto  w-[389px]  rounded-xl justify-center overflow-hidden ${openCard ? "h-[451px]":"h-0"} items-center transition-all top-0 left-0`}>
        {/* <Image className="w-30 h-120 object-cover" src={bgcover} alt="Card Header" width={100} height={50} /> */}
        <div className="bg-center  bg-cover bg-no-repeat rounded-t-xl" style={{ backgroundImage: `url("/bg-pic.svg"`}}>
        <div className=" px-8 py-4 flex items-start justify-between w-100">
          <div className="w-50">
          <h1 className="text-white-500 font-manropeB mb-1 font-bold text-xl">Theresa Webb</h1>
          <h1 className="text-white-500 font-manropeL text-m">Product Designer</h1>
          <div className="justify-start items-center gap-1 flex">
          <Image src={Location} alt="badge_beginner" width={20} height={20} />
          <h3 className="text-white-500 font-manropeL text-m">Lagos, Nigeria</h3>
          </div>
          <div className="sm:grid  sm:grid-cols-3">
          <button className="mt-2  border text-[70%] border-white-100 text-white-500  py-1 rounded-full">UI Design</button>
            <button className="mt-2  ml-4 text-[70%] text-white-500 border border-white-100 py-1 rounded-full">User Research</button>
            <button className="mt-2  ml-4 text-[70%] text-white-500 border border-white-100  py-1 rounded-full">Prototyping</button>
            <button className="mt-2  text-[70%] border text-white-500 border-white-100  py-1 rounded-full">Figma</button>
            <button className="mt-2  text-[70%] ml-4 border text-white-500 border-white-100  py-1 px-1 rounded-full">Interaction Design</button>
            <button className="mt-2 text-[70%]  ml-4 border text-white-500 border-white-100  py-1 rounded-full">+5</button>
            </div>
          </div>

          <div className="w-30">
          <Image src={bookmark} alt="Bookmark" className="w-20 h-20" />
          <Image src={download} alt="Download" className="w-20 h-20" />
          </div>
        </div>
        </div>

        <div className="grid grid-cols-3 gap-1 px-10 mt-4">
  {/* <!--first col--> */}
  <div className="grid grid-rows-3 gap-3">
    <div className="grid grid-cols-2 gap-3">
      {/* <!--twitter--> */}
      <div className="box">
      <Image src={X} alt="badge_beginner" className='w-200 cursor-pointer'/>
      </div>
      {/* <!--linkedin--> */}
      <div className="box">
      <Image src={Linkedin} alt="badge_beginner" className='w-200 cursor-pointer' />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3">
      {/* <!--instagram--> */}
      <div className="box">
      <Image src={ig} alt="badge_beginner" className='w-200 cursor-pointer' />
      </div>
      {/* <!--tiktok--> */}
      <div className="box">
      <Image src={tiktok} alt="badge_beginner" className='w-200 cursor-pointer' />
      </div>
    </div>

    {/* <!--spotify--> */}
    <div className="box">
    <Image src={spotify} alt="badge_beginner" className='w-40 cursor-pointer' />
    </div>
  </div>
  
  {/* <!--second col--> */}
  <div className="grid grid-rows-3 gap-3">
    {/* <!--laptop image--> */}
    <div className="row-span-2 box">
    <Image src={Pc} alt="badge_beginner" className='w-40 cursor-pointer'/>
    </div>

    {/* <!--smaller images--> */}
    <div className="grid grid-cols-2 gap-3">
      <div className="box">
      <Image src={group} alt="badge_beginner" className='w-20 cursor-pointer' />
      </div>
      <div className="box">
      <Image src={gather} alt="badge_beginner" className='w-20 cursor-pointer'/>
      </div>
    </div>
  </div>

  {/* <!--third col--> */}
  <div className="grid grid-rows-3 gap-3">
    {/* <!--map--> */}
    <div className="row-span-1 box">
    <Image src={Map} alt="badge_beginner" className='w-48 cursor-pointer'/>
    </div>

    <div className="row-span-2">
      <div className="grid grid-cols-2 gap-3">
        <div className="box">
      <Image src={dribble} alt="badge_beginner" className='w-32 cursor-pointer' />
        </div>
      <div className="box">
      <Image src={behance} alt="badge_beginner" className='w-32 cursor-pointer'/>
      </div>
      </div>
    </div>
  </div>
</div>
    <div className=''>
    <button className="w-4/5 mx-auto cursor-pointer bg-white text-green-500 border border-green-500 border-solid rounded-xl py-3 mt-3 flex items-center justify-center hover:text-green-600">
        View portfolio
      </button>
    </div>
    </div>
    // <Modal closeOImageerlayClick isOpen={openCard} isCloseIconPresent={true} closeModal={() => setOpenCard(false)}>
    // <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 grid-gap-6 m-auto px-3 justify-evenly  ">
    //     <div className=" p-2 border-1 border m-auto mb-10  border-gray-500 w-full sm:w-auto  rounded-2xl justify-center items-center ">
    //     <Image className="w-full h-120 object-cover" src={bgcover} alt="Card Header" width={100} height={50} />
    //   <Image className="w-full h-120 mt-4 object-cover" src={bgcover2} alt="Card Header" width={100} height={50} />
    //   <button className="w-32 h-10 mt-4 text-#009254 bg-blue-500 rounded-2xl hover:bg-white-600 focus:outline-1px solid #009254 focus:ring focus:ring-blue-300 px-4">View Portfolio</button>
    //   </div>
    // </div>
    // </Modal>
  )
}

export default CardHover;

