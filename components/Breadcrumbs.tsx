import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

function Breadcrumbs() {
  const router = useRouter();
  const routeArr: string[] = router.route.slice(1).split('/');

  const breadcrumbs = routeArr.map((el, i, arr) => (
    <>
      <span className="mx-2">{'>'}</span>
      <Link
        key={i}
        href={`/${arr.slice(0, i).join('/')}/${el}`}
        className={`${i + 1 == arr.length ? 'text-white-400' : null}`}
      >
        {el.split('-').join(' ')}
      </Link>
    </>
  ));

  return (
    <div className="font-manropeB text-brand-green-shade50 capitalize">
      <div>
        <Link href="/">Home</Link>
        {breadcrumbs}
      </div>
    </div>
  );
}

export default Breadcrumbs;
