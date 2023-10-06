import Modal from '@ui/Modal';

function SampleModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal
      closeOnOverlayClick
      isOpen={isOpen}
      closeModal={onClose}
      isCloseIconPresent={false}
      size="sm"
      title="Hello Shalom"
    >
      <p>Shalom is a hardworking and rich lady</p>
    </Modal>
  );
}
export default SampleModal;
