import { useEffect, useState } from 'react';
import Modal from '@ui/Modal';
import React from 'react';
import Button from '@ui/Button';
import { Input } from '@ui/Input';
import $http from '../../../../http/axios';
import axios from 'axios';
import { toast } from 'react-toastify';
import { PurchaseData } from '../../../../pages/user/customer-purchase-dashboard';
import { getDataByMonth, getDataByPrice, getDataByYear } from '../../../../http/customerPurchaseDashboard';

type Props = {
  filter: string | any;
  isOpen: boolean;
  onClose: () => void;
  token?: string | null | undefined;
  setData: (data: PurchaseData[]) => void;
  setLoading: (loading: boolean) => void;
};

const MONTH = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const FilterModal = ({ filter, isOpen, onClose, setData, setLoading }: Props) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [year, setYear] = useState('');

  const filterByPrice = async () => {
    setLoading(true);
    try {
      const response = await getDataByPrice(from, to);
      setData(response);
      onClose();
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.response?.data?.message}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        console.error(error.response?.data?.message);
      }
      setLoading(false);
      setData([]);
      onClose();
    }
  };
  const filterByMonth = async (month: string) => {
    setLoading(true);
    try {
      const response = await getDataByMonth(month);
      setData(response);
      onClose();
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.response?.data?.message}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        console.error(error.response?.data?.message);
      }
      setLoading(false);
      setData([]);
      onClose();
    }
  };
  const filterByYear = async () => {
    setLoading(true);
    try {
      const response = await getDataByYear(year);
      setData(response);
      onClose();
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.response?.data?.message}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        console.error(error.response?.data?.message);
      }
      setLoading(false);
      setData([]);
      onClose();
    }
  };

  return (
    <>
      <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="sm" title="">
        {filter === 'price' && (
          <>
            <div className="">
              <h5 className="mb-[1rem] font-bold">Add a range</h5>
              <div className="flex justify-between">
                <Input
                  onChange={(e) => {
                    setFrom(e.target.value);
                  }}
                  type="number"
                  intent={'default'}
                  disabled={false}
                  placeHolder="from"
                  className="w-[12rem]"
                />
                <Input
                  onChange={(e) => {
                    setTo(e.target.value);
                  }}
                  type="number"
                  intent={'default'}
                  disabled={false}
                  placeHolder="to"
                  className="w-[12rem]"
                />
              </div>
            </div>
            <div className="cta flex justify-center mt-[2rem]">
              <Button intent={'primary'} size={'md'} onClick={filterByPrice} className="w-[10rem] rounded-lg">
                Filter
              </Button>
            </div>
          </>
        )}
        {/* filter by month */}
        {filter === 'month' && (
          <>
            <h5 className="mb-[1rem] font-bold">Choose a month</h5>
            <div className="grid grid-cols-3 gap-3">
              {MONTH.map((item, i) => (
                <div
                  onClick={() => filterByMonth(item)}
                  key={i}
                  className="border-slate-200 border rounded-md cursor-pointer p-[1rem] font-semibold hover:text-white-100 hover:bg-brand-green-hover"
                >
                  {item}
                </div>
              ))}
            </div>
          </>
        )}
        {/* filter by year */}
        {filter === 'year' && (
          <>
            <h5 className="mb-[1rem] font-bold">Enter year</h5>
            <div className="cta flex justify-between ">
              <Input
                onChange={(e) => {
                  setYear(e.target.value);
                }}
                type="number"
                intent={'default'}
                disabled={false}
                placeHolder="year"
              />

              <Button intent={'primary'} size={'md'} onClick={filterByYear} className="rounded-lg">
                Filter
              </Button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default FilterModal;
