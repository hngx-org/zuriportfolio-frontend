import { activityData, metricsCardData, metricsChartData } from '../../../../db/dashboard';
import { MetricCard } from './card';
import { MetricChart } from './charts';
import { ActivityCard } from './sidebar';

const ShopOwnerDashboard = () => {
  return (
    <div className="grid grid-cols-1 pb-[209px] gap-x-6 space-y-6 md:pb-[418px] lg:grid-cols-4 lg:space-y-0 pt-5 lg:pt-0">
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
      <div className="shadow rounded-md px-5 py-3 space-y-4">
        <p className="flex items-center justify-between font-medium">
          <span className="text-xl md:text-2xl">Activity</span>
          <span className="text-sm text-[#737876] md:text-base">View all</span>
        </p>
        {activityData.map((data, index) => (
          <ActivityCard key={index} name={data.name} item={data.item} />
        ))}
      </div>
    </div>
  );
};

export default ShopOwnerDashboard;
