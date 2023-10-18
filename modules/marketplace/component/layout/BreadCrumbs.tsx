// import React from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';

// interface IBreadCrumb {
//   pathName?: string;
// }

// function Breadcrumbs({pathName}: IBreadCrumb) {
//   const router = useRouter();

//   // Extract dynamic route parameters from the pathname
//   const routeArr = pathName ? pathName.replace(/_/g, ' ').split('?')[0].split('/').filter(Boolean) :router.asPath.replace(/_/g, ' ').split('?')[0].split('/').filter(Boolean);

//   // Build the breadcrumb elements
//   const breadcrumbs = routeArr.map((el, i) => (
//     <span key={i}>
//       <span className="mx-2">{'>'}</span>
//       <Link
//         href={`/${routeArr.slice(0, i + 1).join('/')}`}
//         className={`${i + 1 === routeArr.length ? 'text-white-400' : ''}`}
//       >
//         {el.split('-').join(' ').replaceAll('%20', ' ')}
//       </Link>
//     </span>
//   ));

//   return (
//     <div className="font-manropeB py-5 md:py-3 text-brand-green-shade50 capitalize">
//       <div className="flex flex-wrap">
//         <Link href="/">Home</Link>
//         {breadcrumbs}
//       </div>
//     </div>
//   );
// }

// export default Breadcrumbs;


import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface IBreadCrumb {
  pathName?: string;
}

function Breadcrumbs({ pathName }: IBreadCrumb) {
  const router = useRouter();

  // Extract dynamic route parameters from the pathname
  const routeArr = pathName
    ? pathName.replace(/_/g, ' ').split('?')[0].split('/').filter(Boolean)
    : router.asPath.replace(/_/g, ' ').split('?')[0].split('/').filter(Boolean);

  // Build the breadcrumb elements
  const breadcrumbs = routeArr.map((el, i) => (
    <span key={i}>
      <span className="mx-2">{'>'}</span>
      {i + 1 === routeArr.length ? (
        <span className="text-white-400">{el.split('-').join(' ').replaceAll('%20', ' ')}</span>
      ) : (
        <Link href={`/${routeArr.slice(0, i + 1).join('/')}`}>
          {el.split('-').join(' ').replaceAll('%20', ' ')}
        </Link>
      )}
    </span>
  ));

  return (
    <div className="font-manropeB py-5 md:py-3 text-brand-green-shade50 capitalize">
      <div className="flex flex-wrap">
        <Link href="/">Home</Link>
        {breadcrumbs}
      </div>
    </div>
  );
}

export default Breadcrumbs;
