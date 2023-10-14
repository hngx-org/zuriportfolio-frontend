import SuperAdminNavbar from '@modules/super-admin/components/navigations/SuperAdminNavbar';
import ProductsListingNavbar from '@modules/super-admin/components/product-listing/ProductListingNavbar';
import ProductListingTable from '@modules/super-admin/components/product-listing/ProductListingTable';
import { useGetProd } from '../../../http';

const ProductListing = () => {
  const { data, isLoading } = useGetProd();
  return (
    <div>
      <SuperAdminNavbar />
      <ProductsListingNavbar data={data} isLoading={isLoading} />
      <ProductListingTable data={data} isLoading={isLoading} />
    </div>
  );
};
export default ProductListing;
