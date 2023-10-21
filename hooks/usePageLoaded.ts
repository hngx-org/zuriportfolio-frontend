import React from 'react';

// delay component/page render during page reload.
function usePageLoaded(timer?: number) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => setLoading(true), (timer as number) * 1000 ?? 2000);
  });

  return loading;
}

export default usePageLoaded;
