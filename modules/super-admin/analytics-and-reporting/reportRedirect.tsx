import Image from 'next/image';
import MultiCalender from './datePicker';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Modal from '@ui/Modal';

const ReportRedirect: React.FC = () => {
  const [reportModalOpen, setReportModalOpen] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const openModal = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setReportModalOpen(true);
    }, 2000);
  };

  const router = useRouter();

  const redirectToAnotherPage = () => {
    router.push('/super-admin/analytics-and-reporting');
  };

  return (
    <>
      <div className="mx-auto max-[1300px]:mx-0 max-[1300px]:px-[1.5rem] max-[768px]:max-w-[46.3rem] max-[768px]:pl-[2.5rem] max-[768px]:px-0 max-w-[77.5rem] w-full max-[500px]:px-[1.5rem] max-[834px]:px-[2.5rem]">
        <div className="flex gap-[1rem] py-[0.75rem] mt-[1.13rem] max-[834px]:mt-[1rem] max-[500px]:mt-[1.5rem]">
          <Image
            onClick={redirectToAnotherPage}
            src="/assets/images/reports/arrow-back.svg"
            width={20}
            height={20}
            alt="Go back"
            className="cursor-pointer"
          />
          <p className="text-[1.125rem] text-[#101828] font-medium leading-[1.75rem] font-manropeL">Report</p>
        </div>
        <div className="flex gap-[1.5rem] items-center max-[768px]:flex-col max-[768px]:items-stretch mt-[0.5rem] max-[834px]:gap-0 max-[768px]:gap-[1.5rem]">
          <p className="text-[1rem] leading-[1.5rem] font-manropeL font-normal tracking-[0.005rem] text-[#000] max-[850px]:text-[0.875rem] max-[834px]:pr-[0.2rem]">
            Select Time Frame
          </p>
          <div>
            <MultiCalender />
          </div>
          <div className="flex gap-[1.5rem] max-[834px]:pl-[1.5rem] max-[834px]:gap-[1.5rem] max-[800px]:pl-[1rem] max-[800px]:gap-[1rem] max-[768px]:gap-[1.5rem] max-[768px]:pl-0">
            <div className="w-[9.6875rem] p-[0.75rem] flex justify-center items-center rounded-[0.5rem] bg-[#009254] tracking-[0.005rem] text-[1rem] leading-[1.5rem] font-manropeL text-[#FFF] font-normal max-[850px]:w-[8.375rem] max-[500px]:py-[0.5rem] max-[375px]:text-[0.875rem]">
              Get Report
            </div>
            <div
              onClick={() => openModal()}
              className="w-[9.6875rem] p-[0.75rem] flex justify-center items-center rounded-[0.5rem] bg-[rgba(210,255,231,0.15)] border border-[#009254] tracking-[0.005rem] text-[1rem] leading-[1.5rem] font-manropeL text-[#386A20] font-normal max-[850px]:w-[8.375rem] max-[500px]:py-[0.5rem] max-[500px]:p-[0.5rem] max-[375px]:text-[0.875rem] cursor-pointer"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-t-2 border-[#386A20] border-solid rounded-full animate-spin"></div>
              ) : (
                'Export Report'
              )}
            </div>
          </div>
        </div>
      </div>
      {reportModalOpen && (
        <div>
          <Modal
            closeOnOverlayClick
            closeModal={() => setReportModalOpen(false)}
            isCloseIconPresent={false}
            isOpen
            size="xl"
          >
            <div className="flex justify-center flex-col gap-[2.88rem] m-[1.88rem] max-[768px]:m-[0.27rem] max-[768px]:gap-[1.27rem]">
              <div className="border-b-[#A8ACAB] border-b-[0.11994rem] pb-[1.2rem] max-w-[44.49rem] w-full max-[768px]:pb-[0.53rem]">
                <p className="text-[#000] font-manropeL font-semibold text-[1.9188rem] text-center leading-[2.87825rem] tracking-[0.00288rem] max-[768px]:text-[0.85rem] max-[768px]:leading-[1.27088rem]">
                  Export Report
                </p>
              </div>
              <div className="flex flex-col gap-[1.02rem] max-[768px]:gap-[0.85rem]">
                <p className="text-center text-[#000] font-normal leading-[2.87825rem] font-manropeL text-[1.9188rem] tracking-[0.00963rem] max-[768px]:text-[0.84725rem] max-[768px]:leading-[1.27088rem]">
                  Choose Format
                </p>
                <div className="flex justify-evenly">
                  <div className="flex justify-center items-center max-w-[9.59425rem] w-full rounded-[0.95944rem] text-[#8D9290] py-[1.2rem] font-manropeL border-gray-300 shadow-[0px_1.91885px_3.83771px_0px_rgba(16,24,40,0.05)] text-[1.9188rem] text-center leading-[2.87825rem] tracking-[0.00288rem] max-[768px]:text-[0.84725rem] max-[768px]:w-[4.23625rem] max-[768px]:py-[0.74rem] max-[768px]:leading-[1.278rem]">
                    Excel
                  </div>
                  <div className="flex justify-center items-center max-w-[9.59425rem] w-full font-manropeL rounded-[0.95944rem] py-[1.2rem] border-[#33A467] bg-[#E6F5EA] shadow-[0px_1.91885px_3.83771px_0px_rgba(16,24,40,0.05)] text-[1.9188rem] text-center leading-[2.87825rem] tracking-[0.00288rem] text-[#009254] max-[768px]:text-[0.84725rem] max-[768px]:w-[4.23625rem] max-[768px]:py-[0.74rem] max-[768px]:leading-[1.278rem]">
                    PDF
                  </div>
                  <div className="flex justify-center items-center max-w-[9.59425rem] w-full font-manropeL rounded-[0.95944rem] py-[1.2rem] text-[#8D9290] border-gray-300 shadow-[0px_1.91885px_3.83771px_0px_rgba(16,24,40,0.05)] text-[1.9188rem] text-center leading-[2.87825rem] tracking-[0.00288rem] max-[768px]:text-[0.84725rem] max-[768px]:w-[4.23625rem] max-[768px]:py-[0.74rem] max-[768px]:leading-[1.278rem]">
                    CSV
                  </div>
                </div>
              </div>
              <div className="flex justify-evenly">
                <div className="flex justify-center items-center bg-[#009254] rounded-[1.91888rem] max-w-[17.50956rem] w-full h-[5.75656rem] font-manropeL text-[#FFF] text-[1.5rem] font-extrabold tracking-[0.00088rem] leading-[1.375rem] max-[768px]:text-[0.875rem] max-[768px]:w-[7.73119rem] max-[768px]:h-[2.5rem]">
                  Confirm
                </div>
                <div
                  className="flex justify-center items-center bg-[#F4FBF6] border-[1.919px] border-[#009254] rounded-[1.91888rem] max-w-[17.50956rem] w-full h-[5.75656rem] font-manropeL text-[#009254] text-[1.5rem] font-extrabold tracking-[0.00088rem] leading-[1.375rem] max-[768px]:text-[0.875rem] max-[768px]:w-[7.73119rem] max-[768px]:h-[2.5rem] cursor-pointer"
                  onClick={() => setReportModalOpen(false)}
                >
                  Cancel
                </div>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default ReportRedirect;
