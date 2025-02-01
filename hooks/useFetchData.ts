"use client"

import { useEffect, useState } from 'react';

interface FetchDataResult<T> {
  data: T | null;
  error: Error | null | unknown;
  loading: boolean | undefined;
}

const useFetchData = <T,>(endpoint: string): FetchDataResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null | unknown>(null);
  const [loading, setLoading] = useState<boolean | undefined>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('authToken'); // Retrieve token from local storage
        const headers = {} as Record<string, string>;
        if(token){
          headers['Authorization'] = `Bearer ${token}`
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}?dashboard_name=${process.env.NEXT_PUBLIC_DASHBOARD_NAME}`, {
          headers
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error: unknown) {
        setError(error);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, error, loading };
};

export default useFetchData;
