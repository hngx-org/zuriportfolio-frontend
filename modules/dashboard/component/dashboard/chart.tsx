import Loader from '@ui/Loader';
import React from 'react';
import { BarChart, Bar, XAxis, CartesianGrid, LineChart, Line, ResponsiveContainer } from 'recharts';
import { ChartProps } from '../../../../@types/index';

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
            <BarChart width={800} height={250} data={data} margin={chartMargins}>
              <CartesianGrid vertical={false} strokeDasharray="1 0" />
              <XAxis dataKey="timeline" />
              <Bar barSize={30} dataKey="income" fill="#CBEAD4" />
            </BarChart>
          ) : (
            <LineChart width={800} height={250} data={data} margin={chartMargins}>
              <CartesianGrid vertical={false} strokeDasharray="1 0" />
              <XAxis dataKey="timeline" />
              <Line dot={false} type="monotone" dataKey="income1" stroke="#F1D5BA" strokeWidth={2.5} />
              <Line dot={false} type="monotone" dataKey="income2" stroke="#E1BD90" strokeWidth={2.5} />
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

export default Chart;
