import { useState } from 'react';

function useDisclosure() {
  const [isOpen, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  const onToggle = () => setOpen((prev) => !prev);
  return { isOpen, onClose, onOpen, onToggle };
}

export default useDisclosure;
