import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Breadcrumbs() {
  const router = useRouter();

  // Extract dynamic route parameters from the pathname
  const routeArr = router.asPath.split('/').filter(Boolean);

  // Build the breadcrumb elements
  const breadcrumbs = routeArr.map((el, i) => (
    <span key={i}>
      <span className="mx-2">{'>'}</span>
      <Link
        href={`/${routeArr.slice(0, i + 1).join('/')}`}
        className={`${i + 1 == routeArr.length ? ' text-white-400' : null}`}
      >
        {el.split('-').join(' ').replaceAll('%20', ' ')}
      </Link>
    </span>
  ));

  return (
    <div className="font-manropeB py-[5px] md:py[3px] text-brand-green-shade50 capitalize">
      <div className="flex flex-wrap">
        <Link href="/">Home</Link>
        {breadcrumbs}
      </div>
    </div>
  );
}

export default Breadcrumbs;
