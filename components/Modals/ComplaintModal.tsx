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

  const payload = { user_id: customerID, product_id: product, complaint_text: description };
  const stringifyData = JSON.stringify(payload);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (description.length == 0) {
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
            body: stringifyData,
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

          setError(''); // Clear any previous errors
          onClose();
        } else {
          setError('Failed to submit complaint. Please try again.');
        }
      } catch (err) {
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
