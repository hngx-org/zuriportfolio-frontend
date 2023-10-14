import SuperAdminNavbar from '../../../../../modules/super-admin/components/navigations/SuperAdminNavbar';
import Image from 'next/image';
import right from '/public/assets/vendor/arrow-right.svg';
import Button from '@ui/Button';
import Modal from '@ui/Modal';
import { ArrowRight } from 'iconsax-react';
import { useRouter } from 'next/router';
import React from 'react';
import {
  useBanShop,
  useDeleteShop,
  useGetShop,
  useRemoveBan,
  useRestoreShop,
  useTempDeleteShop,
} from '../../../../../http';
import Loader from '@modules/portfolio/component/landing/Loader';
import { imageUrl } from '@modules/super-admin/components/vendormanagement/VendorLists';
import { formatDate, handleBack } from '@modules/super-admin/components/product-listing/product-details';
import { toast } from 'react-toastify';
import StarRating from '@modules/super-admin/components/StarRating';

export const brokenImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/800px-No-Image-Placeholder.svg.png';
function VendorDetails() {
  const router = useRouter();
  const { name, email, amount, quantity, date, statusText } = router.query;

  const id = router.query?.id as string;

  const { data, isLoading } = useGetShop(id);
  const details = data?.data?.length > 0 ? data?.data[0] : null;
  //Access Query paramterts

  //States for opening and closing the modaals
  const [isModal, setIsModal] = React.useState(false);
  const [isDeleteModal, setDeleteModal] = React.useState(false);
  const [action, setAction] = React.useState('');
  const { removeBan, isLoading: isRemovingBan } = useRemoveBan();
  const { restoreShop, isLoading: isRestoringShop } = useRestoreShop();
  const { banShop, isLoading: isBanningShop } = useBanShop();
  const { tempDeleteShop, isLoading: isTempDeletingShop } = useTempDeleteShop();
  const { deleteShop, isLoading: isDeletingShop } = useDeleteShop();

  const handleRemoveBan = () => {
    removeBan(id, {
      onSuccess: (response) => {
        if (response.response.status < 300) {
          toast.success(response.response.status || 'This product is no longer banned');
          handleBack(router);
        } else {
          toast.error(response.response.data.message || response.response.data.error);
        }
      },
      onError: () => {
        toast.success('This product is no longer banned');
        handleBack(router);
      },
    });
  };

  const handleRestoreShop = () => {
    restoreShop(id, {
      onSuccess: (response) => {
        if (response.response.status < 300) {
          toast.success(response.response.status || 'Successfully restored');
          router.push('/super-admin/vendor-management');
        } else {
          toast.error(response.response.data.message || response.response.data.error);
        }
      },
      onError: () => {
        toast.success('Successfully restored');
        router.push('/super-admin/vendor-management');
      },
    });
  };

  const handleBanShop = () => {
    banShop(id, {
      onSuccess: (response) => {
        console.log(response.response.status);

        if (response.response.status < 300) {
          toast.success(response.response.status || 'Successfully banned');
          handleBack(router);
        } else {
          toast.error(response.response.data.message || response.response.data.error);
        }
      },
      onError: () => {
        toast.success('Successfully banned');
        handleBack(router);
      },
    });
  };

  const handleTempDeleteShop = () => {
    tempDeleteShop(id, {
      onSuccess: (response) => {
        if (response.response.status < 300) {
          toast.success(response.response.status || 'Successfully deleted temporarily');
          handleBack(router);
        } else {
          toast.error(response.response.data.message || response.response.data.error);
        }
      },
      onError: () => {
        toast.success('Successfully deleted temporarily');
        handleBack(router);
      },
    });
  };

  const handleDeleteShop = () => {
    deleteShop(id, {
      onSuccess: (response) => {
        if (response.response.status < 300) {
          toast.success(response.response.status || 'Successfully deleted permanently');
          handleBack(router);
        } else {
          toast.error(response.response.data.message || response.response.data.error);
        }
      },
      onError: () => {
        toast.success('Successfully deleted permanently');
        handleBack(router);
      },
    });
  };

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

  function allProducts() {
    router.push(`/super-admin/vendor-management/vendor-details/${id}/all`);
  }

  console.log(data?.data);

  return (
    <>
      <SuperAdminNavbar />
      <div className="container">
        {isLoading || !data?.data ? (
          <Loader />
        ) : (
          <>
            <div>
              <div className="top flex items-center mr-5 border-b border-white-110 ml-10 mt-5 mb-5">
                <Image
                  src={right}
                  alt="back"
                  className="mr-2 pb-3 cursor-pointer"
                  onClick={() => router.push('/super-admin/vendor-management/')}
                ></Image>
                <p className="pb-3">Vendor Profile Details</p>
              </div>
            </div>
            <section className=" vendor-dash mr-5 ml-5 lg:flex items-center lg:mr-0 lg:ml-0 font-manropeL">
              <div className="sales flex flex-col items-center justify-center lg:w-1/2 lg:ml-10">
                <div className="revenue border border-white-110 p-2 mb-5 w-full lg:w-full">
                  <p>Total Products</p>
                  <h1 className="text-xl font-bold">{details?.total_products}</h1>
                </div>
                <div className="revenue border border-white-110 p-2 mb-5 w-full lg:w-full">
                  <p>{quantity ? quantity : 'Total Order'}</p>
                  <div className="badge flex items-center justify-between">
                    <h1 className="text-xl font-bold">{details?.total_products}</h1>
                    {/* <Image src={badge} alt="Price Badge" /> */}
                  </div>
                </div>
                <div className="revenue border border-white-200  p-2 w-full lg:w-full">
                  <p>Total Sales</p>
                  <div className="badge flex items-center justify-between">
                    <h1 className="text-xl font-bold">{amount ? amount : '$430600'}</h1>
                    {/* <Image src={badge} alt="Price Badge" /> */}
                  </div>
                </div>
              </div>

              {/* Vendor Profile */}

              <div className="profile mt-10  w-full lg:w-1/2 lg:ml-12 lg:mr-5 lg:mt-0">
                <div className="header flex items-center ml-5 lg:ml-0">
                  <div className="w-20 h-20 mx-2 rounded-full overflow-hidden">
                    <Image
                      loader={() => imageUrl}
                      src={imageUrl}
                      alt="profile picture"
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="name">
                    <h1 className="text-3xl font-bold font-manropeL">{details?.merchant_name}</h1>
                    <p>{details?.merchant_email}</p>
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
                      <p className=" text-base font-semibold font-manropeB leading-normal tracking-[0.08px]">
                        {data?.rating_id ?? 0}/5
                      </p>
                      <StarRating rating={data?.rating_id ?? 0} />
                    </aside>
                    <p className="text-xs mr-5 lg:mr-0 sm:ml-auto">{`Date Added ${formatDate(details?.createdAt)}`}</p>
                  </div>

                  <div className="status flex items-center justify-between mb-3">
                    <p className="ml-5 lg:ml-0">
                      ({data?.rating_id ?? 0} Customer{data?.rating_id > 0 ? 's' : ''})
                    </p>
                    <div
                      className={` hidden  rounded-2xl py-0.5 pl-1.5 pr-2 text-center font-manropeL text-xs font-medium md:flex items-center justify-center gap-2 w-max ${
                        details?.vendor_status === 'Banned'
                          ? 'bg-custom-color40 text-yellow-600 rounded-2xl py-0.5 pl-1.5 pr-2 text-center font-manropeL font-medium'
                          : details?.vendor_status === 'Deleted'
                          ? 'hidden bg-pink-120 text-custom-color34 rounded-2xl py-0.5 pl-1.5 pr-2 text-center font-manropeL font-medium'
                          : 'bg-green-200 bg-opacity-50 text-green-800'
                      }`}
                    >
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${
                          details?.vendor_status === 'Banned'
                            ? 'bg-yellow-600'
                            : details?.vendor_status === 'Deleted'
                            ? 'bg-red-800'
                            : 'bg-green-800'
                        }`}
                      ></span>
                      <span>{details?.vendor_status}</span>
                    </div>
                    {/* {statusText ? statusText : <Image src={active} alt="active" className="mr-5 lg:mr-0"></Image>} */}
                  </div>

                  {/* Toggle the modal for deleting or banning vendors */}
                  <div className="buttons w-full flex items-center justify-between mt-6"></div>
                  <div className="flex py-8 justify-center space-x-9">
                    <Button
                      intent={'secondary'}
                      size={'md'}
                      isLoading={isTempDeletingShop || isDeletingShop}
                      className="text-brand-red-primary active:bg-brand-red-pressed hover:bg-brand-red-hover hover:text-white-100 border-brand-red-primary lg:w-[284.5px] lg:h-[60px] md:w-[359px] md:h-[52px] w-[145.5px]"
                      onClick={() => {
                        details?.vendor_status === 'Deleted' ? handleDeleteShop() : handleTempDeleteShop();
                      }}
                    >
                      <span className="font-manropeL text-[12px]">
                        {details?.vendor_status === 'Deleted' ? 'Permanently Delete' : 'Delete'}
                      </span>
                    </Button>

                    <Button
                      size={'md'}
                      intent={
                        details?.vendor_status === 'Banned'
                          ? 'primary'
                          : details?.vendor_status === 'Deleted'
                          ? 'primary'
                          : 'secondary'
                      }
                      className={`${
                        details?.vendor_status === 'Active'
                          ? 'bg-transparent focus:bg-brand-green-focused active:bg-black active:text-white-100 disabled:bg-brand-disabled disabled:cursor-not-allowed border-black text-black'
                          : ''
                      } lg:w-[284.5px] lg:h-[60px]lg:w-[284.5px] lg:h-[60px] md:w-[359px] md:h-[52px] w-[145.5px]`}
                      isLoading={isRemovingBan || isRestoringShop || isBanningShop}
                      onClick={
                        details?.vendor_status === 'Banned'
                          ? handleRemoveBan
                          : details?.vendor_status === 'Deleted'
                          ? handleRestoreShop
                          : handleBanShop
                      }
                    >
                      <span className="font-manropeL text-[12px]">
                        {details?.vendor_status === 'Banned'
                          ? 'Remove Ban'
                          : details?.vendor_status === 'Deleted'
                          ? 'Restore'
                          : 'Ban'}
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
            <section className=" mt-10 font-manropeL pb-5">
              <h1 className="ml-10 text-xl font-bold mt-6">Products by {details?.merchant_name}</h1>
              <div>
                {details?.products?.length <= 0 ? (
                  <p className="text-red-100 my-10 w-fit mx-auto">Nothing to show</p>
                ) : (
                  <>
                    <div className=" lg:grid-cols-4 md:grid-cols-3 px-0.5 md:px-2 lg:px-2 sm:px-2 grid grid-cols-2 gap-2 md:gap-3 lg:gap-4">
                      {details?.products?.map((item: any, index: number) => (
                        <div key={item?.product_id}>
                          {index < 4 ? (
                            <div className="product h-full border border-gray-300 p-3 rounded-md m-3">
                              <div className="w-[220px] h-[181px] mx-auto">
                                <Image
                                  loader={() => brokenImage}
                                  src={brokenImage}
                                  alt="product"
                                  width={100}
                                  height={100}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <p className="mt-2">{item?.product_name}</p>
                              <p className="font-bold">${new Intl.NumberFormat('en-US').format(item?.price)}</p>
                              <p className="mb-3">{item?.description}</p>
                              <aside className="left flex items-center">
                                <StarRating rating={item?.rating ?? 0} />
                                <p>({item?.rating ?? 0})</p>
                              </aside>
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end">
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
                    </div>
                  </>
                )}
              </div>
            </section>
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
                <span className="font-bold">Gustavo Silas</span> will be deleted as a vendor from Zuri Marketplace and
                all their products as well. They will get a notification email.
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
        )}
      </div>
    </>
  );
}

export default VendorDetails;
