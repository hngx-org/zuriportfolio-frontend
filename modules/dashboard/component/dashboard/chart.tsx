import Loader from '@ui/Loader';
import React from 'react';
import { BarChart, Bar, XAxis, CartesianGrid, LineChart, Tooltip, Line, ResponsiveContainer } from 'recharts';
import { ChartProps } from '../../../../@types/index';
import { sevenDays, twelveMonths, twentyFourHours, thirtyDays } from '../../../../db/dashboard';

const Chart: React.FC<ChartProps> = ({ isBarChart, data, isFetching, isFetched }) => {
  return (
    <>
      {isFetching && (
        <div className="h-[250px]">
          <Loader />
        </div>
      )}
      {!isFetching && isFetched && (
        <ResponsiveContainer height={250}>
          {isBarChart ? (
            <BarChart width={800} height={250} data={data} margin={chartMargins} barSize={30}>
              <CartesianGrid vertical={false} strokeDasharray="1 0" />
              <XAxis dataKey="timeline" />
              <Tooltip cursor={false} content={<TrafficTooltip />} />
              <Bar dataKey="income" fill="#CBEAD4" className="cursor-pointer" background={{ fill: '#fff' }} />
            </BarChart>
          ) : (
            <LineChart width={800} height={250} data={data} margin={chartMargins}>
              <CartesianGrid vertical={false} strokeDasharray="1 0" />
              <XAxis dataKey="timeline" />
              <Tooltip cursor={false} content={<SalesTooltip />} />
              <Line
                dot={true}
                type="monotone"
                dataKey="income"
                stroke="#E1BD90"
                strokeWidth={2.5}
                className="cursor-pointer"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      )}
    </>
  );
};

const chartMargins = {
  top: 5,
  right: 20,
  left: 20,
  bottom: 5,
};

const SalesTooltip = ({ active, payload, label }: any) => {
  const tooltipMessage = getSalesTooltipMessage(label, payload);
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-100 opacity-100 shadow rounded-md p-3 text-sm md:text-base">
        <p className="">{tooltipMessage}</p>
      </div>
    );
  }

  return null;
};

const TrafficTooltip = ({ active, payload, label }: any) => {
  const tooltipMessage = getTrafficTooltipMessage(label, payload);
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-100 opacity-100 shadow rounded-md p-3 text-sm md:text-base">
        <p className="">{tooltipMessage}</p>
      </div>
    );
  }

  return null;
};

function getSalesTooltipMessage(label: any, payload: any[]) {
  let message = `Your total revenue `;
  if (label && payload && payload[0]) {
    if (twelveMonths.includes(label)) {
      message += `in ${label} was $${payload[0]?.value}`;
    } else if (sevenDays.includes(label)) {
      message += `on ${label} was $${payload[0]?.value}`;
    } else if (thirtyDays.includes(label)) {
      message += `on the ${label} was $${payload[0]?.value}`;
    } else if (twentyFourHours.includes(label)) {
      message += `at ${label} was $${payload[0]?.value}`;
    } else {
      message += `for ${label} was $${payload[0]?.value}`;
    }
  }

  return message;
}

function getTrafficTooltipMessage(label: any, payload: any[]) {
  let message = `Your store had `;
  if (label && payload && payload[0]) {
    if (twelveMonths.includes(label)) {
      message += `${payload[0]?.value} views in ${label}`;
    } else if (sevenDays.includes(label)) {
      message += `${payload[0]?.value} views on ${label}`;
    } else if (thirtyDays.includes(label)) {
      message += `${payload[0]?.value} views on the ${label}`;
    } else if (twentyFourHours.includes(label)) {
      message += `${payload[0]?.value} views at ${label}`;
    } else {
      message += `${payload[0]?.value} views`;
    }
  }

  return message;
}

export default Chart;
