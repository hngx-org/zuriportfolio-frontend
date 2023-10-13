import { createContext, useContext, useEffect, useState } from 'react';
import router, { useRouter } from 'next/router';

export function useExploreParams() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  return {
    page,

    limit,
  };
}

const exploreParams = createContext({});

export default function ParamsProvider(prop: { children: React.ReactNode }) {
  const params = useExploreParams();

  return <exploreParams.Provider value={params}>{prop.children}</exploreParams.Provider>;
}

const useExploreParam = () => useContext(exploreParams);
