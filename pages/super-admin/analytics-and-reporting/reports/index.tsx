import SuperAdminNavbar from '@modules/super-admin/components/navigations/SuperAdminNavbar';
import AnalysisCards from '@modules/super-admin/analytics-and-reporting/analysisCards';
import BusinessOveriview from '@modules/super-admin/analytics-and-reporting/businessOverview';
import PerformanceData from '@modules/super-admin/analytics-and-reporting/performanceData';
import PortfolioCreation from '@modules/super-admin/analytics-and-reporting/portfolioCreation';
import TopSellingProducts from '@modules/super-admin/analytics-and-reporting/topSellingProduct';
import Image from 'next/image';
import MultiCalender from '@modules/super-admin/analytics-and-reporting/datePicker';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Modal from '@ui/Modal';
import { DateObject } from 'react-multi-date-picker';
import axios from 'axios';

const AnalyticsAndReport: React.FC = () => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [reportModalOpen, setReportModalOpen] = useState<Boolean>(false);
  const [selectedFileFormat, setSelectedFileFormat] = useState<string>('');
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [getReport, setGetReport] = useState<Boolean>(false);
  const [reportClicked, setReportClicked] = useState<Boolean>(false);
  const [selectedDateRange, setSelectedDateRange] = useState<DateObject[]>([]);
  const [storeExport, setStoreExport] = useState<any[]>([]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
      clearTimeout(delay);
    }, 2000);
  }, []);

  const fetchAnalyticsData = () => {
    if (selectedDateRange.length === 2) {
      const startDate = selectedDateRange[0].format('YYYY-MM-DDTHH:mm:ssZ');
      const endDate = selectedDateRange[1].format('YYYY-MM-DDTHH:mm:ssZ');
      setGetReport(true);

      const apiUrl = `https://team-mirage-super-amind2.onrender.com/api/superadmin/analytics/data/?start_date=${startDate}&end_date=${endDate}`;

      axios
        .get(apiUrl)
        .then((response) => {
          console.log(response.data.data);
          setStoreExport(response.data.data);
        })
        .catch((error) => {
          setGetReport(false);
          console.error('Error fetching top-selling products:', error);
        });
      setGetReport(false);
      setReportClicked(!reportClicked);
    }
  };

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

  const handleDateRangeChange = (dateRange: DateObject[]) => {
    setSelectedDateRange(dateRange);
  };

  function saveFile(data: BlobPart, filename: string) {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  const handleExport = () => {
    console.log('handleExport called');
    if (selectedDateRange.length === 2) {
      const startDate = selectedDateRange[0].format('YYYY-MM-DD');
      const endDate = selectedDateRange[1].format('YYYY-MM-DD');
      setGetReport(true);

      const apiUrl = `https://team-mirage-super-amind2.onrender.com/api/superadmin/analytics/export_report/?file_format=${selectedFileFormat}&start_date=${startDate}&end_date=${endDate}&page=1&page_size=10`;

      axios
        .get(apiUrl, { responseType: 'arraybuffer' })
        .then((response) => {
          const filename = `Data.${selectedFileFormat}`;
          console.log(response);
          saveFile(response.data, filename);
          setGetReport(false);
        })
        .catch((error) => {
          setGetReport(false);
          console.error('Error exporting report:', error);
        });
    }
  };

  const handleFileFormatSelect = (format: string) => {
    setSelectedFileFormat(format);
  };

  return (
    <>
      {loading ? (
        <div className="mx-auto mt-[20rem] w-10 h-10 border-[0.25rem] border-b-transparent border-[#009254] border-t-[0.25rem] rounded-[50%] animate-spin"></div>
      ) : (
        <>
          <SuperAdminNavbar />
          <div className="mx-auto min-[1536px]:max-w-[1536px] max-[1300px]:mx-0 max-[1300px]:px-[1.5rem] max-[768px]:max-w-[46.3rem] max-[768px]:pl-[2.5rem] max-[768px]:px-0 max-w-[77.5rem] w-full max-[500px]:px-[1.5rem] max-[834px]:px-[2.5rem]">
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
                <MultiCalender selectedDateRange={selectedDateRange} onDateRangeChange={handleDateRangeChange} />
              </div>
              <div className="flex gap-[1.5rem] max-[834px]:pl-[1.5rem] max-[834px]:gap-[1.5rem] max-[800px]:pl-[1rem] max-[800px]:gap-[1rem] max-[768px]:gap-[1.5rem] max-[768px]:pl-0">
                <div
                  className="w-[9.6875rem] p-[0.75rem] flex justify-center items-center rounded-[0.5rem] bg-[#009254] tracking-[0.005rem] text-[1rem] leading-[1.5rem] font-manropeL text-[#FFF] cursor-pointer font-normal max-[850px]:w-[8.375rem] max-[500px]:py-[0.5rem] max-[375px]:text-[0.875rem]"
                  onClick={fetchAnalyticsData}
                >
                  {getReport ? (
                    <div className="w-6 h-6 border-t-2 border-[#fff] border-solid rounded-full animate-spin"></div>
                  ) : (
                    'Get Report'
                  )}
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
            <section className="max-[768px]:max-w-[10.5rem] w-full">
              <Modal
                closeOnOverlayClick
                closeModal={() => setReportModalOpen(false)}
                isCloseIconPresent={false}
                isOpen
                size={window.innerWidth <= 768 ? 'sm' : 'xl'}
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
                      <div
                        className={`${
                          selectedFileFormat === 'excel'
                            ? 'border border-[#33A467] text-[#009254] bg-[#E6F5EA] flex justify-center items-center max-w-[9.59425rem] w-full rounded-[0.95944rem] py-[1.2rem] font-manropeL shadow-[0px_1.91885px_3.83771px_0px_rgba(16,24,40,0.05)] text-[1.9188rem] hover:bg-[#E6F5EA] text-center leading-[2.87825rem] tracking-[0.00288rem] max-[768px]:text-[0.84725rem] max-[768px]:w-[4.23625rem] max-[768px]:py-[0.74rem] max-[768px]:leading-[1.278rem] cursor-pointer'
                            : 'flex justify-center items-center max-w-[9.59425rem] w-full rounded-[0.95944rem] text-[#8D9290] py-[1.2rem] font-manropeL hover:text-[#009254] focus:bg-[#E6F5EA] hover:border hover:border-[#33A467] border-gray-300 shadow-[0px_1.91885px_3.83771px_0px_rgba(16,24,40,0.05)] text-[1.9188rem] hover:bg-[#E6F5EA] text-center leading-[2.87825rem] tracking-[0.00288rem] max-[768px]:text-[0.84725rem] max-[768px]:w-[4.23625rem] max-[768px]:py-[0.74rem] max-[768px]:leading-[1.278rem] focus:text-[#009254] focus:border focus:border-[#33A467] cursor-pointer'
                        } cursor-pointer`}
                        onClick={() => handleFileFormatSelect('excel')}
                      >
                        Excel
                      </div>
                      <div
                        className={`${
                          selectedFileFormat === 'pdf'
                            ? 'border border-[#33A467] text-[#009254] bg-[#E6F5EA] flex justify-center items-center max-w-[9.59425rem] w-full rounded-[0.95944rem] py-[1.2rem] font-manropeL shadow-[0px_1.91885px_3.83771px_0px_rgba(16,24,40,0.05)] text-[1.9188rem] hover:bg-[#E6F5EA] text-center leading-[2.87825rem] tracking-[0.00288rem] max-[768px]:text-[0.84725rem] max-[768px]:w-[4.23625rem] max-[768px]:py-[0.74rem] max-[768px]:leading-[1.278rem] cursor-pointer'
                            : 'flex justify-center items-center max-w-[9.59425rem] w-full rounded-[0.95944rem] text-[#8D9290] py-[1.2rem] font-manropeL hover:text-[#009254] focus:bg-[#E6F5EA] hover:border hover:border-[#33A467] border-gray-300 shadow-[0px_1.91885px_3.83771px_0px_rgba(16,24,40,0.05)] text-[1.9188rem] hover:bg-[#E6F5EA] text-center leading-[2.87825rem] tracking-[0.00288rem] max-[768px]:text-[0.84725rem] max-[768px]:w-[4.23625rem] max-[768px]:py-[0.74rem] max-[768px]:leading-[1.278rem] focus:text-[#009254] focus:border focus:border-[#33A467] cursor-pointer'
                        } cursor-pointer`}
                        onClick={() => handleFileFormatSelect('pdf')}
                      >
                        PDF
                      </div>
                      <div
                        className={`${
                          selectedFileFormat === 'csv'
                            ? 'border border-[#33A467] text-[#009254] bg-[#E6F5EA] flex justify-center items-center max-w-[9.59425rem] w-full rounded-[0.95944rem] py-[1.2rem] font-manropeL shadow-[0px_1.91885px_3.83771px_0px_rgba(16,24,40,0.05)] text-[1.9188rem] hover:bg-[#E6F5EA] text-center leading-[2.87825rem] tracking-[0.00288rem] max-[768px]:text-[0.84725rem] max-[768px]:w-[4.23625rem] max-[768px]:py-[0.74rem] max-[768px]:leading-[1.278rem] cursor-pointer'
                            : 'flex justify-center items-center max-w-[9.59425rem] w-full rounded-[0.95944rem] text-[#8D9290] py-[1.2rem] font-manropeL hover:text-[#009254] focus:bg-[#E6F5EA] hover:border hover:border-[#33A467] border-gray-300 shadow-[0px_1.91885px_3.83771px_0px_rgba(16,24,40,0.05)] text-[1.9188rem] hover:bg-[#E6F5EA] text-center leading-[2.87825rem] tracking-[0.00288rem] max-[768px]:text-[0.84725rem] max-[768px]:w-[4.23625rem] max-[768px]:py-[0.74rem] max-[768px]:leading-[1.278rem] focus:text-[#009254] focus:border focus:border-[#33A467] cursor-pointer'
                        } cursor-pointer`}
                        onClick={() => handleFileFormatSelect('csv')}
                      >
                        CSV
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-evenly">
                    <div
                      className="flex justify-center items-center bg-[#009254] rounded-[1.91888rem] max-w-[17.50956rem] w-full h-[5.75656rem] font-manropeL text-[#FFF] text-[1.5rem] font-extrabold tracking-[0.00088rem] leading-[1.375rem] max-[768px]:text-[0.875rem] max-[768px]:w-[7.73119rem] max-[768px]:h-[2.5rem]"
                      onClick={handleExport}
                    >
                      {getReport ? (
                        <div className="w-6 h-6 border-t-2 border-[#fff] border-solid rounded-full animate-spin"></div>
                      ) : (
                        'Confirm'
                      )}
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
            </section>
          )}
          <AnalysisCards dateRange={selectedDateRange} reportClicked={reportClicked} />
          {/* <BusinessOveriview dateRange={selectedDateRange} reportClicked={reportClicked} /> */}
          <PortfolioCreation dateRange={selectedDateRange} reportClicked={reportClicked} />
          <PerformanceData dateRange={selectedDateRange} reportClicked={reportClicked} />
          <TopSellingProducts reportClicked={reportClicked} dateRange={selectedDateRange} />
        </>
      )}
    </>
  );
};

export default AnalyticsAndReport;
