import { useEffect } from 'react';
import router, { useRouter } from 'next/router';

export default function useExploreParams() {
  const router = useRouter();
  useEffect(() => {
    router.query.Name = 'bazz';
    router.push(router);
  }, []);
}
