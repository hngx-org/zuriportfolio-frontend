import { BadgeInterface } from '@modules/marketplace/types/filter-types';
import { twMerge } from 'tailwind-merge'

const Badge = ({ children, variant = 'outline', ...props }: BadgeInterface) => {
  let classVariant: string = '';
  if (variant === 'outline') {
    classVariant = 'rounded-lg border p-1 text-sm px-2 text-gray-600 border-gray-600 hover:bg-white/90 cursor-pointer';
  }
  if (variant === 'fill') {
    classVariant = 'rounded-lg border border-transparent text-sm p-1 px-2 text-white-100 bg-brand-green-primary  hover:bg-brand-green-hover  cursor-pointer';
  }
  
  const className = twMerge(classVariant, props.className)

  return (
    <span className={className} {...props}>
      {children}
    </span>
  );
};

export default Badge;
