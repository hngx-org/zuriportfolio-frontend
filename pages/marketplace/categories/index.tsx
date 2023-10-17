import React, { useContext, useEffect } from 'react';

import { useRouter } from 'next/router';
import { PreviousUrlContext } from '@modules/marketplace/context/PreviousUrlProvider';

const Categories = () => {
  const router = useRouter();
  const { previousUrl } = useContext(PreviousUrlContext);

  //route dormant route not in use
  /* since route was meant to be  /categories/{category name} , this page is dormant but redirects to the category page when clicked the "categories" is called on the breadcrumb..even previousUrl is empty.. it redirects back to marketplace */
  useEffect(() => {
    // console.log(previousUrl, 'previous url');
    if (!previousUrl) {
      router.push('/marketplace/');
    } else {
      const splitRoute = previousUrl.split('/');
      const prevQuery = splitRoute[splitRoute.indexOf('categories') + 1];
      // console.log(prevQuery);
      router.push(`/marketplace/categories/${prevQuery}`);
    }
  }, [previousUrl, router]);

  return <div></div>;
};

export default Categories;
