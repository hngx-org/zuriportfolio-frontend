import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowUp } from 'iconsax-react';
import Link from 'next/link';
import axios from 'axios';

const VendorsStat = () => {
  const [vendorData, setVendorData] = useState({
    totalShops: 0,
    totalBannedShops: 0,
    totalDeletedShops: 0,
  });
  const [error, setError] = useState<string | null>(null);

  // Retrieve the token from local storage
  const authToken = localStorage.getItem('authToken');

  const api = axios.create({
    baseURL: 'https://staging.zuri.team/api',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const fetchData = async () => {
    try {
      const response = await api.get('/admin/shop/all');

      if (response.status === 200) {
        const data = response.data;
        const totalShops = data.total_shops;
        const totalBannedShops = data.total_banned_shops;
        const totalDeletedShops = data.total_deleted_shops;

        setVendorData({
          totalShops,
          totalBannedShops,
          totalDeletedShops,
        });
      } else {
        setError('Failed to fetch data');
        console.error('Failed to fetch data');
      }
    } catch (error) {
      setError('Error fetching data');
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const updateInterval = setInterval(() => {
      fetchData();
    }, 5000); // Update every 5 seconds

    fetchData(); // Fetch data immediately

    return () => {
      clearInterval(updateInterval);
    };
  }, []);

  return (
    <>
      <section className="my-5 grid md:grid-cols-3 sm:grid-cols-1 gap-4 container mx-auto">
        {error ? (
          <div className="error-message animate-bounce">{error}</div>
        ) : (
          <>
            <div className="p-4 border-solid rounded-md border-white-115 border-2">
              <div className="flex items-center justify-between text-gray-500">
                <p className="text-lg">Total Vendors</p>
                <Image src="/assets/more-grey.png" alt="" width={20} height={20} className="cursor-pointer" />
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-4xl font-bold">{vendorData.totalShops}</h2>
                <div className="flex items-center mr-2 text-brand-green-primary text-1xl px-3 rounded-xl bg-green-20">
                  <ArrowUp size="16" />
                  <p>10%</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-solid rounded-md border-white-115 border-2">
              <div className="flex items-center justify-between text-brand-green-primary">
                <p className="text-lg">Banned Vendors</p>
                <Image src="/assets/more-green.png" alt="" width={20} height={20} className="cursor-pointer" />
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-4xl font-bold text-brand-green-primary">{vendorData.totalBannedShops}</h2>
                <Link href="">
                  <button className="px-3 py-1 bg-brand-green-primary hover-bg-brand-green-hover text-white-100 rounded-2xl">
                    View
                  </button>
                </Link>
              </div>
            </div>
            <div className="p-4 border-solid rounded-md border-white-115 border-2">
              <div className="flex items-center justify-between text-brand-green-primary">
                <p className="text-lg">Deleted Vendors</p>
                <Image src="/assets/more-green.png" alt="" width={20} height={20} className="cursor-pointer" />
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-4xl font-bold text-green-700">{vendorData.totalDeletedShops}</h2>
                <Link href="">
                  <button className="px-3 py-1 bg-brand-green-primary hover-bg-brand-green-hover text-white-100 rounded-2xl">
                    View
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default VendorsStat;
