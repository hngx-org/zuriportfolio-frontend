import SuperAdminNavbar from '@modules/super-admin/components/navigations/SuperAdminNavbar';
import ProductsListingNavbar from '@modules/super-admin/components/product-listing/ProductListingNavbar';
import ProductListingTable from '@modules/super-admin/components/product-listing/ProductListingTable';
import { useGetProd } from '../../../http/super-admin1';
import { useGetPending } from '../../../http/super-admin1';
import { withAdminAuth } from '../../../helpers/withAuth';
import { useState } from 'react';

const ProductListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchVal, setSearchVal] = useState('');
  const { data, isLoading } = useGetProd(currentPage, searchVal);
  const { pendData, pendLoading } = useGetPending(currentPage, searchVal);
  return (
    <div>
      <SuperAdminNavbar />
      <ProductsListingNavbar data={data} isLoading={isLoading} pendData={pendData} pendLoading={pendLoading} />
      <ProductListingTable
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
        searchVal={searchVal}
        setSearchVal={setSearchVal}
      />
    </div>
  );
};
export default withAdminAuth(ProductListing);
