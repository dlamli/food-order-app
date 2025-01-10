import { useCallback, useEffect, useState } from "react";
import { sendHttpRequest } from "../utils/http";
import { FetchConfig } from "../types";

const useHttp = (url: string, initialData: any, config?: FetchConfig) => {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const clearData = () => setData(initialData);

  const sendRequest = useCallback(async (data?: any) => {
    setIsLoading(true);
    try {
      const responseData = await sendHttpRequest(url, { ...config, body: data });
      setData(responseData);

    } catch (error: any) {
      setError(error.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, [url, config]);

  useEffect(() => {
    if ((config && config.method === 'GET') || !config?.method || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    // Variables
    data,
    error,
    isLoading,
    // Functions
    sendRequest,
    clearData,
  }
}

export default useHttp;