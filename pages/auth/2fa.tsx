"use client"
import Image from "next/image";
import MainLayout from "../../components/Layout/MainLayout";
import Code2FA from "../../modules/auth/Code2FA";
import UI2FA from "../../modules/auth/UI2FA";

function _2FA() {
  return (
    <MainLayout showDashboardSidebar={false} showTopbar={false} activePage="2fa"
     showFooter={false} className="relative overflow-hidden lg:overflow-visible">
    <section className="flex flex-col md:grid md:grid-cols-2
    max-w-[1000px] md:mt-12 container m-auto
     bg-no-repeat bg-left-top gap-4">
      <UI2FA />
      <div className="flex items-center flex-col gap-10 py-[3rem] md:pt-0 px-2">
        <Image
         src="/assets/auth/zuri_logo.svg"
          alt="logo"
          width={120}
          height={120}
          style={{ width: "130px", height: "40px" }}
          className="hidden md:block h-full self-start md:mt-2 md:mb-12"
        />
         <Code2FA />
      </div>
    </section>
    </MainLayout>
  );
}

export default _2FA;
