import React from 'react';

import AnalyticsAndReportingGraphs from '../analytics-components/AnalyticsAndReportingGraphs';
import AnalyticsAndReportingTopSelling from '../analytics-components/AnalyticsAndReportingTopSelling';
import AnalyticsAndReportingCards from '../analytics-components/AnalyticsAndReportingCards';

const Layouts = () => {
  return (
    <div>
     <AnalyticsAndReportingCards />
      <AnalyticsAndReportingGraphs />
     <AnalyticsAndReportingTopSelling />
    </div>
  );
};

export default Layouts;
