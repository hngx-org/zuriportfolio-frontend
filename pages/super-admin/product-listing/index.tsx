import SuperAdminNavbar from '@modules/super-admin/components/navigations/SuperAdminNavbar';
import ProductsListingNavbar from '@modules/super-admin/components/product-listing/ProductListingNavbar';
import ProductListingTable from '@modules/super-admin/components/product-listing/ProductListingTable';

const ProductListing = () => {
  return (
    <div>
      <SuperAdminNavbar />
      <ProductsListingNavbar />
      <ProductListingTable />
    </div>
  );
};
export default ProductListing;
