import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

const Categories = () => {
  console.log('shshshshsh');
  const router = useRouter();
  console.log(router);

  //route dormant route not in use

  useEffect(() => {
    router.push('/marketplace/categories/Joshua_Shop');
  }, [router]);

  return <div></div>;
};

export default Categories;
