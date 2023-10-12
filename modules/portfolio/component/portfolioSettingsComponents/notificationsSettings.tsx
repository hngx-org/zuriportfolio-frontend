import React, { useState, useEffect } from 'react';
import { NotificationCheckboxType } from '../../../../@types';
import { MdCheck } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { type } from 'os';
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
            checked={props.checkboxState.emailSummary}
            className="appearance-none hidden"
          />
          <label
            htmlFor="emailSummary"
            className=" flex gap-2 items-center justify-start"
            onClick={() => handleLabelClick('emailSummary')}
          >
            <p className="border-[1.6px]  rounded-md relative flex items-center justify-center border-white-650">
              <p
                className={` flex justify-center relative ${
                  props.checkboxState.emailSummary && 'bg-brand-green-hover'
                }  border-brand-green-primary  rounded-md w-[16px] 
                 h-[16px]`}
              >
                <MdCheck className={`text-brand-green-primary`} />
              </p>{' '}
            </p>
            Receive an email summary of notification
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="specialOffers"
            id="specialOffers"
            checked={props.checkboxState.specialOffers}
            className="appearance-none hidden"
          />
          <label
            htmlFor="specialOffers"
            className=" flex gap-2 items-center"
            onClick={() => handleLabelClick('specialOffers')}
          >
            <p className="border-[1.6px]  rounded-md relative flex items-center justify-center border-white-650">
              <p
                className={` flex justify-center relative ${
                  props.checkboxState.specialOffers && 'bg-brand-green-hover'
                }  border-brand-green-primary  rounded-md w-[16px] 
                 h-[16px]`}
              >
                <MdCheck className={`text-brand-green-primary`} />
              </p>{' '}
            </p>
            Announcement on special offers
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="communityUpdate"
            id="communityUpdate"
            checked={props.checkboxState.communityUpdate}
            className="appearance-none hidden"
          />
          <label
            htmlFor="communityUpdate"
            className=" flex gap-2 items-center"
            onClick={() => handleLabelClick('communityUpdate')}
          >
            <p className="border-[1.6px]  rounded-md relative flex items-center justify-center border-white-650">
              <p
                className={` flex justify-center relative ${
                  props.checkboxState.communityUpdate && 'bg-brand-green-hover'
                }  border-brand-green-primary  rounded-md w-[16px] 
                 h-[16px]`}
              >
                <MdCheck className={`text-brand-green-primary`} />
              </p>{' '}
            </p>
            Get Notification to stay up-to-date with Zuri portfolio community
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="followUpdate"
            id="followUpdate"
            checked={props.checkboxState.followUpdate}
            className="appearance-none hidden"
          />
          <label
            htmlFor="followUpdate"
            className=" flex gap-2 items-center"
            onClick={() => handleLabelClick('followUpdate')}
          >
            <p className="border-[1.6px]  rounded-md relative flex items-center justify-center border-white-650">
              <p
                className={` flex justify-center relative w-[16px]
                 h-[16px]`}
              >
                {' '}
                {props.checkboxState.followUpdate && <MdCheck className={`text-brand-green-primary`} />}
              </p>
            </p>
            Notify when someone follows you
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="newMessages"
            id="newMessages"
            checked={props.checkboxState.newMessages}
            className="appearance-none hidden"
          />
          <label
            htmlFor="newMessages"
            className=" flex gap-2 items-center"
            onClick={() => handleLabelClick('newMessages')}
          >
            <p className="border-[1.6px]  rounded-md relative flex items-center justify-center border-white-650">
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
            </p>
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
