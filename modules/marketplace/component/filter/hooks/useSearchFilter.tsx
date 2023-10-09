import { useRouter } from 'next/navigation';
import { useState } from 'react';

const useSearchFilter = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  function handleSearch() {
      setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/marketplace/error-page');
    }, 3000);
  }

  function resetFilter() {}

  return { handleSearch, resetFilter, loading };
};

export default useSearchFilter;
