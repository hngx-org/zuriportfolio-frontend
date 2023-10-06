import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Breadcrumbs() {
  const router = useRouter();
  const routeArr: string[] = router.route.split('/');

  const breadcrumbs = routeArr.map((el, i, arr) =>
    !el ? (
      <span key={i} className="mx-2">
        {'>'}
      </span>
    ) : (
      <Link key={i} href={`/${el}`} className={`${i + 1 == arr.length ? 'text-white-400' : null}`}>
        {el.split('-').join(' ')}
      </Link>
    ),
  );

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
