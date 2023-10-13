import Loader from '@ui/Loader';
import React from 'react';
import { BarChart, Bar, XAxis, CartesianGrid, LineChart, Line, ResponsiveContainer } from 'recharts';
import { ChartProps } from '../../../../@types/index';

const Chart: React.FC<ChartProps> = ({ isBarChart, data, isFetching, isFetched }) => {
  return (
    <ResponsiveContainer height={250}>
      <>
        {isFetching && <Loader />}
        {!isFetching &&
          isFetched &&
          (isBarChart ? <BarChartComponent data={data} /> : <LineChartComponent data={data} />)}
      </>
    </ResponsiveContainer>
  );
};

const BarChartComponent = ({ data }: any) => (
  <BarChart width={800} height={250} data={data} margin={chartMargins}>
    <CartesianGrid vertical={false} strokeDasharray="1 0" />
    <XAxis dataKey="timeline" />
    <Bar barSize={30} dataKey="income" fill="#CBEAD4" />
  </BarChart>
);

const LineChartComponent = ({ data }: any) => (
  <LineChart width={800} height={250} data={data} margin={chartMargins}>
    <CartesianGrid vertical={false} strokeDasharray="1 0" />
    <XAxis dataKey="timeline" />
    <Line dot={false} type="monotone" dataKey="income1" stroke="#F1D5BA" strokeWidth={2.5} />
    <Line dot={false} type="monotone" dataKey="income2" stroke="#E1BD90" strokeWidth={2.5} />
  </LineChart>
);

const chartMargins = {
  top: 5,
  right: 20,
  left: 20,
  bottom: 5,
};

export default Chart;
