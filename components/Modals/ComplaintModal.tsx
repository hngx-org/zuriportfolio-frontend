import { useState } from 'react';
import Modal from '@ui/Modal';
import { toast } from 'react-toastify';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface ComplaintModalProps extends ModalProps {
  product: string;
  customerID: string;
}

const ComplaintModal: React.FC<ComplaintModalProps> = ({ isOpen, onClose, product, customerID }) => {
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (description === '') {
      setError('Complaint cannot be empty');
    } else {
      try {
        const response = await fetch(
          `https://team-mirage-super-amind2.onrender.com/api/superadmin/feedback/register_complaints/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: customerID, // Replace 'user_id' with the actual user ID
              product_id: product, // Replace 'product_id' with the actual product ID
              complaint_text: description,
            }),
          },
        );
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
        }
        setError('');
        onClose();
      } catch (err) {
        console.log(err);
        toast.error('An error occurred while submitting your complaint', {
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
      <div className="p-4 container">
        <h1 className="text-2xl font-bold">Submit a Complaint</h1>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="productID" className="block text-sm font-medium text-gray-700">
              Product ID
            </label>
            <input
              id="productID"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              type="text"
              value={product}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label htmlFor="customerID" className="block text-sm font-medium text-gray-700">
              Customer ID
            </label>
            <input
              id="customerID"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              type="text"
              value={customerID}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Complaint Description
            </label>
            <textarea
              id="description"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {error && <p className="error text-brand-red-primary">{error}</p>}
          </div>

          {/* buttons */}
          <div className="flex justify-between flex-row-reverse">
            <button
              type="submit"
              className="px-4 py-2 bg-brand-green-primary text-white-100 rounded-md hover:bg-green-100 hover:text-brand-green-primary "
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-brand-red-primary text-white-100 rounded-md hover:bg-brand-red-hover "
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
