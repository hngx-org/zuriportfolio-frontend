import React, { useEffect, useState } from 'react';
import SuperAdminProdDetails from '@modules/super-admin/components/product-listing/product-details';
import DeleteModal from '@modules/super-admin/components/product-listing/product-details/DeleteModal';
import { useGetProdDetails } from '../../../../http';
import { useRouter } from 'next/router';
import Loader from '@modules/portfolio/component/landing/Loader';
import { toast } from 'react-toastify';
import SuperAdminNavbar from '@modules/super-admin/components/navigations/SuperAdminNavbar';

const ProdDetails = () => {
  const [openModal, setOpenModal] = useState(false);
  const [reasons, setReasons] = useState(new Map());
  const reasonsKeysArray = Array.from(reasons.keys());
  const router = useRouter();
  const id = router.query?.id as string;

  const { data, isLoading } = useGetProdDetails(id);
  useEffect(() => {
    if (data?.response?.data?.message) {
      toast.error(data?.response?.data?.message);
    }
  }, [data?.response?.data?.message]);

  return (
    <>
      <SuperAdminNavbar />
      {isLoading ? (
        <Loader />
      ) : data?.data?.length > 0 ? (
        <>
          <SuperAdminProdDetails setOpenModal={setOpenModal} data={data?.data[0]} id={id} />
          <DeleteModal
            isOpen={openModal}
            closeModal={() => setOpenModal(false)}
            reasons={reasons}
            setReasons={setReasons}
            id={id}
            data={data?.data[0]}
          />
        </>
      ) : (
        <>
          <p className="text-red-200 text-center my-10">Something went wrong, try again</p>
        </>
      )}
    </>
  );
};

export default ProdDetails;
