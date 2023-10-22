import React from 'react';
import Link from 'next/link';

interface BreadcrumbsProp {
  shopId: string;
  productName: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProp> = ({ shopId, productName }) => {
  return (
    <div className="font-manropeB py-5 md:py-3 text-brand-green-shade50 capitalize">
      <div className="flex flex-wrap">
        <Link href="/marketplace">Marketplace</Link>
        <span className="mx-2">{'>'}</span>
        <Link href={`/shop/?shop_id=${shopId}`}>Shop</Link>
        <span className="mx-2">{'>'}</span>
        <span className="text-white-400 cursor-default">{productName}</span>
      </div>
    </div>
  );
};

export default Breadcrumbs;
