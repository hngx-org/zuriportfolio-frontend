import { ArrowUp } from 'iconsax-react';
import Link from 'next/link';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ProductStatistics } from '../../../../@types';

const ProductsListingNavbar = () => {
  const [productStats, setProductStats] = useState<ProductStatistics | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE3ODlmMzVlLTAwNjQtNDM1Yy1hMTI5LTI3OGY5YzFhYTFkYiIsImlhdCI6MTY5NzE0MjQwMX0.Np4b4179X0XfbmBlN9ev_EYc8DLPyxtW7UOcf3b4dxI';
        const response = await axios.get<ProductStatistics>('https://staging.zuri.team/api/admin/product/all', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setProductStats(response.data);
        console.log('Fetched Product Stats:', response.data);
      } catch (error: any) {
        console.error('Failed to fetch product stats:', error.message);
      }
    };

    const fetchInterval = setInterval(() => {
      fetchData();
    }, 60000);

    return () => clearInterval(fetchInterval);
  }, []);

  return (
    <section className="container my-5 grid md:grid-cols-3 sm:grid-cols-1 gap-4">
      <div className=" p-4 border-solid rounded-md border-white-115 border-2">
        <div className="flex items-center justify-between text-gray-500">
          <p className="text-lg">Total Products</p>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-bold">{productStats?.total_deleted_products}</h2>
          <div className="flex items-center mr-2  text-gray-500 text-1xl px-3 rounded-xl bg-green-20">
            <ArrowUp size="16" />
            <p>10%</p>
          </div>
        </div>
      </div>
      <div className=" p-4 border-solid rounded-md border-white-115 border-2">
        <div className="flex items-center justify-between text-gray-500">
          <p className="text-lg">Sanctioned Products </p>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-bold ">{productStats?.total_products}</h2>
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
          <h2 className="text-4xl font-bold ">{productStats?.total_sanctioned_products}</h2>
          <button className="px-3 py-1 bg-brand-green-primary hover:bg-brand-green-hover text-white-100 rounded-2xl">
            <Link href="/super-admin/product-listing/deleted-products"> View</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsListingNavbar;
