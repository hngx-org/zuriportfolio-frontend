import SuperAdminNavbar from '@modules/super-admin/components/navigations/SuperAdminNavbar';
import ProductsListingNavbar from '@modules/super-admin/components/product-listing/ProductListingNavbar';
import ProductListingTable from '@modules/super-admin/components/product-listing/ProductListingTable';
import { useGetProd } from '../../../http/super-admin1';
import { withAdminAuth } from '../../../helpers/withAuth';
import { useState } from 'react';

const ProductListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetProd(currentPage, '');
  return (
    <div>
      <SuperAdminNavbar />
      <ProductsListingNavbar data={data} isLoading={isLoading} />
      <ProductListingTable data={data} isLoading={isLoading} />
    </div>
  );
};
export default withAdminAuth(ProductListing);
