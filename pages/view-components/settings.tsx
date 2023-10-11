import React, { useState, useEffect } from 'react';
import Button from '@ui/Button';
import { ArrowLeft2 } from 'iconsax-react';
import MainLayout from '../../components/Layout/MainLayout';
import InviteLink from '../../modules/portfolio/component/portfolioSettingsComponents/inviteLink';
import NotificationSettings from '../../modules/portfolio/component/portfolioSettingsComponents/notificationsSettings';
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
      <div className="w-full   relative font-manropeEB mb-4  lg:mb-2  pt-4rem flex flex-col  ">
        {/*  Laptop View*/}
        <div
          className="md:hidden hidden lg:flex lg:border-b-[1px]  cursor-auto
            lg:border-white-500 relative min-h-[90vh]   items-start before:bg-white-500 
            before:w-full before:absolute before:top-[5.3rem] before:h-[0.5px]
                     pb-0   py-[3rem]  "
        >
          <div className="font-manropeEB  relative cursor-pointer  min-w-[408px]  text-[#737876]   font-normal">
            <ul
              className="flex gap-5
             text-sm font-manropeB font-semibold p  justify-center w-full relative "
            >
              <li
                onClick={() => setShowReferInfo(false)}
                className={`hover:text-brand-green-hover ${
                  !showReferInfo ? 'border-b-2 pb-[8px] text-brand-green-primary border-brand-green-primary' : ''
                }`}
              >
                Settings
              </li>
              <li
                onClick={() => setShowReferInfo(true)}
                className={`hover:text-brand-green-hover   ${
                  showReferInfo ? 'border-b-2 text-brand-green-primary pb-[8px] border-brand-green-primary' : ''
                }`}
              >
                Invite a friend
              </li>
            </ul>

            <div className="flex  font-manropeB text-dark-110 mt-[24px]  relative w-full  gap-10">
              <div className="w-full text-center">
                <ul
                  className={`text-semibold    font-manropeB text-sm text-dark-110 
                   bg-brand-green-shade95 ${!showReferInfo && 'hidden'}`}
                >
                  <li
                    className={`py-3 flex justify-center  hover:bg-brand-green-shade95  
                  ${showReferInfo && 'w-full bg-[#E6F5EA]'}`}
                  >
                    <p className="min-w-[170px] text-start">Refer your friends</p>
                  </li>
                </ul>
                <ul
                  className={`   flex-col gap-1  font-manropeEL ${
                    showReferInfo ? 'hidden' : 'flex'
                  } font-semilbold text-sm`}
                >
                  <li
                    onClick={() => {
                      changeSettingOptions('accountManagement');
                    }}
                    className={`flex justify-center    py-3 hover:bg-brand-green-shade95 w-full ${
                      settingOption.accountManagement && 'w-full bg-[#E6F5EA]'
                    }`}
                  >
                    <span className="min-w-[170px] text-start">Account Management</span>
                  </li>
                  <li
                    className={` flex justify-center py-3 hover:bg-brand-green-shade95 w-full ${
                      settingOption.notificationSettings && ' bg-[#E6F5EA]'
                    }`}
                    onClick={() => {
                      changeSettingOptions('notificationSettings');
                    }}
                  >
                    <span className="min-w-[170px] text-start">Notification Settings</span>
                  </li>
                  <li
                    className={`flex justify-center    py-3 hover:bg-brand-green-shade95 w-full ${
                      settingOption.deleteAccount && 'w-full bg-[#E6F5EA]'
                    }`}
                    onClick={() => {
                      setShowReferInfo(false);
                      changeSettingOptions('deleteAccount');
                    }}
                  >
                    <span className="min-w-[170px] text-start">Delete Account</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="grow min-h-[100vh] relative lg:border-l-[1px] lg:border-white-500  lg:px-[52px]  ">
            <ul className="flex gap-6   cursor-pointer font-manropeB justify-between w-full  relative">
              <li className={`text-md text-dark-110 `}> {showReferInfo ? 'Invite your friend' : 'Settings'}</li>
            </ul>
            <div className="mt-[42px] ">
              {showReferInfo ? (
                <InviteLink />
              ) : (
                <div className="mt-[26px]">
                  {settingOption.notificationSettings && <NotificationSettings />}
                  {settingOption.deleteAccount && <DeleteAccount />}
                  {settingOption.accountManagement && <AccountManagement />}
                </div>
              )}
            </div>
          </div>
        </div>

        {/*  Mobile and Desktop View*/}
        <div className="lg:hidden container mx-auto">
          <div
            className="flex   flex-col items-start min-h-[50vh] font-manropeEB 
         px-6 md:items-center lg:hidden mt-4 gap-8 justify-start"
          >
            {!openEachSeting ? (
              <>
                <ul className="flex gap-6  justify-start  md:justify-center text-[#737876]   text-md text-semibold">
                  <li
                    onClick={() => setShowReferInfo(false)}
                    className={`hover:text-brand-green-hover py-2 px-2  ${
                      !showReferInfo ? 'border-b-2 text-brand-green-primary   border-brand-green-primary' : ''
                    }`}
                  >
                    Settings
                  </li>
                  <li
                    onClick={() => setShowReferInfo(true)}
                    className={`hover:text-brand-green-hover px-2 py-2 ${
                      showReferInfo ? 'border-b-2 text-brand-green-primary  border-brand-green-primary' : ''
                    }`}
                  >
                    Invite a friend
                  </li>
                </ul>

                {showReferInfo ? (
                  <ul className="flex flex-col w-full md:w-fit md:text-center md:items-center items-start m">
                    <li
                      onClick={() => {
                        toggleShow(setShowNotInfo);
                        changeSettingOptions('refer');
                      }}
                      className="py-4 w-full min-w-[50vw] hover:bg-brand-green-shade95 
                      border-b-[1px] border-white-500 text-[#444846] "
                    >
                      Refer your friends
                    </li>
                  </ul>
                ) : (
                  <ul
                    className="flex flex-col text-[#444846] w-full md:w-fit md:text-center 
                md:items-center items-start "
                  >
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
                <p
                  className="py-2 mb-5 md:w-[80%] w-full flex gap-1 
              text-md items-center justify-start border-b-[1px] border-slate-500 text-md"
                >
                  <button onClick={resetSettingOption} className=" flex  text-md items-center justify-start">
                    <ArrowLeft2 />
                  </button>{' '}
                  {!showReferInfo ? ' Settings' : 'Invite a friend'}
                </p>
                <div className=" w-full relative ">
                  {settingOption.notificationSettings && <NotificationSettings />}
                  {settingOption.deleteAccount && <DeleteAccount />}
                  {settingOption.accountManagement && <AccountManagementMobile />}
                  {settingOption.refer && <InviteLink />}
                </div>
              </div>
            )}
          </div>
        </div>

        <Button
          //leftIcon={<I24Support color="#06C270" />}
          intent={'secondary'}
          onClick={() => setLoading(true)}
          size={'sm'}
          isLoading={loading}
          spinnerColor="#000"
          className={` m-6 self-end 
          relative text-brand-green-primary rounded-lg p-4 grow lg:block md:hidden border-brand-green-primary ${
            settingOption.accountManagement ||
            settingOption.deleteAccount ||
            settingOption.refer ||
            settingOption.notificationSettings
              ? 'md:block lg:block hidden'
              : ''
          }
           hover:bg-brand-green-hover hover:text-white-100 `}
        >
          Save <span className={` ${showReferInfo && 'hidden md:inline'}`}>& Close </span>
        </Button>
      </div>
    </MainLayout>
  );
}
