// import Button from '@ui/Button';
import { useState } from 'react';
import AccountManagement from '../components/AccountManagement';
import AccountManagementMobile from '../components/AcctMgtMobile';
import DeleteAccount from '../components/DeleteAccount';
import MainLayout from '../components/Layout/MainLayout';

function Settings() {
  const [nextSettingPage, setNextSettingPage] = useState(true);
  const settingsMobile = (
    <div className="w-full divide-y lg:divide-none divide-[#E1E3E2] flex flex-col mt-[24px]">
      <button className="w-full text-start sm:text-center sm:bg-[#E6F5EA] py-[16px] lg:py-[12px] font-manropeB lg:font-manropeEB text-[1rem] leading-[1.25rem] lg:leading-[1.5rem] text-[#2E3130]">
        Account Management
      </button>
      <button className="w-full text-start sm:text-center py-[16px] lg:py-[12px] font-manropeB lg:font-manropeEB text-[1rem] leading-[1.25rem] lg:leading-[1.5rem] text-[#444846]">
        Notification Setting
      </button>
      <button className="w-full text-start sm:text-center py-[16px] lg:py-[12px] font-manropeB lg:font-manropeEB text-[1rem] leading-[1.25rem] lg:leading-[1.5rem] text-[#444846]">
        Delete Account
      </button>
      <p className="sm:hidden"> </p>
    </div>
  );
  const settingsNav = (
    <div className="w-full flex flex-col px-[24px] mt-[2rem] sm:[40px] sm:m-[40px] ">
      <div className="w-full sm:w-[559px] flex flex-row items-center gap-x-[1rem] pb-[0.5rem] border-b border-[#C4C7C6]">
        <svg
          className="h-[1rem] w-[1rem] sm:h-[1.5rem] sm:w-[1.5rem]"
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.99992 1L1.70703 6.2929C1.37369 6.6262 1.20703 6.7929 1.20703 7C1.20703 7.2071 1.37369 7.3738 1.70703 7.7071L6.99992 13"
            stroke="#141B34"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <h3 className=" font-manropeEL text-[1rem] sm:text-[1.5rem] leading-[2rem] text-[#2E3130]">Settings</h3>
      </div>
    </div>
  );
  return (
    <MainLayout activePage="settings" showTopbar showDashboardSidebar={false}>
      {/* Desktop view */}
      <div className="hidden w-full lg:flex flex-col border-b border-[#C4C7C6]">
        <div className="w-full lg:flex flex-row">
          {/* side menu */}
          <div className="w-[448px] h-[881px] flex flex-col border-r border-[#C4C7C6]">
            {/* Side menu header */}
            <div className="w-full h-[7.25rem] border-b border-[#C4C7C6]">
              <div className="flex h-full items-end pb-[0.5rem] ml-[4.5rem] pr-[2rem] gap-x-[2rem]">
                <button className="flex flex-col font-manropeEB text-[0.875rem] lg:text-[1rem] leading-[1.5rem] text-[#009254]">
                  <span className="mb-1">Settings</span>
                  <div className="w-full border border-[#009254] "></div>
                </button>
                <button className="flex flex-col font-manropeEB text-[0.875rem] lg:text-[1rem] leading-[1.5rem] text-[#737876]">
                  <span className="mb-1">Invite a friend</span>
                  <div className="hidden w-full border border-[#009254] "></div>
                </button>
              </div>
            </div>
            {/* Side Menu Content */}
            <div className="w-full flex flex-col">{settingsMobile}</div>
          </div>
          {/* main container */}
          <div className="w-full flex flex-col">
            {/* Main header */}
            <div className="w-full flex items-end h-[7.25rem] border-b border-[#C4C7C6]">
              <h3 className="text-[1.5rem] text-[#2E3130] leading-[2rem] font-manropeB ml-[3.25rem] mb-3 ">Settings</h3>
            </div>
            {/* Content */}
            <div className="w-full flex flex-col pl-[3.25rem] mt-[2.625rem]">
              {/* <AccountManagement/> */}
              <DeleteAccount />
            </div>
          </div>
        </div>
      </div>

      {/* Tablet and Mobile View */}
      <div
        className={`${
          nextSettingPage && 'hidden'
        } lg:hidden w-full flex flex-col items-start sm:items-center mt-[2rem] mx-[24px] sm:mt-[1rem] mb-[15rem]`}
      >
        <div className="w-full sm:w-[454px] flex flex-col items-start sm:items-center ">
          {/* Header */}
          <div className="flex h-full items-end pb-[0.5rem] sm:ml-[4.5rem]  pr-[2rem] gap-x-[2rem]">
            <button className="flex flex-col font-manropeEB text-[0.875rem] lg:text-[1rem] leading-[1.5rem] text-[#009254]">
              <span className="mb-1">Settings</span>
              <div className="w-full border border-[#009254] "></div>
            </button>
            <button className="flex flex-col font-manropeEB text-[0.875rem] lg:text-[1rem] leading-[1.5rem] text-[#737876]">
              <span className="mb-1">Invite a friend</span>
              <div className="hidden w-full border border-[#009254] "></div>
            </button>
          </div>
          {/* Content */}
          <div className="w-full flex flex-col">{settingsMobile}</div>
        </div>
      </div>
      {/* Settings for mobile */}
      <div className={`${!nextSettingPage ? 'hidden' : 'w-full flex flex-col lg:hidden'}`}>
        {settingsNav}
        {/* Settings Content */}
        <div className="w-full flex flex-col">
          {/* <AccountManagementMobile/> */}
          <DeleteAccount />
        </div>
      </div>
    </MainLayout>
  );
}

export default Settings;
