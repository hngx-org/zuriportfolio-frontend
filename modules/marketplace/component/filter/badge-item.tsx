import { Fragment, useState } from 'react';
import Badge from './Badge';
import { GenericProp, VariantType } from '@modules/marketplace/types/filter-types';
import useSearchFilter from './hooks/useSearchFilter';

const BadgeItems = <T,>({ data, tag }: GenericProp<T>) => {
  return (
    <Fragment>
      {data.map((item, i) => (
        <BadgeItem key={i} value={item as unknown} tag={tag} />
      ))}
    </Fragment>
  );
};

export default BadgeItems;

const BadgeItem = ({ value, tag }: { value: unknown; tag: string }) => {
  const [selected, setSelected] = useState<VariantType>('outline');
  const { handleSelection, selection } = useSearchFilter();

  function toggleSelection(value: string) {
    if (selected === 'outline') {
      setSelected('fill');
      handleSelection(value, tag);
      console.log(selection);
    } else {
      setSelected('outline');
    }
  }

  return (
    <Badge variant={selected} onClick={() => toggleSelection(value as string)}>
      {value as string}
    </Badge>
  );
};
