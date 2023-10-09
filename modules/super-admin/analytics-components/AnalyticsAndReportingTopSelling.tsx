import React from 'react';
import Image from 'next/image';
import SuperAdminPagination from '../components/pagination';
import { topListingProduct } from '../../../@types';

const AnalyticsAndReportingTopSelling = () => {
  const products: topListingProduct[] = [
    {
      id: 1,
      productName: 'Product Design course',
      productImage: '/assets/tsImages/image 10.png',
      category: 'Tech Learning',
      order: '123456',
      price: '$20',
      topSales: '$1558767',
      vendor: '/assets/tsImages/more.png',
    },
    {
      id: 2,
      productName: 'Full Javascript Course',
      productImage: '/assets/tsImages/image 12.png',
      category: 'Tech Learning',
      order: '113456',
      price: '$22',
      topSales: '$1262621',
      vendor: '/assets/tsImages/more.png',
    },
    {
      id: 3,
      productName: 'Data Analics Course',
      productImage: '/assets/tsImages/image 10.png',
      category: 'Tech Learning',
      order: '103456',
      price: '$17',
      topSales: '$1178882',
      vendor: '/assets/tsImages/more.png',
    },
    {
      id: 4,
      productName: 'HTML & CSS Course',
      productImage: '/assets/tsImages/image 9.png',
      category: 'Tech Learning',
      order: '93456',
      price: '$19',
      topSales: '$976351',
      vendor: '/assets/tsImages/more.png',
    },
    {
      id: 5,
      productName: 'Python complete Course',
      productImage: '/assets/tsImages/image 12.png',
      category: 'Tech Learning',
      order: '92456',
      price: '$28',
      topSales: '$1287873',
      vendor: '/assets/tsImages/more.png',
    },
    {
      id: 6,
      productName: 'Product Management Course',
      productImage: '/assets/tsImages/image 9.png',
      category: 'Tech Learning',
      order: '89456',
      price: '$34',
      topSales: '$1977637',
      vendor: '/assets/tsImages/more.png',
    },
    {
      id: 7,
      productName: 'Digital marketing Course',
      productImage: '/assets/tsImages/image 10.png',
      category: 'Tech Learning',
      order: '86456',
      price: '$26',
      topSales: '$1456421',
      vendor: '/assets/tsImages/more.png',
    },
  ];

  const productName = (
    <div className="flex items-center gap-1">
      <span>Product Name </span>
      <Image
        src="/assets/tsImages/arrow-down.png"
        alt="Product Icon"
        width={20}
        height={20}
        className="object-contain"
      />
    </div>
  );

  const currentPage = 1;
  const totalPages = 10;

  return (
    <section className=" px-6 mb-10 font-manropeL">
      <div className="max-w-[1220px] mx-auto py-4 border border-white-200 rounded-lg shadow-md overflow-x-auto lg:max-w-[1050px] xl:max-w-[1220px]">
        <div className="grid grid-cols-2 min-w-[1000px] items-center text-custom-color2 border-b border-white-200 px-4 py-3 bord">
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
          {products.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-2 items-center border-b border-white-200 shadow-sm bg-white-100 py-4 px-4 whitespace-nowrap"
            >
              <div className="flex items-center md:pl-8 ">
                <Image src={product.productImage} alt={product.productName} width={50} height={50} />
                <span className="ml-4 text-md md:text-lg">{product.productName}</span>
              </div>
              <div className="grid grid-cols-5 text-custom-color2 text-center min-w-[100px]">
                <p className="">{product.category}</p>
                <p>{product.order}</p>
                <p>{product.price}</p>
                <p>{product.topSales}</p>
                <Image src={product.vendor} alt={product.productName} width={20} height={20} className="ml-12" />
              </div>
            </div>
          ))}
        </div>
        <SuperAdminPagination currentPage={currentPage} totalPages={totalPages} onPageChange={() => {}} />
      </div>
    </section>
  );
};

export default AnalyticsAndReportingTopSelling;
