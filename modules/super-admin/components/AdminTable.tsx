import React from 'react';
import { ArrowDown, Sort } from 'iconsax-react';
import SearchProduct from '@modules/super-admin/components/product-listing/searchProduct';
import FilterProduct from '@modules/super-admin/components/product-listing/filterProduct';
import SuperAdminPagination from './pagination';

export default function AdminTable({
  data,
  handleSearchChange,
  currentPage,
  onPageChange,
  title,
  header,
  children,
}: {
  data: any;
  handleSearchChange: any;
  currentPage: number;
  onPageChange: (newPage: number) => void;
  title: { title: string; subtitle: string };
  header: any;
  children: any;
  isLoading: boolean;
}) {
  return (
    <div className="font-manropeL mb-8 container mx-auto border-2 border-custom-color1 mt-4">
      <div className="border-b border-white-115 border-solid py-2 px-3 flex flex-col md:flex-row items-left md:items-center justify-between">
        <div className="mb-4 md:mb-0 py-3">
          <p className="text-lg font-bold">{title.title}</p>
          <p className="text-gray-500 text-sm">{title.subtitle}</p>
        </div>

        <div className="flex justify-between items-center gap-2">
          <SearchProduct handleSearchChange={handleSearchChange} />
          <div>
            <div className="">{/* <FilterProduct handleFilter={handleFilter} /> */}</div>
            {/* <div className="md:hidden block">
              <Button>
                <Sort />
              </Button>
            </div> */}
          </div>
        </div>
      </div>
      <div className="mb-4">
        <table className="w-full md:table-fixed">
          <thead>
            <tr>
              {header.map((item: string) => (
                <th
                  key={item}
                  className=" hidden md:table-cell text-gray-500 text-sm font-normal leading-[18px] px-3 py-6 gap-3 "
                >
                  <p className="">{item}</p>
                  {/* <ArrowDown size="16" className="" /> */}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>{children}</tbody>
        </table>
        <SuperAdminPagination currentPage={currentPage} totalPages={data?.total_pages} onPageChange={onPageChange} />
      </div>
    </div>
  );
}
