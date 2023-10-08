import React, { useState, useEffect } from 'react';
import Button from '@ui/Button';
import { ArrowLeft2 } from 'iconsax-react';
import MainLayout from '../../components/Layout/MainLayout';
import InviteLink from '../../modules/portfolio/component/portfolioSettingsComponents/inviteLink';
import NotificationSettings from '../../modules/portfolio/component/portfolioSettingsComponents/notificationsSettings';
//import DeleteAccount from '../../modules/portfolio/component/portfolioSettingsComponents/DeleteAccount';
//import AccountManagement from '../../modules/portfolio/component/portfolioSettingsComponents/AccountManagement';
//import AccountManagementMobile from '../../modules/portfolio/component/portfolioSettingsComponents/AcctMgtMobile';
import { SettingOptionTypes } from '../../@types';
import DeleteAccount from '@modules/portfolio/component/portfolioSettingsComponents/DeleteAccount';
import AccountManagement from '@modules/portfolio/component/portfolioSettingsComponents/AccountManagement';
import AccountManagementMobile from '@modules/portfolio/component/portfolioSettingsComponents/AcctMgtMobile';

export default function SettingPage() {
  const [settingOption, setSettingOption] = useState<SettingOptionTypes>({
    accountManagement: false,
    notificationSettings: false,
    deleteAccount: false,
    refer: false,
  });

  const openEachSeting = Object.values(settingOption).some((value) => value === true);

  const [loading, setLoading] = useState<boolean>(false);
  const [showNotInfo, setShowNotInfo] = useState<boolean>(false);
  const [showReferInfo, setShowReferInfo] = useState<boolean>(false);

  const toggleShow = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter((prev: boolean) => !prev);
  };

  const changeSettingOptions = (optionsSettings: keyof SettingOptionTypes) => {
    setSettingOption((prevSettingOption) => {
      const updatedSettingOption: any = { ...prevSettingOption };
      updatedSettingOption[optionsSettings] = true;

      for (const key in updatedSettingOption) {
        if (key !== optionsSettings) {
          updatedSettingOption[key] = false;
        }
      }

      return updatedSettingOption;
    });
  };

  const resetSettingOption = () => {
    const newSettingOption: SettingOptionTypes = {
      accountManagement: false,
      notificationSettings: false,
      deleteAccount: false,
      refer: false,
    };
    setSettingOption(newSettingOption);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) {
        setSettingOption((prevSettingOption) => ({
          ...prevSettingOption,
          accountManagement: true,
        }));
      }
    }
  }, []);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [loading]);

  return (
    <MainLayout activePage="setting" showFooter={true} showDashboardSidebar={false} showTopbar className="relative">
      <div className="w-full relative font-manropeEB  lg:mb-2  pt-5rem flex flex-col  ">
        <div
          className="hidden lg:flex lg:border-b-[1px]  cursor-auto  lg:border-white-500 relative min-h-[90vh]   items-start before:bg-white-500 before:w-full before:absolute before:top-[5rem] before:h-[1px]
                     pb-0   py-[3rem]  "
        >
          <div className="font-manropeEB  relative  min-w-[26%]  text-[#737876]   font-normal">
            <ul className="flex gap-6  text-sm font-manropeB font-semibold mb-6 justify-center w-full relative ">
              <li
                onClick={() => setShowReferInfo(false)}
                className={`hover:text-brand-green-hover ${
                  !showReferInfo ? 'border-b-2 text-brand-green-primary border-brand-green-primary' : ''
                }`}
              >
                settings
              </li>
              <li
                onClick={() => setShowReferInfo(true)}
                className={`hover:text-brand-green-hover   ${
                  showReferInfo ? 'border-b-2 text-brand-green-primary  border-brand-green-primary' : ''
                }`}
              >
                invite a friend
              </li>
            </ul>

            <div className="flex py-1 font-manropeB text-dark-110  relative w-full  gap-10">
              <div className="w-full text-center">
                <ul
                  className={`text-semibold   font-manropeB text-sm text-dark-110 py-2 bg-brand-green-shade95 ${
                    !showReferInfo && 'hidden'
                  }`}
                >
                  <li className={`  hover:bg-brand-green-shade95 ${showReferInfo && 'w-full bg-[#E6F5EA]'}`}>
                    Refer your friends
                  </li>
                </ul>
                <ul
                  className={`  flex-col gap-4  font-manropeB ${
                    showReferInfo ? 'hidden' : 'flex'
                  } font-semilbold text-sm`}
                >
                  <li
                    onClick={() => {
                      changeSettingOptions('accountManagement');
                    }}
                    className={`   py-2  hover:bg-brand-green-shade95 w-full ${
                      settingOption.accountManagement && 'w-full bg-[#E6F5EA]'
                    }`}
                  >
                    Account Management
                  </li>
                  <li
                    className={`py-2 hover:bg-brand-green-shade95 w-full ${
                      settingOption.notificationSettings && ' bg-[#E6F5EA]'
                    }`}
                    onClick={() => {
                      changeSettingOptions('notificationSettings');
                    }}
                  >
                    Notification Settings
                  </li>
                  <li
                    className={` py-2 hover:bg-brand-green-shade95 w-full ${
                      settingOption.deleteAccount && 'w-full bg-[#E6F5EA]'
                    }`}
                    onClick={() => {
                      setShowReferInfo(false);
                      changeSettingOptions('deleteAccount');
                    }}
                  >
                    Delete Account
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="grow min-h-[100vh] relative lg:border-l-[1px] lg:border-white-500 pl-8 ">
            <ul className="flex gap-6 mb-6  py-1 font-manropeB justify-between w-full relative">
              <li className={`text-md text-dark-110 `}> {showReferInfo ? 'Invite your friend' : 'Settings'}</li>
            </ul>
            <div>
              {showReferInfo ? (
                <InviteLink />
              ) : (
                <div>
                  {settingOption.notificationSettings && <NotificationSettings />}
                  {settingOption.deleteAccount && <DeleteAccount />}
                  {settingOption.accountManagement && <AccountManagement />}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start min-h-[50vh] font-manropeEB  px-6 md:items-center lg:hidden py-4 gap-6 justify-start">
          {!openEachSeting ? (
            <>
              <ul className="flex gap-6 text-[#737876] md:justify-center justify-start text-md text-semibold">
                <li
                  onClick={() => setShowReferInfo(false)}
                  className={`hover:text-brand-green-hover   ${
                    !showReferInfo ? 'border-b-2 text-brand-green-primary   border-brand-green-primary' : ''
                  }`}
                >
                  Settings
                </li>
                <li
                  onClick={() => setShowReferInfo(true)}
                  className={`hover:text-brand-green-hover   ${
                    showReferInfo ? 'border-b-2 text-brand-green-primary  border-brand-green-primary' : ''
                  }`}
                >
                  Invite a friend
                </li>
              </ul>

              {showReferInfo ? (
                <ul className="flex flex-col w-full md:w-fit md:text-center md:items-center items-start py-6">
                  <li
                    onClick={() => {
                      toggleShow(setShowNotInfo);
                      changeSettingOptions('refer');
                    }}
                    className="py-4 w-full min-w-[50vw] hover:bg-brand-green-shade95   border-b-[1px] border-white-500 "
                  >
                    Refer your friends
                  </li>
                </ul>
              ) : (
                <ul className="flex flex-col text-[#444846] w-full md:w-fit md:text-center md:items-center items-start py-6">
                  <li
                    onClick={() => {
                      toggleShow(setShowNotInfo);
                      changeSettingOptions('accountManagement');
                    }}
                    className="py-4 w-full   hover:bg-brand-green-shade95 min-w-[50vw]  border-b-[1px] border-white-500 "
                  >
                    Account Management
                  </li>
                  <li
                    onClick={() => {
                      toggleShow(setShowNotInfo);
                      changeSettingOptions('notificationSettings');
                    }}
                    className="py-4 w-full hover:bg-brand-green-shade95 min-w-[50vw] border-b-[1px] border-white-500 "
                  >
                    Notification Settings
                  </li>
                  <li
                    onClick={() => {
                      toggleShow(setShowNotInfo);
                      changeSettingOptions('deleteAccount');
                    }}
                    className="py-4 w-full border-b-[1px] md:border-none hover:bg-brand-green-shade95 min-w-[50vw] border-white-500 
                  "
                  >
                    Delete Account
                  </li>
                </ul>
              )}
            </>
          ) : (
            <div className=" relative w-full">
              <p className="py-2 mb-5 md:w-[80%] w-full flex gap-1 text-md items-center justify-start border-b-[1px] border-slate-500 text-md">
                <button onClick={resetSettingOption} className=" flex  text-md items-center justify-start">
                  <ArrowLeft2 />
                </button>{' '}
                Settings
              </p>
              <div className=" w-full relative">
                {settingOption.notificationSettings && <NotificationSettings />}
                {settingOption.deleteAccount && <DeleteAccount />}
                {settingOption.accountManagement && <AccountManagementMobile />}
                {settingOption.refer && <InviteLink />}
              </div>
            </div>
          )}
        </div>

        <Button
          //leftIcon={<I24Support color="#06C270" />}
          intent={'secondary'}
          onClick={() => setLoading(true)}
          size={'sm'}
          isLoading={loading}
          spinnerColor="#000"
          className=" m-6 self-end 
          relative text-brand-green-primary hover:bg-brand-green-hover hover:text-white-100 "
        >
          save <span className="hidden md:inline">& copy </span>
        </Button>
      </div>
    </MainLayout>
  );
}
