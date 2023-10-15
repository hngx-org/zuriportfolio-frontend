import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../../../context/AuthContext';
import axios from 'axios';
import { ProductData } from '../../../../@types';

function Breadcrumbs() {
  const { auth } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<ProductData | null>(null);

  // Extract dynamic route parameters from the pathname
  const routeArr = router.asPath.split('/').filter(Boolean);

  const userId = auth ? auth?.user?.id : '1972d345-44fb-4c9a-a9e3-d286df2510ae';

  useEffect(() => {
    const apiUrl: string = `https://coral-app-8bk8j.ondigitalocean.app/api/getproduct/${id}/${userId}/`;
    // Fetch data using Axios
    const headers = {
      accept: 'application/json',
      'X-CSRFToken': 'auL3OR9xSygssFcGGBdq8TOqKbedQO41syRGOb1XXFCvkhMssKudWDxIrgEQp2YC',
    };
    axios
      .get<ProductData>(apiUrl, { headers })
      .then((response) => {
        setProduct(response.data);
        // setImage(product?.images[0].url)
        // console.log(product)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id, userId]);

  // Check if the current route is the one you specified
  const isProductDetailsRoute = router.asPath === `/marketplace/product-details?id=${id}`;

  // Build the breadcrumb elements
  const breadcrumbs = routeArr.map((el, i) => (
    <span key={i}>
      <span className="mx-2">{'>'}</span>
      <Link
        href={`/${routeArr.slice(0, i + 1).join('/')}`}
        className={`${i + 1 == routeArr.length ? ' text-brand-green-shade50' : null}`}
      >
        {el.split('-').join(' ').replaceAll('%20', ' ')}
      </Link>
    </span>
  ));

  // If the current route is the one you specified, set the breadcrumbs accordingly
  if (isProductDetailsRoute) {
    return (
      <div className="font-manropeB py-[5px] md:py[3px] text-white-400 capitalize">
        <div className="flex flex-wrap">
          <Link href="/">Home</Link>
          <span>
            <span className="mx-2">{'>'}</span>
            <Link href="/marketplace">Marketplace</Link>
          </span>
          <span className="text-brand-green-shade50">
            <span className="mx-2">{'>'}</span>
            {product?.name}
          </span>
        </div>
      </div>
    );
  }

  // Default behavior for other routes
  return (
    <div className="font-manropeB py-[5px] md:py[3px] text-white-400 capitalize">
      <div className="flex flex-wrap">
        <Link href="/">Home</Link>
        {breadcrumbs}
      </div>
    </div>
  );
}

export default Breadcrumbs;
