import { Fragment, useState } from 'react';
import Badge from './Badge';
import { GenericProp, VariantType } from '@modules/marketplace/types/filter-types';


const BadgeItems = <T,>({ data }: GenericProp<T>) => {
  return (
    <Fragment>
      {data.map((item, i) => (
        <BadgeItem key={i} value={item as unknown} />
      ))}
    </Fragment>
  );
};

export default BadgeItems

const BadgeItem = ({ value }: { value: unknown }) => {
  const [selected, setSelected] = useState<VariantType>('outline');

  function toggleSelection() {
    if (selected === 'outline') {
      setSelected('fill');
    } else {
      setSelected('outline');
    }
  }

  return (
    <Badge variant={selected} onClick={() => toggleSelection()}>
      {value as string}
    </Badge>
  );
};
