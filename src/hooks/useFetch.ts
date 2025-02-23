import { useRef, useState } from "react";

interface FetchProps<T> {
  endpoint: string;
  onUpdate?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface Cache<T> {
  [endpoint: string]: T;
}

interface Props {
  withCache?: boolean;
}

const useFetch = <T>(props?: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const refCache = useRef<Cache<T>>({});

  const handleFetch = async ({
    endpoint,
    onUpdate,
    onError,
  }: FetchProps<T>) => {
    const requestStr = `${import.meta.env.VITE_API_URL}${endpoint}`;

    if (props?.withCache && refCache.current[endpoint]) {
      onUpdate?.(refCache.current[endpoint]);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(requestStr);

      if (!response.ok) {
        onError?.(new Error(response.statusText));
        return;
      }

      const resJson = await response.json();
      onUpdate?.(resJson);

      if (props?.withCache) {
        refCache.current[endpoint] = resJson;
      }
    } catch (e) {
      onError?.(e as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleFetch, isLoading };
};

export default useFetch;
