import React from 'react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import SuperAdminPagination from '../components/pagination';
import { topListingProduct } from '../../../@types';
import Logo from '../../../public/assets/tsImages/image 12.png';
import Link from 'next/link';

const AnalyticsAndReportingTopSelling = () => {
  const [products, setProducts] = useState<topListingProduct | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const totalPages = 7;

  const bearerToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc5YTcwOTllLTM0ZTQtNGU0OS04ODU2LTE1YWI2ZWQxMzgwYyIsImlhdCI6MTY5NzQ2ODM0MH0.UZ0CgNydpooLXFygcTgbjE6EHEQMIcFH5rjHFXpi8_w';

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const res = await fetch(
          'https://team-mirage-super-amind2.onrender.com/api/superadmin/analytics/best_selling_products/?start_date=2023-01-10&end_date=2023-11-12',
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          },
        );
        if (!res.ok) {
          setLoading(false);
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setProducts(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    }
    getData();
  }, []);

  return (
    <section className=" px-6 mb-10 font-manropeL">
      <div className="max-w-[1220px] mx-auto py-4 border border-white-200 rounded-lg overflow-x-auto no-scrollbar lg:max-w-[1050px] xl:max-w-[1220px] 2xl:max-w-[1470px] ">
        <div className="text-custom-color2 border-b border-white-200 ps-[1rem] md:ps-[2rem] lg:ps-[3rem] py-3">
          <span className="text-[#101828] font-[500]">Top Selling Product</span> <br />
          List of all top selling products and their details
        </div>

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
        <div className="min-w-[1000px] min-h-[300px]">
          {products && !loading
            ? products.map((product) => (
                <div
                  key={product.product_id}
                  className="grid grid-cols-2 items-center border-b border-white-200 shadow-sm bg-white-100 py-4 px-4 whitespace-nowrap md:whitespace-normal"
                >
                  <div className="flex items-center md:pl-8 ">
                    <Image src={Logo} alt={product.product_id} width={50} height={50} />
                    <Link href={`/super-admin/product-listing/product-details/${product.product_id}`}>
                      <span className="ml-4 text-md md:text-lg">{product.product_name}</span>
                    </Link>
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
            : 'Loading...'}
        </div>
        <SuperAdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(value) => {
            setCurrentPage(value);
          }}
        />
      </div>
    </section>
  );
};

export default AnalyticsAndReportingTopSelling;
