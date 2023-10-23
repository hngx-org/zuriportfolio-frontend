import { Input } from '@ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
import { Add, CloseSquare } from 'iconsax-react';
import React, { useContext, useEffect, useState } from 'react';
import { years } from '../data';
import Modal from '@ui/Modal';
import Button from '@ui/Button';
import Portfolio from '../../../context/PortfolioLandingContext';
import CreateCustomSectionContainer from './new-custom-section-modal';

const CustomSectionModal = () => {
  const { openCustom, setOpenCustom, userId } = useContext(Portfolio);

  let isOpen = openCustom,
    onClose = () => setOpenCustom(false);

  return (
    <Modal isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="xl">
      <div className="max-w-4xl mx-auto my-5">
        <CreateCustomSectionContainer onClose={onClose} userId={userId} />
      </div>
    </Modal>
  );
};

export default CustomSectionModal;
