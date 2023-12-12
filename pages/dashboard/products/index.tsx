import React, { use, useEffect, useRef, useState } from 'react';
import MainLayout from '../../../components/Layout/MainLayout';
import { SearchNormal1 } from 'iconsax-react';
import Button from '@ui/Button';
import ProductCard from '@modules/dashboard/component/products/ProductCard';
import Link from 'next/link';
import Loader from '@ui/Loader';
import { Input } from '@ui/Input';
import Pagination from '@ui/Pagination';
import { toast } from 'react-toastify';
import Head from 'next/head';
import Image from 'next/image';
import withAuth from '../../../helpers/withAuth';
import { SHOP_API_URL } from '../../../http/checkout';
type Product = {
  product_id: any;
  image: any;
  name: any;
  price: any;
  url: any;
  shop_id: any;
  quantity: any;
  category_id: any;
  description: any;
  id: any;
  promo: {
    amount: number;
    inPercentage: string;
    maximum_discount_price: number;
  } | null;
};
let first = true;
const Products = () => {
  const [pageSize, setPageSize] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [product, setProducts] = useState<Product[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);
  const [loading, setIsLoading] = useState(true);
  const productsPerPage = 8;
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPage, setTotalPage] = useState(1);
  // const [currentPage,setCurrentPage] = useState(1)
  const [productsError, setProductsError] = useState<string | null>(null);

  const fetchProducts = async () => {
    // Fetch the product data from the server
    // if (first) {
    //   first = false;
    //   console.log('first');
    // } else {
    //   ref.current?.scrollIntoView(true);
    // }
    setIsLoading(true);
    try {
      setIsLoading(true);
      const res = await fetch(`${SHOP_API_URL}/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('zpt')}`,
        },
      });
      const data = await res.json();

      // console.log(data);
      // toast.success(data.message, {
      //   autoClose: 5000,
      // });
      // setProducts(data.data.products);
      setTotalPage(data.totalPages);
      return data.data.products;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const totalPageCount = Math.ceil(product.length / productsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const insertProduct = (product: any) => {
    setProducts(product);
  };
  const insertSelectedProduct = (product: any) => {
    setSelectedProduct(product);
  };

  useEffect(() => {
    const setProducts = async () => {
      const product = await fetchProducts();
      insertProduct(product || []);
    };
    setProducts();
  }, []);

  const filteredProducts = product.filter((product) => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const productsToDisplay = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  return (
    <MainLayout showDashboardSidebar={true} activePage="products" showTopbar={true}>
      <Head>
        <title>Products</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Product" />
        <link rel="icon" href="/assets/zuriLogo.svg" />
        <meta key="metaname" itemProp="name" name="title" content="Zuri Portfolio" />
        <meta key="metadescription" itemProp="description" name="description" content="View All Product" />
        <meta name="keywords" content="Zuri, portfolio, add, product, dashboard" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>
      <div className="max-w-[1240px] mx-auto my-4 px-6" ref={ref}>
        {product.length > 0 && (
          <div className="flex md:justify-end my-12 justify-center">
            <Link href="/dashboard/products/add-product">
              <Button className="flex py-3 px-5 gap-4 rounded-2xl text-white-100 items-center bg-brand-green-primary transition after:transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                  <path
                    d="M6.5 12H18.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M12.5 18V6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Add New Product</span>
              </Button>
            </Link>
          </div>
        )}
        <section className="rounded-2xl md:block relative min-h-[400px] mb-6">
          {loading ? (
            <div className="absolute z-50 inset-0 min-h-[300px]">
              <Loader />
            </div>
          ) : (
            <>
              {product.length === 0 ? (
                <main className="max-w-[1240px] p-10 mx-auto flex m-[100px] mt-[-10px] md:mt-[-10px] md:m-[100px] flex-col items-center justify-center">
                  <Image src="/assets/images/product.png" alt="discount" width={100} height={100} />
                  <h2 className="text-[28px] font-bold text-center font-manropeB mt-4">
                    You don&apos;t have any product
                  </h2>
                  <p className="text-[16px] md:text-[24px] font-medium text-center font-manropeB">
                    Create your first product
                  </p>
                  <Link href="/dashboard/products/add-product">
                    <Button className="flex mt-4 py-3 px-5 gap-4 rounded-2xl text-white-100 items-center bg-brand-green-primary transition after:transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <path
                          d="M6.5 12H18.5"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.5 18V6"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Add New Product</span>
                    </Button>
                  </Link>
                </main>
              ) : (
                <div className="max-w-[1226px] mx-auto shadow-none md:shadow md:rounded-2xl md:px-[15px] md:py-[13px]">
                  <div className="flex gap-5 justify-between mb-[37px]">
                    <div
                      className="focus-within:outline max-w-full focus-within:outline-black px-[14px] py-[0px] flex gap-2 items-center border border-slate-50 rounded-lg flex-1 min-w-0 "
                      style={{
                        boxShadow: ` 0px 1px 2px 0px rgba(16, 24, 40, 0.05)`,
                      }}
                    >
                      <SearchNormal1 size="16" color="#667085" />
                      <Input
                        className=" bg-transparent font-manropeL border-hidden font-normal focus-within:outline-none flex-1 text-[1rem] leading-[150%] text-custom-color2"
                        placeholder="Search products here..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div
                    className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5 relative min-h-[350px]"
                    style={{
                      filter: `drop-shadow(0px 28px 38px rgba(201, 213, 216, 0.30))`,
                    }}
                  >
                    {loading ? (
                      <div className="absolute z-50 inset-0 min-h-[300px]">
                        <Loader />
                      </div>
                    ) : (
                      product.map((product) => (
                        <ProductCard
                          product={product}
                          fetchProducts={fetchProducts}
                          insertProduct={insertProduct}
                          insertSelectedProduct={insertSelectedProduct}
                          selectedProduct={selectedProduct}
                          key={product.id}
                        />
                      ))
                    )}
                  </div>
                  <div className="flex justify-center my-4">
                    <Pagination
                      visiblePaginatedBtn={5}
                      activePage={currentPage}
                      pages={totalPageCount}
                      page={currentPage}
                      setPage={handlePageChange}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </MainLayout>
  );
};

export default withAuth(Products);
