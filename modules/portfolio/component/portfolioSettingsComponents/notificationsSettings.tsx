import React, { useState, useEffect } from 'react';
import { NotificationCheckboxType } from '../../../../@types';
import { MdCheck } from 'react-icons/md';

export default function NotificationsSettings() {
  const [checkboxState, setCheckboxState] = useState<NotificationCheckboxType>({
    emailSummary: false,
    specialOffers: false,
    communityUpdate: false,
    followUpdate: false,
    newMessages: false,
    //userId:"6ba7b812-9dad-11d1-80b4-00c04fd430c8"
  });

  const [acceptedNotificationMethod, setAcceptedNotificationMethod] = useState<{}>({});

  const userId = '6ba7b812-9dad-11d1-80b4-00c04fd430c8';
  const handleNotificationUpdate = async () => {
    try {
      const url = `https://hng6-r5y3.onrender.com/api/set-notification-settings/${userId}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkboxState),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Notification settings updated successfully:', data.data);
        const { userId, ...notificationData } = data.data;

        setCheckboxState(notificationData);

        localStorage.setItem(`notificationData${userId}`, JSON.stringify(notificationData));
      } else {
        console.error('Failed to update notification settings');
      }
    } catch (error) {
      console.error('An error occurred while updating notification settings:', error);
    }
  };

  const getNotificationSettingsFromLocalStorage = () => {
    const storedNotificationData = localStorage.getItem(`notificationData${userId}`);
    if (storedNotificationData) {
      const parsedData = JSON.parse(storedNotificationData);
      setCheckboxState(parsedData);
    }
  };

  useEffect(() => {
    getNotificationSettingsFromLocalStorage();
  }, []);

  const handleLabelClick = (checkboxName: keyof NotificationCheckboxType) => {
    setCheckboxState((prevState) => ({
      ...prevState,
      [checkboxName]: !prevState[checkboxName],
    }));
  };

  // interface ApiResponse {
  //
  //   message: string;
  //
  // }

  const handleNOtificationUpdate = async () => {
    try {
      const url = 'https://hng6-r5y3.onrender.com/api/set-notification-settings/6ba7b812-9dad-11d1-80b4-00c04fd430c8';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkboxState),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Notification settings updated successfully:', data.data);
        setCheckboxState(data.data);
      } else {
        console.error('Failed to update notification settings');
      }
    } catch (error) {
      console.error('An error occurred while updating notification settings:', error);
    }
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
            checked={checkboxState.emailSummary}
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
                  checkboxState.emailSummary && 'bg-brand-green-hover'
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
            checked={checkboxState.specialOffers}
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
                  checkboxState.specialOffers && 'bg-brand-green-hover'
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
            checked={checkboxState.communityUpdate}
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
                  checkboxState.communityUpdate && 'bg-brand-green-hover'
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
            checked={checkboxState.followUpdate}
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
                {checkboxState.followUpdate && <MdCheck className={`text-brand-green-primary`} />}
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
            checked={checkboxState.newMessages}
            className="appearance-none hidden"
          />
          <label
            htmlFor="newMessages"
            className=" flex gap-2 items-center"
            onClick={() => handleLabelClick('newMessages')}
          >
            <p className="border-[1.6px]  rounded-md relative flex items-center justify-center border-white-650">
              <p
                className={` flex  justify-center relative ${checkboxState.newMessages && 'block'}   w-[16px] 
                 h-[16px]`}
              >
                {' '}
                {checkboxState.newMessages && (
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

        <button onClick={handleNotificationUpdate}>textinddd</button>
      </div>
    </div>
  );
}
