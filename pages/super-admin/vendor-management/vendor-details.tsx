import SuperAdminNavbar from '../../../modules/super-admin/components/navigations/SuperAdminNavbar';
import Image from 'next/image';
import star from '/public/assets/vendor/grade.png';
import active from '/public/assets/vendor/active.png';
import star_outline from '/public/assets/vendor/star_outline.png';
import vendor from '/public/assets/vendor/vendor-img.png';
import product_one from '/public/assets/vendor/vendor-product.png';
import product_two from '/public/assets/vendor/vendor-product-2.png';
import right from '/public/assets/vendor/arrow-right.svg';
import badge from '/public/assets/vendor/Badge.png';
import Button from '@ui/Button';
import Modal from '@ui/Modal';
import { ArrowRight } from 'iconsax-react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';

function VendorDetails() {
  const router = useRouter();
  const { name, email, amount, quantity, date, statusText } = router.query;
  //Access Query paramterts

  //States for opening and closing the modaals
  const [isModal, setIsModal] = React.useState(false);
  const [isDeleteModal, setDeleteModal] = React.useState(false);
  const [action, setAction] = React.useState('');
  if (statusText && statusText === 'Banned') {
    setAction('Delete Permanently');
  }
  if (statusText && statusText === 'Deleted') {
    setAction('Recover');
  }

  function openModal() {
    setIsModal(true);
  }
  function closeModal() {
    setIsModal(false);
  }
  function deleteModal() {
    setIsModal(false);
    setDeleteModal(true);
  }

  function closeDeleteModal() {
    setDeleteModal(false);
  }

  //linking to all products page
  function allProducts() {
    router.push('/super-admin/vendor-management/details');
  }
  return (
    <>
      <SuperAdminNavbar />
      <Link href="/super-admin/vendor-management/">
        <div className="top flex items-center mr-5 border-b border-white-110 ml-10 mt-5 mb-5">
          <Image src={right} alt="back" className="mr-2 pb-3"></Image>
          <p className="pb-3">Vendor Profile Details</p>
        </div>
      </Link>

      {/* Vendor Products */}
      <section className="vendor-dash mr-5 ml-5 lg:flex items-center lg:mr-0 lg:ml-0 font-manropeL">
        <div className="sales flex flex-col items-center justify-center lg:w-1/2 lg:ml-10">
          <div className="revenue border border-white-110 p-2 mb-5 w-full lg:w-full">
            <p>Total Products</p>
            <h1 className="text-xl font-bold">12</h1>
          </div>
          <div className="revenue border border-white-110 p-2 mb-5 w-full lg:w-full">
            <p>{quantity ? quantity : 'Total Order'}</p>
            <div className="badge flex items-center justify-between">
              <h1 className="text-xl font-bold">7890</h1>
              <Image src={badge} alt="Price Badge" />
            </div>
          </div>
          <div className="revenue border border-white-200  p-2 w-full lg:w-full">
            <p>Total Sales</p>
            <div className="badge flex items-center justify-between">
              <h1 className="text-xl font-bold">{amount ? amount : '$430600'}</h1>
              <Image src={badge} alt="Price Badge" />
            </div>
          </div>
        </div>

        {/* Vendor Profile */}

        <div className="profile mt-10  w-full lg:w-1/2 lg:ml-12 lg:mr-5 lg:mt-0">
          <div className="header flex items-center ml-5 lg:ml-0">
            <Image src={vendor} alt="Vendor image" className="mr-3"></Image>
            <div className="name">
              <h1 className="text-3xl font-bold font-manropeL">{name ? name : 'Gustavo Silas'}</h1>
              <p>{email ? email : 'gustavosilas@gmail.com'}</p>
            </div>
          </div>
          <div className="bio-text mt-3 ml-5 lg:ml-0">
            <h1 className="w-full mb-2">
              A UX Designer loves to make UX and the career easier for others, no fancy stuff.
            </h1>
          </div>
          <div className="bio">
            <div className="rating flex items-center justify-between mr-3 mb-3">
              <aside className="left flex items-center ">
                <p className="ml-5 lg:ml-0">3.3/5</p>
                <Image src={star} alt="star"></Image>
                <Image src={star} alt="star"></Image>
                <Image src={star} alt="star"></Image>
                <Image src={star_outline} alt="star"></Image>
                <Image src={star_outline} alt="star"></Image>
              </aside>
              <p className="text-xs mr-5 lg:mr-0 sm:ml-auto">{date ? date : 'Date Added 08-01-23'}</p>
            </div>

            <div className="status flex items-center justify-between mb-3">
              <p className="ml-5 lg:ml-0">(50 Customers)</p>
              {statusText ? statusText : <Image src={active} alt="active" className="mr-5 lg:mr-0"></Image>}
            </div>

            {/* Toggle the modal for deleting or banning vendors */}
            <div className="buttons w-full flex items-center justify-between mt-6">
              <Button
                intent={'error'}
                size={'md'}
                isLoading={false}
                spinnerColor="#000"
                className="text-red-200 bg-transparent border border-red-200 p-3 pr-4 pl-4 w-3/4 rounded-md mr-5 lg:ml-0 z-0 hover:bg-red-200 hover:text-white-100"
                onClick={openModal}
              >
                {action === '' ? 'Delete' : action}
              </Button>

              <Button
                size={'md'}
                isLoading={false}
                spinnerColor="#000"
                className="text-black bg-transparent border border-black p-3 pr-4 pl-4 w-3/4 rounded-md ml-5 lg:mr-0 z-0"
                onClick={openModal}
              >
                Ban
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Products list */}

      <section className=" mt-10 font-manropeL pb-5">
        <h1 className="ml-10 text-xl font-bold mt-6">Products by Gustavo Silas</h1>
        <div className="products flex items-center justify-evenly mt-6">
          <div className="product border border-gray-300 p-3 rounded-md cursor-pointer m-3">
            <Image src={product_one} alt="product"></Image>
            <p>Webinar and Course Slide Template</p>
            <p className="font-bold">$100</p>
            <p className="mb-3">By Mark Essien</p>
            <aside className="left flex items-center">
              <Image src={star} alt="star"></Image>
              <Image src={star} alt="star"></Image>
              <Image src={star} alt="star"></Image>
              <Image src={star_outline} alt="star"></Image>
              <Image src={star_outline} alt="star"></Image>
              <p>(3)</p>
            </aside>
          </div>
          <div className="product border border-gray-300 p-3 rounded-md cursor-pointer m-3">
            <Image src={product_two} alt="product"></Image>
            <p>Webinar and Course Slide Template</p>
            <p className="font-bold">$100</p>
            <p className="mb-3">By Mark Essien</p>
            <aside className="left flex items-center">
              <Image src={star} alt="star"></Image>
              <Image src={star} alt="star"></Image>
              <Image src={star} alt="star"></Image>
              <Image src={star_outline} alt="star"></Image>
              <Image src={star_outline} alt="star"></Image>
              <p>(3)</p>
            </aside>
          </div>
          <div className="product border border-gray-300 p-3 rounded-md hidden md:block cursor-pointer m-3">
            <Image src={product_one} alt="product"></Image>
            <p>Webinar and Course Slide Template</p>
            <p className="font-bold">$100</p>
            <p className="mb-3">By Mark Essien</p>
            <aside className="left flex items-center">
              <Image src={star} alt="star"></Image>
              <Image src={star} alt="star"></Image>
              <Image src={star} alt="star"></Image>
              <Image src={star_outline} alt="star"></Image>
              <Image src={star_outline} alt="star"></Image>
              <p>(3)</p>
            </aside>
          </div>
          <div className="product border border-gray-300 p-3 rounded-md hidden lg:block cursor-pointer m-3">
            <Image src={product_two} alt="product"></Image>
            <p>Webinar and Course Slide Template</p>
            <p className="font-bold">$100</p>
            <p className="mb-3">By Mark Essien</p>
            <aside className="left flex items-center">
              <Image src={star} alt="star"></Image>
              <Image src={star} alt="star"></Image>
              <Image src={star} alt="star"></Image>
              <Image src={star_outline} alt="star"></Image>
              <Image src={star_outline} alt="star"></Image>
              <p>(3)</p>
            </aside>
          </div>
        </div>

        {/* Link to product details for particular vendor page */}
        <Button
          rightIcon={<ArrowRight color="#06C270" />}
          intent={'secondary'}
          size={'md'}
          isLoading={false}
          spinnerColor="#000"
          className="ml-auto mt-5 mr-8 rounded-none"
          onClick={allProducts}
        >
          See all
        </Button>
      </section>

      {/* Modals for deleting vendor */}
      <Modal
        isOpen={isModal}
        closeOnOverlayClick={false}
        size="md"
        isCloseIconPresent={false}
        closeModal={function (): void {
          throw new Error('Function not implemented.');
        }}
      >
        <h1 className="font-bold text-xl mb-5">Delete Vendor</h1>
        <p>
          <span className="font-bold">Gustavo Silas</span> will be deleted as a vendor from Zuri Marketplace and all
          their products as well. They will get a notification email.
        </p>
        <h1 className="mt-5 mb-2">Reasons for deleting</h1>
        <ul className="p-3">
          <li className="m-3 p-3">
            <input type="checkbox" className="mr-5"></input>Policy Violation
          </li>
          <li className="m-3 p-3">
            <input type="checkbox" className="mr-5"></input>Offensive words
          </li>
          <li className="m-3 p-3">
            <input type="checkbox" className="mr-5"></input>Just feel like it
          </li>
          <li className="m-3 p-3">
            <input type="checkbox" className="mr-5"></input>Other
          </li>
        </ul>
        <div className="buttons flex items-center mt-6  w-1/2 ml-auto justify-between mr-3">
          <Button
            intent={'secondary'}
            size={'md'}
            isLoading={false}
            spinnerColor="#000"
            className="text-black bg-white-100 p-3 w-1/2 rounded-md z-0"
            onClick={closeModal}
          >
            Cancel
          </Button>

          <Button
            size={'md'}
            isLoading={false}
            spinnerColor="#000"
            className="p-3 w-1/2  ml-5 rounded-md mr-6"
            onClick={deleteModal}
          >
            Delete
          </Button>
        </div>
      </Modal>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isDeleteModal}
        isCloseIconPresent={false}
        closeModal={function (): void {
          throw new Error('Function not implemented.');
        }}
      >
        <h1 className="text-center text-black font-bold">Are you sure you want to delete this vendor?</h1>
        <p className="text-center">Vendor will be permanently deleted from list</p>
        <div className="buttons flex flex-col items-center mt-6 w-full justify-between p-5">
          <Button
            intent={'error'}
            size={'md'}
            isLoading={false}
            spinnerColor="#000"
            className=" p-3 w-full rounded-md lg:mr-0 z-0  mb-5"
            onClick={closeDeleteModal}
          >
            Delete Permanently
          </Button>
          <Button
            intent={'primary'}
            size={'md'}
            isLoading={false}
            spinnerColor="#000"
            onClick={closeDeleteModal}
            className="p-3 mb-5 w-full text-green-500 lg:ml-0 ml-auto rounded-md bg-transparent border border-green-500 hover:text-white-100"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default VendorDetails;
