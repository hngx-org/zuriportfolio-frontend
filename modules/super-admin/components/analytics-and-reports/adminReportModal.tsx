import Modal from '@ui/Modal';
import { useState } from 'react';

const AdminReportModal: React.FC = () => {
  const [reportModalOpen, setReportModalOpen] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  return (
    <>
      <div>
        <Modal
          closeOnOverlayClick
          closeModal={() => setReportModalOpen(true)}
          isOpen={!reportModalOpen}
          isCloseIconPresent={false}
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
              <div className="flex justify-center items-center bg-[#FFF] border-[1.919px] border-[#009254] rounded-[1.91888rem] max-w-[17.50956rem] w-full h-[5.75656rem] font-manropeL text-[#009254] text-[1.5rem] font-extrabold tracking-[0.00088rem] leading-[1.375rem] max-[768px]:text-[0.875rem] max-[768px]:w-[7.73119rem] max-[768px]:h-[2.5rem]">
                Cancel
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AdminReportModal;
