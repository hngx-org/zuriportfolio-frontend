import { useState } from 'react';
import BadgeItems from './badge-item';
import { CaretRight } from './icons';
import { SectionProps } from '@modules/marketplace/types/filter-types';

const FilterSection = ({ data, children, tag, sectionTitle, ...props }: SectionProps) => {
  const [maxItem, setMaxItem] = useState(9);
  const [showMore, setShowMore] = useState(true);

  function handleItemLimit(maxItem: number, more: boolean) {
    setMaxItem(maxItem);
    setShowMore(more);
  }

  return (
    <article className="mt-5" {...props}>
      <h4 className="text-base text-gray-600 my-4">{sectionTitle}</h4>
      <div className="w-full inline-flex gap-4 flex-wrap">
        <BadgeItems data={data.slice(0, maxItem)} tag={tag} />
        {children}
        {showMore && Array.isArray(data) && data.length > 9 ? (
          <button
            className="text-brand-green-primary ml-auto flex items-center text-sm"
            onClick={() => handleItemLimit(data.length, !showMore)}
          >
            <span>See more</span> <CaretRight className="w-4 h-4" />
          </button>
        ) : null}
      </div>
    </article>
  );
};

export default FilterSection;
