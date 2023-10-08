import ProductsListingNavbar from '@modules/super-admin/components/product-listing-navbar/ProductListingNavbar';
import ProductListingTable from '@modules/super-admin/components/product-listing-table/ProductListingTable';
import Pagination from '../../view-components/super-admin/pagination';
import SuperAdminNavbar from '@modules/super-admin/components/navigations/SuperAdminNavbar';

const ProductListing = () => {
  return (
    <div>
      <SuperAdminNavbar />
      <ProductsListingNavbar />
      <ProductListingTable />
      <Pagination />
    </div>
  );
};
export default ProductListing;
