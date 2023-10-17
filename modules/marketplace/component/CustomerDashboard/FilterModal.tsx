import { useEffect, useState } from 'react';
import Modal from '@ui/Modal';
import React from 'react';
import useDisclosure from '../../../../hooks/useDisclosure';
import Button from '@ui/Button';

type Props = {
  filter: string | any,
  isOpen: boolean,
  onClose: () => void,
}

const FilterModal = ({filter, isOpen, onClose}: Props) => {
    // const [filterState, setFilterState] = useState({
    //   price: false,
    //   month: false,
    //   year: false
    // }) 
    
    // const onPriceClose = () => {
    //   setFilterState(prev => { 
    //     return { ...prev, [filter]: !filterState.price}
    //   })
    // }
    
    // const onMonthClose = () => {
    //   setFilterState(prev => { 
    //     return { ...prev, [filter]: !filterState.month}
    //   })
    // }
    
    // const onYearClose = () => {
    //   setFilterState(prev => { 
    //     return { ...prev, [filter]: !filterState.year}
    //   })
    // }

    // useEffect(() => {
    //   if(filter === 'price'){
    //     setFilterState(prev => { 
    //       return { ...prev, [filter]: true}
    //     })
    //   }
    // }, [filter])

    // console.log(filter, filterState)

    // const filterPrice = filter === 'price' && isOpen;
    // const filterMonth = filter === 'month' && isOpen;
    // const filterYear = filter === 'year' && isOpen;

    // console.log(filterPrice)

  return (
    <>
      {filter === 'price' && <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="sm" title="">
        Filter by Price
          <div className="cta flex justify-center gap-[2rem]">
            <Button intent={'primary'} size={'md'}>
              Filter
            </Button>
          </div>
      </Modal>}
      {/* filter by month */}
      {filter === 'month' && <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="sm" title="">
        Filter by month
          <div className="cta flex justify-center gap-[2rem]">
            <Button intent={'primary'} size={'md'}>
              Filter
            </Button>
          </div>
      </Modal>}
      {/* filter by year */}
      {filter === 'year' && <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="sm" title="">
        Filter by year
          <div className="cta flex justify-center gap-[2rem]">
            <Button intent={'primary'} size={'md'}>
              Filter
            </Button>
          </div>
      </Modal>}
    </>
  );
};

export default FilterModal;
