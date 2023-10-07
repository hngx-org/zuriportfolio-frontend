import Image from 'next/image';
import { MetricCardProps } from '../../../../@types';

export const MetricCard = ({ title, percentage, isCurrency, value }: MetricCardProps) => {
  return (
    <div className="shadow rounded-md px-5 py-3 space-y-3">
      <p className="flex items-center justify-between">
        <span className="text-xs md:text-sm text-brand-white-650">{title}</span>
        <button className="mr-1">
          <Image src="/assets/images/more.png" width={16} height={16} alt={title} />
        </button>
      </p>
      <p className="flex items-center justify-between">
        <span className="text-2xl font-bold md:text-3xl">{`${isCurrency ? '$' : ''}${value}`}</span>
        <span
          className={`${
            percentage > 0 ? 'bg-brand-green-30 text-brand-green-primary' : 'bg-[#FFDCDC] text-brand-red-primary'
          } flex items-center rounded-full px-2 py-1 font-medium gap-1`}
        >
          <Image
            src={`/assets/images/arrow-${percentage > 0 ? 'up' : 'down'}.png`}
            width={16}
            height={16}
            alt={title}
          />
          <span className="flex items-center text-xs md:text-sm">{percentage}%</span>
        </span>
      </p>
    </div>
  );
};
