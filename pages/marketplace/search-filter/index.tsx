import Head from 'next/head';
import ProductCard from '@modules/marketplace/component/ProductCard';
import Link from 'next/link';
import Error from '@modules/marketplace/component/landingpageerror/ErrorPage';
import { GetServerSideProps } from 'next';
import axios, { AxiosError } from 'axios';
import { ProductList } from '@modules/marketplace/types/filter-types';
import CategoryLayout from '@modules/marketplace/component/layout/category-layout';
import { Fragment } from 'react';
import { constructApiUrl } from '@modules/marketplace/component/filter/helper';
import Pagination from '@ui/Pagination';
import { useRouter } from 'next/router';
import http from '@modules/marketplace/http';

interface Props {
  products: ProductList[];
  activePage: number;
  totalPages: number;
}

export default function Index({ products, activePage, totalPages }: Props) {
  const router = useRouter();
  const handlePageChange = (page: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: page.toString() },
    });
  };

  return (
    <Fragment>
      <Head>
        <title>Filtered Result</title>
      </Head>
      {Array.isArray(products) && products?.length === 0 ? (
        <Error />
      ) : (
        <CategoryLayout isBreadcrumb={false}>
          <div className="max-w-[1240px] mx-auto">
            <div id="top" className="px-4 max-w-[1240px] mx-auto">
              <h1 className="text-custom-color31 font-manropeL mt-5 lg:pt-5 md:mb-1 font-bold md:text-2xl leading-normal flex items-center justify-between">
                Search Result for Products
              </h1>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products?.map((item: ProductList) => (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    currency={`USD`}
                    image={item.images[0]?.url || `/assets/products-banner/Image-11.png`}
                    name={item?.name}
                    price={parseInt(item.price)}
                    user={item?.shop.name ? item?.shop.name : ``}
                    rating={item.rating || 0}
                    showLimitedOffer={false}
                    showTopPicks={false}
                    showDiscount={true}
                    discount_price={50}
                    shop={item.shop}
                  />
                ))}
              </div>
            </div>
            <Link href="#top" className="mt-10 flex items-center justify-center mb-14 mx-auto w-fit">
              <Pagination
                activePage={activePage}
                pages={totalPages}
                setPage={handlePageChange}
                page={activePage}
                visiblePaginatedBtn={4}
              />
            </Link>
          </div>
        </CategoryLayout>
      )}
    </Fragment>
  );
}

export const getServerSideProps = (async (context) => {
  try {
    let category = context.query.category as string;
    let subCategory = context.query.subCategory as string;
    let price = !isNaN(parseInt(context.query.price as string)) ? (context.query.price as string) : '';
    let discount = !isNaN(parseInt(context.query.discount as string)) ? (context.query.discount as string) : '';
    let rating = context.query.rating as string;

    const page = context.query.page ? parseInt(context.query.page as string) : 1;

    const queryParams = { category, subCategory, price, discount, rating };
    let apiUrl = constructApiUrl('/products-filter', queryParams);
    const { data, status } = await http.get<{ data: { products: ProductList[] } }>(apiUrl.toString());
    if (status === 400 || status === 500) {
      console.error('Bad request');
    }
    const res = data?.data?.products ? data?.data?.products : [];
    const itemsPerPage = 8;
    const totalProducts = res.length;
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const products = res?.slice(startIndex, endIndex);

    return { props: { products: products, activePage: page, totalPages } };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 400 || error.status === 500) {
        return {
          redirect: { destination: '/404', permanent: false },
        };
      }
    }
    return {
      redirect: { destination: '/marketplace/error-page', permanent: false },
    };
  }
}) satisfies GetServerSideProps<{
  products: ProductList[];
  activePage: number;
  totalPages: number;
}>;
