"use client"

import { useEffect, useState } from 'react';

interface FetchDataResult<T> {
  data: T | null;
  error: Error | null;
}

const useFetchData = <T,>(endpoint: string): FetchDataResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Retrieve token from local storage
        const headers = {} as Record<string, string>;
        if(token){
          headers['Authorization'] = `Bearer ${token}`
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`, {
          headers
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, error };
};

export default useFetchData;
