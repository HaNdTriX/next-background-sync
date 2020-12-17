import { useState } from "react";

/**
 * Mutation hook that supports mutation state (error, data & loading)
 * @param {Function} fetcher
 * @return [mutate, {loading, data, error}]
 */
export default function useMutation(fetcher) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const mutator = async (...args) => {
    setIsLoading(true);
    setError(null);
    try {
      setData(null);
      const data = await fetcher(...args);
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return [
    mutator,
    {
      isLoading,
      error,
      data,
    },
  ];
}
