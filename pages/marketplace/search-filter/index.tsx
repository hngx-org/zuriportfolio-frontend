import ProductCard from '@modules/marketplace/component/ProductCard';
import styles from '../../../modules/marketplace/component/landingpage/productCardWrapper/product-card-wrapper.module.css';
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
      {Array.isArray(products) && products?.length === 0 ? (
        <Error />
      ) : (
        <CategoryLayout isBreadcrumb={false}>
          <div className="max-w-[1240px] mx-auto"></div>
          <div className="px-4 max-w-[1240px] mx-auto">
            <h1 className="text-custom-color31 font-manropeL mt-5 lg:pt-5 md:mb-1 font-bold md:text-2xl leading-normal flex items-center justify-between">
              Search Result for Products
            </h1>
            <div
              className={`flex py-8 flex-nowrap lg:flex-wrap gap-y-[70px] mb-5 w-full overflow-scroll ${styles['hide-scroll']}`}
            >
              {products?.map((item: ProductList) => {
                return (
                  <Link
                    href={`marketplace/product-details?id=${item.id}`}
                    key={item.id}
                    className="relative w-1/2 md:w-1/3 lg:w-1/4 pr-2 md:pr-4 lg:pr-8"
                  >
                    <ProductCard
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
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center justify-center mb-14">
              <Pagination
                activePage={activePage}
                pages={totalPages}
                setPage={handlePageChange}
                page={activePage}
                visiblePaginatedBtn={4}
              />
            </div>
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
    let apiUrl = constructApiUrl('https://coral-app-8bk8j.ondigitalocean.app/api/marketplace/products-filter', queryParams);
    const { data, status } = await axios.get<{ products: ProductList[]; data: ProductList[] }>(apiUrl.toString());
    if (status === 400 || status === 500) {
      console.error('Bad request');
    }
    const res = data?.products ? data?.products : data?.data ? data?.data : [];
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
