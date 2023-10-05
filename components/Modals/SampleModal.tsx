import Modal from '@ui/Modal';

function SampleModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal closeOnOverlayClick isOpen={isOpen} closeModal={onClose} isCloseIconPresent={false} size="sm">
      <div className="space-y-6 bg-white-100 p-4">
        <p>Shalom is a beautiful lady</p>
      </div>
    </Modal>
  );
}
export default SampleModal;
