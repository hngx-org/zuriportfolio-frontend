import { ArrowLeft, ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import React from 'react';
import { useState } from 'react';
import { VendorProduct } from '../../../../../@types';
import Aff from '../../../../../public/assets/images/vendors/afflate.png';
import Web from '../../../../../public/assets/images/vendors/webinar.png';
import { useRouter } from 'next/router';
import Loader from '@modules/portfolio/component/landing/Loader';
import { brokenImage } from '../../../../super-admin/vendor-management/vendor-details/[id]';
import Image from 'next/image';
import StarRating from '@modules/super-admin/components/StarRating';
import { useGetShop } from '../../../../../http/super-admin1';
import SuperAdminVendProdHeader from './Header';

const useVendorDetailLogic = (id: string) => {
  const { data, isLoading } = useGetShop(id);

  // Pagination Varriables
  const [currentPage, setCurrentPage] = useState(1); // current page identifier
  const recordsPerPage: number = 8; // list of pages that show at a page
  const lastIndex: number = currentPage * recordsPerPage; // las item on current page
  const firstIndex: number = lastIndex - recordsPerPage; // first item on current page
  // const records = data?.data[0]?.products?.slice(firstIndex, lastIndex); // page slicer determining what shows per page
  const pages: number = Math.ceil(data?.data[0]?.products?.length / recordsPerPage); // page number in total
  const convertToArray = (number: number) => Array.from({ length: number }, (value, index) => index + 1);
  const numbers: number[] = convertToArray(pages);

  // Pagination functions to handle page navigation
  function nextPage() {
    if (currentPage !== pages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 30);
    }
  }

  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 30);
    }
  }
  function changeCPage(id: number): void {
    setCurrentPage(id);
    window.scrollTo(0, 30);
  }

  // returns
  return {
    nextPage,
    currentPage,
    changeCPage,
    prevPage,
    pages,
    firstIndex,
    lastIndex,
    numbers,
  };
};

export default useVendorDetailLogic;
