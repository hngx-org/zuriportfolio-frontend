import { useRouter } from 'next/router';
import CategoriesPage from '@modules/marketplace/component/categories/CategoriesPage';
import { useContext, useEffect } from 'react';
import { PreviousUrlContext } from '@modules/marketplace/context/PreviousUrlProvider';
import Head from 'next/head';
import http from '@modules/marketplace/http';

export const getServerSideProps = async (context: any) => {
  const { category: _category } = context.query;
  const category = _category?.replace(/_/g, ' ');

  if (!category) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  try {
    const res = await http.get('/category-name/');
    const isCategoryAvailable = res.data?.data.filter((el: any) => el.name === category);

    if (isCategoryAvailable.length === 0) {
      return {
        props: {
          error: true,
          errorMessage: `No product category found in ${category}`,
          data: [],
        },
      };
    }

    return {
      props: {
        error: false,
        errorMessage: '',
        data: isCategoryAvailable[0],
      },
    };
  } catch (e: any) {
    console.log(e);

    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
};

export default function CategoryPage(props: any) {
  // console.log(props);

  const router = useRouter();
  const { category } = router.query;
  const { updatePath } = useContext(PreviousUrlContext);

  useEffect(() => {
    updatePath(router.asPath);
    // console.log('category page');
  }, [router.asPath, updatePath]);

  return (
    <div>
      <Head>
        <title>Products available in {category}</title>
        <meta name="description" content={`Explore a wide range of ${category} product`} />
      </Head>
      <CategoriesPage error={props.error} errorMessage={props.errorMessage} data={props.data} />
    </div>
  );
}
