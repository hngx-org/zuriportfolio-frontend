import { useRouter } from 'next/router';
import CategoriesPage from '@modules/marketplace/component/categories/CategoriesPage';
import axios from 'axios';

export const getServerSideProps = async (context: any) => {
  const { category } = context.query;
  console.log(category);

  if (!category) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  try {
    const res = await axios('https://coral-app-8bk8j.ondigitalocean.app/api/category-name/');
    const isCategoryAvailable = res.data.categories.filter((el: any) => el.name === category);

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
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
};

export default function CategoryPage(props: any) {
  console.log(props);

  const router = useRouter();
  const { category } = router.query;
  console.log(category);

  return <CategoriesPage error={props.error} errorMessage={props.errorMessage} data={props.data} />;
}
