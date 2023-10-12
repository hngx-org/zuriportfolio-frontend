import { useRouter } from 'next/navigation';
import { useState } from 'react';

const useSearchFilter = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // search filter state and logic here
  const [isOpen, setIsOpen] = useState(false);
  function toggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  function handleSearch() {
    setLoading(true);
    console.log('handle submit');
    setTimeout(() => {
      setLoading(false);
      router.push('/marketplace/error-page');
    }, 3000);
  }

  function resetFilter() {}

  return { handleSearch, resetFilter, loading, isOpen, toggle };
};

export default useSearchFilter;
