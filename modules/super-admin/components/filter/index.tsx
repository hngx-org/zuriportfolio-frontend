import { SelectInput } from '@ui/Input';
import { Sort } from 'iconsax-react';
import { superAdminFilter } from '../../../../@types';

const SuperAdminFilter = ({ options, tableData, setTableDate }: superAdminFilter) => {
  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
  };

  console.log(options);

  return (
    <div>
      <SelectInput
        leftIcon={<Sort />}
        inputSize={'sm'}
        options={options}
        disabled={false}
        intent="default"
        onChange={(e) => console.log(e.target.value)}
        className="md:w-[150px] w-[100px]"
      />
    </div>
  );
};

export default SuperAdminFilter;
