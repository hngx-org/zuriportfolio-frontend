import { ArrowLeft, ArrowLeft2, ArrowRight2, Star1, StarSlash } from 'iconsax-react';
import Image, { StaticImageData } from 'next/image';
import React from 'react';
import { useState } from 'react';
import { VendorProduct } from '../../../../../@types';
import Aff from '../../../../../public/assets/images/vendors/afflate.png';
import Web from '../../../../../public/assets/images/vendors/webinar.png';
import Art from '../../../../../public/assets/images/vendors/art.png';
import lang from '../../../../../public/assets/images/vendors/lang.png';
import Photo from '../../../../../public/assets/images/vendors/photo.png';
import VendorCard from '../../../../../modules/super-admin/components/VendorCard';

function VendorDetails(): React.ReactElement {
  const cards: VendorProduct[] = [
    {
      productName: 'Webinar and Course Slide Template',
      productPrice: 100,
      productAuthor: 'Mark Essien',
      productImage: Aff,
      id: 1,
    },
    {
      productName: 'Webinar and Course Slide Template',
      productPrice: 100,
      productAuthor: 'Mark Essien',
      productImage: Web,
      id: 2,
    },
    {
      productName: 'Webinar and Course Slide Template',
      productPrice: 100,
      productAuthor: 'Mark Essien',
      productImage: Aff,
      id: 3,
    },
    {
      productName: 'Webinar and Course Slide Template',
      productPrice: 100,
      productAuthor: 'Mark Essien',
      productImage: Web,
      id: 18,
    },
    {
      productName: 'Webinar and Course Slide Template',
      productPrice: 100,
      productAuthor: 'Mark Essien',
      productImage: Aff,
      id: 19,
    },
    {
      productName: 'Webinar and Course Slide Template',
      productPrice: 100,
      productAuthor: 'Mark Essien',
      productImage: Web,
      id: 20,
    },
    {
      productName: 'Webinar and Course Slide Template',
      productPrice: 100,
      productAuthor: 'Mark Essien',
      productImage: Aff,
      id: 21,
    },
    {
      productName: 'Webinar and Course Slide Template',
      productPrice: 100,
      productAuthor: 'Mark Essien',
      productImage: Web,
      id: 22,
    },
    {
      productName: 'Webinar and Course Slide Template',
      productPrice: 100,
      productAuthor: 'Mark Essien',
      productImage: Web,
      id: 8,
    },
    {
      productName: 'Webinar and Course Slide Template',
      productPrice: 100,
      productAuthor: 'Mark Essien',
      productImage: Aff,
      id: 9,
    },
    {
      productName: 'Webinar and Course Slide Template',
      productPrice: 100,
      productAuthor: 'Mark Essien',
      productImage: Web,
      id: 10,
    },
    {
      productName: 'Webinar and Course Slide Template',
      productPrice: 100,
      productAuthor: 'Mark Essien',
      productImage: Aff,
      id: 11,
    },
    {
      productName: 'Webinar and Course Slide Template',
      productPrice: 100,
      productAuthor: 'Mark Essien',
      productImage: Web,
      id: 12,
    },
    {
      productName: 'Webinar and Course Slide Template',
      productPrice: 100,
      productAuthor: 'Mark Essien',
      productImage: Aff,
      id: 13,
    },
    {
      productName: 'Webinar and Course Slide Template',
      productPrice: 100,
      productAuthor: 'Mark Essien',
      productImage: Web,
      id: 14,
    },
    {
      productName: 'Webinar and Course Slide Template',
      productPrice: 100,
      productAuthor: 'Mark Essien',
      productImage: Web,
      id: 4,
    },
    {
      productName: 'Webinar and Course Slide Template',
      productPrice: 100,
      productAuthor: 'Mark Essien',
      productImage: Aff,
      id: 5,
    },
    {
      productName: 'Webinar and Course Slide Template',
      productPrice: 100,
      productAuthor: 'Mark Essien',
      productImage: Web,
      id: 6,
    },
    {
      productName: 'Webinar and Course Slide Template',
      productPrice: 100,
      productAuthor: 'Mark Essien',
      productImage: Aff,
      id: 7,
    },
    {
      productName: 'Webinar and Course Slide Template',
      productPrice: 100,
      productAuthor: 'Mark Essien',
      productImage: Aff,
      id: 15,
    },
    {
      productName: 'Webinar and Course Slide Template',
      productPrice: 100,
      productAuthor: 'Mark Essien',
      productImage: Web,
      id: 16,
    },
    {
      productName: 'Webinar and Course Slide Template',
      productPrice: 100,
      productAuthor: 'Mark Essien',
      productImage: Aff,
      id: 17,
    },
    {
      productName: 'Webinar and Course Slide Template',
      productPrice: 100,
      productAuthor: 'Mark Essien',
      productImage: Aff,
      id: 2,
    },
    {
      productName: 'Webinar and Course Slide Template',
      productPrice: 100,
      productAuthor: 'Mark Essien',
      productImage: Web,
      id: 24,
    },
  ];
  // Pagination Varriables
  const [currentPage, setCurrentPage] = useState(1); // current page identifier
  const recordsPerPage: number = 8; // list of pages that show at a page
  const lastIndex: number = currentPage * recordsPerPage; // las item on current page
  const firstIndex: number = lastIndex - recordsPerPage; // first item on current page
  const records: VendorProduct[] = cards.slice(firstIndex, lastIndex); // page slicer determining what shows per page
  const pages: number = Math.ceil(cards.length / recordsPerPage); // page number in total
  const convertToArray = (number: number) => Array.from({ length: number }, (value, index) => index + 1);
  const numbers: number[] = convertToArray(pages);

  // Pagination functions
  function nextPage() {
    if (currentPage !== pages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changeCPage(id: number): void {
    setCurrentPage(id);
  }

  return (
    <div className="mt-2 px-6 w-[100%] overflow-x-hidden">
      <div className="flex items-center mb-4">
        <ArrowLeft size="18" />
        <p className="ml-3">Products by Gustavo Silas</p>
      </div>
      <hr className="border-custom-color1" />
      <div className="mt-4 mb-10  lg:grid-cols-4 md:grid-cols-3 px-2 grid grid-cols-2 gap-5">
        {records.map((card) => {
          const { productAuthor, productImage, productName, productPrice, id } = card;
          return (
            <VendorCard
              key={id}
              vendorname={productAuthor}
              pic={productImage}
              name={productName}
              price={productPrice}
            />
          );
        })}
      </div>
      <hr className="border-custom-color1 mb-10" />
      <nav className="flex justify-center items-center mb-32">
        <ul className="flex gap-5 items-center">
          <li className="mr-5 cursor-pointer font-manropeB" onClick={prevPage}>
            Previous
          </li>
          <li onClick={prevPage} className="cursor-pointer">
            <ArrowLeft2 size={15} color="#767676" />
          </li>
          {numbers.map((n, i) => (
            <li
              className={`py-[8px] px-[14px] rounded-lg text-[14px] cursor-pointer font-semibold ${
                currentPage === n ? 'bg-green-600 text-white-100 ' : 'text-custom-color-27'
              }`}
              key={i}
              onClick={() => changeCPage(n)}
            >
              {n}
            </li>
          ))}
          <li onClick={nextPage} className="cursor-pointer">
            <ArrowRight2 size={15} color="#767676" />
          </li>
          <li className="ml-5 cursor-pointer font-manropeB" onClick={nextPage}>
            Next
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default VendorDetails;
