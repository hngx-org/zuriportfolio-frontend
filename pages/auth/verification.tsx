import React from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import VerificationLinkSent from '../../modules/auth/component/verificationLinkSent';
import Image from 'next/image';
function Verification() {
  return (
    <MainLayout showDashboardSidebar={false} showTopbar={false} activePage="verification">
      <div className=" h-[110dvh] w-full relative overflow-hidden flex items-center justify-center">
        <Image
          className=" absolute top-0 right-0 hidden md:block md:w-[200px] md:h-[200px]"
          src="/assets/images/blob-os.svg"
          alt=""
        />

        <div>
          <VerificationLinkSent />
        </div>

        <Image
          className="absolute bottom-0 left-0 w-[170px] h-[170px] md:w-[200px] md:h-[200px]"
          src="/assets/images/unlock-os.svg"
          alt=""
        />
      </div>
    </MainLayout>
  );
}

export default Verification;
