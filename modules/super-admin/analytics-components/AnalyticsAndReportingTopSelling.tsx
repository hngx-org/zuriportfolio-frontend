import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import SuperAdminPagination from '../components/pagination';
import { topListingProduct } from '../../../@types';
import Logo from '../../../public/assets/tsImages/image 12.png';

export default function Page() {
  const [products, setProducts] = useState<topListingProduct | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          'https://team-mirage-super-amind2.onrender.com/api/superadmin/analytics/best_selling_products/',
        );
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setProducts(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getData();
  }, []);

  const currentPage = 1;
  const totalPages = 10;

  return (
    <section className=" px-6 mb-10 font-manropeL">
      <div className="max-w-[1220px] mx-auto py-4 border border-white-200 rounded-lg overflow-x-auto no-scrollbar lg:max-w-[1050px] xl:max-w-[1220px] 2xl:max-w-[1470px] ">
        <div className="grid grid-cols-2 min-w-[1000px] items-center text-custom-color2 border-b border-white-200 px-4 py-3 bord no-scrollbar">
          <div className="flex items-center gap-1">
            <span className="md:pl-8">Product Name </span>
            <Image
              src="/assets/tsImages/arrow-down.png"
              alt="Product Icon"
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
          <div className="grid grid-cols-5 text-center min-w-[100px]">
            <span>Category</span>
            <span>Order</span>
            <span>Price</span>
            <span>Top Sales</span>
            <span>Vendor</span>
          </div>
        </div>
        <div className="min-w-[1000px]">
          {products
            ? products.map((product) => (
                <div
                  key={product.product_id}
                  className="grid grid-cols-2 items-center border-b border-white-200 shadow-sm bg-white-100 py-4 px-4 whitespace-nowrap"
                >
                  <div className="flex items-center md:pl-8 ">
                    <Image src={Logo} alt={product.product_id} width={50} height={50} />
                    <span className="ml-4 text-md md:text-lg">{product.product_name}</span>
                  </div>
                  <div className="grid grid-cols-5 text-custom-color2 text-center min-w-[100px]">
                    <p className="">{product.category_name}</p>
                    <p>{product.total_orders}</p>
                    <p>{product.price}</p>
                    <p>{product.total_sales}</p>
                    <p>{product.vendor_name}</p>
                  </div>
                </div>
              ))
            : 'Fetching...'}
        </div>
        <SuperAdminPagination currentPage={currentPage} totalPages={totalPages} onPageChange={() => {}} />
      </div>
    </section>
  );
}
