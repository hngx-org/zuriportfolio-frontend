import { ArrowUp } from 'iconsax-react';
import Link from 'next/link';

const ProductsListingNavbar = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* product listing Nav bar starts */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <div className="mx-auto">
            <div className="w-96 border-2 border-custom-color1 py-5 px-5 h-32 rounded-lg mb-4 md:mb-0">
              <p className="text-xl font-medium">Total Products</p>
              <div className="flex justify-between items-center mt-1">
                <h3 className="text-3xl font-bold">259</h3>
                <div className="flex items-center bg-green-50 rounded-2xl p-2 h-5">
                  <ArrowUp size={18} className="text-green-300" />
                  <p className="text-green-300 text-sm">10%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mx-auto">
            <div className="w-96 border-2 border-custom-color1 py-5 px-5 h-32 rounded-lg mb-4 md:mb-0">
              <p className="text-xl font-medium">Sanctioned Products</p>
              <div className="flex justify-between items-center mt-1">
                <h3 className="text-3xl font-bold">14</h3>
                <div className="flex items-center">
                  <button className="text-xl bg-green-700 text-white-100 rounded-3xl px-4 py-2 h-8 flex items-center justify-center">
                    <Link href="/product-listing/sanctioned-products"> View</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mx-auto">
            <div className="w-96 border-2 border-custom-color1 py-5 px-5 h-32 rounded-lg">
              <p className="text-xl font-medium">Deleted Products</p>
              <div className="flex justify-between items-center mt-1">
                <h3 className="text-3xl font-bold">14</h3>
                <div className="flex items-center">
                  <button className="text-xl bg-green-700 text-white-100 rounded-3xl px-4 py-2 h-8 flex items-center justify-center">
                    <Link href="/ product-listing/deleted-products"> View</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* product listing Nav bar ends */}
    </div>
  );
};

export default ProductsListingNavbar;
