import React, { useState } from 'react';
import { NotificationCheckboxType } from '../../../../@types';

export default function NotificationsSettings() {
  const [checkboxState, setCheckboxState] = useState<NotificationCheckboxType>({
    receiveEmail: false,
    specialOffers: false,
    getNotification: false,
    notifyFollow: false,
    notifyMessages: false,
  });

  const handleLabelClick = (checkboxName: keyof NotificationCheckboxType) => {
    setCheckboxState((prevState) => ({
      ...prevState,
      [checkboxName]: !prevState[checkboxName],
    }));
  };

  return (
    <div className=" flex flex-col items-start">
      <h1 className="font-semibold text-lg font-manropeB text-dark-105">Notification Setting</h1>
      <p className="text-sm text-[#444846]">Email Notification</p>
      <div className="text-sm font-manropeB text-white-650 space-y-4 mt-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="receiveEmail"
            id="receiveEmail"
            checked={checkboxState.receiveEmail}
            className="appearance-none hidden"
          />
          <label
            htmlFor="receiveEmail"
            className=" flex gap-2 items-center justify-start"
            onClick={() => handleLabelClick('receiveEmail')}
          >
            <p className="border-[1.6px] relative flex items-center justify-center border-white-650">
              <p
                className={`border-[1px] top-[1px] relative ${
                  checkboxState.receiveEmail && 'bg-brand-green-hover'
                }  border-brand-green-primary w-[16px] [clip-path:polygon(27%_12%,49%_57%,84%_41%,92%_54%,42%_78%,13%_17%)] h-[16px]`}
              ></p>{' '}
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
            <p className="border-[1.6px] relative flex items-center justify-center border-white-650">
              <p
                className={`border-[1px] top-[1px] relative ${
                  checkboxState.specialOffers && 'bg-brand-green-hover'
                }  border-brand-green-primary w-[16px] [clip-path:polygon(27%_12%,49%_57%,84%_41%,92%_54%,42%_78%,13%_17%)] h-[16px]`}
              ></p>{' '}
            </p>
            Announcement on special offers
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="getNotification"
            id="getNotification"
            checked={checkboxState.getNotification}
            className="appearance-none hidden"
          />
          <label
            htmlFor="getNotification"
            className=" flex gap-2 items-center"
            onClick={() => handleLabelClick('getNotification')}
          >
            <p className="border-[1.6px] relative flex items-center justify-center border-white-650">
              <p
                className={`border-[1px] top-[1px] relative ${
                  checkboxState.getNotification && 'bg-brand-green-hover'
                }  border-brand-green-primary w-[16px] [clip-path:polygon(27%_12%,49%_57%,84%_41%,92%_54%,42%_78%,13%_17%)] h-[16px]`}
              ></p>{' '}
            </p>
            Get Notification to stay up-to-date with Zuri portfolio community
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="notifyFollow"
            id="notifyFollow"
            checked={checkboxState.notifyFollow}
            className="appearance-none hidden"
          />
          <label
            htmlFor="notifyFollow"
            className=" flex gap-2 items-center"
            onClick={() => handleLabelClick('notifyFollow')}
          >
            <p className="border-[1.6px] relative flex items-center justify-center border-white-650">
              <p
                className={`border-[1px] top-[1px] relative ${
                  checkboxState.notifyFollow && 'bg-brand-green-hover'
                }  border-brand-green-primary w-[16px] [clip-path:polygon(27%_12%,49%_57%,84%_41%,92%_54%,42%_78%,13%_17%)] h-[16px]`}
              ></p>{' '}
            </p>
            Notify when someone follows you
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="notifyMessages"
            id="notifyMessages"
            checked={checkboxState.notifyMessages}
            className="appearance-none hidden"
          />
          <label
            htmlFor="notifyMessages"
            className=" flex gap-2 items-center"
            onClick={() => handleLabelClick('notifyMessages')}
          >
            <p className="border-[1.6px] relative flex items-center justify-center border-white-650">
              <p
                className={`border-[1px] top-[1px] relative ${
                  checkboxState.notifyMessages && 'bg-brand-green-hover'
                }  border-brand-green-primary w-[16px] [clip-path:polygon(27%_12%,49%_57%,84%_41%,92%_54%,42%_78%,13%_17%)] h-[16px]`}
              ></p>{' '}
            </p>
            Notify about new messages or interactions
          </label>
        </div>
      </div>
    </div>
  );
}
