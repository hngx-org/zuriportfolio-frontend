import React from 'react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import WithoutScroolPagination from '../components/withoutScroolPagination';
import { topListingProduct } from '../../../@types';
import Loading from '../../../public/assets/tsImages/Loading_spin.svg';
import Link from 'next/link';
import { Input } from '@ui/Input';
import { SearchNormal1 } from 'iconsax-react';

const AnalyticsAndReportingTopSelling = () => {
  const [products, setProducts] = useState<topListingProduct | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState('');

  const bearerToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc5YTcwOTllLTM0ZTQtNGU0OS04ODU2LTE1YWI2ZWQxMzgwYyIsImlhdCI6MTY5NzQ2ODM0MH0.UZ0CgNydpooLXFygcTgbjE6EHEQMIcFH5rjHFXpi8_w';

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://team-mirage-super-amind2.onrender.com/api/superadmin/analytics/best_selling_products/?page=${currentPage}&page_size=10`,
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
        setProducts(data.results.data);
        setTotalPages(data.results.total_page);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    }

    getData();
  }, [currentPage]);

  return (
    <section className=" px-6 mb-10 font-manropeL">
      <div className="max-w-[1220px] mx-auto py-4 border border-white-200 rounded-lg overflow-x-auto no-scrollbar lg:max-w-[1050px] xl:max-w-[1220px] 2xl:max-w-[1470px] ">
        <div className="text-custom-color2 border-b border-white-200 ps-[1rem] md:ps-[2rem] lg:ps-[3rem] pb-3 flex flex-col md:flex-row md:justify-between">
          <div>
            <span className="text-[#101828] font-[500]">Top Selling Product</span> <br />
            List of all top selling products and their details
          </div>

          <div>
            <Input
              type="email"
              intent={'default'}
              className="md:w-[28.47vw] w-100 me-4 border-white-115 my-3 md:my-0"
              placeHolder="Search"
              onChange={(e) => setFilters(e.target.value)}
              value={filters}
              leftIcon={<SearchNormal1 color="#777" />}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 min-w-[1000px] items-center text-custom-color2  pt-3 bord no-scrollbar">
          <div className="flex items-center gap-1 bg-[#FCFCFD] border-[#EAECF0]">
            <span className="md:pl-8  py-3">Product Name </span>
            <Image
              src="/assets/tsImages/arrow-down.png"
              alt="Product Icon"
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
          <div className="grid col-span-2 grid-cols-4 ps-10 text-center min-w-[100px] ">
            <span className="bg-[#FCFCFD] py-3 me-3">Category</span>
            <span className="bg-[#FCFCFD] py-3 me-3">Order</span>
            <span className="bg-[#FCFCFD] py-3 me-3">Price</span>
            <span className="bg-[#FCFCFD] py-3 ">Top Sales</span>
            {/* <span>Vendor</span> */}
          </div>
        </div>
        <div className="min-w-[1000px] min-h-[300px]">
          {products && !loading ? (
            products
              .filter((val: { product_name: string }) => {
                if (filters == '') {
                  return val;
                } else if (val.product_name.toLowerCase().includes(filters.toLowerCase())) {
                  return val;
                }
              })
              .map((product: any) => (
                <Link
                  key={product.product_id}
                  href={`/super-admin/product-listing/product-details/${product.product_id}`}
                >
                  <div className="grid grid-cols-3 items-center  border-white-200 shadow-sm bg-white-100   md:whitespace-normal hover:bg-[#E0E0E0] ">
                    <div className="flex items-center md:pl-8 border-b border-[#EAECF0] min-h-[5rem]">
                      <Image src={product.product_image_url} alt={product.product_id} width={30} height={30} />

                      <span className="ml-4 text-md md:text-lg ">{product.product_name}</span>
                    </div>
                    <div className="grid col-span-2 ps-10 grid-cols-4 text-custom-color2 text-center min-w-[100px] flex ">
                      <p className="border-b border-[#EAECF0] me-3 min-h-[5rem] flex items-center justify-center">
                        {product.category_name}
                      </p>
                      <p className="border-b border-[#EAECF0] me-3 min-h-[5rem] flex items-center justify-center">
                        {product.total_orders}
                      </p>
                      <p className="border-b border-[#EAECF0] me-3 min-h-[5rem] flex items-center justify-center">
                        ₦{Math.ceil(Number(product.price)).toLocaleString()}
                      </p>
                      <p className="border-b border-[#EAECF0] min-h-[5rem] ms-3 flex items-center justify-center">
                        ₦{Math.ceil(Number(product.total_sales)).toLocaleString()}
                      </p>
                      {/* <p>{product.vendor_name}</p> */}
                    </div>
                  </div>
                </Link>
              ))
          ) : (
            <div className="flex justify-center  pt-5 w-[90vw]   md:pt-10">
              <Image src={Loading} alt="loading..." width={30} height={30} />{' '}
            </div>
          )}
        </div>
        <WithoutScroolPagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
      </div>
    </section>
  );
};

export default AnalyticsAndReportingTopSelling;
