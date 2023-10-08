import { ActivityCardProps } from '../../../../@types';

export const ActivityCard = ({ name, item }: ActivityCardProps) => {
  return (
    <div className="text-sm md:text-base">
      <p className="font-semibold">{name}</p>
      <p className="text-brand-white-650 font-normal">
        Purchased <span className="text-orange-110 font-medium">{item}</span>
      </p>
    </div>
  );
};
