import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '../../../../../components/Layout/MainLayout';
import Container from '@modules/auth/component/Container/Container';
import Table from '../../../../../public/assets/reviews/Table.png';

function EmptyReviewPage(props: { pageTitle: string }) {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-start items-center w-full">
        <div
          className="flex flex-row justify-start items-center cursor-pointer"
          onClick={() => router.push('/dashboard/reviews')}
        >
          <Image src="/assets/reviews/return-icon.svg" width={32} height={32} alt="return" />
          {props.pageTitle && <p className="font-manropeB lg:text-2xl md:text-xl sm:text-lg">{props.pageTitle}</p>}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center h-full w-full py-52">
        <Image src="/assets/reviews/Table.png" width={150} height={150} alt="Empty Grid" />
        <p>There are no reviews for this product</p>
        <div className="flex flex-col justify-center items-center">
          <p className="pt-6">Have any thoughts?</p>
          <Link
            href={`../new`}
            className="flex text-sm md:text-base font-manropeB text-brand-green-pressed h-5 w-36 self-start"
          >
            <button className="hover:text-green-200 w-full">Write a Review!</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmptyReviewPage;
