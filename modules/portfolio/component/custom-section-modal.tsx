import { Input } from '@ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/SelectInput';
import { Add, CloseSquare } from 'iconsax-react';
import React, { useContext, useEffect, useState } from 'react';
import { years } from '../data';
import Modal from '@ui/Modal';
import Button from '@ui/Button';
import Portfolio from '../../../context/PortfolioLandingContext';
import Demo from './new-custom-section-modal';

type Section = {
  type: string; // Type of the section (e.g., 'title', 'sub-title', etc.)
  data: Record<string, any>; // Section-specific data stored as a key-value pair
  id: number;
};

type CustomSectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

//{ isOpen, onClose }: CustomSectionModalProps

const CustomSectionModal = () => {
  const { openCustom, setOpenCustom } = useContext(Portfolio);

  let isOpen = openCustom,
    onClose = () => setOpenCustom(false);

  return (
    <Modal isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="xl">
      <div className="max-w-[600px] mx-auto my-10">
        <Demo onClose={onClose} />
      </div>
    </Modal>
  );
};

export default CustomSectionModal;
