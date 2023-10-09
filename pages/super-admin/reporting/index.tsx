import Nav from '../../view-components/super-admin/navbar';
import ReportRedirect from '@modules/super-admin/analytics-and-reports/reportRedirect';
import AnalysisCards from '@modules/super-admin/analytics-and-reports/analysisCards';
import BusinessOveriview from '@modules/super-admin/analytics-and-reports/businessOverview';
import PerformanceData from '@modules/super-admin/analytics-and-reports/performanceData';
import PortfolioCreation from '@modules/super-admin/analytics-and-reports/portfolioCreation';
import TopSellingProducts from '@modules/super-admin/analytics-and-reports/topSellingProduct';

const AnalyticsAndReport: React.FC = () => {
  return (
    <>
      <Nav />
      <ReportRedirect />
      <AnalysisCards />
      <BusinessOveriview />
      <PerformanceData />
      <PortfolioCreation />
      <TopSellingProducts />
    </>
  );
};

export default AnalyticsAndReport;
