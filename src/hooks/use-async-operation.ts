"use client";

import { useState, useCallback } from 'react';
import { useLoading } from '@/components/ui/loading-provider';

interface UseAsyncOperationOptions {
  loadingText?: string;
  successText?: string;
  errorText?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useAsyncOperation<T = any>(options: UseAsyncOperationOptions = {}) {
  const { setLoading, setLoadingText } = useLoading();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (asyncFunction: () => Promise<T>, customLoadingText?: string) => {
      try {
        setIsLoading(true);
        setLoading(true);
        setLoadingText(customLoadingText || options.loadingText || 'Loading...');
        setError(null);
        
        const result = await asyncFunction();
        setData(result);
        
        if (options.onSuccess) {
          options.onSuccess();
        }
        
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An error occurred');
        setError(error);
        
        if (options.onError) {
          options.onError(error);
        }
        
        throw error;
      } finally {
        setIsLoading(false);
        setLoading(false);
      }
    },
    [setLoading, setLoadingText, options]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    data,
    error,
    isLoading,
    execute,
    reset,
  };
}
