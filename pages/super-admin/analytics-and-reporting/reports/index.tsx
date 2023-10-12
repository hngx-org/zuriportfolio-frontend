import SuperAdminNavbar from '@modules/super-admin/components/navigations/SuperAdminNavbar';
import ReportRedirect from '@modules/super-admin/analytics-and-reporting/reportRedirect';
import AnalysisCards from '@modules/super-admin/analytics-and-reporting/analysisCards';
import BusinessOveriview from '@modules/super-admin/analytics-and-reporting/businessOverview';
import PerformanceData from '@modules/super-admin/analytics-and-reporting/performanceData';
import PortfolioCreation from '@modules/super-admin/analytics-and-reporting/portfolioCreation';
import TopSellingProducts from '@modules/super-admin/analytics-and-reporting/topSellingProduct';
import { useEffect, useState } from 'react';

const AnalyticsAndReport: React.FC = () => {
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
      clearTimeout(delay);
    }, 2000);
  }, []);
  return (
    <>
      {loading ? (
        <div className="mx-auto mt-[20rem] w-10 h-10 border-[0.25rem] border-b-transparent border-[#009254] border-t-[0.25rem] rounded-[50%] animate-spin"></div>
      ) : (
        <>
          <SuperAdminNavbar />
          <ReportRedirect />
          <AnalysisCards />
          <BusinessOveriview />
          <PortfolioCreation />
          <PerformanceData />
          <TopSellingProducts />
        </>
      )}
    </>
  );
};

export default AnalyticsAndReport;
