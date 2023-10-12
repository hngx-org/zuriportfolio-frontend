import React, { useState } from 'react';
import SuperAdminProdDetails from '@modules/super-admin/components/product-listing/product-details';
import DeleteModal from '@modules/super-admin/components/product-listing/product-details/DeleteModal';

const SanctionedProductDetails = () => {
  const [openModal, setOpenModal] = useState(false);
  const [reasons, setReasons] = useState(new Map())
  const reasonsKeysArray = Array.from(reasons.keys());


  console.log(reasonsKeysArray)
  return (
    <>
      <SuperAdminProdDetails setOpenModal={setOpenModal} />
      <DeleteModal isOpen={openModal} closeModal={() => setOpenModal(false)} reasons={reasons} setReasons={setReasons}/>
    </>
  );
};

export default SanctionedProductDetails;
