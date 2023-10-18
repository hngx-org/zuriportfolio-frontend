import React from 'react';
import Link from 'next/link';

interface BreadcrumbsProp {
    shopId: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProp> = ({ shopId }) => {
  return (
    <div className="font-manropeB py-5 md:py-3 text-brand-green-shade50 capitalize">
      <div className="flex flex-wrap">
        <Link href="/marketplace">Marketplace</Link>
        <span className="mx-2">{'>'}</span>
        <Link href={`/shop/?shop_id=${shopId}`}>Shop</Link>
        <span className="mx-2">{'>'}</span>
        <span className='text-white-400 cursor-pointer'>Product</span>
      </div>
    </div>
  );
}

export default Breadcrumbs;