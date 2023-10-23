import React, { useState, useEffect } from 'react';
import { NotificationCheckboxType } from '../../../../@types';
import { MdCheck } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $http from '../../../../http/axios';
import { useAuth } from '../../../../context/AuthContext';
import { date } from 'zod';
import { useQuery } from '@tanstack/react-query';
//import { default } from '../../../../http/axios';
type Props = {
  checkboxState: NotificationCheckboxType;
  setCheckboxState: React.Dispatch<React.SetStateAction<NotificationCheckboxType>>;
};

const getUserNotifications = async (userId: string) => {
  const response = await $http.get(`https://hng6-r5y3.onrender.com/api/v1/get-notification-settings/${userId}`);
  if (response.status === 200) {
    return response.data;
  }
  throw new Error('Failed to fetch notifications');
};

const NotificationsSettings: React.FC<Props> = ({ checkboxState, setCheckboxState }) => {
  const handleLabelClick = (checkboxName: keyof NotificationCheckboxType) => {
    setCheckboxState((prevState) => ({
      ...prevState,
      [checkboxName]: !prevState[checkboxName],
    }));
  };

  const { auth } = useAuth();

  const { data, isLoading, isError } = useQuery(['userNotifications', auth?.user.id], () =>
    getUserNotifications(auth?.user.id || ''),
  );

  useEffect(() => {
    if (data) {
      console.log(data);
      setCheckboxState(data?.data[0]);
    }
  }, [data]);
  return (
    <>
      <div className=" flex flex-col space-y-[16px] items-start container mx-auto">
        <h1 className="font-manropeL text-[1rem] sm:text-[22px] text-[#2E3130] leading-[1.75rem]">
          Notification Setting
        </h1>
        <p className="text-[14px] md:text-[16px] font-manropeB text-[#444846]">Email Notification</p>
        <div className="md:text-[16px] text-[14px] font-manropeL space-y-[16px] text-white-650">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="emailSummary"
              id="emailSummary"
              onChange={() => handleLabelClick('emailSummary')}
              checked={checkboxState?.emailSummary}
              className="appearance-none hidden"
            />
            <label
              htmlFor="emailSummary"
              className=" flex gap-2 items-center justify-start"
              // onClick={() => handleLabelClick('emailSummary')}
            >
              <div className="border-[1.6px]  rounded-md relative flex items-center justify-center border-white-650">
                <p
                  className={` flex  justify-center relative ${checkboxState?.emailSummary && 'block'}   w-[16px] 
                 h-[16px]`}
                >
                  {' '}
                  {checkboxState?.emailSummary && (
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
              checked={checkboxState?.specialOffers}
              className="appearance-none hidden"
            />
            <label
              htmlFor="specialOffers"
              className=" flex gap-2 items-center"
              // onClick={() => handleLabelClick('specialOffers')}
            >
              <div className="border-[1.6px]  rounded-md relative flex items-center justify-center border-white-650">
                <p
                  className={` flex  justify-center relative ${checkboxState?.specialOffers && 'block'}   w-[16px] 
                 h-[16px]`}
                >
                  {' '}
                  {checkboxState?.specialOffers && (
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
              checked={checkboxState?.communityUpdate}
              className="appearance-none hidden"
            />
            <label
              htmlFor="communityUpdate"
              className=" flex gap-2 items-center"
              //  onClick={() => handleLabelClick('communityUpdate')}
            >
              <div className="border-[1.6px]  rounded-md relative flex items-center justify-center border-white-650">
                <p
                  className={` flex  justify-center relative ${checkboxState?.communityUpdate && 'block'}   w-[16px] 
                 h-[16px]`}
                >
                  {' '}
                  {checkboxState?.communityUpdate && (
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
              checked={checkboxState?.followUpdate}
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
                  {checkboxState?.followUpdate && <MdCheck className={`text-brand-green-primary`} />}
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
              checked={checkboxState?.newMessages}
              className="appearance-none hidden"
            />
            <label
              htmlFor="newMessages"
              className=" flex gap-2 items-center"
              //onClick={() => handleLabelClick('newMessages')}
            >
              <div className="border-[1.6px]  rounded-md relative flex items-center justify-center border-white-650">
                <p
                  className={` flex  justify-center relative ${checkboxState?.newMessages && 'block'}   w-[16px] 
                 h-[16px]`}
                >
                  {' '}
                  {checkboxState?.newMessages && (
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
    </>
  );
};
export default NotificationsSettings;
