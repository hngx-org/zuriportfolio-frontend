import SuperAdminNavbar from '../../../modules/super-admin/components/navigations/SuperAdminNavbar';
import Image from 'next/image';
import star from '/public/assets/vendor/grade.png';
import active from '/public/assets/vendor/active.png';
import star_outline from '/public/assets/vendor/star_outline.png';
import vendors from '/public/assets/vendor/vendor-img.png';
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
import { vendorInstance } from '../../../http/vendor';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export async function fetchVendors() {
  try {
    const response = await vendorInstance.get(`/api/admin/shop/all`);
    console.log(response.data);
    return response.data.data[Math.floor(Math.random() * 10) + 1];
  } catch (err) {
    toast('error loading page');
  }
}

const deleteVendor = async (id: number) => {
  try {
    const response = await vendorInstance.delete(`/api/admin/shop/delete_shop/${id}`);
    toast('vendor deleted', {
      type: 'warning',
    });
  } catch (error) {
    toast("couldn't delete vendor", {
      type: 'error',
    });
  }
};

function VendorDetails() {
  const { data, isLoading } = useQuery(['vendor-data'], fetchVendors);
  const router = useRouter();
  const { name, email, amount, quantity, date } = router.query;

  const [isModal, setIsModal] = React.useState(false);
  const [isDeleteModal, setDeleteModal] = React.useState(false);

  const vendor = {
    statusText: 'Active', // Active || Deleted || Banned
  };
  const handleMessage = (arg: string) => {
    switch (arg) {
      case 'policy':
        console.log('Policy Violation');
        break;
      case 'offense':
        console.log('Offensive words');
        break;
      case 'feel':
        console.log('Just feel like it');
        break;
      case 'other':
        console.log('Other');
        break;
      default:
        console.log('Have a great weekend!');
    }
  };
  async function handleBan(id: string) {
    try {
      const response = await vendorInstance.put(`/api/admin/shop/ban_vendor/${id}`);
      toast('vendor banned', {
        type: 'warning',
      });
    } catch (error) {
      toast("couldn't ban vendor", {
        type: 'error',
      });
    }
  }
  async function handleUnBan(id: string) {
    try {
      const response = await vendorInstance.put(`/api/admin/shop/unban_vendor/${id}`);
      toast('vendor unbanned', {
        type: 'success',
      });
    } catch (error) {
      toast("couldn't unban vendor", {
        type: 'error',
      });
    }
  }
  async function handleRestore(id: string) {
    try {
      const response = await vendorInstance.patch(`/api/admin/shop/restore_shop/${id}`);
      toast('vendor restored', {
        type: 'success',
      });
    } catch (error) {
      toast("couldn't restore vendor", {
        type: 'error',
      });
    }
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
    deleteVendor(data?.shop_id);
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
            <h1 className="text-xl font-bold">{!isLoading ? data?.total_products : 'loading..'}</h1>
          </div>
          <div className="revenue border border-white-110 p-2 mb-5 w-full lg:w-full">
            <p>Total order</p>
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
            <Image src={vendors} alt="Vendor image" className="mr-3"></Image>
            <div className="name">
              <h1 className="text-3xl font-bold font-manropeL">{!isLoading ? data?.merchant_name : 'Loading...'}</h1>
              <p>{!isLoading ? data?.merchant_email : 'Loading...'}</p>
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
              <p className="text-xs mr-5 lg:mr-0 sm:ml-auto">
                {!isLoading ? `Date Added ${data?.joined_date}` : 'Loading...'}
              </p>
            </div>

            <div className="status flex items-center justify-between mb-3">
              <p className="ml-5 lg:ml-0">(50 Customers)</p>
              <span
                className={`mr-5 text-sm lg:mr-0 ${
                  data?.vendor_status === 'Active' && 'bg-custom-color6 text-custom-color7'
                } ${data?.vendor_status === 'Banned' && 'bg-custom-color40  text-[#E5B800]'} ${
                  data?.vendor_status === 'Deleted' && 'bg-pink-120 text-custom-color34'
                }  rounded-full py-2 pr-2  font-medium pl-1.5`}
              >
                {`• ${!isLoading ? data?.vendor_status : 'loading..'}`}
              </span>
            </div>
            {/* <Image src={active} alt="active" className="mr-5 lg:mr-0"></Image> */}
            {/* Toggle the modal for deleting or banning vendors */}
            <div className="buttons w-full flex items-center justify-between mt-6">
              {/* Conditionally outputting buttons based on vendo status */}
              {data?.vendor_status === 'Active' && (
                <Button
                  intent={'error'}
                  size={'md'}
                  isLoading={false}
                  spinnerColor="#000"
                  className="text-red-200 bg-transparent border border-red-200 p-3 pr-4 pl-4 w-3/4 rounded-md mr-5 lg:ml-0 z-0 hover:bg-red-200 hover:text-white-100"
                  onClick={openModal}
                >
                  Delete
                </Button>
              )}
              {data?.vendor_status === 'Banned' && (
                <Button
                  intent={'error'}
                  size={'md'}
                  isLoading={false}
                  spinnerColor="#000"
                  className="text-red-200 bg-transparent border border-red-200 p-3 pr-4 pl-4 w-3/4 rounded-md mr-5 lg:ml-0 z-0 hover:bg-red-200 hover:text-white-100"
                  onClick={openModal}
                >
                  Delete
                </Button>
              )}
              {data?.vendor_status === 'Deleted' && (
                <Button
                  intent={'error'}
                  size={'md'}
                  isLoading={false}
                  spinnerColor="#000"
                  className="text-red-200 bg-transparent border border-red-200 p-3 pr-4 pl-4 w-3/4 rounded-md mr-5 lg:ml-0 z-0 hover:bg-red-200 hover:text-white-100"
                  onClick={deleteModal}
                >
                  Permanently Delete
                </Button>
              )}
              {/* Conditionally outputting buttons based on vendo status */}
              {data?.vendor_status === 'Active' && (
                <Button
                  size={'md'}
                  isLoading={false}
                  spinnerColor="#000"
                  className="text-black bg-transparent border border-black p-3 pr-4 pl-4 w-3/4 rounded-md ml-5 lg:mr-0 z-0"
                  onClick={() => handleBan(data?.vendor_id)}
                >
                  Ban
                </Button>
              )}
              {data?.vendor_status === 'Banned' && (
                <Button
                  size={'md'}
                  isLoading={false}
                  spinnerColor="#000"
                  className="text-black bg-transparent border border-black p-3 pr-4 pl-4 w-3/4 rounded-md ml-5 lg:mr-0 z-0"
                  onClick={() => handleUnBan(data?.vendor_id)}
                >
                  Unban
                </Button>
              )}
              {data?.vendor_status === 'Deleted' && (
                <Button
                  size={'md'}
                  isLoading={false}
                  spinnerColor="#000"
                  className="text-black bg-transparent border border-black p-3 pr-4 pl-4 w-3/4 rounded-md ml-5 lg:mr-0 z-0"
                  onClick={() => handleRestore(data?.merchant_id)}
                >
                  Restore
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Products list */}

      <section className=" mt-10 font-manropeL pb-5">
        <h1 className="ml-10 text-xl font-bold mt-6">Products by {!isLoading ? data?.merchant_name : 'loading...'}</h1>
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
          className="ml-auto mt-5 mr-8 rounded-md"
          onClick={allProducts}
        >
          View all
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
          <li onClick={() => handleMessage('policy')} className="m-3 p-3">
            <input type="checkbox" className="mr-5"></input>Policy Violation
          </li>
          <li onClick={() => handleMessage('offense')} className="m-3 p-3">
            <input type="checkbox" className="mr-5"></input>Offensive words
          </li>
          <li onClick={() => handleMessage('feel')} className="m-3 p-3">
            <input type="checkbox" className="mr-5"></input>Just feel like it
          </li>
          <li onClick={() => handleMessage('other')} className="m-3 p-3">
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
