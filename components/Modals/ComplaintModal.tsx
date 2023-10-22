// from cookies
{
  /*function getAuthTokenFromCookies(cookieName: string): string | null {
  const cookies = document.cookie;
  const cookieArray = cookies.split(';');

  for (const cookie of cookieArray) {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName) {
      return value;
    }
  }

  return null;
}
*/
}

// from local storage

import { useState, useEffect } from 'react';
import Modal from '@ui/Modal';
import { toast } from 'react-toastify';
import getZptValueFromLocalStorage from './tokenkey';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface ComplaintModalProps extends ModalProps {
  product: string;
  customerID: string;
}
// const token = getAuthTokenFromCookies('UTM_tracker');
const apiURL = 'https://zuri-cart-checkout.onrender.com/api/v1/checkout_cart/complaints';

const ComplaintModal: React.FC<ComplaintModalProps> = ({ isOpen, onClose, product, customerID }) => {
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const data = { product_id: product, complaint: description };
  const stringifyData = JSON.stringify(data);

  //auth Token
  const zptValue = getZptValueFromLocalStorage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (description.length == 0) {
      setError('Complaint cannot be empty');
    } else {
      try {
        const response = await fetch(apiURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${zptValue}`,
          },
          body: stringifyData,
        });
        if (response.ok) {
          toast.success('Submitted Complaint, Successfully', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });

          const res = await response.json();
          console.log(res.data);
          setError('');
          onClose();
        } else {
          const errorData = await response.json();
          if (response.status === 404) {
            console.error('404: 404 Not Found - Endpoint Not Found');
          } else if (response.status === 403) {
            console.error('403: 403 Forbidden - You are not authorized to perform this action');
          } else if (response.status === 500) {
            console.error('500: 500 something went wrong. Please try again');
          } else if (response.status === 401) {
            console.error('401: 401 Unauthorized - Authentication required');
          } else if (response.status === 422) {
            console.error('422: 422 Unprocessable Entity - Invalid data submitted');
          } else {
            console.error('An error occurred while submitting your complaint');
          }
          toast.error(errorData.message, {});
        }
      } catch (err: any) {
        console.error(err);
        toast.error(err.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    }
    setDescription('');
    // setError("");
  };

  if (!isOpen) return null;

  return (
    <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="sm" title="">
      <div className="p-4 container flex flex-col gap-7">
        <h1 className="text-2xl font-bold">Submit your Complaint</h1>
        <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Complaint Description
            </label>
            <textarea
              id="description"
              className="p-3 w-full border-2 border-brand-green-primary rounded-md"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {error && <p className="error text-brand-red-primary">{error}</p>}
          </div>

          {/* buttons */}
          <div className="flex justify-between flex-row-reverse">
            <button
              type="submit"
              className="px-4 py-2 bg-brand-green-primary text-white-100 rounded-md hover:bg-brand-green-pressed"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-brand-red-primary text-brand-red-primary rounded-md hover:bg-brand-red-hover hover:text-white-100 cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ComplaintModal;
