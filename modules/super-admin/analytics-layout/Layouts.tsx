import React from 'react'
import AnalyticsAndReportingCards from '../analytics-components/AnalyticsAndReportingCards'
import AnalyticsAndReportingGraphs from '../analytics-components/AnalyticsAndReportingGraphs'
import AnalyticsAndReportingTopSelling from '../analytics-components/AnalyticsAndReportingTopSelling'


const Layouts= () => {
  return (
    <div>
      <AnalyticsAndReportingCards />
      <AnalyticsAndReportingGraphs />
      <AnalyticsAndReportingTopSelling />
    </div>
  )
}

export default Layouts