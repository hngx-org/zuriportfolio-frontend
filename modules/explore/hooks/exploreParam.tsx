import { createContext, useContext, useEffect, useState } from 'react';
import router, { useRouter } from 'next/router';

export function useExploreParams() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const router = useRouter();
  useEffect(() => {
    router.replace({
      pathname: router.pathname,
      query: {
        page: page,
        itemsPerPage: limit,
      },
    });
  }, [page]);

  const upDatePage = (page: number) => {
    setPage(page);
  };

  return {
    page,
    upDatePage,
    limit,
  };
}

const exploreParams = createContext({});

export default function ParamsProvider(prop: { children: React.ReactNode }) {
  const params = useExploreParams();

  return <exploreParams.Provider value={params}>{prop.children}</exploreParams.Provider>;
}

const useExploreParam = () => useContext(exploreParams);
