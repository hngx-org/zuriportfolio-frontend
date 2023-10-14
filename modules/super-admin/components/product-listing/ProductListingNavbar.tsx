import Link from 'next/link';

export const LoadingText = () => {
  return <div className="animate-pulse h-6 w-20 bg-slate-100"></div>;
};

const ProductsListingNavbar = ({ data, isLoading }: { data: any; isLoading: boolean }) => {
  return (
    <section className="container my-5 grid md:grid-cols-3 sm:grid-cols-1 gap-4">
      <div className=" p-4 border-solid rounded-md border-white-115 border-2">
        <div className="flex items-center justify-between text-gray-500">
          <p className="text-lg">Total Products</p>
        </div>
        <div className="flex items-center justify-between">
          {isLoading ? <LoadingText /> : <h2 className="text-4xl font-bold">{data?.total_products}</h2>}
        </div>
      </div>
      <div className=" p-4 border-solid rounded-md border-white-115 border-2">
        <div className="flex items-center justify-between text-gray-500">
          <p className="text-lg">Sanctioned Products </p>
        </div>
        <div className="flex items-center justify-between">
          {isLoading ? <LoadingText /> : <h2 className="text-4xl font-bold ">{data?.total_sanctioned_products}</h2>}
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
          {isLoading ? <LoadingText /> : <h2 className="text-4xl font-bold ">{data?.total_deleted_products}</h2>}
          <button className="px-3 py-1 bg-brand-green-primary hover:bg-brand-green-hover text-white-100 rounded-2xl">
            <Link href="/super-admin/product-listing/deleted-products"> View</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsListingNavbar;
