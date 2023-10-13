import { useEffect, useState } from 'react';

export default function useDebounce(value: string, delay: number) {
  const [valueSearch, setValueSearch] = useState<string>();

  useEffect(() => {
    const handleSetTimeOut = setTimeout(() => {
      setValueSearch(value);
    }, delay);
    return () => {
      clearTimeout(handleSetTimeOut);
    };
  }, [value, delay]);

  return valueSearch;
}
