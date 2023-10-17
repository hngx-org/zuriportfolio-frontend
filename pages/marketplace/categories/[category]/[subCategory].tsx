import SpecificSubCategory from '@modules/marketplace/SpecificSubCategory';
import axios from 'axios';
import { useRouter } from 'next/router';
import type { GetServerSideProps } from 'next';
import { FilterContextProvider } from '@modules/marketplace/component/filter/hooks/context';
import { useContext, useEffect, useState } from 'react';
import { PreviousUrlContext } from '@modules/marketplace/context/PreviousUrlProvider';

interface CardType {
  id: string;
  currency: string;
  images: { url: string }[];
  shop: { name: string; id: string };
  name: string;
  price: number;
  rating: number;
  showDiscount: boolean | undefined;
  showLimitedOffer: boolean | undefined;
  showTopPicks: boolean | undefined;
}

type ResponseType = {
  response: {
    error: boolean;
    errorMessage: string;
    data: CardType[] | null;
  };
};

type Props =
  | {
      redirect: {
        destination: string;
        permanent: boolean;
      };
    }
  | ResponseType;

// visit context type
export const getServerSideProps: GetServerSideProps<Props> = async (context: any) => {
  const { category: _category, subCategory: _subCategory } = context.query;
  const category = _category?.replace(/_/g, ' ');
  const subCategory = _subCategory?.replace(/_/g, ' ');

  // if category and subcategory does not exist
  if (!category || !subCategory) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  try {
    const res = await axios.get(`https://coral-app-8bk8j.ondigitalocean.app/api/products/${category}/${subCategory}/`);

    if (res.data.products.length === 0) {
      return {
        props: {
          response: {
            error: true,
            errorMessage: 'No sub category found',
            data: null,
          },
        },
      };
    }

    return {
      props: {
        response: {
          error: false,
          errorMessage: '',
          data: res.data.products,
        },
      },
    };
  } catch (e: any) {
    // if product does not exist or empty
    // error 500 that returns html string and check if message error is not return
    if (!e.response?.data?.message) {
      return {
        props: {
          response: {
            error: true,
            errorMessage: 'Internal Server Error',
            data: null,
          },
        },
      };
    }
    if (e?.response?.data?.Message?.includes('no product category')) {
      return {
        props: {
          response: {
            error: true,
            errorMessage: e.response.data.Message,
            data: null,
          },
        },
      };
    }

    // server error or db down 500
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
};

export default function SubCategoryPage({ response }: ResponseType) {
  const router = useRouter();
  const { category, subCategory: _subCategory } = router.query;

  const subCategory = (_subCategory as string)?.replace(/_/g, ' ');
  const { updatePath } = useContext(PreviousUrlContext);
  //fix hydration error
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    updatePath(router.asPath);
    setReady(true);
  }, [router.asPath, updatePath]);

  return (
    <FilterContextProvider>
      {isReady && <SpecificSubCategory subCategory={subCategory as string} response={response} />}
    </FilterContextProvider>
  );
}
