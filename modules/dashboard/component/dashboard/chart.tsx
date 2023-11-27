import Loader from '@ui/Loader';
import React from 'react';
import { BarChart, Bar, XAxis, CartesianGrid, LineChart, Tooltip, Line, ResponsiveContainer } from 'recharts';
import { ChartProps } from '../../../../@types/index';
import { chartMargins, getSalesTooltipMessage, getTrafficTooltipMessage } from '../../../../helpers/dashboard';

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
              <XAxis dataKey="timeframe" />
              <Tooltip cursor={false} content={<TrafficTooltip />} />
              <Bar dataKey="traffic" fill="#CBEAD4" className="cursor-pointer" />
            </BarChart>
          ) : (
            <LineChart width={800} height={250} data={data} margin={chartMargins}>
              <CartesianGrid vertical={false} strokeDasharray="1 0" />
              <XAxis dataKey="frame" />
              <Tooltip cursor={false} content={<SalesTooltip />} />
              <Line
                dot={true}
                type="monotone"
                dataKey="sales"
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

export default Chart;
