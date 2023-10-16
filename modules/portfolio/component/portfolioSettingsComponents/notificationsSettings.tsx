import React, { useState, useEffect } from 'react';
import { NotificationCheckboxType } from '../../../../@types';
import { MdCheck } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { type } from 'os';
import { useAuth } from '../../../../context/AuthContext';
type pros = {
  checkboxState: {
    emailSummary: boolean;
    specialOffers: boolean;
    communityUpdate: boolean;
    followUpdate: boolean;
    newMessages: boolean;
  };
  setCheckboxState: React.Dispatch<React.SetStateAction<NotificationCheckboxType>>;
};

export default function NotificationsSettings(props: pros) {
  const { auth } = useAuth();
  const handleLabelClick = (checkboxName: keyof NotificationCheckboxType) => {
    props.setCheckboxState((prevState) => ({
      ...prevState,
      [checkboxName]: !prevState[checkboxName],
    }));
  };

  return (
    <div className=" flex flex-col space-y-[16px] items-start container mx-auto">
      <h1 className="font-semibold md:text-[22px] text-sm font-manropeB text-dark-105">Notification Setting</h1>
      <p className="text-sm md:text-[16px] font-manropeB text-[#444846]">Email Notification</p>
      <div className="md:text-[16px] text-[14px] font-manropeL space-y-[16px] text-white-650">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="emailSummary"
            id="emailSummary"
            onChange={() => handleLabelClick('emailSummary')}
            checked={props.checkboxState.emailSummary}
            className="appearance-none hidden"
          />
          <label
            htmlFor="emailSummary"
            className=" flex gap-2 items-center justify-start"
            // onClick={() => handleLabelClick('emailSummary')}
          >
            <div className="border-[1.6px]  rounded-md relative flex items-center justify-center border-white-650">
              <p
                className={` flex  justify-center relative ${props.checkboxState.emailSummary && 'block'}   w-[16px] 
                 h-[16px]`}
              >
                {' '}
                {props.checkboxState.emailSummary && (
                  <MdCheck
                    className={`text-brand-green-primary 
             `}
                  />
                )}
              </p>{' '}
            </div>{' '}
            Receive an email summary of notification
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="specialOffers"
            id="specialOffers"
            onChange={() => handleLabelClick('specialOffers')}
            checked={props.checkboxState.specialOffers}
            className="appearance-none hidden"
          />
          <label
            htmlFor="specialOffers"
            className=" flex gap-2 items-center"
            // onClick={() => handleLabelClick('specialOffers')}
          >
            <div className="border-[1.6px]  rounded-md relative flex items-center justify-center border-white-650">
              <p
                className={` flex  justify-center relative ${props.checkboxState.specialOffers && 'block'}   w-[16px] 
                 h-[16px]`}
              >
                {' '}
                {props.checkboxState.specialOffers && (
                  <MdCheck
                    className={`text-brand-green-primary 
             `}
                  />
                )}
              </p>{' '}
            </div>
            Announcement on special offers
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="communityUpdate"
            id="communityUpdate"
            onChange={() => handleLabelClick('communityUpdate')}
            checked={props.checkboxState.communityUpdate}
            className="appearance-none hidden"
          />
          <label
            htmlFor="communityUpdate"
            className=" flex gap-2 items-center"
            //  onClick={() => handleLabelClick('communityUpdate')}
          >
            <div className="border-[1.6px]  rounded-md relative flex items-center justify-center border-white-650">
              <p
                className={` flex  justify-center relative ${props.checkboxState.communityUpdate && 'block'}   w-[16px] 
                 h-[16px]`}
              >
                {' '}
                {props.checkboxState.communityUpdate && (
                  <MdCheck
                    className={`text-brand-green-primary 
             `}
                  />
                )}
              </p>{' '}
            </div>
            Get Notification to stay up-to-date with Zuri portfolio community
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="followUpdate"
            id="followUpdate"
            onChange={() => handleLabelClick('followUpdate')}
            checked={props.checkboxState.followUpdate}
            className="appearance-none hidden"
          />
          <label
            htmlFor="followUpdate"
            className=" flex gap-2 items-center"
            //onClick={() => handleLabelClick('followUpdate')}
          >
            <div className="border-[1.6px]  rounded-md relative flex items-center justify-center border-white-650">
              <p
                className={` flex justify-center relative w-[16px]
                 h-[16px]`}
              >
                {' '}
                {props.checkboxState.followUpdate && <MdCheck className={`text-brand-green-primary`} />}
              </p>
            </div>
            Notify when someone follows you
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="newMessages"
            id="newMessages"
            onChange={() => handleLabelClick('newMessages')}
            checked={props.checkboxState.newMessages}
            className="appearance-none hidden"
          />
          <label
            htmlFor="newMessages"
            className=" flex gap-2 items-center"
            //onClick={() => handleLabelClick('newMessages')}
          >
            <div className="border-[1.6px]  rounded-md relative flex items-center justify-center border-white-650">
              <p
                className={` flex  justify-center relative ${props.checkboxState.newMessages && 'block'}   w-[16px] 
                 h-[16px]`}
              >
                {' '}
                {props.checkboxState.newMessages && (
                  <MdCheck
                    className={`text-brand-green-primary 
             `}
                  />
                )}
              </p>{' '}
            </div>
            Notify about new messages or interactions
          </label>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
