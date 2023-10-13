import { metricsCardData, metricsChartData } from '../../../../db/dashboard';
import { Activity } from './activity';
import { MetricCard } from './card';
import { MetricChart } from './charts';

const ShopOwnerDashboard = () => {
  return (
    <div className="grid grid-cols-1 pb-[50px] gap-x-6 space-y-6 lg:grid-cols-4 lg:space-y-0 pt-5 lg:pt-0 font-manropeL">
      {/* Main */}
      <div className="col-span-1 md:col-span-3 space-y-[24px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-[24px] lg:gap-y-0 lg:gap-x-[24px]">
          {metricsCardData.map((data, index) => (
            <MetricCard
              key={index}
              title={data.title}
              percentage={data.percentage}
              isCurrency={data.isCurrency}
              value={data.value}
            />
          ))}
        </div>
        {metricsChartData.map((data, index) => (
          <MetricChart key={index} title={data.title} src={data.src} isBarChart={data.isBarChart} />
        ))}
      </div>

      {/* Activity SideBar */}
      <Activity isPage={false} />
    </div>
  );
};

export default ShopOwnerDashboard;
