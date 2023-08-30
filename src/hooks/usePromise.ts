import {useState} from 'react';

export const usePromise = <T extends unknown[], R, E>(
  getPromise: (...args: T) => Promise<R>,
  config?: {
    onError?: (error: E) => void;
  },
) => {
  const [isPending, setIsPending] = useState(false);
  const [result, setResult] = useState<R | null>(null);
  const [error, setError] = useState<E | null>(null);

  const execute = async (...args: T) => {
    try {
      setIsPending(true);
      const data = await getPromise(...args);
      setResult(data);
    } catch (err: unknown) {
      setError(err as E);
      config?.onError?.(err as E);
    } finally {
      setIsPending(false);
    }
  };
  return {execute, result, error, isPending};
};
