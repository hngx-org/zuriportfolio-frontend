import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Breadcrumbs() {
  const router = useRouter();
  const routeArr = router.route.slice(1).split('/');

  const breadcrumbs = routeArr.map((el, i, arr) => (
    <React.Fragment key={i}>
      <span className="mx-2">{'>'}</span>
      <Link
        href={`/${arr.slice(0, i).join('/')}/${el}`}
        className={`${i + 1 === arr.length ? ' text-green-600 font-manropeB' : null}`}
      >
        {el.split('-').join(' ')}
      </Link>
    </React.Fragment>
  ));

  return (
    <div className="font-manropeL  text-white-400 capitalize">
      <div>
        <Link href="/">Home</Link>
        {breadcrumbs}
      </div>
    </div>
  );
}

export default Breadcrumbs;
