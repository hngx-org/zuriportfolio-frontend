import Link from 'next/link';
import { formatNumber } from './product-details';
import { useGetPending } from '../../../../http/super-admin1';
// import { usePendingProducts } from '../../../../http/pendingProduct';

export const LoadingText = () => {
  return <div className="animate-pulse h-6 w-20 bg-slate-100"></div>;
};

const ProductsListingNavbar = ({
  data,
  isLoading,
  pendData,
  pendLoading,
}: {
  data: any;
  isLoading: boolean;
  pendData: any;
  pendLoading: boolean;
}) => {
  // const { pendingData } = usePendingProducts();
  //  const {pendingData , isLoadingPending } : { pendingData: any;  isLoadingPending: boolean } = useGetPending()
  console.log(pendData);
  return (
    <section className="container my-5 grid md:grid-cols-4 sm:grid-cols-1 gap-4">
      <div className=" p-4 border-solid rounded-md border-white-115 border-2">
        <div className="flex items-center justify-between text-gray-500">
          <p className="text-lg">Total Products</p>
        </div>
        <div className="flex items-center justify-between">
          {isLoading ? <LoadingText /> : <h2 className="text-4xl font-bold">{formatNumber(data?.total_products)}</h2>}
        </div>
      </div>

      {/* pending product */}
      <div className=" p-4 border-solid rounded-md border-white-115 border-2">
        <div className="flex items-center justify-between text-gray-500">
          <p className="text-lg">Pending Products </p>
        </div>
        <div className="flex items-center justify-between">
          {pendLoading ? (
            <LoadingText />
          ) : (
            <h2 className="text-4xl font-bold ">{formatNumber(pendData?.total_pending_products)}</h2>
          )}
          <button className="px-3 py-1 bg-brand-green-primary hover:bg-brand-green-hover text-white-100 rounded-2xl">
            <Link href="/super-admin/product-listing/pending-products"> View</Link>
          </button>
          {/* pending product */}
        </div>
      </div>
      <div className=" p-4 border-solid rounded-md border-white-115 border-2">
        <div className="flex items-center justify-between text-gray-500">
          <p className="text-lg">Sanctioned Products </p>
        </div>
        <div className="flex items-center justify-between">
          {isLoading ? (
            <LoadingText />
          ) : (
            <h2 className="text-4xl font-bold ">{formatNumber(data?.total_sanctioned_products)}</h2>
          )}
          <button className="px-3 py-1 bg-brand-green-primary hover:bg-brand-green-hover text-white-100 rounded-2xl">
            <Link href="/super-admin/product-listing/sanctioned-products"> View</Link>
          </button>
        </div>
      </div>
      <div className=" p-4 border-solid rounded-md border-white-115 border-2">
        <div className="flex items-center justify-between text-gray-500">
          <p className="text-lg">Deleted Products</p>
        </div>
        <div className="flex items-center justify-between">
          {isLoading ? (
            <LoadingText />
          ) : (
            <h2 className="text-4xl font-bold ">{formatNumber(data?.total_deleted_products)}</h2>
          )}
          <button className="px-3 py-1 bg-brand-green-primary hover:bg-brand-green-hover text-white-100 rounded-2xl">
            <Link href="/super-admin/product-listing/deleted-products">View</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsListingNavbar;
