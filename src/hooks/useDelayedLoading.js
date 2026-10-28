import { useEffect, useState } from 'react';

export function useDelayedLoading(loading, delay = 300) {
  const [delayedLoading, setDelayedLoading] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setDelayedLoading(loading),
      loading ? delay : 0,
    );

    return () => window.clearTimeout(timer);
  }, [loading, delay]);

  return delayedLoading;
}

export default useDelayedLoading;
