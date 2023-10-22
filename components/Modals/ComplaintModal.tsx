function getAuthTokenFromCookies(cookieName: string): string | null {
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

import { useState } from 'react';
import Modal from '@ui/Modal';
import { toast } from 'react-toastify';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface ComplaintModalProps extends ModalProps {
  product: string;
  user: string;
}
//  const token = getAuthTokenFromCookies('UTM_tracker');
const apiUrl = `https://team-mirage-super-amind2.onrender.com/api/v1/super-admin/feedback/register-complaints/`;

const ComplaintModal: React.FC<ComplaintModalProps> = ({ isOpen, onClose, product, user }) => {
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const data = { user: user, product: product, complaint: description };
  const stringifyData = JSON.stringify(data);

  //auth
  // const authToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE3YjRiOThiLWFlMzMtNGQ0Yy1hNmUzLTQ4YzY5MGQ5NDUyMyIsImZpcnN0TmFtZSI6IkJvcmRlciIsImVtYWlsIjoibW9yemV5b21sZUBndWZ1bS5jb20iLCJpYXQiOjE2OTcyNzUwMDR9.2v-dtbXuYl5J97F_S2M-vZB8lVuAnwCM1x3FJ0xOJWs`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (description.length == 0) {
      setError('Complaint cannot be empty');
    } else {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${authToken}`,
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
          {
            /* const res = await response.json();
          console.log(res.data);
          setError(''); // Clear any previous errors
          onClose();
        } else {
          setError('Failed to submit complaint. Please try again.');
        }*/
          }

          const res = await response.json();
          console.log(res.data);
          setError(''); // Clear any previous errors
          onClose();
        } else {
          const errorData = await response.json();
          if (response.status === 404) {
            console.error('404: 404 Not Found - Endpoint Not Found');
          } else if (response.status === 403) {
            console.error('403: 403 Forbidden - You are not authorized to perform this action');
          } else if (response.status === 500) {
            console.error('500: 500 Internal Server Error - Complaint not saved. Please try again');
          } else if (response.status === 401) {
            console.error('401: 401 Unauthorized - Authentication required');
          } else if (response.status === 422) {
            console.error('422: 422 Unprocessable Entity - Invalid data submitted');
          } else {
            console.error('An error occurred while submitting your complaint');
          }
          toast.error(errorData.message, {
            // Other error notification settings
          });
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
